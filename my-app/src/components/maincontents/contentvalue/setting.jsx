import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Title,
  Container,
  Box,
  Box2,
  BoxIcons,
  EndBox,
  GapComponents,
  Description,
} from "../maincontent.style";

import { frFR } from "@mui/x-data-grid";

import { GitHubLogoIcon, FigmaLogoIcon } from "@radix-ui/react-icons";

import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

import Button from "../../buttons/button";
import Modal from "../../modals/modals";
import Alert from "../../alerts/alert";

export default function Setting() {
  return (
    <Container>
      <Title>Informations du site</Title>
      <Box>
        <Description>
          Ce projet consiste à évaluer nos competences à créer un site repondant
          aux normes internationales de l'UI/UX ou User Interface / User
          Experience .
        </Description>
        <br />
        <Description>
          Lien GitHub du projet : <GapComponents gapY="20px" />
          <a
            className="link"
            href="https://github.com/Mark-Randria/UX-UI-school-project"
            target="_blank"
          >
            <BoxIcons>
              <GitHubLogoIcon width="25px" height="25px" />{" "}
              <GapComponents gapX="5px" />
              Dépot Git
            </BoxIcons>
          </a>
        </Description>
        <Description>
          Lien Figma du projet : <GapComponents gapY="20px" />
          <a
            className="link"
            href="https://www.figma.com/file/WAsaHCpOxUkEgXqFYBmAMr/Untitled?type=design&node-id=0-1&t=BfTudTYrar0akhzd-0"
            target="_blank"
          >
            <BoxIcons>
              <FigmaLogoIcon width="25px" height="25px" />{" "}
              <GapComponents gapX="5px" />
              Lien Figma
            </BoxIcons>
          </a>
        </Description>
      </Box>
    </Container>
  );
}
