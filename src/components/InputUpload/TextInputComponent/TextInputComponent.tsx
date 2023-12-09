import React from 'react';
import { Box, TextField } from '@mui/material';
import envVariables from '@/lib/env';

export type TextInputComponentProps = {
  textareaInput: string;
  setTextareaInput: React.Dispatch<React.SetStateAction<string>>;
};

const TextInputComponent: React.FunctionComponent<TextInputComponentProps> = (
  props
) => {
  const { setTextareaInput, textareaInput } = props;
  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
      className='flex w-full justify-center'
    >
      <TextField
        id='outlined-multiline-static'
        label={
          textareaInput.length === 0
            ? 'Minimum of 1000 characters.'
            : `${textareaInput.length} / ${Number(
                envVariables.getEnv('MAX_TEXT_INPUT_LENGTH')
              )}`
        }
        multiline
        className='!w-full'
        rows={10}
        value={textareaInput}
        onChange={(e) => setTextareaInput(e.target.value)}
        fullWidth
        error={
          textareaInput.length >
          Number(envVariables.getEnv('MAX_TEXT_INPUT_LENGTH'))
        }
      />
    </Box>
  );
};

export default TextInputComponent;
