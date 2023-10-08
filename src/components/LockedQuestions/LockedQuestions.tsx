import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';

type LockedQuestionsProps = {
  isLocked: boolean;
  question: string;
  answers: string[];
};
const LockedQuestions: React.FunctionComponent<LockedQuestionsProps> = (
  props
) => {
  const { isLocked, question, answers } = props;
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
        {answers.map((answer, id) => (
          <Typography key={id}>{answer}</Typography>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default LockedQuestions;
