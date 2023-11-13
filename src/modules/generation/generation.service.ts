import cache, { createCompoundKey } from '@/lib/cache';
import { child, get, update } from "firebase/database";
import authService from "../auth/auth.service";
import BaseService from "../base.service";
import { QNAIGenerationModel } from '../qnai/qnai.model';
import qnaiService from "../qnai/qnai.service";
import { GenerationModel } from "./generation.model";


class GenerationService extends BaseService {

  constructor() {
    super()
  }

  createQNAGeneration = async (email: string, sourceText: string, numberOfQuestions: number) => {
    const qnai = await qnaiService.getQuestionsFromText(
      sourceText,
      numberOfQuestions
    );

    const generationId = this.getGenerationId()
    const generatedAt = Date.now()

    await this.saveGeneratedQuestionToCache(generationId, qnai)
    const generation = await this.saveGenerationToDb(email, generatedAt, generationId)

    return {
      qnai,
      generation
    }
  }

  private saveGenerationToDb = async (email: string, generatedAt: number, generationId: string) => {
    const userId = authService.getUserId(email)
    
    const generation: GenerationModel = {
      generationId,
      generatedAt,
      userId,
    }

    const updates: Record<string, GenerationModel> = {}
    
    updates[`/generations/${userId}/${generationId}`] = generation
    updates[`/users/${userId}/lastGeneration`] = generation
    
    return update(this.dbRef, updates)
      .then(() => generation)
      .catch((error) => console.error(error))
  }

  private saveGeneratedQuestionToCache = async (
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
    const generation =  await cache.call('JSON.GET', compoundKey, '$')
      .then((response) => {
        if (!response) {
          return null
        }
        const qnaiModel = JSON.parse(response as string) as QNAIGenerationModel[];
        return qnaiModel[0];
      })

    return generation
  };

  getUserGenerationFromDB =  async (email: string, generationId: string) => {
    return get(child(this.dbRef, `generations/${authService.getUserId(email)}/${generationId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val() as GenerationModel
        } else {
          return undefined
        }
      })
      .catch((error) => {
        console.error(error);
        return undefined;
      });
  };

  private getGenerationId = () => crypto.randomUUID()
}

const generationService = new GenerationService()

export default generationService