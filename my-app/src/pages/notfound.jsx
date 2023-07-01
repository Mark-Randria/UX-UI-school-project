import React from "react";

import { useNavigate } from "react-router-dom";

import { BigBox } from "./auth.style";

import notfoundsvg from "../assets/undraw_page_not_found.svg";

export default function Notfound() {
  const Navigate = useNavigate();

  const redirect = () => {
    Navigate("/Dashboard");
  };

  return (
    <BigBox onClick={redirect}>
      <h1>Oups....Page introuvable</h1>
      <img src={notfoundsvg} width="100%" height="95%" />
    </BigBox>
  );
}
