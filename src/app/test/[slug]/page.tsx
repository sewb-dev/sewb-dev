'use client';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Tests from '@/components/Tests';
import WithAuth from '@/components/WithAuth';
import { useGetQNAIGenerationById } from '@/modules/generation/generation.hooks';

const TestPage = ({ params }: { params: { slug: string } }) => {
  const { data, isLoading, isError, error } = useGetQNAIGenerationById(
    params.slug
  );
  const [isTestSubmitted, setIsTestSubmitted] = React.useState(false);

  if (isLoading) {
    return;
  }
  if (isError) {
    console.error(error);
    return <p>An error occured while fetching questions to be answered</p>;
  }
  return (
    <>
      <CssBaseline />
      <Container maxWidth='md'>
        <Box className='mx-auto flex w-full flex-1 flex-col items-center'>
          <Stack spacing={2} direction='column' className='mx-auto'>
            <Typography fontSize={'40px'} color='white'>
              {isTestSubmitted ? 'Your test results!' : 'Test your knowledge!'}
            </Typography>
          </Stack>
          <Tests
            qnaiModel={data!}
            generationId={params.slug}
            testSubmissionStatus={[isTestSubmitted, setIsTestSubmitted]}
          />
        </Box>
      </Container>
    </>
  );
};

export default WithAuth(TestPage);
