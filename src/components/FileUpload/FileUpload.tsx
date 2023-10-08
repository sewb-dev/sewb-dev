'use client';
import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import styles from './FileUpload.module.css';
import { errorToast } from '@/utils/toast';
const MAX_TEXT_INPUT_LENGTH = 2000; // 2000 characters length is equivalent to 290-500 words with space.

type UploadMode = 'textbox' | 'file';
const FileUpload = () => {
  const [uploadMode, setUploadMode] = useState<UploadMode>('file');
  const [textareaInput, setTextareaInput] = useState('');
  const [file, setFile] = useState<File>();
  const onDrop = useCallback(
    (acceptedFiles: File[], unacceptedFile: FileRejection[]) => {
      if (unacceptedFile.length > 0) {
        unacceptedFile.forEach((resp) => {
          resp.errors.forEach((err) => {
            let message = err.message;
            if (err.code == 'file-invalid-type')
              message = 'Only pdf, docx or txt files are supported.';
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
    []
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'application/pdf': [],
      'application/msword': [],
      'text/plain': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        [],
    },
  });

  const handleUploadClick = (mode: UploadMode) => {
    setUploadMode(mode);
  };
  const textareaErrorClass =
    textareaInput.length < MAX_TEXT_INPUT_LENGTH / 2 ||
    textareaInput.length > MAX_TEXT_INPUT_LENGTH
      ? 'focus:ring-red-600 focus:border-red-600'
      : 'focus:ring-blue-100 focus:border-blue-100';
  let isGenerateButtonEnabled = false;
  if (uploadMode === 'textbox') {
    isGenerateButtonEnabled =
      textareaInput.length >= MAX_TEXT_INPUT_LENGTH / 2 &&
      textareaInput.length <= MAX_TEXT_INPUT_LENGTH;
  } else if (file) {
    isGenerateButtonEnabled = true;
  }

  return (
    <form className='mx-auto flex h-80 flex-col items-center justify-center'>
      <ul className='flex cursor-pointer flex-row gap-2 text-base underline'>
        <li
          className={`${uploadMode === 'file' && 'bold pb-2 text-sky-400'}`}
          onClick={(e) => handleUploadClick('file')}
        >
          File
        </li>
        <li
          className={`${uploadMode === 'textbox' && 'bold pb-2 text-sky-400'}`}
          onClick={(e) => handleUploadClick('textbox')}
        >
          Text
        </li>
      </ul>
      {uploadMode === 'file' ? (
        <div
          {...getRootProps({
            className:
              'w-full md:w-1/2 h-1/2 text-center flex flex-col items-center justify-center rounded border border-dashed border-b gap-3',
          })}
        >
          <input {...getInputProps()} />
          <div className='flex h-1/2 w-1/2 cursor-pointer flex-col items-center justify-center gap-4 rounded bg-blue-800'>
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Upload a File</p>
            )}
          </div>
          <p>{file ? file.name : '..or drag and drop a file'}</p>
        </div>
      ) : (
        <div className='mx-auto w-3/4 '>
          <div className='flex justify-between'>
            <p>Minimum of 1000 characters.</p>
            <label
              htmlFor='message'
              className='mb-2 block text-right text-sm font-medium text-gray-900 dark:text-white'
            >
              {textareaInput.length} / {MAX_TEXT_INPUT_LENGTH}
            </label>
          </div>
          <textarea
            id='message'
            rows={10}
            className={`${styles.textareaInput} ${textareaErrorClass}`}
            placeholder='Type your content...'
            value={textareaInput}
            onChange={(e) => setTextareaInput(e.target.value)}
            style={{
              resize: 'none',
            }}
          ></textarea>
        </div>
      )}
      <div className='pt-4'>
        <button
          className={`cursor-pointer rounded border border-gray-600 px-4 py-2  text-white  ${
            !isGenerateButtonEnabled ? 'bg-gray-600' : 'bg-orange-500'
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
