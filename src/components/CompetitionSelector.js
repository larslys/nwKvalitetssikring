import React from "react";
import "./CompetitionSelector.css";

function CompetitionSelector({
  competitions,
  qualifications,
  setQualifications,
  startedCompetitions,
  setStartedCompetitions,
  handleEvaluate,
  handleReset,
}) {
  const categories = [
    { label: "LGT", prefix: "LGT" },
    { label: "NW", prefix: "NW" },
    { label: "SxK", prefix: "S", suffix: "K" },
    { label: "SxE", prefix: "S", suffix: "E" },
    { label: "SxU", prefix: "S", suffix: "U" },
    { label: "SxI", prefix: "S", suffix: "I" },
  ];

  const filterCompetitions = (comp, category) => {
    if (category.prefix === "S") {
      return (
        comp.competition.startsWith(category.prefix) &&
        comp.competition.endsWith(category.suffix)
      );
    }
    return comp.competition.startsWith(category.prefix);
  };

  const getRelatedCompetitions = (competition, allCompetitions, collected = []) => {
    const comp = allCompetitions.find((c) => c.competition === competition);
    if (comp && comp.requirements.length > 0) {
      comp.requirements.forEach((req) => {
        if (!collected.includes(req)) {
          collected.push(req);
          getRelatedCompetitions(req, allCompetitions, collected);
        }
      });
    }
    return collected;
  };

  const handleQualificationChange = (selected, checked) => {
    const relatedQualifications = getRelatedCompetitions(selected, competitions);
    const relatedStartedCompetitions = getRelatedCompetitions(selected, competitions);

    setQualifications((prev) =>
      checked
        ? [...new Set([...prev, selected, ...relatedQualifications])]
        : prev.filter((q) => ![selected, ...relatedQualifications].includes(q))
    );

    setStartedCompetitions((prev) =>
      checked
        ? [...new Set([...prev, ...relatedStartedCompetitions])]
        : prev.filter((c) => ![selected, ...relatedStartedCompetitions].includes(c))
    );
  };

  const handleStartedChange = (selected, checked) => {
    const relatedQualifications = getRelatedCompetitions(selected, competitions);
    const relatedStartedCompetitions = getRelatedCompetitions(selected, competitions);

    setStartedCompetitions((prev) =>
      checked
        ? [...new Set([...prev, selected, ...relatedStartedCompetitions])]
        : prev.filter((c) => ![selected, ...relatedStartedCompetitions].includes(c))
    );

    setQualifications((prev) =>
      checked
        ? [...new Set([...prev, ...relatedQualifications])]
        : prev
    );
  };

  return (
    <div className="competition-selector">
      <fieldset>
        <legend> Har startet i</legend>
        <div className="checkbox-group">
          {categories.map((category) => (
            <fieldset key={category.label} className="card">
              <legend>{category.label}</legend>
              <div className="checkbox-grid">
                {competitions
                  .filter((comp) => filterCompetitions(comp, category))
                  .map((comp) => (
                    <label key={comp.competition}>
                      <input
                        type="checkbox"
                        value={comp.competition}
                        checked={startedCompetitions.includes(comp.competition)}
                        onChange={(e) =>
                          handleStartedChange(comp.competition, e.target.checked)
                        }
                      />
                      {comp.competition}
                    </label>
                  ))}
              </div>
            </fieldset>
          ))}
        </div>
      </fieldset>


    <br/>
      <fieldset>
        <legend>Har Kvalifikasjoner/Titler</legend>
        <div className="checkbox-group">
          {categories.map((category) => (
            <fieldset key={category.label} className="card">
              <legend>{category.label}</legend>
              <div className="checkbox-grid">
                {competitions
                  .filter((comp) => filterCompetitions(comp, category))
                  .map((comp) => (
                    <label key={comp.competition}>
                      <input
                        type="checkbox"
                        value={comp.competition}
                        checked={qualifications.includes(comp.competition)}
                        onChange={(e) =>
                          handleQualificationChange(comp.competition, e.target.checked)
                        }
                      />
                      {comp.competition}
                    </label>
                  ))}
              </div>
            </fieldset>
          ))}
        </div>
      </fieldset>





      <div className="button-group">
        <button onClick={handleEvaluate} className="evaluate-btn">
          Evaluer
        </button>
        <button onClick={handleReset} className="reset-btn">
          Tilbakestill
        </button>
      </div>
    </div>
  );
}

export default CompetitionSelector;