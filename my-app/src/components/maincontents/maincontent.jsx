import React from "react";

import { GapComponents } from "./maincontent.style";

export default function Maincontent({ activePage }) {
  let content;

  switch (activePage) {
    case "emploi":
      content = <div>This is the Emploi page.</div>;
      break;
    case "ecole":
      content = <div>This is the Ecole page.</div>;
      break;
    case "matiere":
      content = <div>This is the Matiere page.</div>;
      break;
    case "classe":
      content = <div>This is the Classe page.</div>;
      break;
    case "professeur":
      content = <div>This is the Professeur page.</div>;
      break;
    default:
      content = <div>Invalid page.</div>;
      break;
  }

  return <>{content}</>;
}
