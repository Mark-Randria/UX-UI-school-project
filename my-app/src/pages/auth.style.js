import styled, { css } from "styled-components";
import BgFrameSvg from "../assets/designIHM.svg";

import { size } from "../core/theme/breakpoints";

export const Container = styled.div`
  display: grid;
  justify-items: center;
  height: 100vh;
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
`;

export const Grid = styled.div``;

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
`;

export const RightGrid = styled(Grid)`
background-color: ${props => props.theme.colors.gray1};
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
`;

export const TitleTag = styled.div`
  padding-top: 25%;
  margin: 0% 10%;
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  color : ${(props) => props.$colorsMode || "#FFFFFF"};

  @media (min-width: ${size.laptopL}) {
    padding-top: ${(props) => props.$position ? "32.5%" : "25%"};
    
  }

  @media (min-width: ${size.desktop}) {
    padding-top: ${(props) => props.$position ? "33%" : "25%"};
    
  }
`;

export const RightCornerTop = styled.div`
    display: flex;
    flex-direction: row-reverse;
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
    margin-top: -2%;

    p {
        color: ${(props) => props.theme.colors.gray11};
    }
`;