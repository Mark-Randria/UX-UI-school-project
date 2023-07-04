import styled, { css } from "styled-components";
import { DataGrid } from "@mui/x-data-grid";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export const Title = styled.div`
  padding: 2rem;
  position: sticky;
  z-index: 0;
  font-family: "Public Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;
  color: ${(props) => props.theme.colors.slate12};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Box = styled.div`
  flex-direction: column;
  box-sizing: border-box;
  display: flex;
  padding: 24px;
  margin: 24px;
  background-color: ${(props) => props.theme.colors.gray2};
  border-radius: 5px;
`;

export const Box2 = styled(Box)`
  padding: 0 12px;
  margin: 5px 0px;

  .MuiInputBase-root {
    color: ${(props) => props.theme.colors.slate12};
    background-color: ${(props) => props.theme.colors.gray4};
    :hover {
      background-color: ${(props) => props.theme.colors.gray5};
    }
    :focus-within {
      background-color: ${(props) => props.theme.colors.gray6};
    }
  }
  .MuiSelect-select {
    color: ${(props) => props.theme.colors.slate12};
    :hover {
      background-color: ${(props) => props.theme.colors.gray5};
    }
    :focus-within {
      background-color: ${(props) => props.theme.colors.gray6};
    }
  }
`;

export const EndBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const BoxAA = styled(EndBox)`
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
`;

export const BoxBB = styled(BoxAA)`
  flex-direction: row;
  align-content: center;
`

export const BoxIcons = styled(Box)`
  flex-direction: row;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border-radius: 0;
  align-items: center;
`;

// GapComponents is used to make a space between components
export const GapComponents = styled.div`
  width: ${(props) => props.gapX};
  height: ${(props) => props.gapY};
`;

export const StyledColumnHeader = styled.div`
  color: ${(props) => props.theme.colors.slate12};
  font-weight: 500;
`;

export const StyledDataGrid = styled(DataGrid)`
  && {
    .MuiDataGrid-cell {
      color: ${(props) => props.theme.colors.slate12};
    }

    .MuiDataGrid-root {
      color: ${(props) => props.theme.colors.gray11};
    }
    p {
      color: ${(props) => props.theme.colors.slate12};
    }
    .MuiButtonBase-root {
      color: ${(props) => props.theme.colors.gray11};
      &:disabled {
        color: ${(props) => props.theme.colors.gray9};
      }
    }
    .MuiSelect-select {
      color: ${(props) => props.theme.colors.gray12};
    }
  }
`;

export const Description = styled.p`
  color: ${(props) => props.theme.colors.slate12};
  a.link {
    color: ${(props) => props.theme.colors.indigoA11};
    font-weight: bold;
  }
`;
