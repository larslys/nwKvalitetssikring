import React, { useState } from "react";
import styles from "./DuoForm.module.css";

const DuoForm = () => {
  const [formData, setFormData] = useState({
    handlerId: "",
    dogId: "",
    qualifications: [],
    startedCompetitions: [],
    status: "active",
  });

  const [showHistorical, setShowHistorical] = useState(true);
  const [showDuoModel, setShowDuoModel] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleHistorical = () => {
    setShowHistorical((prev) => !prev);
  };

  const handleToggleDuoModel = () => {
    setShowDuoModel((prev) => !prev);
  };

  const handleAddQualification = () => {
    setFormData((prev) => ({
      ...prev,
      qualifications: [
        ...prev.qualifications,
        { type: "", competitionId: "", date: "", source: "historical" },
      ],
    }));
  };

  const handleRemoveQualification = (index) => {
    setFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index),
    }));
  };

  const handleQualificationChange = (index, field, value) => {
    const updatedQualifications = [...formData.qualifications];
    updatedQualifications[index][field] = value;
    setFormData((prev) => ({ ...prev, qualifications: updatedQualifications }));
  };

  const handleAddCompetition = () => {
    setFormData((prev) => ({
      ...prev,
      startedCompetitions: [
        ...prev.startedCompetitions,
        { type: "", competitionId: "", date: "", source: "historical" },
      ],
    }));
  };

  const handleRemoveCompetition = (index) => {
    setFormData((prev) => ({
      ...prev,
      startedCompetitions: prev.startedCompetitions.filter((_, i) => i !== index),
    }));
  };

  const handleCompetitionChange = (index, field, value) => {
    const updatedCompetitions = [...formData.startedCompetitions];
    updatedCompetitions[index][field] = value;
    setFormData((prev) => ({ ...prev, startedCompetitions: updatedCompetitions }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.header}>Registrer Ekvipasje</h2>

      {/* Knapp for å vise/skjule Duo-modellen */}
      <button type="button" className={styles.toggleButton} onClick={handleToggleDuoModel}>
        {showDuoModel ? "Skjul Duo-modellen" : "Vis Duo-modellen"}
      </button>

      {/* Viser Duo-modellen hvis knappen er aktiv */}
      {showDuoModel && (
        <pre className={styles.duoModel}>
          {JSON.stringify(
            {
              id: "string",
              handlerId: "string",
              dogId: "string",
              qualifications: [
                { type: "LGT1", competitionId: "string", date: "Date", source: "historical | system" },
              ],
              startedCompetitions: [
                { type: "NW1", competitionId: "string", date: "Date", source: "historical | system" },
              ],
              status: "active | inactive",
            },
            null,
            2
          )}
        </pre>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Fører ID:</label>
          <input
            type="text"
            name="handlerId"
            value={formData.handlerId}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Hund ID:</label>
          <input
            type="text"
            name="dogId"
            value={formData.dogId}
            onChange={handleChange}
          />
        </div>

        {/* Status-feltet over knappen */}
        <div className={styles.formGroup}>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="active">Aktiv</option>
            <option value="inactive">Inaktiv</option>
          </select>
        </div>

        {/* Knapp for å vise/skjule historiske data */}
        <button type="button" className={styles.toggleButton} onClick={handleToggleHistorical}>
          {showHistorical ? "Skjul historisk data" : "Vis historisk data"}
        </button>

        {/* Historiske kvalifikasjoner */}
        {showHistorical && (
          <>
            <fieldset className={styles.fieldset}>
              <legend>Kvalifikasjoner</legend>
              {formData.qualifications.map((qual, index) => (
                <div key={index} className={styles.entry}>
                  <input
                    type="text"
                    placeholder="Type"
                    value={qual.type}
                    onChange={(e) => handleQualificationChange(index, "type", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Konkurranse ID"
                    value={qual.competitionId}
                    onChange={(e) => handleQualificationChange(index, "competitionId", e.target.value)}
                  />
                  <input
                    type="date"
                    value={qual.date}
                    onChange={(e) => handleQualificationChange(index, "date", e.target.value)}
                  />
                  <button type="button" onClick={() => handleRemoveQualification(index)}>
                    ✖
                  </button>
                </div>
              ))}
              <button type="button" className={styles.addButton} onClick={handleAddQualification}>
                + Legg til kvalifikasjon
              </button>
            </fieldset>

            {/* Historiske starter */}
            <fieldset className={styles.fieldset}>
              <legend>Starter</legend>
              {formData.startedCompetitions.map((comp, index) => (
                <div key={index} className={styles.entry}>
                  <input
                    type="text"
                    placeholder="Type"
                    value={comp.type}
                    onChange={(e) => handleCompetitionChange(index, "type", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Konkurranse ID"
                    value={comp.competitionId}
                    onChange={(e) => handleCompetitionChange(index, "competitionId", e.target.value)}
                  />
                  <input
                    type="date"
                    value={comp.date}
                    onChange={(e) => handleCompetitionChange(index, "date", e.target.value)}
                  />
                  <button type="button" onClick={() => handleRemoveCompetition(index)}>
                    ✖
                  </button>
                </div>
              ))}
              <button type="button" className={styles.addButton} onClick={handleAddCompetition}>
                + Legg til start
              </button>
            </fieldset>
          </>
        )}

        <button type="submit" className={styles.submitButton}>Lagre Ekvipasje</button>
      </form>
    </div>
  );
};

export default DuoForm;