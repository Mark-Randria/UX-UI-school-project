import React from "react";
import axios from "axios";

import {
  Title,
  Container,
  Box,
  GapComponents,
  StyledColumnHeader,
  StyledDataGrid,
} from "../maincontent.style";

import Button from "../../buttons/button";

import { frFR } from "@mui/x-data-grid";

export default function Timetable() {
  const [scheduleData, setScheduleData] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const [rows, setRows] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);

  const handleChange = (row) => {
    console.log("Changed clicked for row:", row);
    setOpen(true);
    setSelectedRow(row);
  };

  const HandleDelete = (row) => {
    console.log("Delete clicked for row:", row);
    setSelectedRow(row);
  };

  const dayNameComparator = (dayName1, dayName2) => {
    const dayOrder = {
      Lundi: 1,
      Mardi: 2,
      Mercredi: 3,
      Jeudi: 4,
      Vendredi: 5,
      Samedi: 6,
      Dimanche: 7,
    };

    return dayOrder[dayName1] - dayOrder[dayName2];
  };

  const columns = [
    {
      field: "Semaine",
      flex: 1,
      editable: false,
      renderHeader: () => <StyledColumnHeader>Semaine</StyledColumnHeader>,
    },
    {
      field: "Nom_Classe",
      flex: 2,
      editable: false,
      renderHeader: () => <StyledColumnHeader>Classe</StyledColumnHeader>,
    },
    {
      field: "Nom_Jour",
      flex: 1,
      editable: false,
      sortComparator: (v1, v2, cellParams1, cellParams2) =>
        dayNameComparator(v1, v2), // Use the custom comparator
      renderHeader: () => <StyledColumnHeader>Jour</StyledColumnHeader>,
    },
    {
      field: "Plage_Horaire",
      sortable: true,
      flex: 2,
      valueGetter: (params) =>
        `${params.row.Debut_Horaire || ""} - ${params.row.Fin_Horaire || ""}`,
      renderHeader: () => <StyledColumnHeader>Heure de cours</StyledColumnHeader>,
    },
    {
      field: "Nom_Salle",
      flex: 2,
      editable: false,
      renderHeader: () => <StyledColumnHeader>Salle</StyledColumnHeader>,
    },
    {
      field: "Nom_Matiere",
      flex: 2,
      editable: false,
      renderHeader: () => <StyledColumnHeader>Matière</StyledColumnHeader>,
    },
    {
      field: "Nom_Professeur",
      description: "Le nom des professeurs",
      flex: 2,
      editable: false,
      renderHeader: () => <StyledColumnHeader>Professeur</StyledColumnHeader>,
    },
    {
      field: "actions",
      sortable: false,
      flex: 5,
      renderHeader: () => <StyledColumnHeader>Actions</StyledColumnHeader>,
      renderCell: (params) => (
        <>
          <Button color="info" onClick={() => handleChange(params.row)}>
            Modifier
          </Button>
          <GapComponents gapX="10px" />
          <Button color="danger" onClick={() => HandleDelete(params.row)}>
            Supprimer
          </Button>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.43.252/backend_IHM/api/api_emploi_ko.php"
        );
        setScheduleData(response.data); // Save the response data instead of the entire response object
        setRows(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Render loading state if data is not yet available
  if (scheduleData === null) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>Emploi du temps</Title>
      <Box>
        <StyledDataGrid
          rows={rows}
          getRowId={(row) => row.ID_Emploi}
          columns={columns}
          localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={[8]}
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
}
