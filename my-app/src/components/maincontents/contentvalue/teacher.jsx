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

export default function Teacher() {
  const [teacherData, setTeacherData] = React.useState(null);
  const [selectedTeacher, setSelectedTeacher] = React.useState("");

  const [teachers, setTeachers] = React.useState("");
  const [idTeachers, setIdTeachers] = React.useState("");

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
          "http://192.168.43.252/backend_IHM/api/api_prof.php"
        );
        setTeacherData(response.data);
        setRows(response.data);
        console.log(response.data);
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
    setSelectedTeacher("");
    openModal();
    setTitle("Ajout d'un(e) enseignant(e)");
    setDescription("Veuiller ajouter un professeur");
  };

  const handleChange = (row) => {
    openModalA();
    setTeachers(row.Nom_Professeur);
    setIdTeachers(row.ID_Professeur);
    setTitle("Modification d'un professeur");
    setDescription("Veuiller modifier les valeurs");
  };

  const handleDelete = (row) => {
    openModalB();
    setSelectedTeacher(row);
    setTitle("Suppression d'un(e) enseignant(e)");
    setDescription("Voulez-vous supprimer ce professeur ?");
  };

  const handleReset = () => {
    setSelectedTeacher("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedTeacher) {
      setMessage("Le champ ne doit pas etre vide");
      setSeverity("error");
      ShowAlert();
    } else {
      const requestData = {
        nomEns: selectedTeacher,
      };
      const data = JSON.stringify(requestData);
      try {
        const response = await axios.post(
          "http://192.168.43.252/backend_IHM/api/api_prof.php",
          data
        );
        setMessage("Le professeur à bien été ajouté");
        setSeverity("success");
        ShowAlert();
        setSelectedTeacher("");
      } catch (error) {
        const errorMessage = error.response.data.message;
        const errorStringMessage = "Le Prof existe déjà.";
        if (errorMessage === errorStringMessage) {
          setMessage("Ce professeur est déjà présent.");
          setSeverity("warning");
          ShowAlert();
        }
      }
    }
  };

  const handleSubmitModify = async (event) => {
    event.preventDefault();
    console.log(idTeachers, teachers);
    if (!teachers) {
      setMessage("Le champ ne doit pas etre vide");
      setSeverity("error");
      ShowAlert();
    } else {
      const requestData = {
        idProf: idTeachers,
        nomEns: teachers,
      };
      const data = JSON.stringify(requestData);
      try {
        const response = await axios.put(
          `http://192.168.43.252/backend_IHM/api/api_prof.php?id=${idTeachers}`,
          data
        );
        setMessage("Le professeur à bien été modifié ");
        setSeverity("success");
        ShowAlert();
        setSelectedTeacher("");
      } catch (error) {
        const errorMessage = error.response.data.message;
        const errorStringMessage = "Le Prof existe déjà.";
        if (errorMessage === errorStringMessage) {
          setMessage("Ce professeur est déjà présent.");
          setSeverity("warning");
          ShowAlert();
        }
      }
    }
  };

  const handleSubmitDelete = async (event) => {
    event.preventDefault();
    console.log(selectedTeacher);
    let id = selectedTeacher.ID_Professeur;
    axios
      .delete(`http://192.168.43.252/backend_IHM/api/api_prof.php?id=${id}`)
      .then((response) => {
        setMessage("Ce professeur à bien été retiré.");
        setSeverity("info");
        ShowAlert();
      })
      .catch((error) => {
        console.log("Deletion failed", error);
      });
  };

  const handleChangeTeachers = (event) => {
    setSelectedTeacher(event.target.value);
  };

  const handleModifyTeachers = (event) => {
    setTeachers(event.target.value);
  };

  const handleAddJSX = (
    <>
      <Box2>
        <InputLabel id="Teacher-label">Professeur</InputLabel>
        <TextField
          id="Teacher-label"
          value={selectedTeacher}
          onChange={handleChangeTeachers}
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
        <InputLabel id="Teacher-label">Professeur</InputLabel>
        <TextField
          id="Teacher-label"
          value={teachers}
          onChange={handleModifyTeachers}
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
      field: "Nom_Professeur",
      flex: 2,
      editable: false,
      renderHeader: () => (
        <StyledColumnHeader>Noms des professeurs</StyledColumnHeader>
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
  if (teacherData === null) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>Professeurs</Title>
      <Modal
        open={isOpen}
        closeModal={closeModal}
        title={title}
        description={description}
        data={teacherData}
        inputComponents={handleAddJSX}
      />
      <Modal
        open={isOpenA}
        closeModal={closeModal}
        title={title}
        description={description}
        data={teacherData}
        inputComponents={handleModifyJSX}
      />
      <Modal
        open={isOpenB}
        closeModal={closeModal}
        title={title}
        description={description}
        data={teacherData}
        inputComponents={handleDeleteJSX}
      />
      <Box>
        <StyledDataGrid
          rows={rows}
          getRowId={(row) => row.ID_Professeur}
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
          Ajouter un professeur
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
