"use client";
import React, { useState } from "react";
import {
  IoFootball,
  IoBasketball,
  IoTennisball,
  IoAmericanFootball,
  IoCalendarOutline,
} from "react-icons/io5";

import FootballList from "./football/page";
import TennisList from "./tennis/page";

type SportOption = { value: string; label: any };

const sports: SportOption[] = [
  { value: "Football", label: <IoFootball /> },
  { value: "Tennis", label: <IoTennisball /> },
  { value: "Basketball", label: <IoBasketball /> },
  { value: "Rugby", label: <IoAmericanFootball /> },
];

export default function SportSelector() {
  const [selectedSport, setSelectedSport] = useState<string>(sports[0].value);

  const handleSportChange = (value: string) => {
    setSelectedSport(value);
  };

  const renderSportComponent = () => {
    switch (selectedSport) {
      case "Football":
        return <FootballList />;
      case "Basketball":
        return "Non disponible";
      case "Tennis":
        return <TennisList />;
      case "Rugby":
        return "Non disponible";
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center py-2 bg-gray-800 shadow-md">
        {sports.map((sport, index) => (
          <button
            key={sport.value}
            className={`${
              selectedSport === sport.value
                ? "bg-white text-gray-700"
                : "bg-gray-700 text-gray-100"
            } px-6 py-2 rounded-md mx-2 my-2`}
            onClick={() => handleSportChange(sport.value)}
          >
            {sport.label}
          </button>
        ))}
      </div>
      {renderSportComponent()}
    </div>
  );
}
