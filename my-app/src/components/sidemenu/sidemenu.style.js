import styled, { css } from "styled-components";

import Illustration from "../../assets/Illustration.svg";

export const SideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 128px;
  height: 100vh;
  width: 260px;
  position: fixed;
  z-index: 1;
  top: 64;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
  background-color: ${(props) => props.theme.colors.gray2};
  color: ${(props) => props.theme.colors.slate12};
`;

export const SideMenuContent = styled.div`
  padding: 0.5rem;
`;

export const Box = styled.div`
margin-left: 5%;
  box-sizing: border-box;
  display: flex;
  height: 48px;
  align-items: center;
  border: none;
  padding: 0.625rem;
  font-size: 14px;
  line-height: 1.25rem;
  font-weight: 500;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  border-radius: 0.5rem;
  border-style: none;
  font-weight: 600;
  max-width: 162px;
  ${(props) =>
    props.active &&
    css`
      background-color: ${(props) => props.theme.colors.tealA9};
      color: white;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    `}
`;

// GapComponents is used to make a space between components
export const GapComponents = styled.div`
  width: ${(props) => props.gapX};
  height: ${(props) => props.gapY};
`;
