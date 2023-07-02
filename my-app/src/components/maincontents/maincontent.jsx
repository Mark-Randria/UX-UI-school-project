import React from "react";

import Timetable from "./contentvalue/timetable";
import Teacher from "./contentvalue/teacher";
import Subject from "./contentvalue/subject";
import Day from "./contentvalue/day";
import Class from "./contentvalue/class";
import Room from "./contentvalue/room";
import Hour from "./contentvalue/hour";
import Setting from "./contentvalue/setting";

export default function Maincontent({ activePage }) {
  let content;

  switch (activePage) {
    case "emploi":
      content = <Timetable />;
      break;
    case "salle":
      content = <Room />;
      break;
    case "heure":
      content = <Hour />;
      break;
    case "jour":
      content = <Day />;
      break;
    case "matiere":
      content = <Subject />;
      break;
    case "classe":
      content = <Class />;
      break;
    case "professeur":
      content = <Teacher />;
      break;
    case "parametre":
      content = <Setting />;
      break;
    default:
      content = <div>Oups ! page introuvable...</div>;
      break;
  }

  return <>{content}</>;
}
