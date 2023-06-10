import React from "react";

import { StyledButton } from "./button.style";

const Button = ({ children, color, width, minWidth, height, onClick }) => {
  return (
    <>
      <StyledButton
        $mode={color}
        $width={width}
        $minWidth={minWidth}
        $height={height}
        onClick={onClick}
      >
        {children}
      </StyledButton>
    </>
  );
};

export default Button;
