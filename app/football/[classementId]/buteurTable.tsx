"use client";
import React from "react";
import Image from "next/image";
import { Buteur } from "@/app/types";

interface Props {
  meilleursButeurs: Buteur[];
}

const ButeursTable: React.FC<Props> = ({ meilleursButeurs }) => {
  return (
    <div className="w-full mx-auto bg-gray-100">
      <br />
      <div className="max-w-screen-md lg:mx-auto xl:mx-auto md:mx-auto xs:mx-2 sm:mx-2">
        {meilleursButeurs.length === 0 ? (
          <div className="text-center text-gray-600">
            Désolé, nous n&apos;avons pas d&apos;informations disponibles.
          </div>
        ) : (
          <table className="w-full mx-auto divide-y divide-gray-200 overflow-hidden shadow-lg rounded-lg">
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
                        {buteur.TS_IMAGE_PATH ? (
                          <Image
                            width={50}
                            height={50}
                            src={buteur.TS_IMAGE_PATH}
                            alt="Player"
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <Image
                            width={50}
                            height={50}
                            src={"/anonymous.jpeg"}
                            alt="Player"
                            className="w-8 h-6 rounded-full"
                          />
                        )}
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
        )}
      </div>
    </div>
  );
};

export default ButeursTable;
