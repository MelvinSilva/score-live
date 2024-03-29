"use client";
import React from "react";
import Image from "next/image";
import { TeamFoot } from "@/app/types";

interface Props {
  teams: TeamFoot[];
}

const ClassementTable: React.FC<Props> = ({ teams }) => {
  return (
    <div className="max-w-screen-lg mx-auto">
      <br />
      <table className="w-full mx-auto divide-y divide-gray-200 overflow-hidden shadow-lg">
        <thead className="bg-white">
          <tr>
            <th className="text-left px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 uppercase">
              &ensp;&ensp;#
            </th>
            <th className="text-left px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 uppercase">
              Équipe
            </th>
            <th className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 uppercase">
              Matchs
            </th>
            <th className="hidden sm:table-cell px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 uppercase">
              Victoires
            </th>
            <th className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 uppercase">
              Buts
            </th>
            <th className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 uppercase">
              Points
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {teams.map((team) => (
            <tr key={team.TEAM_ID}>
              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center">
                {team.TUC && (
                  <div
                    style={{
                      backgroundColor: `#${team.TUC}`,
                      color: "#ffffff",
                      fontWeight: 600,
                      borderRadius: "5px",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    {team.RANKING}
                  </div>
                )}
                {!team.TUC && (
                  <span
                    style={{
                      color: "#00000",
                      borderRadius: "5px",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    {team.RANKING}
                  </span>
                )}
              </td>
              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                <Image
                  width={100}
                  height={100}
                  src={team.TEAM_IMAGE_PATH}
                  alt="Team"
                  className="w-6 sm:w-8 h-6 sm:h-8 mr-2 inline-block"
                />
                {team.TEAM_NAME}
              </td>
              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center">
                {team.MATCHES_PLAYED}
              </td>
              <td className="hidden sm:table-cell px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center">
                {team.WINS}
              </td>
              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center">
                {team.GOALS}
              </td>
              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600 text-center font-bold">
                {team.POINTS}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <br />
    </div>
  );
};

export default ClassementTable;
