import React from "react";

import { StyledButton } from "./button.style";

const Button = ({ children, color, width, height, onClick }) => {
  return (
    <>
      <StyledButton $mode={color} $width={width} $height={height} onClick={onClick}>
        {children}
      </StyledButton>
    </>
  );
};

export default Button;
