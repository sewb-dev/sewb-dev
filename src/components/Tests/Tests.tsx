'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SingleAnswer from '@/components/Tests/SingleAnswer';
import { QNAI } from '@/lib/types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { QNAIGenerationModel } from '@/modules/qnai/qnai.model';

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
};
const Tests: React.FunctionComponent<TestsProps> = (props) => {
  const [answers, SetAnswers] = React.useState<Record<number, string>>({});
  const { qnaiModel } = props;
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAnswerSelection = (index: number, answer: string) => {
    const tempAnswers = { ...answers };
    tempAnswers[index] = answer;
    SetAnswers({
      ...tempAnswers,
    });
  };


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
          />
        ))}
      </Stack>

      <Stack spacing={2} direction='row' pb={10}>
        <Button variant='contained'>Submit</Button>
      </Stack>
    </form>
  );
};

export default Tests;
