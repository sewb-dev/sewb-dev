import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { QNAI, QNAITestAnswer } from '@/lib/types';
import { getAnswerFromOptions } from '@/utils/tests';

type SingleAnswerProps = {
  qnai: QNAI;
  answerHandler: (index: number, answer: string) => void;
  submitted?: boolean;
  answers?: QNAITestAnswer;
};
const SingleAnswer: React.FunctionComponent<SingleAnswerProps> = (props) => {
  const { qnai, answerHandler, submitted, answers } = props;
  const answerFromOptions = getAnswerFromOptions(qnai.options, qnai.answer)[0];
  const isSubmittedQuestion = Boolean(submitted && answers);

  const getOptionColor = (option: string) => {
    if (submitted && answers) {
      if (option === answerFromOptions) {
        return 'text-green-500';
      }

      if (option === answers.answer) {
        return 'text-red-400';
      }
    }

    return '';
  };
  return (
    <FormControl>
      <FormLabel
        id='qnai-generated-question-test-label'
        className='!font-extrabold'
      >
        {qnai.id}. {qnai.question}
      </FormLabel>
      <RadioGroup
        aria-labelledby='qnai-generated-question-test-label'
        defaultValue='female'
        name='qnai-generated-question-test'
      >
        {qnai.options.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={
              isSubmittedQuestion ? (
                <Radio
                  checked={
                    Boolean(submitted && answers) && answers?.answer === option
                  }
                />
              ) : (
                <Radio />
              )
            }
            label={option}
            className={`${getOptionColor(option)}`}
            onChange={(e) => answerHandler(qnai.id, option)}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default SingleAnswer;
