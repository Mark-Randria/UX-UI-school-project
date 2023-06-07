import React from "react";

import { StyledButton } from "./button.style";

const Button = ({ children, color, width, onClick }) => {
  return (
    // <BoxStyled color={color} onClick={onClick}>
    //   <Button variant="text" size="small">
    //     {text}
    //   </Button>
    // </BoxStyled>
    <>
      <StyledButton $mode={color} $width={width} >{children}</StyledButton>
    </>
  );
};

export default Button;
