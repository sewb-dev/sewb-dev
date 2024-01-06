import cache, { createCompoundKey } from '@/lib/cache';
import { child, get, update } from 'firebase/database';
import authService from '../auth/auth.service';
import BaseService from '../base.service';
import { QNAIGenerationModel } from '../qnai/qnai.model';
import qnaiService from '../qnai/qnai.service';
import { GenerationModel } from './generation.model';
import userService from '../user/user.service';
import { getDateObject, getDateString } from '@/utils/date';
import { countWords } from '@/utils/words';
import envVariables from '@/lib/env';
import requestClient from '@/lib/requestClient';

class GenerationService extends BaseService {
  constructor() {
    super();
  }

  createQNAGeneration = async (
    email: string,
    sourceText: string,
    numberOfQuestions: number,
    generationTitle: string
  ) => {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      console.error(
        `Failed to fetch user with hash ${authService.getUserId(
          email
        )} from user database.`
      );
      throw new Error(`Failed to fetch user from user database.`);
    }
    const today = getDateObject(getDateString(Date.now()));

    let resetGeneration = false;

    if (!user?.generation) {
      await userService.addUser(email, user.fullName);
    } else if (
      today > getDateObject(getDateString(user.generation.lastGenerationTime))
    ) {
      resetGeneration = true;
    } else {
      if (
        user.generation.wordCount + countWords(sourceText) >
        Number(envVariables.getEnv('DAILY_WORD_LIMIT'))
      ) {
        console.error(
          `Generation denied. reason=DAILY_WORD_LIMIT, value=${
            user.generation.wordCount + countWords(sourceText)
          }`
        );
        throw new Error(`Exceeded daily word quota for generation for today.`);
      }
      if (
        user.generation.generationCount + 1 >
        Number(envVariables.getEnv('DAILY_GENERATION_LIMIT'))
      ) {
        console.error(
          `Generation denied. reason=DAILY_GENERATION_LIMIT, value=${
            user.generation.generationCount + 1
          }`
        );
        throw new Error(
          `Exceeded daily generation count for generation for today.`
        );
      }
    }
    const generationId = await this.postGeneration(
      sourceText,
      numberOfQuestions
    );

    const generatedAt = Date.now();

    const generation = await this.saveGenerationToDb(
      email,
      generatedAt,
      generationId,
      sourceText,
      resetGeneration,
      generationTitle
    );

    return {
      generationId,
    };
  };

  private saveGenerationToDb = async (
    email: string,
    generatedAt: number,
    generationId: string,
    sourceText: string,
    resetGeneration: boolean,
    generationTitle: string
  ) => {
    const userId = authService.getUserId(email);
    const user = await userService.getUserByEmail(email);

    const generation: GenerationModel = {
      generationId,
      generatedAt,
      userId,
      generationTitle,
    };

    const updates: Record<string, GenerationModel | any> = {};

    updates[`/generations/${userId}/${generationId}`] = generation;
    updates[`/users/${userId}/generation`] = {
      generationTitle,
      lastGenerationTime: generatedAt,
      lastGenerationId: generationId,
      wordCount:
        (user?.generation.wordCount && !resetGeneration
          ? user?.generation.wordCount
          : 0) + countWords(sourceText),
      generationCount:
        (user?.generation.generationCount && !resetGeneration
          ? user?.generation.generationCount
          : 0) + 1,
    };

    return update(this.dbRef, updates)
      .then(() => generation)
      .catch((error) => {
        throw new Error(error);
      });
  };

  saveGeneratedQuestionToCache = async (
    generationId: string,
    generatedQuestions: QNAIGenerationModel
  ) => {
    try {
      const compoundKey = createCompoundKey(
        'QUESTION_GENERATION',
        generationId
      );
      await cache.call(
        'JSON.SET',
        compoundKey,
        '$',
        JSON.stringify(generatedQuestions)
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  getCachedGeneratedQuestion = async (generationId: string) => {
    const compoundKey = createCompoundKey('QUESTION_GENERATION', generationId);
    const generation = await cache
      .call('JSON.GET', compoundKey, '$')
      .then((response) => {
        if (!response) {
          return null;
        }
        const qnaiModel = JSON.parse(
          response as string
        ) as QNAIGenerationModel[];
        return qnaiModel[0];
      });

    return generation;
  };

  getUserGenerationFromDB = async (email: string, generationId: string) => {
    return get(
      child(
        this.dbRef,
        `generations/${authService.getUserId(email)}/${generationId}`
      )
    )
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val() as GenerationModel;
        } else {
          return undefined;
        }
      })
      .catch((error) => {
        console.error(error);
        return undefined;
      });
  };

  private getGenerationId = () => crypto.randomUUID();

  postGeneration = async (
    text: string,
    numOfQuestions: number
  ): Promise<string> => {
    try {
      const response = await requestClient.post(
        `${envVariables.getEnv('MODEL_URL')}/generations`,
        { text, numOfQuestions },
        {
          headers: {
            'x-caller-token': envVariables.getEnv('MODEL_CALLER_TOKEN'),
            'Content-Type': 'application/json',
          },
        }
      );

      const {
        generationId,
      }: {
        generationId: string;
      } = await response.data;
      return generationId;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  handleLongPolling = async (
    content: string,
    generationId: string,
    email: string
  ) => {
    const generationModel = qnaiService.parseQuestionsFromCompletions(content);
    const generation = await get(
      child(
        this.dbRef,
        `generations/${authService.getUserId(email)}/${generationId}`
      )
    )
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val() as GenerationModel;
        } else {
          return undefined;
        }
      })
      .catch((error) => {
        console.error(error);
        return undefined;
      });

    let updatedGenerationModel = generationModel;
    if (generation) {
      updatedGenerationModel = new QNAIGenerationModel(
        generationModel.qna,
        generationModel.tests,
        generation.generationTitle
      );
    }
    await this.saveGeneratedQuestionToCache(
      generationId,
      updatedGenerationModel
    );
    return updatedGenerationModel;
  };
}

const generationService = new GenerationService();

export default generationService;
