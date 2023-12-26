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

const getGenerationById = async (generationId:string) => {
  const res = await fetch(`${envVariables.getEnv('BASE_URL')}/api/generations/${generationId}`)
  console.log(generationId)
  if(!res.ok){

    console.error(await res.json())
    throw new Error("Failed to fetch generated question for tests.")
  }

  return await res.json()
}
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
          sx={{ bgcolor: 'red' }}
          className='mx-auto flex w-full flex-1 flex-col items-center'
        >
          <Stack spacing={2} direction='column'>
            <Typography fontSize={'40px'} color='black' className='text-center'>
              Test your knowledge!
            </Typography>
          </Stack>
          <Tests qnaiModel={data!}/>
     
        </Box>
      </Container>
    </>
  );
};

export default WithAuth(TestPage);
