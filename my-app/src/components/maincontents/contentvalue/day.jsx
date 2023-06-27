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
  StyledColumnHeader,
  StyledDataGrid,
} from "../maincontent.style";

import { frFR } from "@mui/x-data-grid";

import { Pencil2Icon, Cross1Icon, CheckIcon } from "@radix-ui/react-icons";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

import Button from "../../buttons/button";
import Modal from "../../modals/modals";
import Alert from "../../alerts/alert";

const jours = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

export default function Day() {
  const [dayData, setDayData] = React.useState(null);
  const [selectedDay, setSelectedDay] = React.useState("");

  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenA, setIsOpenA] = React.useState(false);

  const [day, setDay] = React.useState("");

  const [rows, setRows] = React.useState([]);

  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("");

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.43.252/backend_IHM/api/api_jour.php"
        );
        setDayData(response.data);
        setRows(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const openModalA = () => {
    setIsOpenA(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsOpenA(false);
  };

  const ShowAlert = () => {
    setOpen(true);
  };

  const CloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChangeDay = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleAdd = () => {
    setSelectedDay("");
    openModal();
    setTitle("Ajouter un jour");
    setDescription("Veuiller selectionner la valeur");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedDay) {
      setMessage("Le champ ne doit pas etre vide");
      setSeverity("error");
      ShowAlert();
    } else {
      const requestData = {
        nomjour: selectedDay,
      };
      const data = JSON.stringify(requestData);
      try {
        const response = await axios.post(
          "http://192.168.43.252/backend_IHM/api/api_jour.php",
          data
        );
        setMessage("Jour ajouté");
        setSeverity("success");
        ShowAlert();
        setSelectedDay("");
      } catch (error) {
        const errorMessage = error.response.data.message;
        const errorStringMessage = "Ce jour existe déjà.";
        if (errorMessage === errorStringMessage) {
          setMessage("Jour déjà existante.");
          setSeverity("warning");
          ShowAlert();
        }
      }
    }
  };

  const handleDelete = (row) => {
    openModalA();
    setSelectedDay(row);
    setTitle("Suppression de l'emploi du temps");
    setDescription("Voulez-vous supprimer cet emploi du temps ?");
  };

  const handleSubmitDelete = async (event) => {
    event.preventDefault();
    console.log(selectedDay);
    let id = selectedDay.ID_Jour;
    axios
      .delete(`http://192.168.43.252/backend_IHM/api/api_jour.php?id=${id}`)
      .then((response) => {
        setMessage("Ce jour à été bien supprimé.");
        setSeverity("info");
        ShowAlert();
      })
      .catch((error) => {
        console.log("Deletion failed", error);
      });
  };

  const handleAddJSX = (
    <>
      <Box2>
        <InputLabel id="Room-label">Salle</InputLabel>
        <Select
          labelId="Day-label"
          value={selectedDay}
          defaultValue=""
          onChange={handleChangeDay}
        >
          {jours.map((jour, index) => (
            <MenuItem key={index} value={jour}>
              {jour}
            </MenuItem>
          ))}
        </Select>
      </Box2>
      <GapComponents gapY="10px" />
      <EndBox>
        <Button color="info" onClick={handleSubmit}>
          <BoxIcons>
            Confirmer
            <GapComponents gapX="5px" />
            <CheckIcon />
          </BoxIcons>
        </Button>
        <GapComponents gapX="10px" />
      </EndBox>
    </>
  );

  const handleDeleteJSX = (
    <>
      <EndBox>
        <Button color="danger" width="88px" onClick={handleSubmitDelete}>
          <BoxIcons>
            <GapComponents gapX="5px" />
            Confirmer
          </BoxIcons>
        </Button>
        <GapComponents gapX="10px" />
      </EndBox>
    </>
  );

  const columns = [
    {
      field: "Nom_Jour",
      flex: 2,
      editable: false,
      renderHeader: () => (
        <StyledColumnHeader>Jour de la semaine</StyledColumnHeader>
      ),
    },
    {
      field: "actions",
      sortable: false,
      flex: 4,
      renderHeader: () => <StyledColumnHeader>Action</StyledColumnHeader>,
      renderCell: (params) => (
        <>
          <Button color="danger" onClick={() => handleDelete(params.row)}>
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

  if (dayData === null) {
    return <div>Loading...</div>;
  }
  console.log(dayData);
  return (
    <Container>
      <Title>Day</Title>
      <Modal
        open={isOpen}
        closeModal={closeModal}
        title={title}
        description={description}
        data={dayData}
        inputComponents={handleAddJSX}
      />
      <Modal
        open={isOpenA}
        closeModal={closeModal}
        title={title}
        description={description}
        data={dayData}
        inputComponents={handleDeleteJSX}
      />
      <Box>
        <StyledDataGrid
          rows={rows}
          getRowId={(row) => row.ID_Jour}
          columns={columns}
          localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7,
              },
            },
          }}
          pageSizeOptions={[7]}
          disableRowSelectionOnClick
        />
        <GapComponents gapY="20px" />
        <Button width="10vw" minWidth="78px" onClick={handleAdd}>
          Ajouter un jour
        </Button>
      </Box>
      <Alert
        open={open}
        setOpen={setOpen}
        message={message}
        severity={severity}
      />
    </Container>
  );
}
