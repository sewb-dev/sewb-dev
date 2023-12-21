import { QuestionType } from '@/modules/qnai/qnai.model';
import { UUID } from 'crypto';

export interface QNAI {
  id: number;
  question: string;
  answers: string[];
  type: QuestionType;
  options: string[];
}

interface QNAITestAnswer {
  qnaiId: number;
  answer: string;
  testId: UUID;
}

interface QNAITest {
  submittedAt: Date;
  answers: QNAITestAnswer[];
}

export interface QNAIGenerationModel {
  qnai: QNAI[];
  tests: QNAITest[];
}

export interface FileGenerationRequest {
  input: File;
  page: number[];
  questionCount: number;
}

export interface TextGenerationRequest {
  input: string;
  questionCount: number;
}

export type GenerationRequest = FileGenerationRequest | TextGenerationRequest;
