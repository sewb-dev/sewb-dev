'use client';
import React from 'react'
import Container from '@/components/Container';
import GenerationResponse from '@/components/GenerationResponse';
import InputUpload from '@/components/InputUpload';
import WithAuth from '@/components/WithAuth';
import { getBaseUrl } from '@/lib/dispatcher';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Roboto } from 'next/font/google';
import { QNAI, QNAIGenerationModel } from '@/modules/qnai/qnai.model';
import { errorToast, successToast } from '@/utils/toast';

export type GenerateRequestPayload = {
  numberOfQuestions: number;
  sourceText: string;
}
const roboto = Roboto({ subsets: ['greek'], weight: '400' });

const Home = () => {
  const [questions, setQuestions ] = React.useState<QNAI[]>([])

  const generate = async (data:GenerateRequestPayload) => {

     try {
       const request = await fetch(`${getBaseUrl()}api/qnai/generate`, {
        method: 'post',
        body: JSON.stringify(data),
        cache: 'no-cache',
      });
      const response = await request.json() as {q:QNAIGenerationModel}

      setQuestions(response.q.qna)
     } catch (error) {
      errorToast("Question generation failed. Please try again.")
      console.error(error)
     }
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
        <h1 className={`${roboto.className} text-justify text-6xl`}></h1>

        <Stack spacing={2} direction='column' my={'20px'}>
          <Typography fontSize={'20px'}>
            Your generated questions would appear here.
          </Typography>
          <GenerationResponse questions={questions}/>
        </Stack>
      </div>
    </section>
  );
};

export default WithAuth(Home);
