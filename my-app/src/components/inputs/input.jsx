import React from "react";

import {
  InputContainer,
  StyledInput,
  Box,
  Label,
  Icons,
} from "./input.style";

const Input = ({ id, label, icon, placeholder, type, value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Box>
        <Label textAlign="left">
          <label htmlFor={id}>{label}</label>
        </Label>
      </Box>
      <Box>
        <InputContainer>
          <StyledInput
            placeholder={placeholder}
            id={id}
            type={type}
            value={value}
            onChange={handleChange}
            autoComplete="off"
          />
          <Icons>{icon}</Icons>
        </InputContainer>
      </Box>
    </>
  );
};

export default Input;
