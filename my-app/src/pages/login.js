import React from "react";

import { AuthService } from "../services/auth-service";
import { Container, LeftGrid, RightGrid } from "./auth.style";

import theme from "../core/theme/light";
import darkTheme from "../core/theme/dark";

export default function Login() {
  return (
    <>
      <Container>
        <LeftGrid>
            <h1>
                Bienvenue sur easy schedule
            </h1>
        </LeftGrid>
        <RightGrid>
            <div> yellow
            </div>
        </RightGrid>
      </Container>
    </>
  );
}
