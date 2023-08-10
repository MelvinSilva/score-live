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
    <div className="z-index">
      <div className="flex flex-col items-center py-0 shadow-md bg-denim-50 fixed bottom-0 left-0 right-0 lg:relative lg:bg-gradient-to-r from-denim-600 to-denim-900">
        <div className="flex">
          {sports.map((sport, index) =>
            sport.available ? (
              <Link href={sport.path} key={sport.value}>
                <div
                  className={`flex flex-col items-center bg-denim-600 lg:border lg:border-denim-200 lg:bg-transparent lg:hover:bg-denim-600 text-white px-4 py-1 rounded-md mx-1 my-2 w-16 sm:px-14 sm:py-1 lg:px-24 lg:py-1 ${
                    sport.value === "Actualités" ? "text-white" : ""
                  }`}
                  onClick={() => setSelectedSport(sport.value)} // Mettez à jour le bouton sélectionné au clic
                >
                  {sport.label}
                  <p className="text-sportselector">{sport.text}</p>
                </div>
              </Link>
            ) : (
              <div
                className="flex-1 bg-denim-200 text-white px-5 py-1 rounded-md mx-1 my-2 cursor-not-allowed"
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
