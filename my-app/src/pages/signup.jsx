import React from "react";

import { AuthService } from "../services/auth-service";
import { Container, LeftGrid, RightGrid, TitleTag } from "./auth.style";

import theme from "../core/theme/light";
import darkTheme from "../core/theme/dark";

export default function Signup() {
  return (
    <>
      <Container>
        <LeftGrid>
          <TitleTag>
            Bienvenue sur easy-Schedule
          </TitleTag>
        </LeftGrid>
        <RightGrid>
          <div> Inscription</div>
        </RightGrid>
      </Container>
    </>
  );
}
