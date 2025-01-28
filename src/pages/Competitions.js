import React from "react";
import competitions from "../utils/competitions";
import "./Competitions.css";

function getGroup(competition) {
  if (competition.startsWith("LGT")) return "LGT";
  if (competition.startsWith("NW")) return "NW";
  if (competition.startsWith("S") && competition.endsWith("K")) return "SxK";
  if (competition.startsWith("S") && competition.endsWith("E")) return "SxE";
  if (competition.startsWith("S") && competition.endsWith("U")) return "SxU";
  if (competition.startsWith("S") && competition.endsWith("I")) return "SxI";
  if (competition === "Merker") return "Merker";
  return "Annet";
}

function Competitions() {
  return (
    <div className="competitions-container">
      <h1>Konkurranser</h1>
      <table className="competitions-table">
        <thead>
          <tr>
            <th>Gruppe</th>
            <th>Konkurranse</th>
            <th>Krav</th>
            <th>Blokkerer</th>
          </tr>
        </thead>
        <tbody>
          {competitions.map((comp) => {
            const group = getGroup(comp.competition);
            return (
              <tr key={comp.competition} className={`group-${group}`}>
                <td data-label="Gruppe">{group}</td>
                <td data-label="Konkurranse">{comp.competition}</td>
                <td data-label="Krav">
                  {comp.requirements.length > 0
                    ? comp.requirements.join(", ")
                    : "Ingen"}
                </td>
                <td data-label="Blokkerer">
                  {comp.blocks.length > 0 ? comp.blocks.join(", ") : "Ingen"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Competitions;