import React from "react";
import axios from "axios";

import { Title, Container, Box, GapComponents } from "../maincontent.style";

export default function Teacher() {
  const [teacher, setTeacher] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.43.252/backend_IHM/api/api_prof.php"
        );
        setTeacher(response.data); // Save the response data instead of the entire response object
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Render loading state if data is not yet available
  if (teacher === null) {
    return <div>Loading...</div>;
  }

  console.log(teacher);

  return (
    <Container>
      <Title>Professeur</Title>
      <Box>Content boiiii</Box>
    </Container>
  );
}
