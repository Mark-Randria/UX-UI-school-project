import styled from "styled-components";
import BgFrameSvg from "../assets/designIHM.svg";


export const SvgBackgroundFrame = styled.div`
    background-image: url(${BgFrameSvg});
    background-repeat: no-repeat;
    height: 100px;

` 

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    column-gap: 1rem ;
    justify-items: center;
    height: 100vh;
`

export const Grid = styled.div`
    background-color: blue;
    height: 100px;
`