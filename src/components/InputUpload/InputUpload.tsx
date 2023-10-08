"use client";
import React, { useState } from "react";
import { Container, Button, ButtonGroup, Box } from "@mui/material";
import FileComponent from "./FileComponent";
import TextInputComponent from "./TextInputComponent";
import {  FileWithPath } from "react-dropzone";
import { MAX_TEXT_INPUT_LENGTH } from "@/utils/constants";
export type UploadMode = "textbox" | "file";
const InputUpload = () => {
  const [uploadMode, setUploadMode] = useState<UploadMode>("textbox");
  const [textareaInput, setTextareaInput] = useState("");
  const [pageNumber, setPageNumber] = useState('');
  const [file, setFile] = useState<FileWithPath>();
  const handleUploadClick = (mode: UploadMode) => {
    setUploadMode(mode);
  };


   let isGenerateButtonDisabled = true;
  if (uploadMode === "textbox") {
    isGenerateButtonDisabled =
      textareaInput.length < MAX_TEXT_INPUT_LENGTH / 2 ||
      textareaInput.length > MAX_TEXT_INPUT_LENGTH;
  } else if (file) {
    isGenerateButtonDisabled = pageNumber.length === 0;
  }



  return (
    <Container fixed>
      <form>
        <ButtonGroup
          variant="text"
          aria-label="input upload option button group"
          className="!flex justify-center"
        >
          <Button onClick={(e) => handleUploadClick("file")}>File</Button>
          <Button onClick={(e) => handleUploadClick("textbox")}>Text</Button>
        </ButtonGroup>
        <Box className="!mx-auto !flex justify-center  w-full ">
            {uploadMode === 'file' ? <FileComponent
            file={file}
            pageNumber={pageNumber}
            setFile={setFile}
            setPageNumber={setPageNumber}
            />:
        <TextInputComponent setTextareaInput={setTextareaInput} textareaInput={textareaInput} />}
        </Box>
        <Box className="-full  text-center">
            <Button 
            disabled={isGenerateButtonDisabled}
            variant="contained"
            size='large'
            color="salmon"
            >{isGenerateButtonDisabled ? 'Disabled' : 'Generate'}</Button>
        </Box>
      </form>
    </Container>
  );
};

export default InputUpload;
