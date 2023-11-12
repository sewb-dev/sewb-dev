import cache, { createCompoundKey } from '@/lib/cache';
import { update } from "firebase/database";
import authService from "../auth/auth.service";
import BaseService from "../base.service";
import qnaiService from "../qnai/qnai.service";
import { GenerationModel } from "./generation.model";
import { QNAIGenerationModel } from '../qnai/qnai.model';


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
    await this.saveGenerationToDb(email, generatedAt, generationId)

    return qnai
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

  private getCachedGeneratedQuestion = async (generationId: string) => {
    const compoundKey = createCompoundKey('QUESTION_GENERATION', generationId);
    let json = (await cache.call('JSON.GET', compoundKey, '$')) as string;
    const qnaiModel = JSON.parse(json) as QNAIGenerationModel[];
    return qnaiModel[0];
  };

  private getGenerationId = () => crypto.randomUUID()
}

const generationService = new GenerationService()

export default generationService