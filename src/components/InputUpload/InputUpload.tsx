'use client';
import { MAX_TEXT_INPUT_LENGTH } from '@/utils/constants';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  InputLabel,
  Slider,
} from '@mui/material';
import React, { useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import FileComponent from './FileComponent';
import TextInputComponent from './TextInputComponent';
import { errorToast } from '@/utils/toast';


export type UploadMode = 'textbox' | 'file';

export type GenerateRequestPayload = {
  numberOfQuestions: number;
  sourceText: string;
};

export type InputUpload = {
  generate: (data: GenerateRequestPayload) => {};
};

const InputUpload: React.FC<InputUpload> = (props) => {
  const [uploadMode, setUploadMode] = useState<UploadMode>('file');
  const [textareaInput, setTextareaInput] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [file, setFile] = useState<FileWithPath>();
  const [pdfText, setPdfText] = useState('');
  const handleUploadClick = (mode: UploadMode) => {
    setUploadMode(mode);
  };

  const { generate } = props;

  let isGenerateButtonDisabled = true;
  if (uploadMode === 'textbox') {
    isGenerateButtonDisabled =
      textareaInput.length < MAX_TEXT_INPUT_LENGTH / 2 ||
      textareaInput.length > MAX_TEXT_INPUT_LENGTH;
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



  console.log(pdfText.length, pageNumber)
  if(pdfText.length > MAX_TEXT_INPUT_LENGTH) {
    errorToast(`Content in selected pdf page exceeds the maximum character limit per generation.`,{
      autoClose: 2000
    })
    isGenerateButtonDisabled = true
  }

  let sourceText = textareaInput;
  if(uploadMode === 'file'){
    sourceText = pdfText
  }else{
    sourceText = textareaInput
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
        <Button onClick={(e) => handleUploadClick('file')}>File</Button>
        <Button onClick={(e) => handleUploadClick('textbox')}>Text</Button>
      </ButtonGroup>
      <Box className='!mx-auto !flex w-full  justify-center '>
        {uploadMode === 'file' ? (
          <FileComponent
            file={file}
            pageNumber={pageNumber}
            setFile={setFile}
            setPageNumber={setPageNumber}
            setPdfText = {setPdfText}
          />
        ) : (
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
              numberOfQuestions: questionCount,
            });

            setTextareaInput('');
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
