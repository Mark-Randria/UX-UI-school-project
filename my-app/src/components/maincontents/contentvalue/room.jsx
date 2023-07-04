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

import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

import Button from "../../buttons/button";
import Modal from "../../modals/modals";
import Alert from "../../alerts/alert";

export default function Room() {
  const Navigate = useNavigate();

  const [roomData, setRoomData] = React.useState(null);
  const [selectedRoom, setSelectedRoom] = React.useState("");

  const [room, setRoom] = React.useState("");
  const [idRoom, setIdRoom] = React.useState("");

  const [rows, setRows] = React.useState([]);

  const [isOpen, setIsOpen] = React.useState(false);

  const [isOpenA, setIsOpenA] = React.useState(false);
  // I used A and B, somehow I'm running out of variable's name idea xD

  const [isOpenB, setIsOpenB] = React.useState(false);

  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("");

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.43.252/backend_IHM/api/api_salle.php"
        );
        setRoomData(response.data);
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

  const openModalB = () => {
    setIsOpenB(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsOpenA(false);
    setIsOpenB(false);
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

  const handleAdd = () => {
    setSelectedRoom("");
    openModal();
    setTitle("Ajout d'une salle");
    setDescription("Veuiller ajouter une nouvelle salle de classe");
  };

  const handleChange = (row) => {
    openModalA();
    setRoom(row.Nom_Salle);
    setIdRoom(row.ID_Salle);
    setTitle("Modification de la salle");
    setDescription("Veuiller modifier les valeurs");
  };

  const handleDelete = (row) => {
    openModalB();
    setSelectedRoom(row);
    setTitle("Suppression de l'emploi du temps");
    setDescription("Voulez-vous supprimer cet emploi du temps ?");
  };

  const handleReset = () => {
    setSelectedRoom("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedRoom) {
      setMessage("Le champ ne doit pas etre vide");
      setSeverity("error");
      ShowAlert();
    } else {
      const requestData = {
        nomsalle: selectedRoom,
      };
      const data = JSON.stringify(requestData);
      try {
        const response = await axios.post(
          "http://192.168.43.252/backend_IHM/api/api_salle.php",
          data
        );
        setMessage("La salle a bien été ajouté");
        setSeverity("success");
        ShowAlert();
        setSelectedRoom("");
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        const errorMessage = error.response.data.message;
        const errorStringMessage = "La salle existe déjà.";
        if (errorMessage === errorStringMessage) {
          setMessage("La salle est déjà existante.");
          setSeverity("warning");
          ShowAlert();
        }
      }
    }
  };

  const handleSubmitModify = async (event) => {
    event.preventDefault();
    console.log(idRoom, room);
    if (!room) {
      setMessage("Le champ ne doit pas etre vide");
      setSeverity("error");
      ShowAlert();
    } else {
      const requestData1 = {
        idsalle: idRoom,
        nomsalle: room,
      };
      const data = JSON.stringify(requestData1);
      try {
        const response = await axios.put(
          `http://192.168.43.252/backend_IHM/api/api_salle.php?id=${idRoom}`,
          data
        );
        setMessage("La salle a bien été modifié ");
        setSeverity("success");
        ShowAlert();
        setSelectedRoom("");
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        const errorMessage = error.response.data.message;
        const errorStringMessage = "La salle existe déjà.";
        if (errorMessage === errorStringMessage) {
          setMessage("La salle est déjà existante.");
          setSeverity("warning");
          ShowAlert();
        }
      }
    }
  };

  const handleSubmitDelete = async (event) => {
    event.preventDefault();
    console.log(selectedRoom);
    let id = selectedRoom.ID_Salle;
    axios
      .delete(`http://192.168.43.252/backend_IHM/api/api_salle.php?id=${id}`)
      .then((response) => {
        setMessage("La salle a été bien supprimé.");
        setSeverity("info");
        ShowAlert();
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log("Deletion failed", error);
      });
  };

  const handleChangeRooms = (event) => {
    setSelectedRoom(event.target.value);
  };

  const handleModifyRooms = (event) => {
    setRoom(event.target.value);
  };

  const handleAddJSX = (
    <>
      <Box2>
        <InputLabel id="Room-label">Salle</InputLabel>
        <TextField
          id="Room-label"
          value={selectedRoom}
          onChange={handleChangeRooms}
          autoComplete="off"
        />
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
        <Button color="notimportant" onClick={handleReset}>
          <BoxIcons>
            Effacer
            <GapComponents gapX="5px" />
            <Cross1Icon />
          </BoxIcons>
        </Button>
        <GapComponents gapX="10px" />
      </EndBox>
    </>
  );

  const handleModifyJSX = (
    <>
      <Box2>
        <InputLabel id="Room-label">Salle</InputLabel>
        <TextField
          id="Room-label"
          value={room}
          onChange={handleModifyRooms}
          autoComplete="off"
        />
      </Box2>
      <GapComponents gapY="10px" />
      <EndBox>
        <Button color="info" onClick={handleSubmitModify}>
          <BoxIcons>
            Confirmer
            <GapComponents gapX="5px" />
            <CheckIcon />
          </BoxIcons>
        </Button>
        <GapComponents gapX="10px" />
        <Button color="notimportant" onClick={handleReset}>
          <BoxIcons>
            Effacer
            <GapComponents gapX="5px" />
            <Cross1Icon />
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
      field: "Nom_Salle",
      flex: 2,
      editable: false,
      renderHeader: () => <StyledColumnHeader>Salle</StyledColumnHeader>,
    },
    {
      field: "actions",
      sortable: false,
      flex: 2,
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

  if (roomData === null) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>Salle de Classe</Title>
      <Modal
        open={isOpen}
        closeModal={closeModal}
        title={title}
        description={description}
        data={roomData}
        inputComponents={handleAddJSX}
      />
      <Modal
        open={isOpenA}
        closeModal={closeModal}
        title={title}
        description={description}
        data={roomData}
        inputComponents={handleModifyJSX}
      />
      <Modal
        open={isOpenB}
        closeModal={closeModal}
        title={title}
        description={description}
        data={roomData}
        inputComponents={handleDeleteJSX}
      />
      <Box>
        <StyledDataGrid
          rows={rows}
          getRowId={(row) => row.ID_Salle}
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
          Ajouter une salle
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
