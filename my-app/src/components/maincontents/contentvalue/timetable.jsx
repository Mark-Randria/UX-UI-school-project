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

import { Pencil2Icon, Cross1Icon, CheckIcon } from "@radix-ui/react-icons";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

import Button from "../../buttons/button";
import Input from "../../inputs/input";
import Modal from "../../modals/modals";

import { frFR } from "@mui/x-data-grid";

export default function Timetable() {
  const [scheduleData, setScheduleData] = React.useState([]);

  const [rows, setRows] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);

  const [isOpen, setIsOpen] = React.useState(false);

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [hours, setHours] = React.useState([]);
  const [selectedHour, setSelectedHour] = React.useState("");

  const [rooms, setRooms] = React.useState([]);
  const [selectedRoom, setSelectedRoom] = React.useState("");

  const [days, setDays] = React.useState([]);
  const [selectedDay, setSelectedDay] = React.useState("");

  const [classes, setClasses] = React.useState([]);
  const [selectedClass, setSelectedClass] = React.useState("");

  const [weeks, setWeeks] = React.useState([]);
  const [selectedWeek, setSelectedWeek] = React.useState("");

  const [teachers, setTeachers] = React.useState([]);
  const [teacher, setTeacher] = React.useState("");
  const [selectedTeacher, setSelectedTeacher] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.43.252/backend_IHM/api/api_emploi_ko.php"
        );

        const responseHours = await axios.get(
          "http://192.168.43.252/backend_IHM/api/api_heure.php"
        );
        const responseRooms = await axios.get(
          "http://192.168.43.252/backend_IHM/api/api_salle.php"
        );
        const responseDays = await axios.get(
          "http://192.168.43.252/backend_IHM/api/api_jour.php"
        );
        const responseClasses = await axios.get(
          "http://192.168.43.252/backend_IHM/api/api_classe.php"
        );
        const responseTeachers = await axios.get(
          "http://192.168.43.252/backend_IHM/api/api_prof.php"
        );
        setScheduleData(response.data);
        setRows(response.data);
        setHours(responseHours.data);
        setRooms(responseRooms.data);
        setDays(responseDays.data);
        setClasses(responseClasses.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(teachers);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedClass("");
    setSelectedDay("");
    setSelectedRoom("");
    setSelectedHour("");
    setTeacher("");
  };

  const handleChangeHours = (event) => {
    setSelectedHour(event.target.value);
  };

  const handleChangeRooms = (event) => {
    setSelectedRoom(event.target.value);
  };

  const handleChangeDays = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleChangeClasses = async (event) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);
    setTeacher("");
    try {
      const response = await axios.get(
        `http://192.168.43.252/backend_IHM/api/api.php?matiereProf&idClasse=${selectedClass}`
      );
      setSelectedTeacher(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeWeeks = (event) => {
    setSelectedWeek(event.target.value);
  };

  function handleChangeTeachers(event) {
    let a = event.target.value;
    console.log(a);
    setTeacher(a);
  }

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

  const handleChangeJSX = (
    <>
      <Box2>
        <InputLabel id="Class-label">Classe</InputLabel>
        <Select
          labelId="Class-label"
          value={selectedClass}
          defaultValue=""
          onChange={handleChangeClasses}
        >
          {classes &&
            classes.map((data) => (
              <MenuItem key={data.ID_Classe} value={data.ID_Classe}>
                {data.Nom_Classe}
              </MenuItem>
            ))}
        </Select>
      </Box2>
      <GapComponents gapY="10px" />
      <Box2>
        <InputLabel id="Week-label">Semaine</InputLabel>
        <TextField
          id="Week-label"
          value={selectedRow.Semaine}
          defaultValue=""
          onChange={handleChangeWeeks}
        />
      </Box2>
      <GapComponents gapY="10px" />
      <Box2>
        <InputLabel id="Day-label">Jour</InputLabel>
        <Select
          labelId="Day-label"
          value={selectedDay}
          defaultValue=""
          onChange={handleChangeDays}
        >
          {days &&
            days.map((data) => (
              <MenuItem key={data.ID_Jour} value={data.ID_Jour}>
                {data.Nom_Jour}
              </MenuItem>
            ))}
        </Select>
      </Box2>
      <GapComponents gapY="10px" />
      <Box2>
        <InputLabel id="Room-label">Salle</InputLabel>
        <Select
          labelId="Room-label"
          value={selectedRoom}
          defaultValue=""
          onChange={handleChangeRooms}
        >
          {rooms &&
            rooms.map((data) => (
              <MenuItem key={data.ID_Salle} value={data.ID_Salle}>
                {data.Nom_Salle}
              </MenuItem>
            ))}
        </Select>
      </Box2>
      <GapComponents gapY="10px" />
      <Box2>
        <InputLabel id="Hour-label">Plage Horaire</InputLabel>
        <Select
          labelId="Hour-label"
          value={selectedHour}
          defaultValue=""
          onChange={handleChangeHours}
        >
          {hours &&
            hours.map((data, index) => (
              <MenuItem key={index} value={data.ID_Horaire}>
                {`${data.Debut_Horaire || ""} - ${data.Fin_Horaire || ""}  `}
              </MenuItem>
            ))}
        </Select>
      </Box2>
      <GapComponents gapY="10px" />
      <Box2>
        <InputLabel id="Teacher-label">Matière (avec Prof)</InputLabel>
        <Select
          labelId="Teacher-label"
          value={teacher}
          defaultValue=""
          onChange={handleChangeTeachers}
        >
          {Object.entries(selectedTeacher).map(([id, value]) => (
            <MenuItem key={id} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Box2>
      <GapComponents gapY="10px" />
      <EndBox>
        <Button color="info" width="100px">
          <BoxIcons>
            Confirmer
            <GapComponents gapX="5px" />
            <CheckIcon />
          </BoxIcons>
        </Button>
        <GapComponents gapX="10px" />
        <Button color="warning" width="100px">
          <BoxIcons>
            Retour
            <GapComponents gapX="5px" />
            <Cross1Icon />
          </BoxIcons>
        </Button>
      </EndBox>
    </>
  );

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

  if (scheduleData === null && hours === null) {
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
          inputComponents={handleChangeJSX}
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
