import React from "react";
import LightIllustration from "../../assets/undraw_scrum_board_Light.svg";

import {
  SideMenuContainer,
  SideMenuContent,
  Box,
  GapComponents,
} from "./sidemenu.style";

import {
  ArchiveIcon,
  BackpackIcon,
  HomeIcon,
  Pencil2Icon,
  PersonIcon,
} from "@radix-ui/react-icons";

export default function Sidemenu() {
  const [activeLink, setActiveLink] = React.useState("");

  return (
    <SideMenuContainer>
      <SideMenuContent>
        <Box
          active={activeLink === "emploi"}
          onClick={() => setActiveLink("emploi")}
        >
          <ArchiveIcon />
          <GapComponents gapX="10px" />
          Emploi du temps
        </Box>
        <GapComponents gapY="5px" />
        <Box
          active={activeLink === "ecole"}
          onClick={() => setActiveLink("ecole")}
        >
          <BackpackIcon />
          <GapComponents gapX="10px" />
          Ecole
        </Box>
        <GapComponents gapY="5px" />
        <Box
          active={activeLink === "matiere"}
          onClick={() => setActiveLink("matiere")}
        >
          <Pencil2Icon />
          <GapComponents gapX="10px" />
          Matiere
        </Box>
        <GapComponents gapY="5px" />
        <Box
          active={activeLink === "classe"}
          onClick={() => setActiveLink("classe")}
        >
          <HomeIcon />
          <GapComponents gapX="10px" />
          Classe
        </Box>
        <GapComponents gapY="5px" />
        <Box
          active={activeLink === "professeur"}
          onClick={() => setActiveLink("professeur")}
        >
          <PersonIcon />
          <GapComponents gapX="10px" />
          Professeur
        </Box>
        <GapComponents gapY="5px" />
      </SideMenuContent>
      <SideMenuContent>
        <img src={LightIllustration} alt="Illustration" width={240} />
      </SideMenuContent>
    </SideMenuContainer>
  );
}
