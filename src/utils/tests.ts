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
