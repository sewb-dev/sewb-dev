'use client';

import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GenerationCard from '@/components/GenerationCard';

import WithAuth from '@/components/WithAuth';
import { useGetGenerations } from '@/modules/generation/generation.hooks';
import Loader from '@/components/Loader';

const GenerationPage = () => {
  const { data, isError, isLoading } = useGetGenerations();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>An error has occured. Please refresh the page. </p>;
  }

  return (
    <Container maxWidth='xl'>
      <Box>
        <Typography variant='h2' component='div' className='pb-5 pt-4'>
          Your Generations
        </Typography>
        <Grid container gap={3}>
          {data?.map((generation) => (
            <GenerationCard
              generation={generation}
              key={generation.generationId}
            />
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default WithAuth(GenerationPage);
