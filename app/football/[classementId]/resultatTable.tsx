"use client";
import React, { useState, useEffect } from "react";
import { MatchResult } from "@/app/types";
import Image from "next/image";
import CardSkeleton from "@/app/components/SkeletonCardTennis";

interface ResultatsTableProps {
  matchResults: MatchResult[];
  loading: boolean; // ajouté
}

export const ResultatsTable: React.FC<ResultatsTableProps> = ({
  matchResults,
  loading, // ajouté
}) => {
  const [selectedRound, setSelectedRound] = useState<string | null>(null);
  const [groupedResults, setGroupedResults] = useState<{
    [round: string]: MatchResult[];
  }>({});
  const [showMessage, setShowMessage] = useState(false);

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
    }, 1500);

    return () => clearTimeout(timeout);
  }, [matchResults]);

  useEffect(() => {
    if (matchResults && matchResults.length > 0) {
      const resultsByRound = matchResults.reduce((grouped, match) => {
        const round = match.ROUND;
        if (!grouped[round]) {
          grouped[round] = [];
        }
        grouped[round].push(match);
        return grouped;
      }, {} as { [round: string]: MatchResult[] });

      setGroupedResults(resultsByRound);

      const rounds = Object.keys(resultsByRound);
      if (rounds.length > 0) {
        setSelectedRound(rounds.sort(sortRounds)[0]);
      }
    }
  }, [matchResults]);

  const handleRoundChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRound(event.target.value);
  };

  // Affiche le squelette si loading est vrai
  if (loading) {
    return <CardSkeleton />;
  }

  return (
    <div className="bg-gray-100 p-4 lg:mx-60">
      {matchResults.length === 0 ? (
        showMessage ? (
          <div className="text-center text-gray-600">
            Désolé, nous n&apos;avons pas encore d&apos;informations
            disponibles.
          </div>
        ) : null
      ) : (
        <>
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
          <div className="space-y-2 rounded-lg">
            {(groupedResults[selectedRound ?? ""] || []).map((match, index) => (
              <div key={index} className="p-2 rounded-lg bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center w-1/4">
                    <Image
                      src={match.HOME_IMAGES[0]}
                      width={30}
                      height={30}
                      alt="Home Player"
                      className="rounded-full"
                    />
                    <p
                      className={`ml-2 text-sm ${
                        match.HOME_SCORE_CURRENT > match.AWAY_SCORE_CURRENT
                          ? "font-semibold"
                          : ""
                      }`}
                    >
                      {match.HOME_NAME}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-1/2">
                    <p className="text-gray-400 text-xs font-light">
                      Le{" "}
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
                    <div className="font-semibold text-xs text-center current-score-foot m-4">
                      {match.HOME_SCORE_CURRENT} - {match.AWAY_SCORE_CURRENT}
                    </div>
                    <p className="text-gray-400 text-xs font-light">
                      {match.STAGE_TYPE === "FINISHED" ? "Terminé" : "En cours"}
                    </p>
                  </div>
                  <div className="flex items-center w-1/4 justify-end">
                    <p
                      className={`mr-2 text-sm ${
                        match.HOME_SCORE_CURRENT < match.AWAY_SCORE_CURRENT
                          ? "font-semibold"
                          : ""
                      }`}
                    >
                      {match.AWAY_NAME}
                    </p>
                    <Image
                      src={match.AWAY_IMAGES[0]}
                      width={30}
                      height={30}
                      alt="Away Player"
                      className="rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
