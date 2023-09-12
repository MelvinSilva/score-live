"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { RugbyResult } from "../types";
import Image from "next/image";
import SkeletonResultatTable from "../components/SkeletonResultatTable";

export default function RugbyList() {
  const [data, setData] = useState<RugbyResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const rugbyResult = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/results",
          params: {
            tournament_stage_id: "h030Uhp8",
            locale: "fr_FR",
          },
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_KEY,
            "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        setData(response.data.DATA[0]);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des matchs", error);
        setLoading(false);
      }
    };

    rugbyResult();
  }, []);

  if (loading) {
    return <SkeletonResultatTable />;
  }

  return (
    <div className="bg-gray-100 p-4 lg:mx-60">
      <br />
      {data && (
        <div>
          <div className="flex flex-col items-center justify-center">
            <div className="rounded-lg overflow-hidden bg-white flex items-center justify-center w-20 h-20 mb-2">
              <Image
                src={data.TOURNAMENT_IMAGE}
                width={70}
                height={70}
                alt="Tournament"
              />
            </div>
            <div>
              <h3 className="text-md font-bold text-gray-600">{data.NAME}</h3>
            </div>
          </div>

          <br />

          <div className="space-y-2 rounded-lg">
            {data.EVENTS.map((event) => (
              <div key={event.EVENT_ID} className="p-1 rounded-lg bg-white">
                {/* //////////////// date et d'heure //////////////// */}
                <p className="text-gray-400 text-xs sm:text-md font-light text-center mb-2">
                  {new Date(event.START_TIME * 1000).toLocaleDateString(
                    "fr-FR",
                    {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    }
                  )}{" "}
                  à{" "}
                  {new Date(event.START_TIME * 1000).toLocaleTimeString(
                    "fr-FR",
                    {
                      hour: "numeric",
                      minute: "numeric",
                    }
                  )}
                </p>

                <div className="flex items-center justify-around mb-2">
                  {/* ////////////////  Équipe à domicile //////////////// */}
                  <div className="flex items-center w-40">
                    <Image
                      src={event.HOME_IMAGES[0]}
                      width={20}
                      height={20}
                      alt="Away Player"
                      className="rounded-xs"
                    />
                    <p
                      className={`truncate ml-2 sm:text-lg xs:text-sm ${
                        event.HOME_SCORE_CURRENT > event.AWAY_SCORE_CURRENT
                          ? "font-bold text-denim-700"
                          : "text-gray-700"
                      }`}
                    >
                      {event.HOME_NAME}
                    </p>
                  </div>

                  {/* //////////////// Score //////////////// */}
                  <div className="flex flex-col items-center justify-center w-20 text-gray-700">
                    <div className="text-md sm:text-xl text-center">
                      {event.HOME_SCORE_CURRENT} - {event.AWAY_SCORE_CURRENT}
                    </div>
                  </div>

                  {/* //////////////// Équipe à l'extérieur //////////////// */}
                  <div className="flex items-center w-40 justify-end cursor-pointer">
                    <p
                      className={`truncate mr-2 sm:text-lg xs:text-sm ${
                        event.HOME_SCORE_CURRENT < event.AWAY_SCORE_CURRENT
                          ? "font-bold text-denim-700"
                          : "text-gray-700"
                      }`}
                    >
                      {event.AWAY_NAME}
                    </p>
                    <Image
                      src={event.AWAY_IMAGES[0]}
                      width={20}
                      height={20}
                      alt="Away Player"
                      className="rounded-xs"
                    />
                  </div>
                </div>

                {/* ////////////////  Statut du match //////////////// */}
                <p className="text-gray-400 text-xs sm:text-md font-light text-center">
                  {event.STAGE_TYPE === "FINISHED" ? "Terminé" : "En cours"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <br />
      <br />
      <br />
    </div>
  );
}
