import React from "react";

import { AuthService } from "../services/auth-service";
import { Container, Grid, SvgBackgroundFrame } from "./auth.style";

import theme from "../core/theme/light";
import darkTheme from "../core/theme/dark";

export default function Login() {
  return <>
  {/* <SvgBackgroundFrame /> */}
  <Container>
    <Grid />
    <Grid />
    <Grid />
    <Grid />
  </Container>
  </>;
}
