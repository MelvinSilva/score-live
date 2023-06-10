"use client";
import React from "react";

interface Props {
  selectedOption: "classement" | "buteurs" | "résultats";
  onOptionChange: (option: "classement" | "buteurs" | "résultats") => void;
}

const TabButtons: React.FC<Props> = ({ selectedOption, onOptionChange }) => {
  return (
    <div className="flex justify-center">
      <button
        className={`tab-button ${
          selectedOption === "classement" ? "active" : ""
        }`}
        onClick={() => onOptionChange("classement")}
      >
        Classement
      </button>
      <button
        className={`tab-button ${selectedOption === "buteurs" ? "active" : ""}`}
        onClick={() => onOptionChange("buteurs")}
      >
        Top buteurs
      </button>
      <button
        className={`tab-button ${
          selectedOption === "résultats" ? "active" : ""
        }`}
        onClick={() => onOptionChange("résultats")}
      >
        Résultats
      </button>
    </div>
  );
};

export default TabButtons;
