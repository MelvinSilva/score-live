/* "use client";
import React from "react";
import Image from "next/image";
import { FC } from "react";

interface Buteur {
  TS_PLAYER_ID: number;
  TS_RANK: number;
  TS_PLAYER_NAME_PA: string;
  TS_PLAYER_GOALS: number;
  TS_PLAYER_ASISTS: number;
  TS_IMAGE_PATH: string;
  TEAM_NAME: string;
}

interface ButeursTableProps {
  meilleursButeurs: Buteur[];
}

const ButeursTable: FC<ButeursTableProps> = ({ meilleursButeurs }) => {
  return (
    <div className="w-full mx-auto bg-gray-100">
      <br />
      <div className="max-w-screen-md mx-auto">
        <table className="w-full mx-auto divide-y divide-gray-200 rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-white">
            <tr>
              <th className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 uppercase">
                #
              </th>
              <th className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600 uppercase text-left">
                Joueur
              </th>
              <th className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600 uppercase">
                B
              </th>
              <th className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600 uppercase">
                P
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {meilleursButeurs.map((buteur) => (
              <tr key={buteur.TS_PLAYER_ID}>
                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-600">
                  {buteur.TS_RANK}
                </td>
                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <Image
                        width={50}
                        height={50}
                        src={buteur.TS_IMAGE_PATH}
                        alt="Player"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-600">
                        {buteur.TS_PLAYER_NAME_PA}
                      </div>
                      <div className="text-xs text-gray-400">
                        {buteur.TEAM_NAME}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-600">
                  {buteur.TS_PLAYER_GOALS}
                </td>
                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-600">
                  {buteur.TS_PLAYER_ASISTS}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
    </div>
  );
};

export type { Buteur, ButeursTableProps };
export default ButeursTable; */
