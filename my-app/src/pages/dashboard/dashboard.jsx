import React from "react";

import { Content } from "./dashboard.style";

import Header from "../../components/header/header";
import Sidemenu from "../../components/sidemenu/sidemenu";

export default function Dashboard() {
  return (
    <>
      <Header />
      <Content>
        <Sidemenu />
      </Content>
    </>
  );
}
