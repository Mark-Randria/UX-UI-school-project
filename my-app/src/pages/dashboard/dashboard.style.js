import styled from "styled-components";

import { size } from "../../core/theme/breakpoints";

export const Content = styled.div`
  display: flex;
  left: 0;
  flex-direction: row;
  margin-left: 260px;
  height: calc(100vh - 64px);
  background-color: ${(props) => props.theme.colors.gray5};

  @media (max-width: ${size.mobileL}) {
    margin: 0;
  }
`;
