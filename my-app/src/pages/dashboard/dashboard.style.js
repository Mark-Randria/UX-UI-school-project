import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  left: 0;
  flex-direction: row;
  margin-left: 260px;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.gray5}
`;
