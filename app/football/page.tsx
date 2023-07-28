"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { allowedCountries } from "./components/filter/allowedCountries";
import { excludedSuperCup } from "./components/filter/excludedSuperCup";

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
          next: { revalidate: 1 },
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

        const filteredChampionships = data
          .filter((item: any) => {
            const isAllowedCountry = allowedCountries.includes(
              item.COUNTRY_NAME
            );

            const isExcludedSuperCup = excludedSuperCup.some((word) =>
              item.LEAGUE_NAME.includes(word)
            );

            return isAllowedCountry && !isExcludedSuperCup;
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
    ).sort((a, b) => {
      if (a === "France") return -1; // Mettre la France en premier
      if (b === "France") return 1;
      return a.localeCompare(b);
    });

    const countryFlags: { [country: string]: string } = {
      Allemagne: "🇩🇪",
      Italie: "🇮🇹",
      France: "🇫🇷",
      Angleterre: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      Espagne: "🇪🇸",
      Portugal: "🇵🇹",
      Belgique: "🇧🇪",
      PaysBas: "🇳🇱",
      Turquie: "🇹🇷",
      "Arabie Saoudite": "🇸🇦",
      MLS: "🇺🇸",
    };

    return (
      <div>
        <div className="flex justify-center mb-2 ml-2 mr-2">
          <div className="flex" style={{ overflowX: "auto" }}>
            {countries.map((country) => (
              <button
                key={country}
                className={`px-4 py-0 text-2xl justify-center rounded-lg ${
                  activeTab === country
                    ? "border-2 border-gray-300 text-white"
                    : "text-gray-500"
                } md:w-full md:px-6 md:py-2 md:text-3xl`}
                onClick={() => handleTabClick(country)}
              >
                {countryFlags[country]}
              </button>
            ))}
          </div>
        </div>
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
      <p className="w-full mx-auto bg-gray-200 font-semibold py-1 px-4 text-sm hover:bg-gray-400 center text-center">
        FOOTBALL
      </p>
      <br />
      {renderTabs()}
      <div className="max-w-screen-md mx-auto">
        <table className="w-full mx-auto divide-y divide-gray-200 rounded-lg overflow-hidden shadow-lg">
          <tbody className="bg-white divide-y divide-gray-200">
            {renderCountryChampionships()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FootballList;
