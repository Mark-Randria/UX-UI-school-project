import styled from "styled-components";
import Modal from "@mui/material/Modal";

import { size } from "../../core/theme/breakpoints";

export const CustomModal = styled(Modal)`
`;

export const Box = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background-color: ${(props) => props.theme.colors.gray2};
  padding: 4;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.slate12};
`;
export const Description = styled.h4`
  color: ${(props) => props.theme.colors.slate12};
`;
