import React from "react";

import { BigBox } from "./auth.style";

import notfoundsvg from "../assets/undraw_page_not_found.svg";

export default function Notfound() {
  return (
    <BigBox>
      <h1>Oups....Page introuvable</h1>
      <img src={notfoundsvg} width="100%" height="95%" />
    </BigBox>
  );
}
