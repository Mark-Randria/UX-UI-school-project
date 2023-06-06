import styled from "styled-components";
import BgFrameSvg from "../assets/designIHM.svg";

import { size } from "../core/theme/breakpoints";

export const Container = styled.div`
  display: grid;
  justify-items: center;
  height: 100vh;
  @media (min-width: ${size.tablet}) {
    grid-template-columns: repeat(8, 1fr);
    column-gap: 1rem;
  }
  @media (min-width: ${size.laptop}) {
    grid-template-columns: repeat(12, 1fr);
    column-gap: 1rem;
  }
  @media (min-width: ${size.laptopM}) {
    grid-template-columns: repeat(14, 1fr);
    column-gap: 1rem;
  }
  @media (min-width: ${size.laptopL}) {
    grid-template-columns: repeat(16, 1fr);
    column-gap: 1rem;
  }
  @media (min-width: ${size.desktop}) {
    grid-template-columns: repeat(18, 1fr);
    column-gap: 1rem;
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

export const WelcomeTag = styled.div`
  padding-top: 25%;
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  color: #ffffff;
`;
