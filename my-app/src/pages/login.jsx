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

import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

export default function Login() {
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }



  return (
    <>
      <Container>
        <LeftGrid>
          <GapComponents gapY="63px" />
          <TitleTag>Bienvenue sur Easy-Schedule</TitleTag>
        </LeftGrid>
        <RightGrid>
          <RightCornerTop>
            <Button color="info" width="82px">
              S&apos;inscrire
            </Button>
            <GapComponents gapX="10px" />
            <p>Vous n&apos;avez pas encore de compte ?</p>
          </RightCornerTop>
          <TitleTag $colorsMode={`#0E9888`} $position>
            Connexion
          </TitleTag>
          <AboutInfo>
            <p>Connectez-vous avec votre compte</p>
          </AboutInfo>
          <Input
            label="Nom d'utilisateur"
            id="Nom d'utilisateur"
            placeholder="Ex: Patate douce"
            type="text"
            value={user}
            setValue={setUser}
          />
          <GapComponents gapY="20px" />
          <Input
            label="Mot de passe"
            id="Mot de passe"
            placeholder="8 caracteres min"
            type={showPassword ? 'text' : 'password'}
            icon={showPassword ? <EyeClosedIcon onClick={togglePasswordVisibility}/> : <EyeOpenIcon onClick={togglePasswordVisibility} />}
            value={password}
            setValue={setPassword}
          />
          <PositionDiv topdistance="50px">
            <Button color="notimportant" width="10vw">
              Annuler
            </Button>
            <GapComponents gapX="73px" />
            <Button width="10vw">Se connecter</Button>
          </PositionDiv>
        </RightGrid>
      </Container>
    </>
  );
}
