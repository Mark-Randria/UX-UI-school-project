import React from "react";

import Timetable from "./contentvalue/timetable";
import Teacher from "./contentvalue/teacher";
import Subject from "./contentvalue/subject";
import School from "./contentvalue/school";
import Class from "./contentvalue/class";

export default function Maincontent({ activePage }) {
  let content;

  switch (activePage) {
    case "emploi":
      content = <Timetable />;
      break;
    case "ecole":
      content = <School />;
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
    default:
      content = <div>Oups ! page introuvable...</div>;
      break;
  }

  return <>{content}</>;
}
