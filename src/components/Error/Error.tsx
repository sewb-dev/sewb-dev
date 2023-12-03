"use client"
import React from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type ErrorPageprops = {
  generationId: string | undefined;
  fetch: () => Promise<void>;
};
const ErrorPage: React.FunctionComponent<ErrorPageprops> = (props) => {
  const router = useRouter();

  const handleButtonClick = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (props.generationId) {
      await props.fetch();
    }
    router.push('/ai',)
    return;
  };
  return (
    <section className='flex h-full w-full  gap-4  pt-5'>
      <Container className='!flex w-full flex-col  !items-center '>
        <Image src='/failed.gif' width={400} height={400} alt='failed gif' />
        <Typography fontSize={'3.5rem'} component={'h1'} variant='h1'>
          An error occured during generation of your question.
        </Typography>
        {props.generationId && (
          <Typography fontSize={'3.5rem'} component={'p'} variant='subtitle1'>
            Not to worry, your question generation request was fulfilled. We
            just need to retrieve it from our services....
          </Typography>
        )}
        <Button
          variant='contained'
          color='primary'
          href='/'
          onClick={handleButtonClick}
        >
          {props.generationId ? 'Get Questions' : 'Refresh'}
        </Button>
      </Container>
    </section>
  );
};

export default ErrorPage;
