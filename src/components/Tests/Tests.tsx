'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SingleAnswer from '@/components/Tests/SingleAnswer';
import { QNAI, QNAITestAnswer,QNAITest } from '@/lib/types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { QNAIGenerationModel } from '@/modules/qnai/qnai.model';
import { errorToast, successToast } from '@/utils/toast';
import { useSubmitTest } from '@/modules/generation/generation.hooks';
import CookingLoader from '../Loader/CookingLoader';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100vw',
  height: '100vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type TestsProps = {
  qnaiModel: QNAIGenerationModel;
  generationId: string;
  submitted?: boolean;
};
const Tests: React.FunctionComponent<TestsProps> = (props) => {
  const [answers, SetAnswers] = React.useState<Record<number, string>>({});
  const { qnaiModel, generationId, submitted } = props;
  const [open, setOpen] = React.useState(true);
  const [testStart, setTestStart] = React.useState(Date.now())
  const handleOpen = () => setOpen(true);

  const submitTestMutation = useSubmitTest(generationId)
  const handleClose = () => {
    setOpen(false)
    setTestStart(Date.now())
  };
  const handleAnswerSelection = (index: number, answer: string) => {
    const tempAnswers = { ...answers };
    tempAnswers[index] = answer;
    SetAnswers({
      ...tempAnswers,
    });
  };

  
  const disableSubmitButton = qnaiModel.qna.length !== Object.keys(answers).length

  const handleTestSubmission = async () => {
    const testEnd = Date.now()
    const testAnswers:QNAITestAnswer[] = []
    for(const [key, value] of Object.entries(answers)) {
      testAnswers.push({
        answer: value,
        qnaiId: Number(key),
      })
    }

    const requestData:QNAITest = {
      startedAt:testStart,
      submittedAt: testEnd, 
      answer: testAnswers
    }

    try {
    const response = await submitTestMutation.mutateAsync(requestData);
      successToast(`Successfully submitted your test. Your score is '${response.score}' out of ${qnaiModel.qna.length} questions.`)
    } catch (error) {
      console.error(error)
      throw new Error('Failed to submit your test, please try again. ')
    }
  }

  if(submitTestMutation.isPending){
    return <CookingLoader />
  }
  return (
    <form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style} className='flex flex-col justify-between'>
          <Box>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Welcome To The Test.
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              Please be informed that refreshing the page would start a new test
              session.
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              Select the correct answer and once you're done, click the submit
              button to submit your test.
            </Typography>

            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              Start the test by clicking the close button below.
            </Typography>
          </Box>

          <Stack spacing={2} direction='row' pb={10} className='self-end'>
            <Button variant='contained' color='salmon' onClick={handleClose}>
              Close
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Stack py={10} className='gap-5'>
        {qnaiModel.qna.map((question) => (
          <SingleAnswer
            key={question.id}
            qnai={question as QNAI}
            answerHandler={handleAnswerSelection}
            submitted={submitted}
            answers={{answer: "He created the land", qnaiId: 1
          }}
          />
        ))}
      </Stack>

      <Stack spacing={2} direction='row' pb={10}>
        <Button variant='contained' disabled={disableSubmitButton} onClick={ async (e) => handleTestSubmission()}>Submit</Button>
      </Stack>
    </form>
  );
};

export default Tests;
