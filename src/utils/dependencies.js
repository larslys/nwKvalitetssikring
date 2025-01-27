import competitions from "./competitions";

// Hent alle avhengigheter rekursivt
export function getAllDependencies(competitionName) {
  const dependencies = new Set();

  function traverseRequirements(name) {
    const competition = competitions.find((comp) => comp.competition === name);
    if (competition && competition.requirements.length > 0) {
      competition.requirements.forEach((req) => {
        if (!dependencies.has(req)) {
          dependencies.add(req);
          traverseRequirements(req);
        }
      });
    }
  }

  traverseRequirements(competitionName);
  return Array.from(dependencies);
}