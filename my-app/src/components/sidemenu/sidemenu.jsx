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

export default function Sidemenu({ setActivePage }) {
  const [activeLink, setActiveLink] = React.useState("emploi");

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setActivePage(link);
  };

  return (
    <SideMenuContainer>
      <SideMenuContent>
        <Box
          active={activeLink === "emploi"}
          onClick={() => handleLinkClick("emploi")}
        >
          <ArchiveIcon />
          <GapComponents gapX="10px" />
          Emploi du temps
        </Box>
        <GapComponents gapY="5px" />
        <Box
          active={activeLink === "ecole"}
          onClick={() => handleLinkClick("ecole")}
        >
          <BackpackIcon />
          <GapComponents gapX="10px" />
          Ecole
        </Box>
        <GapComponents gapY="5px" />
        <Box
          active={activeLink === "matiere"}
          onClick={() => handleLinkClick("matiere")}
        >
          <Pencil2Icon />
          <GapComponents gapX="10px" />
          Matiere
        </Box>
        <GapComponents gapY="5px" />
        <Box
          active={activeLink === "classe"}
          onClick={() => handleLinkClick("classe")}
        >
          <HomeIcon />
          <GapComponents gapX="10px" />
          Classe
        </Box>
        <GapComponents gapY="5px" />
        <Box
          active={activeLink === "professeur"}
          onClick={() => handleLinkClick("professeur")}
        >
          <PersonIcon />
          <GapComponents gapX="10px" />
          Professeur
        </Box>
        <GapComponents gapY="15vh" />
      </SideMenuContent>
      <SideMenuContent>
        <img src={LightIllustration} alt="Illustration" width={240} />
      </SideMenuContent>
    </SideMenuContainer>
  );
}
