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
    path: "/basketball",
    available: false,
  },
  {
    value: "Rugby",
    label: <IoAmericanFootball />,
    path: "/rugby",
    available: false,
  },
];

export default function SportSelector() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  return (
    <div>
      <div className="flex justify-center items-center py-2 bg-gray-800 shadow-md">
        {sports.map((sport, index) =>
          sport.available ? (
            <Link
              href={sport.path}
              key={sport.value}
              className="bg-gray-700 text-gray-100 px-6 py-2 rounded-md mx-2 my-2"
            >
              {sport.label}
            </Link>
          ) : (
            <div
              className="bg-gray-700 text-gray-100 px-6 py-2 rounded-md mx-2 my-2 cursor-not-allowed"
              key={sport.value}
              onClick={() => setSelectedSport(sport.value)}
            >
              {sport.label}
            </div>
          )
        )}
      </div>
      {selectedSport && (
        <div className="text-center text-red-600">
          {selectedSport} n&apos;est pas disponible actuellement
        </div>
      )}
    </div>
  );
}
