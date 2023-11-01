
import { UUID } from 'crypto';

const QuestionType = {
  TRUE_OR_FALSE: 'true_or_false',
  MULTIPLE_CHOICE: 'multiple_choice',
  SELECT_ALL: 'select_all',
  SHORT_ANSWER: 'short_answer',
} as const;

type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];

class QNAI {
  readonly id: number;
  readonly question: string;
  readonly answers: string[];
  readonly type: QuestionType;
  readonly options: string[];

  constructor(
    id: number,
    question: string,
    answers: string[],
    type: QuestionType,
    options: string[]
  ) {
    this.id = id;
    this.question = question;
    this.answers = answers;
    this.type = type;
    this.options = options;
  }
}
type QNAITestAnswer = {
  qnaiId: number;
  answer: string;
  testId: UUID;
};
class QNAITest {
  readonly submittedAt: Date;
  readonly answers: QNAITestAnswer[];

  constructor(submittedAt: Date, answers: QNAITestAnswer[]) {
    this.submittedAt = submittedAt;
    this.answers = answers;
  }
}

export class QNAIGenerationModel {
  readonly qnai: QNAI[];
  readonly tests: QNAITest[];

  constructor(qnai: QNAI[], tests: QNAITest[]) {
    this.qnai = qnai;
    this.tests = tests;
  }
}

type TransformedQuestionType =
  | 'Multiple Choice'
  | 'True/False'
  | 'Short Answer'
  | 'Select All That Apply';

export const questionTypeToTransformedType: { [key in QuestionType]: TransformedQuestionType } = {
   multiple_choice: 'Multiple Choice',
   true_or_false: 'True/False',
   select_all: "Select All That Apply",
   short_answer: 'Short Answer',
}