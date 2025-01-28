import React from "react";
import "./Results.css";

const Results = ({ results }) => {
  return (
    <div className="results">
      
      <h3>Kan Delta</h3>
      <ul>
        {results
          .filter((result) => result.canParticipate)
          .map((result) => (
            <li key={result.competition}>
              ✅ {result.competition}:  {result.reason}
            </li>
          ))}
      </ul><br/>
      <h3>Kan Ikke Delta</h3>
      <ul>
        {results
          .filter((result) => !result.canParticipate)
          .map((result) => (
            <li key={result.competition}>
              ❌ {result.competition}: {result.reason}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Results;