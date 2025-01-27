import React, { useState } from "react";
import CompetitionSelector from "../components/CompetitionSelector";
import competitions from "../utils/competitions";

function Home() {
  const [qualifications, setQualifications] = useState([]);
  const [startedCompetitions, setStartedCompetitions] = useState([]);
  const [results, setResults] = useState([]);

  const handleEvaluate = () => {
    const dog = { qualifications, startedCompetitions };
  
    const evaluateParticipation = (dog, competition) => {
      console.log(`Evaluating competition: ${competition.competition}`);
      console.log(`Requirements: ${competition.requirements}`);
      console.log(`Dog Qualifications: ${dog.qualifications}`);
      console.log(`Blocks: ${competition.blocks}`);
      console.log(`Started Competitions: ${dog.startedCompetitions}`);
  
      const meetsRequirements = competition.requirements.every((req) =>
        dog.qualifications.includes(req)
      );
  
      const isBlockedByHigherLevel = competition.blocks.some((block) =>
        dog.startedCompetitions.includes(block)
      );
  
      console.log(`Meets Requirements: ${meetsRequirements}`);
      console.log(`Is Blocked By Higher Level: ${isBlockedByHigherLevel}`);
  
      const canParticipate = meetsRequirements && !isBlockedByHigherLevel;
  
      console.log(
        `Result for ${competition.competition}: ${
          canParticipate ? "✅ Can Participate" : "❌ Cannot Participate"
        }`
      );
  
      return {
        competition: competition.competition,
        canParticipate,
        reason: canParticipate
          ? "Hunden oppfyller alle krav."
          : !meetsRequirements
          ? `Hunden mangler nødvendige kvalifikasjoner: ${competition.requirements
              .filter((req) => !dog.qualifications.includes(req))
              .join(", ")}`
          : "Hunden er blokkert av et høyere nivå i samme kategori.",
      };
    };
  
    const evaluation = competitions.map((comp) =>
      evaluateParticipation(dog, comp)
    );
  
    setResults(evaluation);
  };

  const handleReset = () => {
    setQualifications([]);
    setStartedCompetitions([]);
    setResults([]);
  };

  return (
    <div className="container">
      <h1>Nosework - konkurranse kvalifisering</h1>
      <CompetitionSelector
        competitions={competitions}
        qualifications={qualifications}
        setQualifications={setQualifications}
        startedCompetitions={startedCompetitions}
        setStartedCompetitions={setStartedCompetitions}
        handleEvaluate={handleEvaluate}
        handleReset={handleReset}
      />
      {results.length > 0 && (
        <div className="results">
          <h3>Resultater</h3>
          <ul>
            {results.map((result) => (
              <li key={result.competition}>
                {result.competition}:{" "}
                {result.canParticipate ? "✅" : "❌"} - {result.reason}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;