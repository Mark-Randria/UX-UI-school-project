import React from "react";

import { AuthService } from "../services/auth-service";
import { Container, LeftGrid, RightGrid, WelcomeTag } from "./auth.style";

import theme from "../core/theme/light";
import darkTheme from "../core/theme/dark";

export default function Login() {
  return (
    <>
      <Container>
        <LeftGrid>
          <WelcomeTag>
            Bienvenue sur easy-Schedule
          </WelcomeTag>
        </LeftGrid>
        <RightGrid>
          <div> connexion </div>
        </RightGrid>
      </Container>
    </>
  );
}
