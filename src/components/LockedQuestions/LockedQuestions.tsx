import { getAnswerFromOptions } from '@/utils/tests';
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
        {answerStrings.map((answer, id) => (
          <Typography key={id}>- {answer}</Typography>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default LockedQuestions;
