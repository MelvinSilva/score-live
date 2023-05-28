"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import ClassementTable from "../classementTable/page";
import { ButeursTable } from "../buteurTable/page";

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

interface Buteur {
  TS_PLAYER_ID: number;
  TS_RANK: number;
  TS_PLAYER_NAME_PA: string;
  TS_PLAYER_GOALS: number;
  TS_PLAYER_ASISTS: number;
  TS_IMAGE_PATH: string;
  TEAM_NAME: string;
}

interface Season {
  TOURNAMENT_IMAGE: string;
  SEASONS: {
    SEASON_ID: number;
    SEASON_TOURNAMENT_STAGE_ID: number;
  }[];
}

interface Tournament {
  COUNTRY_NAME: string;
  LEAGUE_NAME: string;
}

export default function ClassementTournament({
  params,
}: {
  params: { classementId: string };
}) {
  const [seasons, setSeasons] = useState<Season | null>(null);
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [seasonId, setSeasonId] = useState<number | null>(null);
  const [stageId, setStageId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<
    "classement" | "buteurs"
  >("classement");
  const [meilleursButeurs, setMeilleursButeurs] = useState<Buteur[]>([]);

  const apiKey = process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY;

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY;
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
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        const result: Season = response.data.DATA;
        const resultTournament: Tournament = response.data.DATA;
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
  }, [apiKey, params.classementId]);

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
            "X-RapidAPI-Key": apiKey,
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
  }, [seasonId, stageId, apiKey]);

  useEffect(() => {
    const fetchButeurs = async () => {
      if (!seasonId || !stageId) {
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
          },
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        const result: { ROWS: Buteur[] } = response.data;
        setMeilleursButeurs(result.ROWS);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des meilleurs buteurs",
          error
        );
      }
    };

    if (seasonId && stageId) {
      fetchButeurs();
    }
  }, [seasonId, stageId, apiKey]);

  const handleOptionChange = (option: "classement" | "buteurs") => {
    setSelectedOption(option);
  };

  if (loading) {
    return (
      <div>
        <br />
        <Image
          src="/Spin-1s-200px.gif"
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
      <a href="/football">
        <button className="w-full mx-auto bg-gray-200 font-semibold text-gray-600 py-1 px-4 text-sm hover:bg-green-100 center">
          Retour
        </button>
      </a>
      <br />
      <br />
      <div className="flex justify-center items-center mb-4">
        <Image
          src={seasons.TOURNAMENT_IMAGE}
          width={100}
          height={100}
          alt="Tournament"
          className="self-center w-20 h-20"
        />
      </div>

      <h3 className="text-md font-bold mb-4 text-center text-green-600 tracking-widest">
        {tournament?.LEAGUE_NAME} ({tournament?.COUNTRY_NAME})
      </h3>

      <div className="flex justify-center mb-4">
        <button
          className={`mr-4 px-4 py-2 rounded-lg ${
            selectedOption === "classement"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
          onClick={() => handleOptionChange("classement")}
        >
          Classement
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedOption === "buteurs"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
          onClick={() => handleOptionChange("buteurs")}
        >
          Top buteurs
        </button>
      </div>

      {selectedOption === "classement" && <ClassementTable teams={teams} />}
      {selectedOption === "buteurs" && (
        <ButeursTable meilleursButeurs={meilleursButeurs} />
      )}
    </div>
  );
}
