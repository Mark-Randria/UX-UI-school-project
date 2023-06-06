import React from "react";

import { StyledInput, Box } from "./input.style";

const Input = ({ id, label, type, value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box>
      <StyledInput
        id={id}
        type={type}
        name={label}
        value={value}
        onChange={handleChange}
        autoComplete="off"
      />
    </Box>
  );
};

export default Input;
