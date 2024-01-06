import { QuestionType } from '@/modules/qnai/qnai.model';

export interface QNAI {
  id: number;
  question: string;
  answer: string[];
  type: QuestionType;
  options: string[];
}

export interface QNAITestAnswer {
  qnaiId: number;
  answer: string;
}

export interface QNAITest {
  submittedAt: number;
  startedAt: number;
  answer: QNAITestAnswer[];
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

export type GenerateRequestPayload = {
  numberOfQuestions: number;
  sourceText: string;
  generationTitle: string;
};