import styled from "styled-components";

export const StyledInput = styled.input`
box-sizing: border-box;
padding: 0.5rem; 
width: 27vw; 
border-radius: 5px; 
border-width: 1px; 
border-color: ${props => props.theme.colors.gray7}; 
border-style: solid;
:focus {
    outline: 2px solid ${props => props.theme.colors.indigoA7};
    outline-offset: 0.5px;
    border-width: 0px;
}


@media (min-width: 640px) { 
  font-size: 0.75rem;
line-height: 1rem; 
 }


`

export const Box = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 48px;
`