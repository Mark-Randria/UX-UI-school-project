import styled, { css } from "styled-components";
import BgFrameSvg from "../assets/designIHM.svg";

import { size } from "../core/theme/breakpoints";

export const Container = styled.div`
  display: grid;
  justify-items: center;
  min-height: 100vh;
  @media (min-width: ${size.tablet}) {
    grid-template-columns: repeat(8, 1fr);
  }
  @media (min-width: ${size.laptop}) {
    grid-template-columns: repeat(12, 1fr);
  }
  @media (min-width: ${size.laptopM}) {
    grid-template-columns: repeat(14, 1fr);
  }
  @media (min-width: ${size.laptopL}) {
    grid-template-columns: repeat(16, 1fr);
  }
  @media (min-width: ${size.desktop}) {
    grid-template-columns: repeat(18, 1fr);
  }
  @media (max-width: ${size.tablet}) {
    background-image: url(${BgFrameSvg});
    background-color: red;
  }
`;

export const Grid = styled.div``;

export const BigBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  overflow: hidden;
  
  h1 {
    color: ${(props) => props.theme.colors.slate12};
    text-align: center;
  }

  img {
    padding: 0 5% 5% 5%;
    box-sizing: border-box;
  }
`

export const LeftGrid = styled(Grid)`
  background-image: url(${BgFrameSvg});
  grid-column-start: 1;
  grid-column-end: 1;
  width: 100%;

  @media (min-width: ${size.tablet}) {
    grid-column-start: 1;
    grid-column-end: 6;
  }

  @media (min-width: ${size.laptop}) {
    grid-column-start: 1;
    grid-column-end: 8;
  }

  @media (min-width: ${size.laptopM}) {
    grid-column-start: 1;
    grid-column-end: 9;
  }

  @media (min-width: ${size.laptopL}) {
    grid-column-start: 1;
    grid-column-end: 11;
  }

  @media (min-width: ${size.desktop}) {
    grid-column-start: 1;
    grid-column-end: 12;
  }

  @media (max-width: ${size.tablet}) {
    position: absolute;
    background-image: none;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;

export const RightGrid = styled(Grid)`
  background-color: ${(props) => props.theme.colors.gray1};
  grid-column-start: 1;
  grid-column-end: 1;
  width: 100%;

  @media (min-width: ${size.tablet}) {
    grid-column-start: 6;
    grid-column-end: 9;
  }

  @media (min-width: ${size.laptop}) {
    grid-column-start: 8;
    grid-column-end: 13;
  }

  @media (min-width: ${size.laptopM}) {
    grid-column-start: 9;
    grid-column-end: 15;
  }

  @media (min-width: ${size.laptopL}) {
    grid-column-start: 11;
    grid-column-end: 17;
  }

  @media (min-width: ${size.desktop}) {
    grid-column-start: 12;
    grid-column-end: 19;
  }
  @media (max-width: ${size.tablet}) {
    margin-top: 10vh;
    margin-bottom: 5vh;
    padding: 10px 12px 24px 12px;
    width: 80vw;
    height: fit-content;
    border-radius: 15px;
  }
`;

export const TitleTag = styled.div`
  padding-top: 4rem;
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  color: ${(props) => props.$colorsMode || "#FFFFFF"};

  @media (min-width: ${size.laptopL}) {
    padding-top: 4.5rem;
  }

  @media (min-width: ${size.desktop}) {
    padding-top: ${(props) => (props.$position ? "33%" : "25%")};
  }
`;

export const RightCornerTop = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  text-align: right;
  margin-right: 2%;

  p {
    color: ${(props) => props.theme.colors.gray11};
  }
`;

export const AboutInfo = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  margin-top: -3%;

  p {
    color: ${(props) => props.theme.colors.gray11};
  }
`;

export const PositionDiv = styled.div`
  margin-top: ${(props) => props.topdistance};
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

// GapComponents is used to make a space between components
export const GapComponents = styled.div`
  width: ${(props) => props.gapX};
  height: ${(props) => props.gapY};
`;

export const PopUp = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    color: red;
`