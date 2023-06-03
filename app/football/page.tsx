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
  const [activeTab, setActiveTab] = useState<string>("France");

  useEffect(() => {
    const fetchChampionships = async () => {
      try {
        setLoading(true);
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
        setActiveTab("France");
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des championnats de football :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChampionships();
  }, []);

  if (loading) {
    return (
      <div>
        <br />
        <Image
          src="/Spin-1.2s-200px.svg"
          width={100}
          height={100}
          alt={"spinner"}
          className="mx-auto block"
        />
      </div>
    );
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const renderTabs = () => {
    const countries = Array.from(
      new Set(championships.map((championship) => championship.country))
    );

    const countryFlags: { [country: string]: string } = {
      Allemagne: "🇩🇪",
      Italie: "🇮🇹",
      France: "🇫🇷",
      Angleterre: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      Espagne: "🇪🇸",
      Portugal: "🇵🇹",
    };

    return (
      <div className="text-sm flex flex-wrap justify-center mb-4">
        {countries.map((country) => (
          <button
            key={country}
            className={`mr-2 ml-2 mb-2 px-2 py-0 text-xl justify-center rounded-lg ${
              activeTab === country
                ? "border-2 border-gray-300 text-white"
                : "text-gray-500"
            } sm:w-auto sm:px-4 sm:py-2`}
            onClick={() => handleTabClick(country)}
          >
            {countryFlags[country]}
          </button>
        ))}
      </div>
    );
  };

  const renderCountryChampionships = () => {
    const filteredChampionships = championships.filter(
      (championship) => championship.country === activeTab
    );

    return (
      <React.Fragment>
        {filteredChampionships.map((championship) => (
          <tr key={championship.stageId}>
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
        ))}
      </React.Fragment>
    );
  };

  return (
    <div className="w-full mx-auto bg-gray-100">
      <h2 className="text-xs font-semibold mb-4 pt-8 text-center text-gray-600 tracking-widest">
        CHOISIR LE PAYS PUIS LE CHAMPIONNAT
      </h2>
      {renderTabs()}
      <div className="max-w-screen-md mx-auto">
        <table className="w-full mx-auto divide-y divide-gray-200 rounded-lg overflow-hidden shadow-lg">
          <tbody className="bg-white divide-y divide-gray-200">
            {renderCountryChampionships()}
          </tbody>
        </table>
        <br />
      </div>
    </div>
  );
};

export default FootballList;
