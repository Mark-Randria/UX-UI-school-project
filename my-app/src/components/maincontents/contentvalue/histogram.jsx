import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Container,
  Box,
  Box2,
  BoxAA,
  BoxIcons,
  EndBox,
  GapComponents,
  StyledColumnHeader,
  StyledDataGrid,
} from "../maincontent.style";

import { Pencil2Icon, Cross1Icon, CheckIcon } from "@radix-ui/react-icons";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

import Button from "../../buttons/button";
import Input from "../../inputs/input";
import Modal from "../../modals/modals";
import Alert from "../../alerts/alert";

import { GridToolbar, frFR } from "@mui/x-data-grid";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

export default function Histogram() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const Navigate = useNavigate();
  const Location = useLocation();

  const sendedTotalPret = Location.state && Location.state.nbTotalPret;
  const sendedData = Location.state && Location.state.data;
  console.log(sendedData);

  const compterMatiereParSemaine = (semaine) => {
    const occurrences = {};

    semaine.forEach((cours) => {
      const matiere = cours.Nom_Matiere;

      if (occurrences[matiere]) {
        occurrences[matiere]++;
      } else {
        occurrences[matiere] = 1;
      }
    });

    return occurrences;
  };

  const newJson = compterMatiereParSemaine(sendedData);

  const totalCount = Object.values(newJson).reduce(
    (total, count) => total + count,
    0
  );

  const MatiereNames = Object.keys(newJson);

  const options = {
    responsive: true,
    scales: {
      y: {
        max: totalCount,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Histogramme des totals des cours",
      },
    },
  };

  const labels = MatiereNames;

  const data = {
    labels,
    datasets: [
      {
        label: "Nom des matieres",
        data: MatiereNames.map((matiere) => newJson[matiere]),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <Box
        id="chart-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 200px 50px 200px",
        }}
      >
        <Bar options={options} data={data} />
      </Box>
      <Box>
        <BoxAA>
          <Button onClick={() => Navigate("/Dashboard")}>Retourner</Button>
        </BoxAA>
      </Box>
    </>
  );
}
