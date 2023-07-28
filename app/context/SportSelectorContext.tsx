"use client";
import React, { createContext, useContext, useState } from "react";

type SportContextType = {
  selectedSport: string | null;
  setSelectedSport: (sport: string | null) => void;
};

const SportSelectorContext = createContext<SportContextType | undefined>(
  undefined
);

export const useSportContext = () => {
  const context = useContext(SportSelectorContext);
  if (!context) {
    throw new Error("useSportContext must be used within a SportProvider");
  }
  return context;
};

interface SportSelectorProviderProps {
  children: React.ReactNode;
}

export const SportSelectorProvider: React.FC<SportSelectorProviderProps> = ({
  children,
}) => {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  return (
    <SportSelectorContext.Provider value={{ selectedSport, setSelectedSport }}>
      {children}
    </SportSelectorContext.Provider>
  );
};
