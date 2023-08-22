"use client";
import React, { useState, useEffect } from "react";
import { MatchResult } from "@/app/types";
import Image from "next/image";
import CardSkeleton from "@/app/components/SkeletonCardTennis";

interface ResultatsTableProps {
  matchResults: MatchResult[];
  loading: boolean;
}

export const ResultatsTable: React.FC<ResultatsTableProps> = ({
  matchResults,
  loading,
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const [selectedRound, setSelectedRound] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [groupedResults, setGroupedResults] = useState<{
    [round: string]: MatchResult[];
  }>({});

  const sortRounds = (a: string, b: string) => {
    const aNumber = Number(a.split(" ")[1]);
    const bNumber = Number(b.split(" ")[1]);
    return bNumber - aNumber;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (matchResults.length === 0) {
        setShowMessage(true);
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [matchResults]);

  useEffect(() => {
    const resultsToDisplay = selectedTeam
      ? matchResults.filter(
          (match) =>
            match.HOME_NAME === selectedTeam || match.AWAY_NAME === selectedTeam
        )
      : matchResults;

    const resultsByRound = resultsToDisplay.reduce((grouped, match) => {
      const round = match.ROUND;
      if (!grouped[round]) {
        grouped[round] = [];
      }
      grouped[round].push(match);
      return grouped;
    }, {} as { [round: string]: MatchResult[] });

    setGroupedResults(resultsByRound);

    const rounds = Object.keys(resultsByRound);
    if (rounds.length > 0 && !selectedRound) {
      setSelectedRound(rounds.sort(sortRounds)[0]);
    }
  }, [selectedTeam, matchResults, selectedRound]);

  const handleRoundChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRound(event.target.value);
  };

  const handleTeamClick = (teamName: string) => {
    setSelectedTeam(teamName);
    setSelectedRound(null);
  };

  const handleResetClick = () => {
    setSelectedTeam(null);
    setSelectedRound(null);
  };

  if (loading) {
    return <CardSkeleton />;
  }

  const roundsToShow = selectedTeam
    ? Object.keys(groupedResults).sort(sortRounds)
    : [selectedRound];

  return (
    <div className="bg-gray-100 p-4 lg:mx-60">
      {Object.keys(groupedResults).length === 0 ? (
        showMessage ? (
          <div className="text-center text-gray-600">
            Désolé, nous n&apos;avons pas encore d&apos;informations
            disponibles.
          </div>
        ) : null
      ) : (
        <>
          {selectedTeam && (
            <button
              onClick={handleResetClick}
              className="my-2 block bg-gray-200 text-gray-800 text-xs p-2 rounded-lg mx-auto"
            >
              Afficher toutes les équipes
            </button>
          )}
          {!selectedTeam && (
            <select
              onChange={handleRoundChange}
              value={selectedRound || ""}
              className="my-2 block w-2/6 rounded-md text-gray-600 text-sm bg-white p-1"
            >
              {Object.keys(groupedResults)
                .sort(sortRounds)
                .map((round) => (
                  <option key={round} value={round}>
                    {round}
                  </option>
                ))}
            </select>
          )}
          {roundsToShow.map(
            (round) =>
              round && (
                <div key={round}>
                  {selectedTeam && (
                    <h2 className="mt-4 mb-1 text-sm text-gray-500">{round}</h2>
                  )}
                  <div className="space-y-2 rounded-lg">
                    {(groupedResults[round] || []).map((match, index) => (
                      <div key={index} className="p-1 rounded-lg bg-white">
                        {/* Ligne de date et d'heure */}
                        <p className="text-gray-400 text-xs sm:text-md font-light text-center mb-2">
                          {new Date(match.START_TIME * 1000).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "numeric",
                              month: "numeric",
                              year: "numeric",
                            }
                          )}{" "}
                          à{" "}
                          {new Date(match.START_TIME * 1000).toLocaleTimeString(
                            "fr-FR",
                            {
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )}
                        </p>

                        <div className="flex items-center justify-around mb-2">
                          {/* Équipe à domicile */}
                          <div
                            className="flex items-center w-40 cursor-pointer"
                            onClick={() => handleTeamClick(match.HOME_NAME)}
                          >
                            <Image
                              src={match.HOME_IMAGES[0]}
                              width={20}
                              height={20}
                              alt="Home Player"
                              className="rounded-full"
                            />
                            <p
                              className={`ml-2 sm:text-xl  xs:text-sm ${
                                match.HOME_SCORE_CURRENT >
                                match.AWAY_SCORE_CURRENT
                                  ? "font-extrabold text-green-700"
                                  : "text-gray-700"
                              }`}
                            >
                              {match.HOME_NAME}
                            </p>
                          </div>

                          {/* Score */}
                          <div className="flex flex-col items-center justify-center w-20 text-gray-700">
                            <div className="text-md sm:text-xl text-center current-score-foot">
                              {match.HOME_SCORE_CURRENT}-
                              {match.AWAY_SCORE_CURRENT}
                            </div>
                          </div>

                          {/* Équipe à l'extérieur */}
                          <div
                            className="flex items-center w-40 justify-end cursor-pointer"
                            onClick={() => handleTeamClick(match.AWAY_NAME)}
                          >
                            <p
                              className={`mr-2 sm:text-xl xs:text-sm ${
                                match.HOME_SCORE_CURRENT <
                                match.AWAY_SCORE_CURRENT
                                  ? "font-extrabold text-green-700"
                                  : "text-gray-700"
                              }`}
                            >
                              {match.AWAY_NAME}
                            </p>
                            <Image
                              src={match.AWAY_IMAGES[0]}
                              width={20}
                              height={20}
                              alt="Away Player"
                              className="rounded-full"
                            />
                          </div>
                        </div>

                        {/* Statut du match */}
                        <p className="text-gray-400 text-xs sm:text-md font-light text-center">
                          {match.STAGE_TYPE === "FINISHED"
                            ? "Terminé"
                            : "En cours"}
                        </p>
                      </div>
                    ))}
                  </div>
                  <br />
                </div>
              )
          )}
        </>
      )}
    </div>
  );
};
