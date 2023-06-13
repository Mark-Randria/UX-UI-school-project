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
  PopUp,
} from "./auth.style";
import Input from "../components/inputs/input";
import Button from "../components/buttons/button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { SnackbarProvider, useSnackbar } from "notistack";

import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

export default function Login() {
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const Navigate = useNavigate();

  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="info" size="small" onClick={handleClose}>
        UNDO
      </Button>
    </React.Fragment>
  );

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !password) {
      setMessage("Veuillez remplir le formulaire");
      handleClick();
    } else {
      const data = {
        username: user,
        password: password,
      };

      console.log(data.username, data.password);
      const token = AuthService.login(data.username, data.password)
        .then((response) => {
          console.log(response);
          Navigate("/");
          setUser("");
          setPassword("");
          setMessage("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleReset = (e) => {
    handleClose();
    setUser("");
    setPassword("");
    setMessage("");
  };

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
              onClick={() => Navigate("/Signup")}
            >
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
          <PositionDiv topdistance="40px">
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
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message={message}
          action={action}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}
