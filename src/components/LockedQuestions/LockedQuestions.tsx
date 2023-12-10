import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import React from 'react';

type LockedQuestionsProps = {
  isLocked: boolean;
  question: string;
  options: string[];
  answer: string[] | number[] | number;
};

const getAnswerFromOptions = (
  options: string[],
  answer: string[] | number | number[]
) => {
  if (typeof answer === 'number') {
    return options[answer] ?? '';
  }

  if (!Array.isArray(answer)) {
    return '';
  }

  if (typeof answer[0] === 'number') {
    return answer.map((index) => options[Number(index)] ?? '');
  }

  if (typeof answer[0] === 'string') {
    return answer as string[];
  }

  return '';
};

const LockedQuestions: React.FunctionComponent<LockedQuestionsProps> = (
  props
) => {
  const { isLocked, question, answer, options } = props;
  const answerStrings = getAnswerFromOptions(options, answer);
  return (
    <Accordion disabled={isLocked}>
      <AccordionSummary
        expandIcon={isLocked ? <LockIcon /> : <ExpandMoreIcon />}
        aria-controls='panel3a-content'
        id='panel3a-header'
      >
        <Typography>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {Array.isArray(answerStrings) ? (
          answerStrings.map((answer, id) => (
            <Typography key={id}>- {answer}</Typography>
          ))
        ) : (
          <Typography>- {answerStrings}</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default LockedQuestions;
