import React from "react";
import {
  Box,
  TextField,
} from "@mui/material";
import { MAX_TEXT_INPUT_LENGTH } from "@/utils/constants";

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
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      className="w-full flex justify-center"
    >
      <TextField
        id="outlined-multiline-static"
        label={textareaInput.length === 0 ? "Minimum of 1000 characters.": `${textareaInput.length} / ${MAX_TEXT_INPUT_LENGTH}`}
        multiline
        className="!w-full"
        rows={4}
        value={textareaInput}
        onChange={e => setTextareaInput(e.target.value)}
        fullWidth
        error={textareaInput.length > MAX_TEXT_INPUT_LENGTH}
      />
    </Box>
  );
};

export default TextInputComponent;