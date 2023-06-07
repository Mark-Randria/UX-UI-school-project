import React from "react";

import { StyledButton } from "./button.style";

const Button = ({ children, color, width, height, onClick }) => {
  return (
    // <BoxStyled color={color} onClick={onClick}>
    //   <Button variant="text" size="small">
    //     {text}
    //   </Button>
    // </BoxStyled>
    <>
      <StyledButton $mode={color} $width={width} $height={height}>
        {children}
      </StyledButton>
    </>
  );
};

export default Button;
