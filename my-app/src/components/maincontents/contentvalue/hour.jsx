import React from "react";
import axios from "axios";

import { Title, Container, Box, GapComponents } from "../maincontent.style";

export default function Hour() {
  const [hourData, setHourData] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.43.252/backend_IHM/api/api_heure.php"
        );
        setHourData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  
  if (hourData === null) {
    return <div>Loading...</div>;
  }
  console.log(hourData);
  return (
    <Container>
      <Title>Hours</Title>
      <Box>Hours mf</Box>
    </Container>
  );
}
