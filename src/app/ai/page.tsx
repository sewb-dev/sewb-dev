'use client';
import Container from '@/components/Container';
import GenerationResponse from '@/components/GenerationResponse';
import InputUpload from '@/components/InputUpload';
import CookingLoader from '@/components/Loader/CookingLoader';
import WithAuth from '@/components/WithAuth';
import { delay } from '@/lib/requestClient';
import {
  useCreateQNAIGeneration,
  useGetQNAIGenerationStatus,
} from '@/modules/generation/generation.hooks';
import { QNAI } from '@/modules/qnai/qnai.model';
import { errorToast } from '@/utils/toast';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Roboto } from 'next/font/google';
import React from 'react';

// NOTES:
// 'isTemporaryLoading' IS NEEDED TO DISPLAY THE LOADING ICON BEFORE THE ENTIRE GENERATION PROCESS OCCURS.
// IT HAS NO BUSINESS WITH CREATING THE GENERATION REQUEST OR FETCHING IT
// 'isDataFetching' IS THE BOOLEAN USED TO KNOW IF THE GENERATION REQUEST IS STILL LOADING. IT'S IMPOSSIBLE TO USE THE QUERY STATES AS THEY
// ENTER DIFFERENT STATES THAT OUR WORKFLOW CAN'T HANDLE LIKE IDLE + SUCESS, IDLE + FETCHING ETC. AND IT'S IMPOSSIBLE TO HANDLE ALL OF THEM
// THE TIMEOUT IS NEEDED TO ENSURE THE SERVER HAS AMPLE TIME TO CREATE GENERATION BEFORE WE REQUEST FOR IT.
// THE CURRENT SETUP SHOULD MAKE IT EASIER TO RETRY FETCHING GENERATED QUESTIONS THAT FAIL TO BE FETCHED BUT THAT'S A DIFFERENT TASK IN ITSELF.
export type GenerateRequestPayload = {
  numberOfQuestions: number;
  sourceText: string;
};
const roboto = Roboto({ subsets: ['greek'], weight: '400' });

const Home = () => {
  const [questions] = React.useState<QNAI[]>([]);
  const [generationId, setGenerationId] = React.useState<string>('');
  const [enabled, setEnabled] = React.useState(false);
  const [isTemporaryLoading, setIsTemporaryLoading] = React.useState(false);
  const createQNAIGenerationRequest = useCreateQNAIGeneration();
  const getQNAIGenerationRequest = useGetQNAIGenerationStatus(
    generationId,
    enabled
  );

  const handleManualGeneratedQuestionFetching = async () => {
    await getQNAIGenerationRequest.refetch();
  };

  const generate = async (data: GenerateRequestPayload) => {
    createQNAIGenerationRequest
      .mutateAsync(data)
      .then(async (response) => {
        setIsTemporaryLoading(true);
        setGenerationId(response.generationId);
        await delay(2000);
        setEnabled(true);
        setIsTemporaryLoading(false);
        await handleManualGeneratedQuestionFetching();
      })
      .catch((error) => {
        setEnabled(false);
        const errorMessage = error?.response?.data?.message ?? '';
        errorToast(`Question generation failed. ${errorMessage ? `${errorMessage}. ` : ''}Please try again.`);
        console.error(error);
      });
  };

  const questionsToDisplay = getQNAIGenerationRequest.isSuccess
    ? getQNAIGenerationRequest.data.qnai.qna
    : questions;
  const isDataFetching =
    enabled &&
    questionsToDisplay.length === 0 &&
    getQNAIGenerationRequest.status !== 'error';

  if (isTemporaryLoading || isDataFetching) {
    return <CookingLoader />;
  }

  return (
    <section className='flex h-full w-full flex-col gap-4 pt-5 md:flex-row md:justify-between'>
      <Container className='px-0 md:h-1/2 md:w-3/4'>
        <InputUpload generate={generate} />
      </Container>
      <div className='w-full'>
        <Typography fontSize={'3.5rem'} component={'h1'} variant='h1'>
          Elevate your learning using{' '}
          <span className='text-orange-500'>AI. </span>
        </Typography>
        <Stack spacing={2} direction='column' my={'20px'}>
          <Typography fontSize={'20px'}>
            Your generated questions would appear here.
          </Typography>
          {<GenerationResponse questions={questionsToDisplay} />}
        </Stack>
      </div>
    </section>
  );
};

export default WithAuth(Home);
