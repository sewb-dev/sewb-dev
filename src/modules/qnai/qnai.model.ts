import { UUID } from 'crypto';

export const QuestionType = {
  TRUE_OR_FALSE: 'trueOrFalse',
  MULTIPLE_CHOICE: 'multipleChoice',
  SELECT_ALL: 'selectAll',
  SHORT_ANSWER: 'shortAnswer',
} as const;

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];

export class QNAI {
  readonly id: number;
  readonly question: string;
  readonly answer: string[] | number | number[];
  readonly type: QuestionType;
  readonly options: string[];

  constructor(
    id: number,
    question: string,
    answer: string[] | number | number[],
    type: QuestionType,
    options: string[]
  ) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.type = type;
    this.options = options;
  }
}
type QNAITestAnswer = {
  qnaiId: number;
  answer: string;
};
export class QNAITest {
  readonly submittedAt: number;
  readonly startedAt: number;
  readonly answer: QNAITestAnswer[];

  constructor(
    startedAt: number,
    submittedAt: number,
    answer: QNAITestAnswer[]
  ) {
    this.startedAt = startedAt;
    this.submittedAt = submittedAt;
    this.answer = answer;
  }
}

export class QNAIGenerationModel {
  readonly qna: QNAI[];
  readonly tests: QNAITest[];

  constructor(qnai: QNAI[], tests: QNAITest[]) {
    this.qna = qnai;
    this.tests = tests;
  }
}

type TransformedQuestionType =
  | 'Multiple Choice'
  | 'True/False'
  | 'Short Answer'
  | 'Select All That Apply';

export const questionTypeToTransformedType: {
  [key in QuestionType]: TransformedQuestionType;
} = {
  multipleChoice: 'Multiple Choice',
  trueOrFalse: 'True/False',
  selectAll: 'Select All That Apply',
  shortAnswer: 'Short Answer',
};

export type QNAIOpenaiResponse = {
  questions: QNAI[];
};
