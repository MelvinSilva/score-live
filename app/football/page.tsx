"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

type FootballChampionship = {
  name: string;
  image: string;
  country: string;
  url: string; // Nouveau champ pour l'URL du championnat
  stageId: string;
};

const FootballList = () => {
  const [championships, setChampionships] = useState<FootballChampionship[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChampionships = async () => {
      try {
        setLoading(true); // spinner loading
        const options = {
          method: "GET",
          url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/stages",
          params: {
            sport_id: "1",
            locale: "fr_FR",
          },
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_KEY,
            "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        const data = response.data.DATA;

        // Filtrez et transformez les données pour obtenir les championnats souhaités
        const allowedCountries = [
          "Allemagne",
          "Italie",
          "France",
          "Angleterre",
          "Espagne",
          "Portugal",
        ];

        const allowedChampionships = [
          "Premier League",
          "Championship",
          "Ligue 1",
          "Ligue 2",
          "National",
          "Bundesliga",
          "2. Bundesliga",
          "Serie A",
          "Serie B",
          "LaLiga",
          "LaLiga2",
          "Liga Portugal",
          "Liga Portugal 2",
        ];

        const filteredChampionships = data
          .filter((item: any) => {
            const isAllowedCountry = allowedCountries.includes(
              item.COUNTRY_NAME
            );
            const isAllowedChampionship = allowedChampionships.includes(
              item.LEAGUE_NAME
            );
            const isExcludedSuperCup =
              item.LEAGUE_NAME === "Super Coupe" &&
              item.COUNTRY_NAME === "Espagne";

            return (
              isAllowedCountry && isAllowedChampionship && !isExcludedSuperCup
            );
          })
          .map((item: any) => ({
            id: item.id,
            name: item.LEAGUE_NAME,
            image: item.TOURNAMENT_IMAGE,
            country: item.COUNTRY_NAME,
            stageId: item.STAGE_ID,
          }));

        setChampionships(filteredChampionships);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des championnats de football :",
          error
        );
      } finally {
        // Fin du chargement
        setLoading(false);
      }
    };

    fetchChampionships();
  }, [process.env.NEXT_PUBLIC_KEY]);

  if (loading) {
    // Remplacer 'Loading...' par votre spinner de chargement
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

  return (
    <div className="w-full mx-auto bg-gray-100">
      <h2 className="text-lg font-bold mb-4 pt-8 text-center text-green-600 tracking-widest">
        CHOISISSEZ LE CHAMPIONNAT
      </h2>
      <div className="max-w-screen-md mx-auto">
        <table className="w-full mx-auto divide-y divide-gray-200 rounded-lg overflow-hidden shadow-lg">
          <tbody className="bg-white divide-y divide-gray-200">
            {championships.map((championship, index) => (
              <React.Fragment key={championship.stageId}>
                {index === 0 ||
                championships[index - 1].country !== championship.country ? (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase"
                    >
                      {championship.country}
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <a href={`football/${championship.stageId}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Image
                        width={100}
                        height={100}
                        src={championship.image}
                        alt={championship.name}
                        className="w-8 h-8 mr-2 inline-block"
                      />
                      {championship.name}
                    </td>
                  </a>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <br />
      </div>
    </div>
  );
};

export default FootballList;
