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
  answers: string[] | number[] | number;
};

const getAnswerFromOptions = (
  options: string[],
  answers: string[] | number | number[]
) => {
  if (typeof answers === 'number') {
    return options[answers] ?? '';
  }

  if (!Array.isArray(answers)) {
    return '';
  }

  if (typeof answers[0] === 'number') {
    return answers.map((index) => options[Number(index)] ?? '');
  }

  if (typeof answers[0] === 'string') {
    return answers as string[];
  }

  return '';
};

const LockedQuestions: React.FunctionComponent<LockedQuestionsProps> = (
  props
) => {
  const { isLocked, question, answers, options } = props;
  const answerStrings = getAnswerFromOptions(options, answers);
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
