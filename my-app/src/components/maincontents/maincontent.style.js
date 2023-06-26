import styled, { css } from "styled-components";
import { DataGrid } from "@mui/x-data-grid";

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
