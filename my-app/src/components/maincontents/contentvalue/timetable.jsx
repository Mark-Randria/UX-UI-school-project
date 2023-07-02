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
import Alert from "../../alerts/alert";

import { GridToolbar, frFR } from "@mui/x-data-grid";

export default function Timetable() {
  const [scheduleData, setScheduleData] = React.useState([]);

  const [rows, setRows] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [idSchedule, setIdSchedule] = React.useState("");

  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenA, setIsOpenA] = React.useState(false);
  const [isOpenB, setIsOpenB] = React.useState(false);

  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("");

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
    setSelectedRow([]);
    setSelectedClass("");
    setSelectedDay("");
    setSelectedRoom("");
    setSelectedHour("");
    setSelectedTeacher("");
    setTeacher("");
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
    const a = event.target.value;
    setTeacher(a);
  }

  const handleAdd = () => {
    setSelectedRow([]);
    openModal();
    setTitle("Ajout emploi du temps");
    setDescription("Veuiller ajouter une nouvelle emploi du temps");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !(selectedRow.Semaine || selectedWeek) ||
      !selectedDay ||
      !selectedHour ||
      !selectedClass ||
      !selectedRoom ||
      !teacher
    ) {
      setMessage("Veuillez remplir le formulaire");
      setSeverity("error");
      ShowAlert();
    } else {
      const requestData = {
        semEntrer: selectedRow.Semaine || selectedWeek,
        idJour: selectedDay,
        idHoraire: selectedHour,
        idClasse: selectedClass,
        idSalle: selectedRoom,
        idMatiere: teacher,
      };
      const data = JSON.stringify(requestData);
      axios
        .post(`http://localhost/backend_IHM/api/api_emploi_ko.php`, data)
        .then((response) => {
          setMessage("Nouvel emploi du temps ajouté");
          setSeverity("success");
          ShowAlert();
          closeModal();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          setMessage(error.response.data.message);
          setSeverity("warning");
          ShowAlert();
        });
    }
  };

  const handleChange = async (row) => {
    console.log(row);
    setSelectedRow(row);
    setIdSchedule(row.ID_Emploi);
    openModalA();
    setTitle("Modification de l'emploi du temps");
    setDescription("Veuiller modifier les valeurs");
    let classId = "";
    if (row.Nom_Classe) {
      const selectedClassData = classes.find(
        (data) => data.Nom_Classe === row.Nom_Classe
      );
      classId = selectedClassData ? selectedClassData.ID_Classe : "";
    } else {
      classId = selectedClass;
    }
    setSelectedClass(classId);
    try {
      const response = await axios.get(
        `http://192.168.43.252/backend_IHM/api/api.php?matiereProf&idClasse=${classId}`
      );
      setSelectedTeacher(response.data);
    } catch (error) {
      console.log(error);
    }
    setSelectedDay(
      row.Nom_Jour
        ? days.find((data) => data.Nom_Jour === row.Nom_Jour)?.ID_Jour || ""
        : selectedDay
    );
    setSelectedRoom(
      row.Nom_Salle
        ? rooms.find((data) => data.Nom_Salle === row.Nom_Salle)?.ID_Salle || ""
        : selectedRoom
    );
  };

  const handleSubmitModify = async (event) => {
    event.preventDefault();
    let id = idSchedule;
    if (
      !(selectedRow.Semaine || selectedWeek) ||
      !selectedDay ||
      !selectedHour ||
      !selectedClass ||
      !selectedRoom ||
      !teacher
    ) {
      setMessage("Veuillez remplir le formulaire");
      setSeverity("error");
      ShowAlert();
    } else {
      const requestData = {
        semEntrer: selectedRow.Semaine || selectedWeek,
        idJour: selectedDay,
        idHoraire: selectedHour,
        idClasse: selectedClass,
        idSalle: selectedRoom,
        idMatiere: teacher,
      };
      const data = JSON.stringify(requestData);
      axios
        .put(`http://localhost/backend_IHM/api/api_emploi.php?id=${id}`, data)
        .then((response) => {
          setMessage("Emploi du temps modifié avec succes");
          setSeverity("success");
          ShowAlert();
          closeModal();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const HandleDelete = (row) => {
    setSelectedRow(row);
    setIdSchedule(row.ID_Emploi);
    openModalB();
    setTitle("Suppression de l'emploi du temps");
    setDescription("Voulez-vous supprimer cet emploi du temps ?");
  };

  const handleSubmitDelete = async (event) => {
    event.preventDefault();
    let id = idSchedule;
    axios
      .delete(`http://localhost/backend_IHM/api/api_heure.php?id=${id}`)
      .then((response) => {
        setMessage("L'emploi du temps à bien été supprimé.");
        setSeverity("info");
        ShowAlert();
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }).catch((error) => {
        console.log(error);
      });
  };

  const handleAddJSX = (
    <>
      <Box2>
        <InputLabel id="Class-label">Classe</InputLabel>
        <Select
          labelId="Class-label"
          value={selectedClass}
          onChange={handleChangeClasses}
          disabled={
            selectedRow.Nom_Classe && selectedRow.Nom_Classe !== selectedClass
          }
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
          value={selectedRow.Semaine || selectedWeek}
          onChange={handleChangeWeeks}
          autoComplete="off"
        />
      </Box2>
      <GapComponents gapY="10px" />
      <Box2>
        <InputLabel id="Day-label">Jour</InputLabel>
        <Select
          labelId="Day-label"
          value={selectedDay}
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
          onChange={handleChangeTeachers}
          disabled={selectedClass === "" || selectedTeacher.length === 0}
        >
          {console.log(selectedTeacher)}
          {Object.entries(selectedTeacher).map(([id, value]) => (
            <MenuItem key={id} value={id}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Box2>
      <GapComponents gapY="10px" />
      <EndBox>
        <Button color="info" width="100px" onClick={handleSubmit}>
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

  const handleModifyJSX = (
    <>
      <Box2>
        <InputLabel id="Class-label">Classe</InputLabel>
        <Select
          labelId="Class-label"
          value={selectedClass}
          onChange={handleChangeClasses}
          disabled={
            selectedRow.Nom_Classe && selectedRow.Nom_Classe !== selectedClass
          }
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
          value={selectedRow.Semaine || selectedWeek}
          onChange={handleChangeWeeks}
          autoComplete="off"
        />
      </Box2>
      <GapComponents gapY="10px" />
      <Box2>
        <InputLabel id="Day-label">Jour</InputLabel>
        <Select
          labelId="Day-label"
          value={selectedDay}
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
          onChange={handleChangeTeachers}
          disabled={selectedClass === "" || selectedTeacher.length === 0}
        >
          {Object.entries(selectedTeacher).map(([id, value]) => (
            <MenuItem key={id} value={id}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Box2>
      <GapComponents gapY="10px" />
      <EndBox>
        <Button color="info" width="100px" onClick={handleSubmitModify}>
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

  const handleDeleteJSX = (
    <>
      <EndBox>
        <Button color="danger" onClick={handleSubmitDelete}>
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
      renderHeader: () => <StyledColumnHeader>Semaine du</StyledColumnHeader>,
    },
    {
      field: "Nom_Classe",
      flex: 1,
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
      flex: 1.5,
      valueGetter: (params) =>
        `${params.row.Debut_Horaire || ""} - ${params.row.Fin_Horaire || ""}`,
      renderHeader: () => (
        <StyledColumnHeader>Heure de cours</StyledColumnHeader>
      ),
    },
    {
      field: "Nom_Salle",
      flex: 1.5,
      editable: false,
      renderHeader: () => <StyledColumnHeader>Salle</StyledColumnHeader>,
    },
    {
      field: "Nom_Matiere",
      flex: 1.5,
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
          inputComponents={handleAddJSX}
        />
        <Modal
          open={isOpenA}
          closeModal={closeModal}
          title={title}
          description={description}
          data={selectedRow}
          inputComponents={handleModifyJSX}
        />
        <Modal
          open={isOpenB}
          closeModal={closeModal}
          title={title}
          description={description}
          data={selectedRow}
          inputComponents={handleDeleteJSX}
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
            slots={{ toolbar: GridToolbar }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
          <GapComponents gapY="20px" />
          <Button width="10vw" minWidth="147px" onClick={handleAdd}>
            Ajouter un emploi du temps
          </Button>
        </Box>
        <Alert
          open={open}
          setOpen={setOpen}
          message={message}
          severity={severity}
        />
      </Container>
    </>
  );
}
