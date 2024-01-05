import { QNAIGenerationModel } from '../qnai/qnai.model';

export type GenerationModel = {
  generationId: string;
  generatedAt: number;
  userId: string;
};

export type GenerationStatus = {
  status: 'INCOMPLETE' | 'COMPLETE';
  content: string;
  error: string | null;
};

export type GenerationData = {
  [key: string]: GenerationModel;
};

export type GenerationAPIResponse = {
  qnai: QNAIGenerationModel;
  generation: GenerationModel;
};
