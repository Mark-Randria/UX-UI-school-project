import React from "react";

import { Content } from "./dashboard.style";

import Header from "../../components/header/header";
import Sidemenu from "../../components/sidemenu/sidemenu";
import Maincontent from "../../components/maincontents/maincontent";

export default function Dashboard() {
  const [activePage, setActivePage] = React.useState("emploi");

  return (
    <>
      <Header />
      <Content>
        <Sidemenu setActivePage={setActivePage} />
        <Maincontent activePage={activePage} />
      </Content>
    </>
  );
}
