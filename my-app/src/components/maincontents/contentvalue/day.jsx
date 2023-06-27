import React from "react";
import axios from "axios";

import { Title, Container, Box, GapComponents } from "../maincontent.style";

export default function Day() {
  const [dayData, setDayData] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.43.252/backend_IHM/api/api_jour.php"
        );
        setDayData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (dayData === null) {
    return <div>Loading...</div>;
  }
  console.log(dayData);
  return (
    <Container>
      <Title>Day</Title>
      <Box>Content boiiii</Box>
    </Container>
  );
}
