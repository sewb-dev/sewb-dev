import React, { useCallback, useState } from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useDropzone, FileRejection, FileWithPath } from "react-dropzone";
import { errorToast } from "@/utils/toast";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export type FileComponentProps = {
    file: FileWithPath | undefined
    pageNumber: string
    setFile: React.Dispatch<React.SetStateAction<FileWithPath | undefined>>
    setPageNumber: React.Dispatch<React.SetStateAction<string>>
}

const FileComponent:React.FunctionComponent<FileComponentProps> = (props) => {
    const {file, pageNumber, setFile, setPageNumber} = props;
  const [numPages, setNumPages] = useState<number>();
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

const handleChange = (event:any) => {
    setPageNumber(event.target.value);
  };
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], unacceptedFile: FileRejection[]) => {
      if (unacceptedFile.length > 0) {
        unacceptedFile.forEach((resp) => {
          resp.errors.forEach((err) => {
            let message = err.message;
            if (err.code == "file-invalid-type")
              message = "Only pdf, docx or txt files are supported.";
            errorToast(message, {});
          });
        });
      } else {
        if (acceptedFiles[0].size === 0) {
          errorToast(
            `"${acceptedFiles[0].name}" is empty. Please upload a file with content.`
          );
        }
        setFile(acceptedFiles[0]);
      }
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/pdf": [],
      "application/msword": [],
      "text/plain": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
  });

  return (
    <Box
    component={'form'}
      sx={{
        // bgcolor: "red",
        height: "30vh",
    }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      className="w-full"
    >
      <div
        {...getRootProps({
          className:
            "w-full md:w-1/2 h-2/3  text-center flex flex-col items-center justify-center rounded border border-dashed border-b gap-3",
        })}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4 bg-blue-800 w-1/2 h-1/2 rounded cursor-pointer">
          {isDragActive ? <p>Drop the files here ...</p> : <p>Upload a File</p>}
        </div>
        <p>{file ? file.name : "..or drag and drop a file"}</p>
      </div>
    {file && 
    <>
    {/* TODO: CONSIDER ADDING THE PAGE PREVIEW... 
    THIS IS VERY POSSIBLE. HERE'S A REFERENCE LINK..
    https://www.npmjs.com/package/react-pdf
    */}
    <Document file={file} onLoadSuccess={onDocumentLoadSuccess} />
      <FormControl fullWidth margin="dense" className="md:!w-4/5">
        <InputLabel id="file-upload-page-label-id">Page No.</InputLabel>
        <Select
          labelId="file-upload-page-label-id"
          id="file-upload-page"
          value={pageNumber}
          label="Page No."
          onChange={handleChange}
        >
          {numPages && Array(numPages).fill('-').map((empty, index) => 
             <MenuItem value={index+1} key={index+1}>{index+1}</MenuItem>
          )}
        </Select>
      </FormControl>
      </>
      }
    </Box>
  );
};

export default FileComponent;
