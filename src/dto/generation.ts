import { QNAIGenerationModel } from '@/modules/qnai/qnai.model';

export type GenerationModelDto = {
  generationId: string;
  generatedAt: string;
  userId: string;
  generationTitle: string;
};

export type CreateGenerationRequest = {
  numberOfQuestions: number;
  sourceText: string;
  generationTitle: string;
};

export type GenerationQNAIDto = {
  generationId: string;
};

export type GenerationStatusQNAIDto = {
  done: boolean;
  qnai: QNAIGenerationModel;
};
