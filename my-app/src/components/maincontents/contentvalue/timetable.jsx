import React from "react";
import axios from "axios";

import {
  Title,
  Container,
  Box,
  GapComponents,
  ScheduleTableContainer,
  ScheduleTable,
  ScheduleTableHeader,
  ScheduleTableRow,
  ScheduleTableCell,
} from "../maincontent.style";

export default function Timetable() {
  const [scheduleData, setScheduleData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.43.252/backend_IHM/api/api_emploi_ko.php"
        );
        setScheduleData(response.data); // Save the response data instead of the entire response object
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Render loading state if data is not yet available
  if (scheduleData === null) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>Emploi du temps</Title>
      <Box>
        <ScheduleTableContainer>
          <ScheduleTable>
            <thead>
              <ScheduleTableRow>
                <ScheduleTableHeader>Jour</ScheduleTableHeader>
                <ScheduleTableHeader>Time Slot 1</ScheduleTableHeader>
                <ScheduleTableHeader>Time Slot 2</ScheduleTableHeader>
                <ScheduleTableHeader>Time Slot 3</ScheduleTableHeader>
                <ScheduleTableHeader>Time Slot 4</ScheduleTableHeader>
              </ScheduleTableRow>
            </thead>
            <tbody></tbody>
          </ScheduleTable>
        </ScheduleTableContainer>
      </Box>
    </Container>
  );
}
