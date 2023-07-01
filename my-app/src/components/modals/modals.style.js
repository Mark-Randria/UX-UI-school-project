import styled from "styled-components";
import Modal from "@mui/material/Modal";

import { size } from "../../core/theme/breakpoints";

export const CustomModal = styled(Modal)``;

export const Box = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background-color: ${(props) => props.theme.colors.gray2};
  border-radius: 10px;
  padding: 4;
  padding-bottom: 10px;
  label {
    color: ${(props) => props.theme.colors.slate11};
  }
`;

export const EndBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const BoxButton = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colors.gray12};
  p {
    font-weight: 400;
    font-size: 0.875rem;
    color: ${(props) => props.theme.colors.slate12};
  }
`;

export const BoxIcons = styled(BoxButton)`
  padding: 6px;
  margin: 6px;
  margin-bottom: 0;
  border-radius: 5px;
  :hover {
    background-color: ${(props) => props.theme.colors.gray6};
  }
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.slate12};
  padding: 0.625rem;
`;

export const Description = styled.h4`
  color: ${(props) => props.theme.colors.slate12};
  padding: 0 0.825rem;
`;
