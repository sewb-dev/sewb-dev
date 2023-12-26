import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { QNAI } from '@/lib/types';
import { getAnswerFromOptions } from '@/utils/tests';

type SingleAnswerProps = {
  qnai: QNAI;
  answerHandler: (index: number, answer: string) => void;
};
const SingleAnswer: React.FunctionComponent<SingleAnswerProps> = (props) => {
  const { qnai, answerHandler } = props;
  const answerFromOptions = getAnswerFromOptions(qnai.options, qnai.answer)[0];

  return (
      <FormControl>
        <FormLabel id='qnai-generated-question-test-label'>
          {qnai.id}: {qnai.question}
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
              control={<Radio />}
              label={option}
              onChange={(e) => answerHandler(qnai.id, option)}
            />
          ))}
        </RadioGroup>
      </FormControl>
  );
};

export default SingleAnswer;
