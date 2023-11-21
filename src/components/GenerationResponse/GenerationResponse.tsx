'use client';
import { QNAI } from '@/modules/qnai/qnai.model';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import QuizIcon from '@mui/icons-material/Quiz';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import React, { useState } from 'react';
import LockedQuestions from '../LockedQuestions';

export type GenerationResponse = {
  questions: QNAI[];
};

const GenerationResponse: React.FC<GenerationResponse> = (props) => {
  const [isLocked, setIsLocked] = useState(true);
  const { questions } = props;
  return (
    <Box>
      <Stack spacing={2}>
        <Box className='!mx-auto'>
          {questions.length < 1 && (
            <Image
              src='/still_waiting.gif'
              width={400}
              height={400}
              alt='still waiting gif'
            />
          )}
        </Box>
        {questions.length > 1 && (
          <Stack spacing={2} direction='row'>
            <Button
              variant='outlined'
              startIcon={<LockOpenIcon />}
              onClick={(e) => setIsLocked(false)}
            >
              Unlock
            </Button>
          </Stack>
        )}
        <Stack spacing={2} direction='column'>
          {questions.length > 0 &&
            questions.map((data) => (
              <LockedQuestions
                key={data.question}
                isLocked={isLocked}
                question={data.question}
                options={data.options}
                answers={data.answers}
              />
            ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default GenerationResponse;
