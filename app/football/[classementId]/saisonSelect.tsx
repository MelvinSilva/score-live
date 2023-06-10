import React from "react";
import { SeasonFoot } from "@/app/types";

interface Props {
  seasons: SeasonFoot | null;
  selectedSeasonId: string | null;
  onSeasonChange: (seasonId: string) => void;
}

const SaisonSelect: React.FC<Props> = ({
  seasons,
  selectedSeasonId,
  onSeasonChange,
}) => {
  return (
    <div className="mt-2">
      <label htmlFor="season-select" className="text-gray-600">
        Saison :&nbsp;
      </label>
      <select
        id="season-select"
        className="w-30 py-1 px-2 rounded-lg bg-white border-gray-300 border focus:outline-none focus:ring-1 focus:ring-indigo-500"
        value={selectedSeasonId || ""}
        onChange={(e) => onSeasonChange(e.target.value)}
      >
        {seasons?.SEASONS.map((season) => (
          <option key={season.SEASON_ID} value={season.SEASON_ID}>
            {season.SEASON_NAME}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SaisonSelect;
