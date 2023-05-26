"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface Team {
  TEAM_ID: number;
  TEAM_NAME: string;
  TEAM_IMAGE_PATH: string;
  MATCHES_PLAYED: number;
  WINS: number;
  GOALS: number;
  POINTS: number;
  RANKING: number;
  TUC: string;
}

interface Season {
  TOURNAMENT_IMAGE: string;
  SEASONS: {
    SEASON_ID: number;
    SEASON_TOURNAMENT_STAGE_ID: number;
  }[];
}

export default function PageTeams({ params }: { params: { teamId: string } }) {
  const [seasons, setSeasons] = useState<Season | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [seasonId, setSeasonId] = useState<number | null>(null);
  const [stageId, setStageId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/stages/data",
          params: {
            tournament_stage_id: params.teamId,
            locale: "fr_FR",
          },
          headers: {
            "X-RapidAPI-Key":
              "24bcd35a5amsh4077dfb5e327d9dp1fea1ejsndc2e6568141c",
            "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        const result: Season = response.data.DATA;
        setSeasons(result);
        const season = result.SEASONS[0];
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
      setLoading(true); // spinner loading
      if (!seasonId || !stageId) {
        return;
      }

      try {
        const options = {
          method: "GET",
          url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/standings",
          params: {
            standing_type: "overall",
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
        const result: { ROWS: Team[] }[] = response.data.DATA;
        setTeams(result[0].ROWS);
      } catch (error) {
        console.error("Erreur lors de la récupération des équipes", error);
      } finally {
        // Fin du chargement
        setLoading(false);
      }
    };

    if (seasonId && stageId) {
      fetchTeams();
    }
  }, [seasonId, stageId]);

  if (loading) {
    return (
      <div>
        <br />
        <Image
          src="/Spin-1s-200px.gif"
          width={100}
          height={100}
          alt={"spinner"}
          className="mx-auto block"
        />
      </div>
    );
  }

  if (!seasons || !teams) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="w-full mx-auto bg-gray-100">
      <br />
      <div className="flex justify-center items-center mb-4">
        {/* <a href="/football">
          <button className="absolute left-4 bg-green-700 text-white py-1 px-4 rounded-lg text-sm hover:bg-green-600">
            Retour
          </button>
        </a> */}
        <Image
          src={seasons.TOURNAMENT_IMAGE}
          width={100}
          height={100}
          alt="Tournament"
          className="self-center w-20 h-20"
        />
      </div>

      <h2 className="text-lg font-bold mb-4 text-center text-green-600 tracking-widest">
        CLASSEMENT
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
                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-green-600 text-center font-bold">
                  {team.POINTS}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
    </div>
  );
}
