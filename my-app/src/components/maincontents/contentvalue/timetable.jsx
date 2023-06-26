import React from "react";
import axios from "axios";

import {
  Title,
  Container,
  Box,
  BoxIcons,
  GapComponents,
  StyledColumnHeader,
  StyledDataGrid,
  CustomModal,
} from "../maincontent.style";

import { Pencil2Icon, Cross1Icon } from "@radix-ui/react-icons";

import Button from "../../buttons/button";
import Modal from "../../modals/modals";

import { frFR } from "@mui/x-data-grid";

export default function Timetable() {
  const [scheduleData, setScheduleData] = React.useState(null);

  const [rows, setRows] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);

  const [isOpen, setIsOpen] = React.useState(false);

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAdd = () => {
    setSelectedRow([]);
    openModal();
    setTitle("Ajout emploi du temps");
    setDescription("Veuiller ajouter une nouvelle emploi du temps");
  };

  const handleChange = (row) => {
    setSelectedRow(row);
    openModal();
    setTitle("Modification de l'emploi du temps");
    setDescription("Veuiller modifier les valeurs");
  };

  const HandleDelete = (row) => {
    setSelectedRow(row);
    openModal();
    setTitle("Suppression de l'emploi du temps");
    setDescription("Voulez-vous supprimer cet emploi du temps ?");
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
      flex: 2,
      editable: false,
      renderHeader: () => <StyledColumnHeader>Semaine du</StyledColumnHeader>,
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
        dayNameComparator(v1, v2),
      renderHeader: () => <StyledColumnHeader>Jour</StyledColumnHeader>,
    },
    {
      field: "Plage_Horaire",
      sortable: true,
      flex: 2,
      valueGetter: (params) =>
        `${params.row.Debut_Horaire || ""} - ${params.row.Fin_Horaire || ""}`,
      renderHeader: () => (
        <StyledColumnHeader>Heure de cours</StyledColumnHeader>
      ),
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
            <BoxIcons>
              <Pencil2Icon />
              <GapComponents gapX="5px" />
              Modifier
            </BoxIcons>
          </Button>
          <GapComponents gapX="10px" />
          <Button color="danger" onClick={() => HandleDelete(params.row)}>
            <BoxIcons>
              <Cross1Icon />
              <GapComponents gapX="5px" />
              Supprimer
            </BoxIcons>
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
        setScheduleData(response.data);
        setRows(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (scheduleData === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        <Title>Liste des Emploi du temps</Title>
        <Modal
          open={isOpen}
          closeModal={closeModal}
          title={title}
          description={description}
          data={selectedRow}
        />
        <Box>
          <StyledDataGrid
            rows={rows}
            getRowId={(row) => row.ID_Emploi}
            columns={columns}
            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
          <GapComponents gapY="20px" />
          <Button width="10vw" minWidth="78px" onClick={handleAdd}>
            Ajouter un emploi du temps
          </Button>
        </Box>
      </Container>
    </>
  );
}
