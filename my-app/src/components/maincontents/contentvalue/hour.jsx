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

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/fr";

import { Pencil2Icon, Cross1Icon, CheckIcon } from "@radix-ui/react-icons";

import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

import Button from "../../buttons/button";
import Modal from "../../modals/modals";
import Alert from "../../alerts/alert";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Hour() {
  const [hourData, setHourData] = React.useState(null);
  const [selectedFirstHour, setSelectedFirstHour] = React.useState(
    dayjs.utc("2022-04-17T07:00").local()
  );
  const [selectedLastHour, setSelectedLastHour] = React.useState(
    dayjs.utc("2022-04-17T09:00").local()
  );

  const [idHour, setIdHour] = React.useState("");

  const [rows, setRows] = React.useState("");

  const [isOpen, setIsOpen] = React.useState(false);

  const [isOpenA, setIsOpenA] = React.useState(false);

  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("");

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.43.252/backend_IHM/api/api_heure.php"
        );
        setHourData(response.data);
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

  const unixTimestampToHoursMinute = (timestamp) => {
    const timestampInMillis = timestamp * 1000;

    const dateObj = new Date(timestampInMillis);

    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const handleAdd = () => {
    setSelectedFirstHour(dayjs("2022-04-17T07:00"));
    setSelectedLastHour(dayjs("2022-04-17T09:00"));
    openModal();
    setTitle("Ajout d'un heure");
    setDescription("Veuiller ajouter une nouvelle heure");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFirstHour || !selectedLastHour) {
      setMessage("Le champ ne doit pas etre vide");
      setSeverity("error");
      ShowAlert();
    } else {
      const firstVal = selectedFirstHour.format("HH:mm");
      const lastVal = selectedLastHour.format("HH:mm");
      const requestData = {
        debuthoraire: firstVal,
        finhoraire: lastVal,
      };
      const data = JSON.stringify(requestData);
      axios
        .post(`http://localhost/backend_IHM/api/api_heure.php`, data)
        .then((response) => {
          setMessage("Intervalle horaire ajouté");
          setSeverity("success");
          ShowAlert();
          closeModal();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          const errorMessage = error.response.data.error;
          const errorStringMessage = "La plage horaire existe déjà";
          if (errorMessage === errorStringMessage) {
            setMessage("Intervalle horaire déjà existante.");
            setSeverity("warning");
            ShowAlert();
          }
        });
    }
  };

  // verify that the first hours should never be greater than the last hours xp
  const handleHourChange = (newValue, isStartHour) => {
    const startHour = selectedFirstHour;
    const endHour = selectedLastHour;

    const minuteDifference = endHour.diff(startHour, "minute");

    if (isStartHour) {
      if (newValue.isAfter(endHour)) {
        setSelectedLastHour(newValue.add(minuteDifference, "minute"));
      }
      setSelectedFirstHour(newValue);
    } else {
      if (newValue.isBefore(startHour)) {
        setSelectedFirstHour(newValue);
      }
      setSelectedLastHour(newValue);
    }
  };

  const handleDelete = (row) => {
    openModalA();
    setIdHour(row.ID_Horaire);
    setTitle("Suppression de l'intervalle horaire");
    setDescription("Voulez-vous supprimer cette intervalle horaire ?");
  };

  const handleSubmitDelete = async (event) => {
    event.preventDefault();
    let id = idHour;
    axios
      .delete(`http://localhost/backend_IHM/api/api_heure.php?id=${id}`)
      .then((response) => {
        setMessage("L'intervalle horaire à été bien supprimé.");
        setSeverity("info");
        ShowAlert();
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReset = () => {
    setSelectedFirstHour(dayjs("2022-04-17T07:00"));
    setSelectedLastHour(dayjs("2022-04-17T09:00"));
  };

  const handleAddJSX = (
    <>
      <Box2>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
          <InputLabel id="FirstHour-label">Heure de debut</InputLabel>
          <TimePicker
            id="FirstHour-label"
            value={selectedFirstHour}
            onChange={(newValue) => {
              handleHourChange(newValue, true);
            }}
          />
        </LocalizationProvider>
        <GapComponents gapY="10px" />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
          <InputLabel id="LastHour-label">Heure de fin</InputLabel>
          <TimePicker
            id="LastHour-label"
            value={selectedLastHour}
            onChange={(newValue) => handleHourChange(newValue, false)}
          />
        </LocalizationProvider>
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

  const columns = [
    {
      field: "Debut_Horaire",
      flex: 2,
      editable: false,
      renderHeader: () => (
        <StyledColumnHeader>Heure de debut</StyledColumnHeader>
      ),
    },
    {
      field: "Fin_Horaire",
      flex: 2,
      editable: false,
      renderHeader: () => <StyledColumnHeader>Heure de fin</StyledColumnHeader>,
    },
    {
      field: "actions",
      sortable: false,
      flex: 2,
      renderHeader: () => <StyledColumnHeader>Actions</StyledColumnHeader>,
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

  if (hourData === null) {
    return <div>Loading...</div>;
  }
  console.log(hourData);
  return (
    <Container>
      <Title>Horaire de classe</Title>
      <Modal
        open={isOpen}
        closeModal={closeModal}
        title={title}
        description={description}
        inputComponents={handleAddJSX}
      />
      <Modal
        open={isOpenA}
        closeModal={closeModal}
        title={title}
        description={description}
        inputComponents={handleDeleteJSX}
      />
      <Box>
        <StyledDataGrid
          rows={rows}
          getRowId={(row) => row.ID_Horaire}
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
          Ajouter une intervalle horaire
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
