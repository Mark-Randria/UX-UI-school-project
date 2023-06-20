import styled from "styled-components";

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
  box-sizing: border-box;
  display: flex;
  padding: 24px;
  margin: 24px;
  background-color: ${(props) => props.theme.colors.gray2};
  border-radius: 5px;
`;

// GapComponents is used to make a space between components
export const GapComponents = styled.div`
  width: ${(props) => props.gapX};
  height: ${(props) => props.gapY};
`;

export const ScheduleTableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const ScheduleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const ScheduleTableHeader = styled.th`
  padding: 10px;
  background-color: #f2f2f2;
  text-align: left;
`;

export const ScheduleTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const ScheduleTableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;
