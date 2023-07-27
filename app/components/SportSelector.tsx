"use client";
import React, { useState } from "react";
import {
  IoFootball,
  IoBasketball,
  IoTennisball,
  IoAmericanFootball,
  IoNewspaper,
} from "react-icons/io5";
import Link from "next/link";

type SportOption = {
  value: string;
  label: any;
  path: string;
  text: string;
  available: boolean;
};

const sports: SportOption[] = [
  {
    value: "Football",
    label: <IoFootball />,
    text: "Football",
    path: "/football",
    available: true,
  },
  {
    value: "Tennis",
    label: <IoTennisball />,
    text: "Tennis",
    path: "/tennis",
    available: true,
  },
  {
    value: "Basketball",
    label: <IoBasketball />,
    text: "Basket",
    path: "/basket",
    available: true,
  },
  {
    value: "Rugby",
    label: <IoAmericanFootball />,
    text: "Rugby",
    path: "/rugby",
    available: true,
  },
  {
    value: "Actualités",
    label: <IoNewspaper />,
    text: "Actualités",
    path: "/actu",
    available: true,
  },
];

export default function SportSelector() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const handleClickUnavailableSport = (sport: SportOption) => {
    setSelectedSport(sport.value);
    setTimeout(() => {
      setSelectedSport(null);
    }, 5000);
  };

  return (
    <div>
      <div className="flex flex-col items-center py-0 shadow-md sport-selector fixed bottom-0 left-0 right-0">
        <div className="flex">
          {sports.map((sport, index) =>
            sport.available ? (
              <div
                key={sport.value}
                className={`flex flex-col items-center bg-gray-600 text-white px-4 py-1 rounded-md mx-1 my-2 w-16 lg:w-32 lg:text-2xl ${
                  selectedSport === sport.value ? "bg-red-800" : "" // Ajoutez la classe bg-gray-800 si le bouton est sélectionné
                }`}
                onClick={() => setSelectedSport(sport.value)} // Mettez à jour le bouton sélectionné au clic
              >
                <Link href={sport.path}>
                  <div className="flex flex-col items-center">
                    {sport.label}
                    <p className="text-sportselector">{sport.text}</p>
                  </div>
                </Link>
              </div>
            ) : (
              <div
                className="flex-1 bg-gray-600 text-white px-5 py-1 rounded-md mx-1 my-2 cursor-not-allowed"
                key={sport.value}
                onClick={() => handleClickUnavailableSport(sport)}
              >
                {sport.label}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
