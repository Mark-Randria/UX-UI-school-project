import React from "react";

import { StyledInput, Box, Label } from "./input.style";

const Input = ({ id, label, placeholder, type, value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Box>
        <Label textAlign="left">{label}</Label>
      </Box>
      <Box>
        <StyledInput
          placeholder={placeholder}
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          autoComplete="off"
        />
      </Box>
    </>
  );
};

export default Input;
