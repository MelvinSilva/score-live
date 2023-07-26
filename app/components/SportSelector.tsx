"use client";
import React, { useState } from "react";
import {
  IoFootball,
  IoBasketball,
  IoTennisball,
  IoAmericanFootball,
} from "react-icons/io5";
import Link from "next/link";

type SportOption = {
  value: string;
  label: any;
  path: string;
  available: boolean;
};

const sports: SportOption[] = [
  {
    value: "Football",
    label: <IoFootball />,
    path: "/football",
    available: true,
  },
  {
    value: "Tennis",
    label: <IoTennisball />,
    path: "/tennis",
    available: true,
  },
  {
    value: "Basketball",
    label: <IoBasketball />,
    path: "/basket",
    available: true,
  },
  {
    value: "Rugby",
    label: <IoAmericanFootball />,
    path: "/rugby",
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
      <div className="flex flex-col items-center py-1 shadow-md sport-selector fixed bottom-5 left-8 right-8 rounded-xl">
        {/*  <span className="inline-flex text-center animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] tracking-widest bg-clip-text text-xs text-transparent">
          CHOIX DU SPORT
        </span> */}
        <div className="flex">
          {sports.map((sport, index) =>
            sport.available ? (
              <Link
                href={sport.path}
                key={sport.value}
                className="bg-gray-700 text-gray-100 px-6 py-2 rounded-md mx-2 my-2"
                onClick={() => setSelectedSport(null)}
              >
                {sport.label}
              </Link>
            ) : (
              <div
                className="bg-gray-700 text-gray-100 px-6 py-2 rounded-md mx-2 my-2 cursor-not-allowed"
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
