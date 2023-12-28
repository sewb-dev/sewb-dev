import { QNAI, QNAITestAnswer } from '@/modules/qnai/qnai.model';

export const getAnswerFromOptions = (
  options: string[],
  answers: string[] | number | number[]
) => {
  if (typeof answers === 'number') {
    return [options[answers]];
  }

  if (typeof answers === 'string') {
    return [answers];
  }

  if (Array.isArray(answers)) {
    if (typeof answers[0] === 'number') {
      return answers.map((index) => options[Number(index)] ?? '');
    }

    if (typeof answers[0] === 'string') {
      return answers as string[];
    }
  }

  return [''];
};

export const calculateTestScore = (qnai: QNAI[], answers: QNAITestAnswer[]) => {
  let score = 0;
  const sizeOfQuestions = qnai.length;

  for (let i = 0; i < sizeOfQuestions; ++i) {
    if (
      getAnswerFromOptions(qnai[i].options, qnai[i].answer)[0] ===
      answers[i].answer
    ) {
      score += 1;
    }
  }

  return score;
};
