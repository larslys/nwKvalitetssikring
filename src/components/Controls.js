import React from "react";

const Controls = ({ onEvaluate, onReset }) => {
  return (
    <div className="controls">
      <button type="button" onClick={onEvaluate}>
        Evaluer
      </button>
      <button type="button" className="btn-reset" onClick={onReset}>
        Tilbakestill
      </button>
    </div>
  );
};

export default Controls;