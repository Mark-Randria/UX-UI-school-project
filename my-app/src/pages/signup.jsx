import React from "react";

import { useNavigate } from "react-router-dom";

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
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const Navigate = useNavigate();

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
            <Button
              color="info"
              width="82px"
              onClick={() => Navigate("/Login")}
            >
              Se connecter
            </Button>
            <GapComponents gapX="10px" />
            <p>Vous possedez un compte ?</p>
          </RightCornerTop>
          <TitleTag $colorsMode={`#0E9888`} $position>
            Inscription
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
          <GapComponents gapY="10px" />
          <Input
            label="Adresse e-mail"
            id="Adresse e-mail"
            placeholder="johndoe@gmail.com"
            type="text"
            value={email}
            setValue={setEmail}
          />
          <GapComponents gapY="20px" />
          <Input
            label="Mot de passe"
            id="Mot de passe"
            placeholder="8 caracteres min"
            type={showPassword ? "text" : "password"}
            icon={
              showPassword ? (
                <EyeClosedIcon onClick={togglePasswordVisibility} />
              ) : (
                <EyeOpenIcon onClick={togglePasswordVisibility} />
              )
            }
            value={password}
            setValue={setPassword}
          />
          <GapComponents gapY="10px" />
          <Input
            label="Confirmer le mot de passe"
            id="Confirmer le mot de passe"
            placeholder="Confirmer le mot de passe"
            type={showPassword ? "text" : "password"}
            icon={
              showPassword ? (
                <EyeClosedIcon onClick={togglePasswordVisibility} />
              ) : (
                <EyeOpenIcon onClick={togglePasswordVisibility} />
              )
            }
            value={confirmPassword}
            setValue={setConfirmPassword}
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
