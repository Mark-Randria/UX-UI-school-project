import styled from "styled-components";

export const StyledInput = styled.input`
  box-sizing: border-box;
  padding: 0.5rem;
  width: 27vw;
  max-width: 400px;
  height: 42px;
  font-size: 18px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.gray7};
  border-style: solid;
  color: ${(props) => props.theme.colors.gray12};
  :focus {
    outline: 2px solid ${(props) => props.theme.colors.indigoA7};
    outline-offset: 0px;
    border-width: 0px;
  }

  @media (max-width: 767px) {
    font-size: 1rem;
    line-height: 1rem;
    width: 60vw;
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: fit-content;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const Label = styled(Box)`
    text-align: ${(props) => props.textAlign};
    font-weight: 500;
    width: 60%;
    max-width: 400px;
    justify-content: flex-start;
`;
