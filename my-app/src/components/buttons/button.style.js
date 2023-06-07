import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  margin-bottom: 0.5rem;
  font-size: 14px;
  line-height: 1.25rem;
  font-weight: 500;
  border-radius: 0.5rem;
  border-style: none;
  font-weight: 600;
  max-width: 162px;
  width: ${(props) => props.$width};
  ${(props) => {
    switch (props.$mode) {
      case "success":
        return css`
          background-color: ${(props) => props.theme.colors.greenA9};
          color: white;
          :focus:hover {
            background-color: ${(props) => props.theme.colors.greenA10};
          }
        `;
        case "info":
        return css`
          background-color: ${(props) => props.theme.colors.blueA9};
          color: white;
          :focus:hover {
            background-color: ${(props) => props.theme.colors.blueA10};
          }
        `;
        case "warning":
        return css`
          background-color: ${(props) => props.theme.colors.amberA9};
          color: black;
          :focus:hover {
            background-color: ${(props) => props.theme.colors.amberA10};
          }
        `;
        case "danger":
        return css`
          background-color: ${(props) => props.theme.colors.redA9};
          color: white;
          :focus:hover {
            background-color: ${(props) => props.theme.colors.redA10};
          }
        `;
        case "notimportant":
        return css`
          background-color: ${(props) => props.theme.colors.gray9};
          color: white;
          :focus:hover {
            background-color: ${(props) => props.theme.colors.gray10};
          }
        `;
      default:
        return css`
          background-color: ${(props) => props.theme.colors.tealA9};
          color: white;
          :focus:hover {
            background-color: ${(props) => props.theme.colors.tealA10};
          }
          }
        `;
    }
  }}
`;
