"use client";
import React, { useState } from "react";
import Select from "react-select";
import {
  IoFootball,
  IoBasketball,
  IoTennisball,
  IoAmericanFootball,
  IoCalendarOutline,
} from "react-icons/io5";
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";

import FootballList from "./football/page";

type SportOption = { value: string; label: JSX.Element };

const sports: SportOption[] = [
  {
    value: "Football",
    label: (
      <div className="flex items-center">
        <IoFootball />
        <span className="ml-2">Football</span>
      </div>
    ),
  },
  {
    value: "Basketball",
    label: (
      <div className="flex items-center">
        <IoBasketball />
        <span className="ml-2">Basketball</span>
      </div>
    ),
  },
  {
    value: "Tennis",
    label: (
      <div className="flex items-center">
        <IoTennisball />
        <span className="ml-2">Tennis</span>
      </div>
    ),
  },
  {
    value: "Rugby",
    label: (
      <div className="flex items-center">
        <IoAmericanFootball />
        <span className="ml-2">Rugby</span>
      </div>
    ),
  },
];

export default function SportSelector() {
  const [selectedSport, setSelectedSport] = useState<SportOption | null>(
    sports[0]
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleSportChange = (option: SportOption | null) => {
    setSelectedSport(option);
  };

  const handleDateChange = (option: any) => {
    const currentDate = new Date();
    const date =
      option?.value === "today" ? currentDate : new Date(option?.value);
    setSelectedDate(date);
  };

  const dateFormat = "EEEE dd/MM";
  const formattedDate = selectedDate
    ? format(selectedDate, dateFormat, { locale: fr }).toUpperCase()
    : "";

  const generateDateOptions = () => {
    const currentDate = new Date();
    const dateOptions: { value: string; label: string }[] = [];

    for (let i = -5; i <= 5; i++) {
      const date = addDays(currentDate, i);
      const label = format(date, "EEEE dd/MM", { locale: fr });
      const value = date.toISOString();
      dateOptions.push({ value, label });
    }

    const todayOption = { value: "today", label: "⏺ Aujourd'hui" };
    dateOptions[5] = todayOption;

    return dateOptions;
  };
  const dateOptions = generateDateOptions();
  const defaultDateOption = dateOptions.find(
    (option) => option.value === "today"
  );

  const renderSportComponent = () => {
    switch (selectedSport?.value) {
      case "Football":
        return <FootballList />;
      case "Basketball":
        return "Non disponible";
      case "Tennis":
        return "Non disponible";
      case "Rugby":
        return "Non disponible";
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between w-full py-3 bg-gray-100 shadow-md">
        <div className="w-1/2 ml-4 mr-2">
          <Select
            options={sports}
            value={selectedSport}
            onChange={handleSportChange}
            className="w-full bg-white rounded-md text-green-700"
            isSearchable={false}
            components={{
              IndicatorSeparator: null,
            }}
          />
        </div>
        <div className="w-1/2 ml-2 mr-4 relative">
          {" "}
          {/* Ajout de la classe "relative" pour positionner l'icône */}
          <Select
            options={dateOptions}
            defaultValue={defaultDateOption}
            onChange={handleDateChange}
            className="w-full bg-white rounded-md text-green-700"
            isSearchable={false}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
          />
          <IoCalendarOutline className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />{" "}
          {/* Ajout des classes "absolute", "right-2", "top-1/2", "transform", "-translate-y-1/2" pour positionner l'icône */}
        </div>
      </div>
      {renderSportComponent()}
    </div>
  );
}
