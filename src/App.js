import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import OtherFunctions from "./pages/OtherFunctions";
import competitions from "./utils/competitions"; // Importerer konkurranselisten
import { evaluateDog } from "./utils/evaluate"; // Importerer evalueringslogikken
import "./App.css";
import Competitions from "./pages/Competitions";

function App() {
  // States for kvalifikasjoner, startede konkurranser og resultater
  const [qualifications, setQualifications] = useState([]);
  const [startedCompetitions, setStartedCompetitions] = useState([]);
  const [results, setResults] = useState([]);

  // Funksjon for evaluering
  const handleEvaluate = () => {
    const dog = { qualifications, startedCompetitions };
    const evaluation = evaluateDog(dog, competitions);
    setResults(evaluation);
  };

  // Funksjon for å tilbakestille
  const handleReset = () => {
    setQualifications([]);
    setStartedCompetitions([]);
    setResults([]);
  };

  return (
    <Router>
    <nav>
      <ul>
        <li>
        <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              NW - konkurransekvalifisering
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/competitions"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Konkurranser
            </NavLink>
            
        </li>
          <li>
            <NavLink
              to="/other"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Andre Funksjoner
            </NavLink>

        </li>

      </ul>
    </nav>
    <Routes>
      <Route
        path="/"
        element={
          <Home
            competitions={competitions}
            qualifications={qualifications}
            setQualifications={setQualifications}
            startedCompetitions={startedCompetitions}
            setStartedCompetitions={setStartedCompetitions}
            results={results}
            handleEvaluate={handleEvaluate}
            handleReset={handleReset}
          />
        }
      />
      <Route path="/other" element={<OtherFunctions />} />
      <Route path="/competitions" element={<Competitions />} />
    </Routes>
  </Router>
  );
}

export default App;