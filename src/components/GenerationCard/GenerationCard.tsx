import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GenerationModel } from '@/modules/generation/generation.model';
import { getDateandTime } from '@/utils/date';
import Link from 'next/link';

type GenerationCardProps = {
  generation: GenerationModel;
};
const GenerationCard: React.FC<GenerationCardProps> = (props) => {
  const { generation } = props;
  return (
    <Grid xs display='flex' justifyContent='center' alignItems='center'>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant='h5' component='div'>
            {generation.generationTitle ?? 'Untitled Generation'}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {getDateandTime(generation.generatedAt)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>
            <Link href={`/test/${generation.generationId}`}> Take quiz</Link>
          </Button>
          <Button size='small' color='secondary'>
            Export PDF
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default GenerationCard;
