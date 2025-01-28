import React, { useState } from "react";
import CompetitionSelector from "../components/CompetitionSelector";
import Results from "../components/Results";
import competitions from "../utils/competitions";
import InfoBox from "../components/InfoBox";

function Home() {
  const [qualifications, setQualifications] = useState([]);
  const [startedCompetitions, setStartedCompetitions] = useState([]);
  const [results, setResults] = useState([]);

  const handleEvaluate = () => {
    const dog = { qualifications, startedCompetitions };

    const evaluateParticipation = (dog, competition) => {
      const meetsRequirements = competition.requirements.every((req) =>
        dog.qualifications.includes(req)
      );

      const isBlockedByHigherLevel = competition.blocks.some((block) =>
        dog.startedCompetitions.includes(block)
      );

      const canParticipate = meetsRequirements && !isBlockedByHigherLevel;

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
      <InfoBox/>
      <CompetitionSelector
        competitions={competitions}
        qualifications={qualifications}
        setQualifications={setQualifications}
        startedCompetitions={startedCompetitions}
        setStartedCompetitions={setStartedCompetitions}
        handleEvaluate={handleEvaluate}
        handleReset={handleReset}
      />
      {results.length > 0 && <Results results={results} />}
    </div>
  );
}

export default Home;