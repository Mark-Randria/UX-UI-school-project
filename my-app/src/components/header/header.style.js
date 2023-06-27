import styled from "styled-components";

import { size } from "../../core/theme/breakpoints";

export const HeaderContainer = styled.div`
  top: 0;
  z-index: 10;
  position: sticky;
  display: flex;
  justify-content: space-between;
  height: 64px;
  background-color: ${(props) => props.theme.colors.gray2};
  border-color: ${(props) => props.theme.colors.gray6};
  border-width: 1px;
  border-style: none none solid none;
`;

export const LogoContainer = styled.div`
  flex-grow: 2;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  margin-left: 2%;
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray12};
`;

export const HeaderComponents = styled.div`
  flex-grow: 1;
  width: 20%;
  display: flex;
  justify-content: flex-end;
`;

export const Box = styled.div`
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

export const BoxIcons = styled(Box)`
  padding: 6px;
  border-radius: 5px;
  :hover {
    background-color: ${(props) => props.theme.colors.gray6};
  }
`;

// GapComponents is used to make a space between components
export const GapComponents = styled.div`
  width: ${(props) => props.gapX};
  height: ${(props) => props.gapY};
`;
