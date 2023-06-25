import React from "react";
import axios from "axios";

import { Title, Container, Box, GapComponents } from "../maincontent.style";

export default function Subject() {

  const [subjectData, setSubjectData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.43.252/backend_IHM/api/api_matiere.php"
        );
        setSubjectData(response.data); // Save the response data instead of the entire response object
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (subjectData === null) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>Matiere</Title>
      <Box>Content boiiii</Box>
    </Container>
  );
}
