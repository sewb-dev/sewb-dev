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

  console.info(answers, options)
  if (typeof answers === 'number') {
    console.info('1')
    console.info(options[answers])
    return options[answers] ?? '';
  }

  if (!Array.isArray(answers)) {
    console.info('2')

    return '';
  }

  if (typeof answers[0] === 'number') {
    console.info('3')

    return answers.map((index) => options[Number(index)] ?? '');
  }

  if (typeof answers[0] === 'string') {
    console.info('4')

    return answers as string[];
  }

    console.info('5')


  return '';
};

const LockedQuestions: React.FunctionComponent<LockedQuestionsProps> = (
  props
) => {
  const { isLocked, question, answers, options } = props;
  const answerStrings = getAnswerFromOptions(options, answers)
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
