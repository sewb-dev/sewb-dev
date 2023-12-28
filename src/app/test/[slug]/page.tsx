'use client';

import SingleAnswer from '@/components/Tests/SingleAnswer';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tests from '@/components/Tests';
import envVariables from '@/lib/env';
import WithAuth from '@/components/WithAuth';
import { useGetQNAIGenerationById } from '@/modules/generation/generation.hooks';
import CookingLoader from '@/components/Loader/CookingLoader';

const TestPage =  ({ params }: { params: { slug: string } }) => {
  const {data,isLoading, isError,error} = useGetQNAIGenerationById(params.slug)

  if(isLoading) {
       return;
  }
  if(isError){
    console.log(error)
    return <p>An error occured while fetching questions to be answered</p>
  }
  return (
    <>
      <CssBaseline />
      <Container maxWidth='md'>
        <Box
          className='mx-auto flex w-full flex-1 flex-col items-center'
        >
          <Stack spacing={2} direction='column' className='mx-auto'>
            <Typography fontSize={'40px'} color='white' >
              Test your knowledge!
            </Typography>
          </Stack>
          <Tests qnaiModel={data!} generationId={params.slug}/>
     
        </Box>
      </Container>
    </>
  );
};

export default WithAuth(TestPage);
