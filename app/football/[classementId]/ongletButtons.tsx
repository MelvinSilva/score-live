import React from "react";

interface Props {
  selectedOption: "classement" | "buteurs" | "résultats";
  onOptionChange: (option: "classement" | "buteurs" | "résultats") => void;
}

const TabButtons: React.FC<Props> = ({ selectedOption, onOptionChange }) => {
  return (
    <div className="flex justify-center mb-4">
      <button
        className={`mr-2 mb-2 px-3 py-1 rounded-lg ${
          selectedOption === "classement"
            ? "bg-gray-600 text-white"
            : "bg-gray-200 text-gray-500"
        } sm:mr-4 sm:mb-0 sm:px-4 sm:py-2 sm:text-base`}
        onClick={() => onOptionChange("classement")}
      >
        Classement
      </button>
      <button
        className={`mr-2 mb-2 px-3 py-1 rounded-lg ${
          selectedOption === "buteurs"
            ? "bg-gray-600 text-white"
            : "bg-gray-200 text-gray-500"
        } sm:mr-4 sm:mb-0 sm:px-4 sm:py-2 sm:text-base`}
        onClick={() => onOptionChange("buteurs")}
      >
        Top buteurs
      </button>
      <button
        className={`mr-2 mb-2 px-3 py-1 rounded-lg ${
          selectedOption === "résultats"
            ? "bg-gray-600 text-white"
            : "bg-gray-200 text-gray-500"
        } sm:mr-4 sm:mb-0 sm:px-4 sm:py-2 sm:text-base`}
        onClick={() => onOptionChange("résultats")}
      >
        Résultats
      </button>
    </div>
  );
};

export default TabButtons;
