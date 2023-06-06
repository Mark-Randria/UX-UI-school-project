import React from "react";

import { AuthService } from "../services/auth-service";
import { Container, LeftGrid, RightGrid, WelcomeTag } from "./auth.style";
import Input from "../components/inputs/input";

export default function Login() {

  const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');

    
  return (
    <>
      <Container>
        <LeftGrid>
          <WelcomeTag>
            Bienvenue sur easy-Schedule
          </WelcomeTag>
        </LeftGrid>
        <RightGrid>
          <div> connexion </div> <br></br>
          <Input value={user} setValue={setUser} />

        </RightGrid>
      </Container>
    </>
  );
}
