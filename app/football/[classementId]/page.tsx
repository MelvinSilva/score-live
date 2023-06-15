"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Buteur, SeasonFoot, TeamFoot, TournamentFoot } from "@/app/types";
import ClassementTable from "./classementTable";
import ButeursTable from "./buteurTable";
import TabButtons from "./ongletButtons";
import { ResultatsTable } from "./resultatTable";
import ChampionnatInfo from "./championnatInfo";
import SaisonSelect from "./saisonSelect";
import LoadingSpinner from "./loadingSpinner";

interface Props {
  params: { classementId: string };
}

const ClassementTournament: React.FC<Props> = ({ params }) => {
  const [seasons, setSeasons] = useState<SeasonFoot | null>(null);
  const [tournament, setTournament] = useState<TournamentFoot | null>(null);
  const [teams, setTeams] = useState<TeamFoot[]>([]);
  const [seasonId, setSeasonId] = useState<string | null>(null);
  const [stageId, setStageId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<
    "classement" | "buteurs" | "résultats"
  >("classement");
  const [meilleursButeurs, setMeilleursButeurs] = useState<Buteur[]>([]);

  //////////////// FETCH SAISONS /////////////////////////////// FETCH SAISONS ///////////////
  //////////////// FETCH SAISONS /////////////////////////////// FETCH SAISONS ///////////////
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

  //////////////// FETCH EQUIPE CLASSEMENT /////////////////////////////// FETCH EQUIPE CLASSEMENT ///////////////
  //////////////// FETCH EQUIPE CLASSEMENT /////////////////////////////// FETCH EQUIPE CLASSEMENT ///////////////
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

  //////////////// FETCH BUTEUR /////////////////////////////// FETCH BUTEUR ///////////////
  //////////////// FETCH BUTEUR /////////////////////////////// FETCH BUTEUR ///////////////
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

  const handleOptionChange = (
    option: "classement" | "buteurs" | "résultats"
  ) => {
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
    return <LoadingSpinner />;
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
      <div className="flex justify-center items-center">
        <ChampionnatInfo tournament={tournament} />
        &ensp;
        <SaisonSelect
          seasons={seasons}
          selectedSeasonId={seasonId}
          onSeasonChange={handleSeasonChange}
        />
      </div>

      <br />
      <TabButtons
        selectedOption={selectedOption}
        onOptionChange={handleOptionChange}
      />

      {selectedOption === "classement" && <ClassementTable teams={teams} />}
      {selectedOption === "buteurs" && (
        <ButeursTable meilleursButeurs={meilleursButeurs} />
      )}
      {selectedOption === "résultats" && <ResultatsTable />}
    </div>
  );
};

export default ClassementTournament;
