"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Buteur, SeasonFoot, TeamFoot, TournamentFoot } from "@/app/types";

export default function ClassementTournament({
  params,
}: {
  params: { classementId: string };
}) {
  const [seasons, setSeasons] = useState<SeasonFoot | null>(null);
  const [tournament, setTournament] = useState<TournamentFoot | null>(null);
  const [teams, setTeams] = useState<TeamFoot[]>([]);
  const [seasonId, setSeasonId] = useState<string | null>(null);
  const [stageId, setStageId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<
    "classement" | "buteurs"
  >("classement");
  const [meilleursButeurs, setMeilleursButeurs] = useState<Buteur[]>([]);

  //////////////// FETCH SAISONS ///////////////
  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/stages/data",
          params: {
            tournament_stage_id: params.classementId,
            locale: "fr_FR",
          },
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_KEY,
            "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        const result: SeasonFoot = response.data.DATA;
        const resultTournament: TournamentFoot = response.data.DATA;
        setTournament(resultTournament);
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
  }, [params.classementId]);

  //////////////// FETCH EQUIPE CLASSEMENT ///////////////
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
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_KEY,
            "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        const result: { ROWS: TeamFoot[] }[] = response.data.DATA;
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

  //////////////// FETCH BUTEUR ///////////////
  useEffect(() => {
    const fetchButeurs = async () => {
      if (selectedOption !== "buteurs") {
        setMeilleursButeurs([]); // Réinitialiser le tableau des meilleurs buteurs
        return;
      }

      if (!seasonId || !stageId) {
        setMeilleursButeurs([]); // Réinitialiser le tableau des meilleurs buteurs
        return;
      }

      try {
        const options = {
          method: "GET",
          url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/standings",
          params: {
            standing_type: "top_scores",
            locale: "fr_FR",
            tournament_stage_id: stageId,
            tournament_season_id: seasonId,
            limit: 50,
          },
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_KEY,
            "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        const result: { ROWS: Buteur[] } = response.data;
        if (result.ROWS.length === 0) {
          setMeilleursButeurs([]); // Réinitialiser le tableau des meilleurs buteurs
        } else {
          const filteredButeurs = result.ROWS.slice(0, 50); // Récupère les 50 premiers buteurs
          setMeilleursButeurs(filteredButeurs);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des meilleurs buteurs",
          error
        );
      } finally {
        // Fin du chargement
        setLoading(false);
      }
    };

    if (seasonId && stageId) {
      fetchButeurs();
    }
  }, [seasonId, stageId, selectedOption]);

  const handleOptionChange = (option: "classement" | "buteurs") => {
    setSelectedOption(option);
  };

  const handleSeasonChange = (seasonId: string) => {
    const selectedSeason = seasons?.SEASONS.find(
      (season) => season.SEASON_ID === seasonId
    );
    if (selectedSeason) {
      setSeasonId(selectedSeason.SEASON_ID);
      setStageId(selectedSeason.SEASON_TOURNAMENT_STAGE_ID);
    }
  };

  if (loading) {
    return (
      <div>
        <br />
        <Image
          src="/Spin-1.2s-200px.svg"
          width={100}
          height={100}
          alt="spinner"
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
      <Link href="/football">
        <button className="w-full mx-auto bg-gray-200 font-semibold py-1 px-4 text-sm hover:bg-gray-400 center">
          Retour
        </button>
      </Link>
      <br />
      <br />
      <div className="flex flex-col items-center">
        <div className="flex items-center">
          {seasons?.TOURNAMENT_IMAGE && (
            <div className="rounded-lg overflow-hidden bg-white flex items-center justify-center w-10 h-10 mr-2">
              <Image
                src={seasons?.TOURNAMENT_IMAGE}
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
        <div className="mt-2">
          <label htmlFor="season-select" className="text-gray-600">
            Saison :&nbsp;
          </label>
          <select
            id="season-select"
            className="w-30 py-1 px-2 rounded-lg bg-white border-gray-300 border focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={seasonId || ""}
            onChange={(e) => handleSeasonChange(e.target.value)}
          >
            {seasons?.SEASONS.map((season) => (
              <option key={season.SEASON_ID} value={season.SEASON_ID}>
                {season.SEASON_NAME}
              </option>
            ))}
          </select>
        </div>
      </div>

      <br />
      <div className="flex justify-center mb-4">
        <button
          className={`mr-2 mb-2 px-3 py-1 rounded-lg ${
            selectedOption === "classement"
              ? "bg-gray-600 text-white"
              : "bg-gray-200 text-gray-500"
          } sm:mr-4 sm:mb-0 sm:px-4 sm:py-2 sm:text-base`}
          onClick={() => handleOptionChange("classement")}
        >
          Classement
        </button>
        <button
          className={`mr-2 mb-2 px-3 py-1 rounded-lg ${
            selectedOption === "buteurs"
              ? "bg-gray-600 text-white"
              : "bg-gray-200 text-gray-500"
          } sm:mr-4 sm:mb-0 sm:px-4 sm:py-2 sm:text-base`}
          onClick={() => handleOptionChange("buteurs")}
        >
          Top buteurs
        </button>
      </div>

      {selectedOption === "classement" && (
        <div className="max-w-screen-md mx-auto">
          <br />
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
        </div>
      )}
      {selectedOption === "buteurs" && (
        <div className="w-full mx-auto bg-gray-100">
          <br />
          <div className="max-w-screen-md mx-auto">
            {meilleursButeurs.length === 0 && !loading ? (
              <div className="text-center text-gray-600">
                Il n'y a pas de résultats disponibles.
              </div>
            ) : (
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
            <br />
            <br />
          </div>
        </div>
      )}
    </div>
  );
}
