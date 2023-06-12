import React from "react";
import LightIllustration from "../../assets/undraw_scrum_board_Light.svg";

import {
  SideMenuContainer,
  SideMenuContent,
  SideMenuContentgap,
  Box,
  GapComponents,
} from "./sidemenu.style";

import Button from "../buttons/button";

import {
  ArchiveIcon,
  BackpackIcon,
  HomeIcon,
  Pencil2Icon,
  PersonIcon,
  GearIcon,
} from "@radix-ui/react-icons";

export default function Sidemenu({ setActivePage }) {
  const [activeLink, setActiveLink] = React.useState("emploi");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setActivePage(link);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <SideMenuContainer isDrawerOpen={isDrawerOpen}>
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
        </SideMenuContent>
        <SideMenuContentgap />
        <SideMenuContent>
          <img src={LightIllustration} alt="Illustration" width={240} />
          <Box
            active={activeLink === "parametre"}
            onClick={() => handleLinkClick("parametre")}
          >
            <GearIcon />
            <GapComponents gapX="10px" />
            Parametre du compte
          </Box>
        </SideMenuContent>
      </SideMenuContainer>
    </>
  );
}
