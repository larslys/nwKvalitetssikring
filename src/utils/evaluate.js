export function evaluateParticipation(dog, competition) {
    const missingQualifications = competition.requirements.filter(
      (req) => !dog.qualifications.includes(req)
    );
  
    const meetsRequirements = missingQualifications.length === 0;
  
    const isBlockedByHigherLevel = dog.startedCompetitions.some((startedComp) => {
      return competition.blocks.includes(startedComp);
    });
  
    const canParticipate = meetsRequirements && !isBlockedByHigherLevel;
  
    return {
      competition: competition.competition,
      canParticipate,
      reason: canParticipate
        ? "Hunden oppfyller alle krav."
        : !meetsRequirements
        ? `Hunden mangler nødvendige kvalifikasjoner: ${missingQualifications.join(", ")}`
        : "Hunden er blokkert av et høyere nivå i samme kategori.",
    };
  }
  
  export function evaluateDog(dog, competitions) {
    return competitions.map((competition) =>
      evaluateParticipation(dog, competition)
    );
  }
  