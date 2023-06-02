"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Season {
  TOURNAMENT_IMAGE: string;
  LEAGUE_NAME: string;
  SEASONS: {
    SEASON_ID: number;
    SEASON_TOURNAMENT_STAGE_ID: number;
  }[];
}

interface Tournament {
  EVENT_ID: string;
  START_TIME: number;
  START_UTIME: number;
  HOME_NAME: string;
  AWAY_NAME: string;
  HOME_SCORE_CURRENT: string;
  AWAY_SCORE_CURRENT: string;
  ROUND: string;
  STAGE_TYPE: string;
  HOME_IMAGES: string[];
  AWAY_IMAGES: string[];
  INFO_NOTICE: string;
  STAGE: string;
}

export default function ResultTennisTournament({
  params,
}: {
  params: { tennisId: string };
}) {
  const [seasons, setSeasons] = useState<Season | null>(null);
  const [tournamentResult, setTournamentResult] = useState<Tournament[]>([]);
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
        const result: Season = response.data.DATA;
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
      let allResults: Tournament[] = [];

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
          const result: Tournament[] = response.data.DATA[0].EVENTS;

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

  const renderTabs = () => {
    const rounds = tournamentResult
      .map((result) => result.ROUND)
      .filter((round, index, self) => self.indexOf(round) === index);

    return (
      <div className="flex flex-wrap justify-center mb-4 text-sm">
        {rounds.map((round) => (
          <button
            key={round}
            className={`mr-4 mb-2 px-4 py-2 rounded-lg ${
              activeTab === round
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-500"
            } sm:w-auto sm:px-2 sm:py-3`}
            onClick={() => setActiveTab(round)}
          >
            {round}
          </button>
        ))}
      </div>
    );
  };

  const filteredResults = activeTab
    ? tournamentResult.filter((result) => result.ROUND === activeTab)
    : tournamentResult;

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

  return (
    <div className="w-full mx-auto bg-gray-100">
      <Link href="/tennis">
        <button className="w-full mx-auto bg-green-200 font-semibold py-1 px-4 text-sm hover:bg-green-400 center">
          Retour
        </button>
      </Link>
      <br />
      <br />
      <div className="flex justify-center items-center">
        {seasons?.TOURNAMENT_IMAGE && (
          <Image
            src={seasons?.TOURNAMENT_IMAGE}
            width={100}
            height={100}
            alt="Tournament"
            className="self-center w-20 h-20"
          />
        )}
      </div>
      <br />

      <h3 className="text-md font-bold mb-4 text-center text-green-600">
        {seasons?.LEAGUE_NAME}
      </h3>

      {tournamentResult && tournamentResult.length > 0 ? (
        <div>
          {renderTabs()}
          <div className="bg-gray-100 p-4">
            <div className="space-y-8 m-4 rounded-lg">
              {filteredResults.map((result) => (
                <div key={result.EVENT_ID} className="p-4 rounded-lg bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {result.HOME_IMAGES && (
                        <Image
                          src={result.HOME_IMAGES[0]}
                          width={60}
                          height={60}
                          alt="Home Player"
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
                        <p className="font-bold text-xl text-center">
                          {result.HOME_SCORE_CURRENT} -{" "}
                          {result.AWAY_SCORE_CURRENT}
                        </p>
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
                      {result.AWAY_IMAGES && (
                        <Image
                          src={result.AWAY_IMAGES[0]}
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
                          ? "font-bold text-green-700"
                          : ""
                      }
                    >
                      {result.HOME_NAME}
                    </p>
                    <p
                      className={
                        result.HOME_SCORE_CURRENT < result.AWAY_SCORE_CURRENT
                          ? "font-bold text-green-700"
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
