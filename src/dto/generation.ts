import { QNAIGenerationModel } from '@/modules/qnai/qnai.model';

export type GenerationModelDto = {
  generationId: string;
  generatedAt: string;
  userId: string;
};

export type CreateGenerationRequest = {
  numberOfQuestions: number;
  sourceText: string;
};

export type GenerationQNAIDto = {
  generationId: string;
};

export type GenerationStatusQNAIDto = {
  done: boolean;
  qnai: QNAIGenerationModel;
};
