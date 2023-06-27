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

export default function Class() {
  const [classData, setClassData] = React.useState(null);
  const [selectedClass, setSelectedClass] = React.useState("");

  const [classes, setClasses] = React.useState("");
  const [idClasses, setIdClasses] = React.useState("");

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
          "http://192.168.43.252/backend_IHM/api/api_classe.php"
        );
        setClassData(response.data);
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
    setSelectedClass("");
    openModal();
    setTitle("Ajout d'une classe");
    setDescription("Veuiller ajouter une nouvelle classe");
  };

  const handleChange = (row) => {
    openModalA();
    setClasses(row.Nom_Classe);
    setIdClasses(row.ID_Classe);
    setTitle("Modification de la classe");
    setDescription("Veuiller modifier les valeurs");
  };

  const handleDelete = (row) => {
    openModalB();
    setSelectedClass(row);
    setTitle("Suppression d' une classe");
    setDescription("Voulez-vous supprimer cette classe ?");
  };

  const handleReset = () => {
    setSelectedClass("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedClass) {
      setMessage("Le champ ne doit pas etre vide");
      setSeverity("error");
      ShowAlert();
    } else {
      const requestData = {
        nomClasse: selectedClass,
      };
      const data = JSON.stringify(requestData);
      try {
        const response = await axios.post(
          "http://192.168.43.252/backend_IHM/api/api_classe.php",
          data
        );
        setMessage("La classe à bien été ajouté");
        setSeverity("success");
        ShowAlert();
        setSelectedClass("");
      } catch (error) {
        const errorMessage = error.response.data.message;
        const errorStringMessage = "La classe existe déjà.";
        if (errorMessage === errorStringMessage) {
          setMessage("La classe est déjà existante.");
          setSeverity("warning");
          ShowAlert();
        }
      }
    }
  };

  const handleSubmitModify = async (event) => {
    event.preventDefault();
    console.log(idClasses, classes);
    if (!classes) {
      setMessage("Le champ ne doit pas etre vide");
      setSeverity("error");
      ShowAlert();
    } else {
      const requestData = {
        idClasse: idClasses,
        nomClasse: classes,
      };
      const data = JSON.stringify(requestData);
      try {
        const response = await axios.put(
          `http://192.168.43.252/backend_IHM/api/api_classe.php?id=${idClasses}`,
          data
        );
        setMessage("La classe à bien été modifié ");
        setSeverity("success");
        ShowAlert();
        setSelectedClass("");
      } catch (error) {
        const errorMessage = error.response.data.message;
        const errorStringMessage = "La classe existe déjà.";
        if (errorMessage === errorStringMessage) {
          setMessage("La classe est déjà existante.");
          setSeverity("warning");
          ShowAlert();
        }
      }
    }
  };

  const handleSubmitDelete = async (event) => {
    event.preventDefault();
    console.log(selectedClass);
    let id = selectedClass.ID_Classe;
    axios
      .delete(`http://192.168.43.252/backend_IHM/api/api_classe.php?id=${id}`)
      .then((response) => {
        setMessage("Cette classe à été bien supprimé.");
        setSeverity("info");
        ShowAlert();
      })
      .catch((error) => {
        console.log("Deletion failed", error);
      });
  };

  const handleChangeClasses = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleModifyClasses = (event) => {
    setClasses(event.target.value);
  };

  const handleAddJSX = (
    <>
      <Box2>
        <InputLabel id="Classe-label">Classe</InputLabel>
        <TextField
          id="Classe-label"
          value={selectedClass}
          onChange={handleChangeClasses}
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
        <InputLabel id="Classe-label">Classe</InputLabel>
        <TextField
          id="Classe-label"
          value={classes}
          onChange={handleModifyClasses}
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
      field: "Nom_Classe",
      flex: 2,
      editable: false,
      renderHeader: () => (
        <StyledColumnHeader>Nom de la classe</StyledColumnHeader>
      ),
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

  // Render loading state if data is not yet available
  if (classData === null) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <Title>Classe</Title>
      <Modal
        open={isOpen}
        closeModal={closeModal}
        title={title}
        description={description}
        data={classData}
        inputComponents={handleAddJSX}
      />
      <Modal
        open={isOpenA}
        closeModal={closeModal}
        title={title}
        description={description}
        data={classData}
        inputComponents={handleModifyJSX}
      />
      <Modal
        open={isOpenB}
        closeModal={closeModal}
        title={title}
        description={description}
        data={classData}
        inputComponents={handleDeleteJSX}
      />
      <Box>
        <StyledDataGrid
          rows={rows}
          getRowId={(row) => row.ID_Classe}
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
          Ajouter une classe
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
