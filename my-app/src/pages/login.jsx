import React from "react";

import { AuthService } from "../services/auth-service";
import {
  Container,
  LeftGrid,
  RightGrid,
  TitleTag,
  RightCornerTop,
  AboutInfo,
  PositionDiv,
  GapComponents,
} from "./auth.style";
import Input from "../components/inputs/input";
import Button from "../components/buttons/button";

export default function Login() {
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <>
      <Container>
        <LeftGrid>
          <TitleTag>Bienvenue sur Easy-Schedule</TitleTag>
        </LeftGrid>
        <RightGrid>
          <RightCornerTop>
            <p>Vous posseder un compte ?</p>
          </RightCornerTop>
          <TitleTag $colorsMode={`#0E9888`} $position>
            Inscription
          </TitleTag>
          <AboutInfo>
            <p>Veuiller remplir le formulaire suivant</p>
          </AboutInfo>
          <Input value={user} setValue={setUser} />
          <Input value={password} setValue={setPassword} />
          <PositionDiv>
            <Button color="notimportant" width="10vw">
              Annuler
            </Button>
            <GapComponents $gap="73px" />
            <Button width="10vw">Enregistrer</Button>
          </PositionDiv>
        </RightGrid>
      </Container>
    </>
  );
}
