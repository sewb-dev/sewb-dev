type QuestionType =
  | 'multiple_choice'
  | 'true_or_false'
  | 'short_answer'
  | 'select_all_that_apply';

type TransformedQuestionType =
  | 'Multiple Choice'
  | 'True/False'
  | 'Short Answer'
  | 'Select All That Apple';
const transformQuestionType = (type: QuestionType) => {
  const splitString = type.split('_');

  let output = '';
  splitString.forEach((val) => {
    if (val === 'or') {
      output += '/';
    } else {
      output += val[0].toUpperCase() + val.slice(1, val.length + 1);
    }
  });

  return output as TransformedQuestionType;
};
