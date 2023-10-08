"use client";
import React, { useCallback, useState } from "react";
import { FileRejection, useDropzone,  } from "react-dropzone";
import styles from './FileUpload.module.css'
import { errorToast } from "@/utils/toast";
const MAX_TEXT_INPUT_LENGTH = 2000; // 2000 characters length is equivalent to 290-500 words with space.

type UploadMode = "textbox" | "file"
const FileUpload = () => {
  const [uploadMode, setUploadMode] = useState<UploadMode>("file");
  const [textareaInput, setTextareaInput] = useState("");
  const [file, setFile] = useState<File>();
  const onDrop = useCallback((acceptedFiles: File[], unacceptedFile:FileRejection[]) => {
    if(unacceptedFile.length > 0) {
      unacceptedFile.forEach(resp => {
        resp.errors.forEach(err => {
          let message = err.message;
          if(err.code == 'file-invalid-type')
           message = "Only pdf, docx or txt files are supported."
          errorToast(message, {
          })
        })
      })
    }else{
      if(acceptedFiles[0].size === 0) {
        errorToast(`"${acceptedFiles[0].name}" is empty. Please upload a file with content.`)
      }
      setFile(acceptedFiles[0])
    }
  }, []);
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

  const handleUploadClick = (mode: UploadMode) => {
    setUploadMode(mode);
  };
  const textareaErrorClass =
    (textareaInput.length < (MAX_TEXT_INPUT_LENGTH / 2) || textareaInput.length > MAX_TEXT_INPUT_LENGTH)
      ? "focus:ring-red-600 focus:border-red-600"
      : "focus:ring-blue-100 focus:border-blue-100";
  let isGenerateButtonEnabled = false;
  if(uploadMode === 'textbox') {
    isGenerateButtonEnabled = textareaInput.length >= (MAX_TEXT_INPUT_LENGTH/2) && textareaInput.length <= MAX_TEXT_INPUT_LENGTH
  }else if(file) {
      isGenerateButtonEnabled = true
    }

  return (
    <form className="flex items-center justify-center mx-auto h-80 flex-col">
      <ul className="flex flex-row gap-2 underline text-base cursor-pointer">
        <li
          className={`${uploadMode === "file" && "text-sky-400 bold pb-2"}`}
          onClick={(e) => handleUploadClick("file")}
        >
          File
        </li>
        <li
          className={`${uploadMode === "textbox" && "text-sky-400 bold pb-2"}`}
          onClick={(e) => handleUploadClick("textbox")}
        >
          Text
        </li>
      </ul>
      {uploadMode === "file" ? (
        <div
          {...getRootProps({
            className:
              "w-full md:w-1/2 h-1/2 text-center flex flex-col items-center justify-center rounded border border-dashed border-b gap-3",
          })}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4 bg-blue-800 w-1/2 h-1/2 rounded cursor-pointer">
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
                <p>Upload a File</p>
            )}
          </div>
          <p>{file ? file.name : "..or drag and drop a file"}</p>
        </div>
      ) : (
        <div className="w-3/4 mx-auto ">
         <div className="flex justify-between">
          <p>Minimum of 1000 characters.</p>
           <label
            htmlFor="message"
            className="block mb-2 text-sm text-right font-medium text-gray-900 dark:text-white"
            >
             {textareaInput.length} / {MAX_TEXT_INPUT_LENGTH}
          </label>
         </div>
          <textarea
            id="message"
            rows={10}
            className={`${styles.textareaInput} ${textareaErrorClass}` }
            placeholder="Type your content..."
            value={textareaInput}
            onChange={(e) => setTextareaInput(e.target.value)}
            style={{
              resize: 'none'
            }}
          ></textarea>
        </div>
      )}
      <div className="pt-4">
        <button
          className={`rounded border-gray-600 border px-4 py-2 cursor-pointer  text-white  ${
            !isGenerateButtonEnabled ? "bg-gray-600": "bg-orange-500"
          }`}
          onClick={(e) => {
            e.preventDefault();
          }}
          disabled={!isGenerateButtonEnabled}
        >
          GENERATE
        </button>
      </div>
    </form>
  );
};

export default FileUpload;
