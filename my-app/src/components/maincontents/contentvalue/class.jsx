import React from "react";
import axios from "axios";

import { Title, Container, Box, GapComponents } from "../maincontent.style";

export default function Class() {
  const [classData, setClassData] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.43.252/backend_IHM/api/api_classe.php"
        );
        setClassData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Render loading state if data is not yet available
  if (classData === null) {
    return <div>Loading...</div>;
  }
  console.log(classData);
  return (
    <Container>
      <Title>Classe</Title>
      <Box>Content boiiii</Box>
    </Container>
  );
}
