'use client';
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import LockedQuestions from '../LockedQuestions';
import Image from 'next/image';
import { Box, Button } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import QuizIcon from '@mui/icons-material/Quiz';
import SendIcon from '@mui/icons-material/Send';
import {questions} from '../../utils/ai/mockResponse'

const GenerationResponse = () => {
  const [isLocked, setIsLocked] = useState(true);
  

  return (
    <Box>
      <Stack spacing={2}>
        <Box className='!mx-auto'>
          <Image
            src='/still_waiting.gif'
            width={400}
            height={400}
            alt='still waiting gif'
          />
        </Box>
        <Stack spacing={2} direction='row'>
          <Button
            variant='outlined'
            startIcon={<LockOpenIcon />}
            onClick={(e) => setIsLocked(false)}
          >
            Unlock
          </Button>
          <Button variant='outlined' endIcon={<SendIcon />}>
            Share
          </Button>
          <Button variant='contained' startIcon={<QuizIcon />}>
            Take quiz
          </Button>
        </Stack>
        <Stack spacing={2} direction='column'>
          {questions.map(data =>
          <LockedQuestions
            isLocked={isLocked}
            question={data.question}
            answers={data.answer}
          />)}
        </Stack>
      </Stack>
    </Box>
  );
};

export default GenerationResponse;
