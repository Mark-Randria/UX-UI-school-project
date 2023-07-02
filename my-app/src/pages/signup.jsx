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
import Alert from "../components/alerts/alert";

import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

export default function Login() {
  const [user, setUser] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  let isValidEmail = emailRegex.test(email);
  let isValidPassword = passwordRegex.test(password);

  const Navigate = useNavigate();
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !password || !email || !confirmPassword) {
      setMessage("Veuillez remplir le formulaire");
      setSeverity("error");
      handleClick();
    } else if (password !== confirmPassword) {
      setMessage("Verifier votre mot de passe");
      setSeverity("error");
      handleClick();
    } else if (!isValidEmail) {
      setMessage("Veuiller saisir une adresse email valide");
      setSeverity("error");
      handleClick();
    } else if (!isValidPassword || password.length < 8) {
      setMessage(
        "Le mot de passe doit contenir au moins une Majuscule, une minuscule et un nombre avec 8 caractères minimums"
      );
      setSeverity("error");
      handleClick();
    } else {
      const data = {
        username: user,
        password: password,
        email: email,
      };
      AuthService.signup(data.username, data.email, data.password)
        .then((response) => {
          setMessage("Inscription reussie, connexion en cours");
          setSeverity("success");
          handleClick();
          setUser("");
          setConfirmPassword("");
          setEmail("");
          setPassword("");
          setTimeout(() => {
            Navigate("/Dashboard");
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setSeverity("error");
          setMessage("Probleme de connexion au serveur");
          handleClick();
        });
    }
  };

  const handleReset = (e) => {
    handleClose();
    setUser("");
    setPassword("");
    setEmail("");
    setConfirmPassword("");
    setMessage("");
  };

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
              minWidth="78px"
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
            <Button width="10vw" minWidth="78px" onClick={handleSubmit}>
              Se connecter
            </Button>
            <GapComponents gapX="73px" />
            <Button
              color="notimportant"
              width="10vw"
              minWidth="78px"
              onClick={handleReset}
            >
              Annuler
            </Button>
          </PositionDiv>
        </RightGrid>
        <Alert
          open={open}
          setOpen={setOpen}
          message={message}
          severity={severity}
        />
      </Container>
    </>
  );
}
