"use client";
import React from "react";
import Image from "next/image";
import { TournamentFoot } from "@/app/types";

interface Props {
  tournament: TournamentFoot | null;
}

const ChampionnatInfo: React.FC<Props> = ({ tournament }) => {
  return (
    <div className="flex items-center">
      {tournament?.TOURNAMENT_IMAGE && (
        <div className="rounded-lg overflow-hidden bg-white flex items-center justify-center w-10 h-10 mr-2">
          <Image
            src={tournament?.TOURNAMENT_IMAGE}
            width={100}
            height={100}
            alt="Tournament"
            className="w-9 h-9"
          />
        </div>
      )}
      <div>
        <h3 className="text-md font-bold text-gray-600">
          {tournament?.LEAGUE_NAME} ({tournament?.COUNTRY_NAME})
        </h3>
      </div>
    </div>
  );
};

export default ChampionnatInfo;
