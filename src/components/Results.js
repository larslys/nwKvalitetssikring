import React from "react";

const Results = ({ results }) => {
  return (
    <div className="results">
      <h2>Resultater</h2>
      <h3>Kan Delta</h3>
      <ul>
        {results
          .filter((result) => result.canParticipate)
          .map((result) => (
            <li key={result.competition}>
              {result.competition}: ✅ - {result.reason}
            </li>
          ))}
      </ul>
      <h3>Kan Ikke Delta</h3>
      <ul>
        {results
          .filter((result) => !result.canParticipate)
          .map((result) => (
            <li key={result.competition}>
              {result.competition}: ❌ - {result.reason}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Results;