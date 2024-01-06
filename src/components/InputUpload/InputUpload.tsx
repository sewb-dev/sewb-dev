'use client';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  InputLabel,
  Slider,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import FileComponent from './FileComponent';
import TextInputComponent from './TextInputComponent';
import { errorToast } from '@/utils/toast';
import envVariables from '@/lib/env';
import { GenerateRequestPayload } from '@/lib/types';

export type UploadMode = 'textbox' | 'file';

export type InputUpload = {
  generate: (data: GenerateRequestPayload) => {};
};

const maxTextInputLength = Number(envVariables.getEnv('MAX_TEXT_INPUT_LENGTH'));

const InputUpload: React.FC<InputUpload> = (props) => {
  const [uploadMode, setUploadMode] = useState<UploadMode>('textbox');
  const [textareaInput, setTextareaInput] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [file, setFile] = useState<FileWithPath>();
  const [pdfText, setPdfText] = useState('');
  const handleUploadClick = (mode: UploadMode) => {
    setUploadMode(mode);
  };

  const [generationTitle, setGenerationTitle] = useState("")

  const { generate } = props;

  let isGenerateButtonDisabled = true;
  if (uploadMode === 'textbox') {
    isGenerateButtonDisabled =
      textareaInput.length < maxTextInputLength / 2 ||
      textareaInput.length > maxTextInputLength;
  } else if (file) {
    isGenerateButtonDisabled = pageNumber.length === 0;
  }

  const handleQuestionCount = (count: number | number[]) => {
    if (typeof count === 'object') {
      setQuestionCount(count[0]);
    } else {
      setQuestionCount(count);
    }
  };

  if (pdfText.length > maxTextInputLength) {
    errorToast(
      `Content in selected pdf page exceeds the maximum character limit per generation.`,
      {
        autoClose: 2000,
      }
    );
    isGenerateButtonDisabled = true;
  }

  let sourceText = textareaInput;
  if (uploadMode === 'file') {
    sourceText = pdfText;
  } else {
    sourceText = textareaInput;
  }

  let maxQuestion = 10;
  if (sourceText.length >= 1500 && sourceText.length < 1600) {
    maxQuestion = 15;
  }
  if (sourceText.length > 1600) {
    maxQuestion = 20;
  }


  return (
    <Container fixed>
      <ButtonGroup
        variant='text'
        aria-label='input upload option button group'
        className='!flex justify-center'
      >
        {/* <Button onClick={(e) => handleUploadClick('file')}>File</Button> */}
        {/* <Button onClick={(e) => handleUploadClick('textbox')}>Text</Button> */}
      </ButtonGroup>
         <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
          className='!mr-5'

    >
        <TextField
          id="outlined-required"
          label="Generation Title"
          defaultValue=""
          className='!w-full'
        value={generationTitle}
        onChange={e=> setGenerationTitle(e.target.value)}
        />
        </Box>
      <Box className='!mx-auto !flex w-full  justify-center '>
        {
        // uploadMode === 'file' ? (
        //   <FileComponent
        //     file={file}
        //     pageNumber={pageNumber}
        //     setFile={setFile}
        //     setPageNumber={setPageNumber}
        //     setPdfText={setPdfText}
        //   />
        // ) : 
        
        (
          <TextInputComponent
            setTextareaInput={setTextareaInput}
            textareaInput={textareaInput}
          />
        )}
      </Box>
      <Box className="'!mx-auto !flex w-full flex-col items-center">
        <InputLabel className=''>Question Count: {questionCount} </InputLabel>
        <Box sx={{ width: 300 }}>
          <Slider
            value={questionCount}
            step={5}
            marks
            min={10}
            max={uploadMode === 'textbox' ? maxQuestion : 15}
            onChange={(event, value) => handleQuestionCount(value)}
            valueLabelDisplay='auto'
          />
        </Box>
      </Box>
      <Box className='-full  text-center '>
        <Button
          disabled={isGenerateButtonDisabled}
          variant='contained'
          size='large'
          color='salmon'
          onClick={() => {
            generate({
              sourceText,
              generationTitle: generationTitle.length > 0 ? generationTitle : "Untitled Generation",
              numberOfQuestions: questionCount,
            });

            setTextareaInput('');
            setGenerationTitle('')
            setFile(undefined);
          }}
        >
          {isGenerateButtonDisabled ? 'Disabled' : 'Generate'}
        </Button>
      </Box>
    </Container>
  );
};

export default InputUpload;
