'use client';
import React, { useState } from 'react';
import { Container, Button, ButtonGroup, Box,Slider,InputLabel } from '@mui/material';
import FileComponent from './FileComponent';
import TextInputComponent from './TextInputComponent';
import { FileWithPath } from 'react-dropzone';
import { MAX_TEXT_INPUT_LENGTH } from '@/utils/constants';
export type UploadMode = 'textbox' | 'file';
const InputUpload = () => {
  const [uploadMode, setUploadMode] = useState<UploadMode>('file');
  const [textareaInput, setTextareaInput] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const [questionCount, setQuestionCount] = useState(10)
  const [file, setFile] = useState<FileWithPath>();
  const handleUploadClick = (mode: UploadMode) => {
    setUploadMode(mode);
  };

  let isGenerateButtonDisabled = true;
  if (uploadMode === 'textbox') {
    isGenerateButtonDisabled =
      textareaInput.length < MAX_TEXT_INPUT_LENGTH / 2 ||
      textareaInput.length > MAX_TEXT_INPUT_LENGTH;
  } else if (file) {
    isGenerateButtonDisabled = pageNumber.length === 0;
  }

  const handleQuestionCount = (count:number | number[]) => {

    if(typeof count === 'object'){
      setQuestionCount(count[0])
    }else{
      setQuestionCount(count)
    }
    
  }
function valuetext(value: number) {
  return `${value}°C`;
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
            />
          ) : (
            <TextInputComponent
              setTextareaInput={setTextareaInput}
              textareaInput={textareaInput}
            />
          )}
        </Box>
        <Box className="'!mx-auto !flex w-full items-center flex-col">
<InputLabel className=''>Question Count: {questionCount} </InputLabel>
       <Box sx={{ width: 300 }} >
      <Slider
        value={questionCount}
        step={5}
        marks
        min={10}
        max={30}
        onChange={(event, value)=> handleQuestionCount(value)}
        valueLabelDisplay="auto"
        />
        </Box>
    </Box>
        <Box className='-full  text-center '>
          <Button
            disabled={isGenerateButtonDisabled}
            variant='contained'
            size='large'
            color='salmon'
          >
            {isGenerateButtonDisabled ? 'Disabled' : 'Generate'}
          </Button>
        </Box>
    </Container>
  );
};

export default InputUpload;
