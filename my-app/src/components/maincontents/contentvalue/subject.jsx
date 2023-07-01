import React from "react";
import axios from "axios";

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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Button from "../../buttons/button";
import Modal from "../../modals/modals";
import Alert from "../../alerts/alert";

export default function Subject() {
  const [subjectData, setSubjectData] = React.useState(null);
  const [classData, setClassData] = React.useState(null);
  const [teacherData, setTeacherData] = React.useState(null);

  const [selectedSubject, setSelectedSubject] = React.useState("");
  const [selectedClass, setSelectedClass] = React.useState("");
  const [selectedTeacher, setSelectedTeacher] = React.useState("");

  const [selectedIdSubject, setSelectedIdSubject] = React.useState(null);
  const [selectedIdClass, setSelectedIdClass] = React.useState(null);
  const [selectedIdTeacher, setSelectedIdTeacher] = React.useState(null);

  const [subject, setSubject] = React.useState(null);
  const [classes, setClasses] = React.useState(null);
  const [teacher, setTeacher] = React.useState(null);

  const [idSubject, setIdSubject] = React.useState(null);
  const [idClass, setIdClass] = React.useState(null);
  const [idTeacher, setIdTeacher] = React.useState(null);

  const [rows, setRows] = React.useState([]);

  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenA, setIsOpenA] = React.useState(false);
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
          "http://192.168.43.252/backend_IHM/api/api_matiere.php"
        );
        const responseTeacher = await axios.get(
          "http://192.168.43.252/backend_IHM/api/api_matiere.php?prof"
        );
        const responseClass = await axios.get(
          "http://192.168.43.252/backend_IHM/api/api_matiere.php?classes"
        );
        setSubjectData(response.data);
        setTeacherData(responseTeacher.data);
        setClassData(responseClass.data);
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
    setSelectedSubject("");
    openModal();
    setTitle("Ajout d'une matiere");
    setDescription("Veuilez ajouter un nouveau matiere");
  };

  const handleChange = (row) => {
    openModalA();
    console.log(row);
  };

  const handleDelete = (row) => {
    openModalB();
    console.log(row);
  };

  const handleReset = () => {};

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedSubject) {
      setMessage("Le champ ne doit pas etre vide");
      setSeverity("error");
      ShowAlert();
    } else {
      console.log("hehehe");
    }
  };

  const handleAddJSX = (
    <>
      <Box2>
        <InputLabel id="Subject-label">Matiere</InputLabel>
        <TextField
          id="Subject-label"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          autoComplete="off"
        />
      </Box2>
      <GapComponents gapY="10px" />
      <Box2>
        <InputLabel id="Teacher-label">Professeur</InputLabel>
        <Select
          labelId="Teacher-label"
          value={selectedTeacher}
          onChange={(e) => {
            setSelectedTeacher(e.target.value);
          }}
        >
          {teacherData &&
            teacherData.map((data) => (
              <MenuItem key={data.ID_Professeur} value={data.ID_Professeur}>
                {data.Nom_Professeur}
              </MenuItem>
            ))}
        </Select>
      </Box2>
      <GapComponents gapY="10px" />
      <Box2>
        <InputLabel id="Class-label">Classe</InputLabel>
        <Select
          labelId="Class-label"
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
          }}
        >
          {classData &&
            classData.map((data) => (
              <MenuItem key={data.ID_Classe} value={data.ID_Classe}>
                {data.Nom_Classe}
              </MenuItem>
            ))}
        </Select>
      </Box2>
      <GapComponents gapY="10px" />
      <EndBox>
        <Button color="info" width="100px" >
          <BoxIcons>
            Confirmer
            <GapComponents gapX="5px" />
            <CheckIcon />
          </BoxIcons>
        </Button>
        <GapComponents gapX="10px" />
        <Button color="notimportant">
          <BoxIcons>
            Retour
            <GapComponents gapX="5px" />
            <Cross1Icon />
          </BoxIcons>
        </Button>
        <GapComponents gapX="10px" />
      </EndBox>
    </>
  );

  const columns = [
    {
      field: "Nom_Matiere",
      flex: 2,
      editable: false,
      renderHeader: () => <StyledColumnHeader>Matiere</StyledColumnHeader>,
    },
    {
      field: "Nom_Professeur",
      flex: 2,
      editable: false,
      renderHeader: () => (
        <StyledColumnHeader>Nom du professeur</StyledColumnHeader>
      ),
    },
    {
      field: "Nom_Classe",
      flex: 2,
      editable: false,
      renderHeader: () => <StyledColumnHeader>Classe</StyledColumnHeader>,
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

  return (
    <Container>
      <Title>Matiere</Title>
      <Modal
        open={isOpen}
        closeModal={closeModal}
        title={title}
        description={description}
        data={subjectData}
        inputComponents={handleAddJSX}
      />
      {/* <Modal
        open={isOpenA}
        closeModal={closeModal}
        title={title}
        description={description}
        data={subjectData}
        inputComponents={handleModifyJSX}
      />
      <Modal
        open={isOpenB}
        closeModal={closeModal}
        title={title}
        description={description}
        data={subjectData}
        inputComponents={handleDeleteJSX}
      /> */}
      <Box>
        {/* <StyledDataGrid
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
        /> */}
        <GapComponents gapY="20px" />
        <Button width="10vw" minWidth="78px" onClick={handleAdd}>
          Ajouter une Matiere
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
