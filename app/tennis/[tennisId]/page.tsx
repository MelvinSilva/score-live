"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { SeasonTennis, TournamentTennis } from "@/app/types";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import CardSkeleton from "@/app/components/CardSkeleton";

export default function ResultTennisTournament({
  params,
}: {
  params: { tennisId: string };
}) {
  const [seasons, setSeasons] = useState<SeasonTennis | null>(null);
  const [tournamentResult, setTournamentResult] = useState<TournamentTennis[]>(
    []
  );
  const [seasonId, setSeasonId] = useState<number | null>(null);
  const [stageId, setStageId] = useState<number | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(true);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/stages/data",
          params: {
            tournament_stage_id: params.tennisId,
            locale: "fr_FR",
          },
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_KEY,
            "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        const result: SeasonTennis = response.data.DATA;
        setSeasons(result);
        setSeasonId(result.SEASONS[0].SEASON_ID);
        setStageId(result.SEASONS[0].SEASON_TOURNAMENT_STAGE_ID);
      } catch (error) {
        console.error("Erreur lors de la récupération des équipes", error);
      }
    };

    fetchSeasons();
  }, [params.tennisId]);

  useEffect(() => {
    const fetchTournamentResults = async () => {
      setLoading(true);

      if (!seasonId || !stageId) {
        return;
      }

      let page = 1;
      let allResults: TournamentTennis[] = [];

      while (true) {
        try {
          const options = {
            method: "GET",
            url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/results",
            params: {
              locale: "fr_FR",
              tournament_stage_id: stageId,
              page: page.toString(),
            },
            headers: {
              "X-RapidAPI-Key": process.env.NEXT_PUBLIC_KEY,
              "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
            },
          };

          const response = await axios.request(options);
          const result: TournamentTennis[] = response.data.DATA[0].EVENTS;

          if (result.length === 0) {
            // Aucun résultat supplémentaire
            break;
          }

          allResults = [...allResults, ...result];
          page++;
        } catch (error) {
          console.error("Erreur lors de la récupération des équipes", error);
          break;
        }
      }

      setTournamentResult(allResults);
      setLoading(false);
      setHasMoreResults(false);
    };

    if (seasonId && stageId) {
      fetchTournamentResults();
    }
  }, [seasonId, stageId]);

  const handleLoadMore = () => {
    if (hasMoreResults) {
      setLoading(true);

      // Scroll vers le bas de la page pour afficher le spinner de chargement
      loadMoreRef.current?.scrollIntoView({ behavior: "smooth" });

      setLoading(false);
    }
  };

  // tri des ROUND dans des tabs ??
  const renderTabs = () => {
    const rounds = tournamentResult
      .map((result) => result.ROUND)
      .filter((round, index, self) => self.indexOf(round) === index);

    return (
      <div className="flex justify-center ml-2 mr-2">
        <div className="flex" style={{ overflowX: "auto" }}>
          {rounds.map((round) => (
            <button
              key={round}
              className={`mr-2 mb-2 py-2 rounded-lg text-xs px-2 min-w-fit  ${
                activeTab === round
                  ? "bg-gray-600 text-white"
                  : "bg-gray-200 text-gray-500"
              } sm:mr-4 sm:mb-0 sm:px-4 sm:py-2 sm:text-base`}
              onClick={() => setActiveTab(round)}
            >
              {round}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // filtre les resultats selon le ROUND dans chaque tabs
  const filteredResults = activeTab
    ? tournamentResult.filter((result) => result.ROUND === activeTab)
    : tournamentResult;

  if (loading) {
    return <CardSkeleton />;
  }

  return (
    <div className="w-full mx-auto bg-gray-100">
      <br />
      <br />
      <div className="flex items-center justify-center">
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
        <div className="flex flex-col">
          <h3 className="text-md font-bold text-gray-600">
            {seasons?.LEAGUE_NAME}
          </h3>
        </div>
      </div>

      <br />

      {tournamentResult && tournamentResult.length > 0 ? (
        <div>
          {renderTabs()}
          <div className="bg-gray-100 p-4 lg:mx-60">
            <div className="space-y-2 rounded-lg">
              {filteredResults.map((result) => (
                <div key={result.EVENT_ID} className="p-4 rounded-lg bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {result.HOME_IMAGES ? (
                        <Image
                          src={result.HOME_IMAGES[0]}
                          width={60}
                          height={60}
                          alt="Home Player"
                          className="rounded-full"
                        />
                      ) : (
                        <Image
                          src="/anonymous.jpeg"
                          width={60}
                          height={60}
                          alt="Away Player"
                          className="rounded-full"
                        />
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-gray-400 text-xs">
                        Le{" "}
                        {new Date(result.START_TIME * 1000).toLocaleDateString(
                          "fr-FR",
                          {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                          }
                        )}{" "}
                        à{" "}
                        {new Date(result.START_TIME * 1000).toLocaleTimeString(
                          "fr-FR",
                          {
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )}
                      </p>
                      <br />
                      {result.HOME_SCORE_CURRENT &&
                      result.AWAY_SCORE_CURRENT ? (
                        <div className="font-bold text-xl text-center current-score">
                          {result.HOME_SCORE_CURRENT} -{" "}
                          {result.AWAY_SCORE_CURRENT}
                          <br />
                          <div className="flex justify-center">
                            {result.HOME_SCORE_PART_1 &&
                              result.AWAY_SCORE_PART_1 && (
                                <p className="text-xs font-light score">
                                  {result.HOME_SCORE_PART_1}-
                                  {result.AWAY_SCORE_PART_1}
                                </p>
                              )}
                            {result.HOME_SCORE_PART_2 &&
                              result.AWAY_SCORE_PART_2 && (
                                <p className="text-xs font-light score">
                                  &nbsp;&nbsp;
                                  {result.HOME_SCORE_PART_2}-
                                  {result.AWAY_SCORE_PART_2}
                                </p>
                              )}
                            {result.HOME_SCORE_PART_3 &&
                              result.AWAY_SCORE_PART_3 && (
                                <p className="text-xs font-light score">
                                  &nbsp;&nbsp;
                                  {result.HOME_SCORE_PART_3}-
                                  {result.AWAY_SCORE_PART_3}
                                </p>
                              )}
                            {result.HOME_SCORE_PART_4 &&
                              result.AWAY_SCORE_PART_4 && (
                                <p className="text-xs font-light score">
                                  &nbsp;&nbsp;
                                  {result.HOME_SCORE_PART_4}-
                                  {result.AWAY_SCORE_PART_4}
                                </p>
                              )}
                            {result.HOME_SCORE_PART_5 &&
                              result.AWAY_SCORE_PART_5 && (
                                <p className="text-xs font-light score">
                                  &nbsp;&nbsp;
                                  {result.HOME_SCORE_PART_5}-
                                  {result.AWAY_SCORE_PART_5}
                                </p>
                              )}
                          </div>
                        </div>
                      ) : (
                        <p className="font-semibold text-xs text-center">
                          {result.INFO_NOTICE ? result.INFO_NOTICE : ""}
                        </p>
                      )}

                      <p className="text-gray-400 text-xs mt-2">
                        {result.STAGE_TYPE === "FINISHED"
                          ? "Terminé"
                          : "En cours"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {result.AWAY_IMAGES ? (
                        <Image
                          src={result.AWAY_IMAGES[0]}
                          width={60}
                          height={60}
                          alt="Away Player"
                          className="rounded-full"
                        />
                      ) : (
                        <Image
                          src="/anonymous.jpeg"
                          width={60}
                          height={60}
                          alt="Away Player"
                          className="rounded-full"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 text-gray-600 text-sm">
                    <p
                      className={
                        result.HOME_SCORE_CURRENT > result.AWAY_SCORE_CURRENT
                          ? "font-bold text-gray-700"
                          : ""
                      }
                    >
                      {result.HOME_NAME}
                    </p>
                    <p
                      className={
                        result.HOME_SCORE_CURRENT < result.AWAY_SCORE_CURRENT
                          ? "font-bold text-gray-700"
                          : ""
                      }
                    >
                      {result.AWAY_NAME}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {hasMoreResults && <div ref={loadMoreRef}></div>}
          </div>
        </div>
      ) : (
        <p>Aucun événement disponible</p>
      )}
    </div>
  );
}
