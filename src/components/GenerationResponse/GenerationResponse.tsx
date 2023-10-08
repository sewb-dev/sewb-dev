"use client"
import React, {useState} from 'react'
import Stack from "@mui/material/Stack";
import LockedQuestions from '../LockedQuestions';
import Image from 'next/image';
import { Box ,Button} from '@mui/material'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import QuizIcon from '@mui/icons-material/Quiz';
import SendIcon from '@mui/icons-material/Send';
const GenerationResponse = () => {
    const [isLocked, setIsLocked]  = useState(true)
    const resposne  = []

  return ( 
    <Box>
    <Stack spacing={2}  >
        <Box className='!mx-auto'>
            <Image src='/still_waiting.gif' width={400} height={400} alt='still waiting gif'/>
        </Box>
        <Stack spacing={2} direction="row">
      <Button variant="outlined" startIcon={<LockOpenIcon />}>
        Unlock
      </Button>
      <Button variant="outlined"  endIcon={<SendIcon />}>
        Share
      </Button>
      <Button variant="contained"  startIcon={<QuizIcon />}>
        Take quiz
      </Button>
    </Stack>
        <Stack spacing={2} direction='column' >
            <LockedQuestions isLocked={isLocked} question='Disabled Accordion' answers={['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse']}/>
        <LockedQuestions isLocked={isLocked} question='Disabled Accordion' answers={['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse']}/>
        <LockedQuestions isLocked={isLocked} question='Disabled Accordion' answers={['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse']}/>
        </Stack>
     </Stack>
     </Box>
  )
}

export default GenerationResponse