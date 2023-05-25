"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/dist/client/components/navigation";
import axios from "axios";
import Image from "next/image";

export default function PageTeams() {
  const param: any = useParams();

  const [seasons, setSeasons] = useState(null);
  const [teams, setTeams] = useState([]);
  const [seasonId, setSeasonId] = useState([]);
  const [stageId, setStageId] = useState([]);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/stages/data",
          params: {
            tournament_stage_id: param.teamId,
            locale: "fr_FR",
          },
          headers: {
            "X-RapidAPI-Key":
              "24bcd35a5amsh4077dfb5e327d9dp1fea1ejsndc2e6568141c",
            "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        const result = response.data.DATA;
        setSeasons(result);
        const season = result.SEASONS[0]; // Accède au premier élément de SEASONS
        const seasonId = season.SEASON_ID;
        const stageId = season.SEASON_TOURNAMENT_STAGE_ID;
        setSeasonId(seasonId);
        setStageId(stageId);
      } catch (error) {
        console.error("Erreur lors de la récupération des équipes", error);
      }
    };

    fetchSeasons();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      if (!seasonId || !stageId) {
        return; // Si seasonId ou stageId ne sont pas encore définis, arrêtez l'exécution de cette fonction
      }

      try {
        const options = {
          method: "GET",
          url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/standings",
          params: {
            standing_type: "home",
            locale: "fr_FR",
            tournament_stage_id: stageId,
            tournament_season_id: seasonId,
          },
          headers: {
            "X-RapidAPI-Key":
              "24bcd35a5amsh4077dfb5e327d9dp1fea1ejsndc2e6568141c",
            "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        const result = response.data.DATA;
        setTeams(result[0].ROWS); // Stocke les données de l'équipe dans l'état
      } catch (error) {
        console.error("Erreur lors de la récupération des équipes", error);
      }
    };

    fetchTeams();
  }, [seasonId, stageId]); // Exécute cette fonction chaque fois que seasonId ou stageId change

  if (!seasons || !teams) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="w-full mx-auto bg-gray-100">
      <div className="flex justify-center items-center mb-4">
        {/* <a href="/football">
          <button className="absolute left-4 bg-green-700 text-white py-1 px-4 rounded-lg text-sm hover:bg-green-600">
            Retour
          </button>
          </a> */}
        <Image
          src={seasons.TOURNAMENT_IMAGE}
          alt="Tournament"
          className="self-center w-32 h-32"
        />
      </div>

      <h2 className="text-lg font-bold mb-4 text-center text-green-700 tracking-widest">
        Classement
      </h2>
      <div className="max-w-screen-md mx-auto">
        <table className="w-full mx-auto divide-y divide-gray-200 rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-white">
            <tr>
              <th className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 uppercase">
                #
              </th>
              <th className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 uppercase">
                Équipe
              </th>
              <th className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 uppercase">
                Matchs Joués
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
                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                  {team.RANKING}
                </td>
                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                  <Image
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
                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-green-700 font-bold text-center">
                  {team.POINTS}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
