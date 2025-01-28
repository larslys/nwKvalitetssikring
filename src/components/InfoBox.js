import React, { useState } from "react";
import "./InfoBox.css";

function InfoBox() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="info-box">
      <button
        className="info-icon"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Vis informasjon"
      >
        ℹ️
      </button>
      {isOpen && (
        <div className="info-content">
          <div className="info-header">
            <h3>Informasjon</h3>
            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Lukk informasjon"
            >
              ✖
            </button>
          </div>
          <p>
            Sett opp kvalifikasjoner og hvilke konkurranser hunden har startet i
            for å se hvilke konkurranser hunden kan delta i.
          </p>
          <br/>
          <ul>
            <li>
              <strong>Kvalifikasjoner:</strong> Sett inn hundens kvalifikasjoner.
            </li>
            <li>
              <strong>Startede konkurranser:</strong> Velg konkurranser hunden
              har startet i.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default InfoBox;