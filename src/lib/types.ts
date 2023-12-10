import { UUID } from 'crypto';

type QuestionType =
  | 'true_and_false'
  | 'multiple_choice'
  | 'select_all'
  | 'short_answer';

interface QNAI {
  id: number;
  question: string;
  answer: string[];
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
