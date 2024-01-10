'use client';
import { QNAI } from '@/modules/qnai/qnai.model';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import QuizIcon from '@mui/icons-material/Quiz';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import React, { useState } from 'react';
import LockedQuestions from '../LockedQuestions';
import Link from 'next/link';
import useExportPDF from '@/modules/pdfWriter/pdfWriter.hooks';

export type GenerationResponse = {
  questions: QNAI[];
  generationId: string;
};

const GenerationResponse: React.FC<GenerationResponse> = ({
  questions,
  generationId,
}) => {
  const [isLocked, setIsLocked] = useState(true);
  const getQuestionsPDF = useExportPDF(generationId);

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
            <Button variant='contained' startIcon={<QuizIcon />}>
              <Link href={`/test/${generationId}`}> Take quiz</Link>
            </Button>
            <Button
              variant='contained'
              color='secondary'
              startIcon={<IosShareIcon />}
              onClick={getQuestionsPDF}
            >
              Export PDF
            </Button>
          </Stack>
        )}
        <Stack spacing={2} direction='column'>
          {questions.length > 0 &&
            questions.map(({ question, options, answer }) => (
              <LockedQuestions
                key={question}
                isLocked={isLocked}
                question={question}
                options={options}
                answer={answer}
              />
            ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default GenerationResponse;
