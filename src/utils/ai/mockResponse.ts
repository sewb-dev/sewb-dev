import { QuestionType } from '@/modules/qnai/qnai.model';

export const mockQNAIResponse = [
  {
    id: 1,
    question: 'What is the subject of the dispute in the opening scene?',
    options: ['A) Love', 'B) Hatred', 'C) A brawl', 'D) Family honor'],
    type: QuestionType.MULTIPLE_CHOICE,
    answers: ['A brawl'],
  },
  {
    id: 2,
    question: 'Who tries to stop the fight in the opening scene?',
    options: ['A) Romeo', 'B) Tybalt', 'C) The Prince', 'D) Benvolio'],
    type: QuestionType.MULTIPLE_CHOICE,
    answers: ['Benvolio'],
  },
  {
    id: 3,
    question: 'True or False: Romeo is in love with a woman.',
    options: [],
    type: QuestionType.TRUE_OR_FALSE,
    answers: ['True'],
  },
  {
    id: 4,
    question: "What are Romeo's feelings toward the woman he loves?",
    options: [],
    type: QuestionType.SHORT_ANSWER,
    answers: ['He is in love with her.'],
  },
  {
    id: 5,
    question: 'What quality does Romeo admire in the woman he loves?',
    options: [],
    type: QuestionType.SHORT_ANSWER,
    answers: ['Chastity and wisdom.'],
  },
  {
    id: 6,
    question:
      'What does Benvolio suggest to Romeo to help him forget about the woman he loves?',
    options: [],
    type: QuestionType.SHORT_ANSWER,
    answers: ['To examine other beauties.'],
  },
  {
    id: 7,
    question:
      'In the text, who intervenes to stop the brawl in the opening scene?',
    options: ['A) The Prince', 'B) Tybalt', 'C) Romeo', 'D) Lord Capulet'],
    type: QuestionType.MULTIPLE_CHOICE,
    answers: ['The Prince'],
  },
  {
    id: 8,
    question: "Why does Romeo feel he is 'dead'?",
    options: [],
    type: QuestionType.SHORT_ANSWER,
    answers: [
      'Because the woman he loves has sworn to live chastely, and he despairs.',
    ],
  },
  {
    id: 0,
    question: 'What does Romeo compare the beauty of the woman he loves to?',
    options: [],
    type: QuestionType.SHORT_ANSWER,
    answers: ['A note that reminds him of her exceptional beauty.'],
  },
  {
    id: 10,
    question:
      'What advice does Benvolio give to Romeo regarding the woman he loves?',
    options: [],
    type: QuestionType.SHORT_ANSWER,
    answers: ['To examine other beauties.'],
  },
];
