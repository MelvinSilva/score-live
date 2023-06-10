"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

type TennisChampionship = {
  name: string;
  image: string;
  country: string;
  url: string;
  stageId: string;
};

const TennisList = () => {
  const [championships, setChampionships] = useState<TennisChampionship[]>([]);
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
            sport_id: "2",
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
          "France",
          "Angleterre",
          "USA",
          "Australie",
          "Espagne",
          "Portugal",
          "Italie",
          "Allemagne",
        ];

        const filteredChampionships = data
          .filter((item: any) => {
            const isAllowedCountry = allowedCountries.includes(
              item.COUNTRY_NAME
            );
            const hasATP = item.LEAGUE_NAME.includes("ATP");
            const hasWTA = item.LEAGUE_NAME.includes("WTA");

            return (
              isAllowedCountry &&
              (hasATP || hasWTA) &&
              !item.LEAGUE_NAME.includes("Doubles")
            );
          })
          .map((item: any) => ({
            id: item.id,
            name: item.LEAGUE_NAME,
            image: item.TOURNAMENT_IMAGE,
            country: item.COUNTRY_NAME,
            stageId: item.STAGE_ID,
          }))
          .sort((a: TennisChampionship, b: TennisChampionship) => {
            const countriesOrder = [
              "France",
              "USA",
              "Angleterre",
              "Australie",
              "Espagne",
              "Portugal",
              "Italie",
              "Allemagne",
            ];
            return (
              countriesOrder.indexOf(a.country) -
              countriesOrder.indexOf(b.country)
            );
          });

        setChampionships(filteredChampionships);
        setActiveTab("France");
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des championnats de tennis :",
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
      USA: "🇺🇸",
      Australie: "🇦🇺",
    };

    return (
      <div className="flex flex-wrap justify-center mb-2">
        {countries.map((country) => (
          <button
            key={country}
            className={`mr-2 ml-2 mb-2 px-1 py-0 text-xl justify-center rounded-lg ${
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
            <a href={`tennis/${championship.stageId}`}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {championship.image ? (
                  <Image
                    width={100}
                    height={100}
                    src={championship.image}
                    alt={championship.name}
                    className="w-8 h-8 mr-2 inline-block"
                  />
                ) : (
                  <Image
                    width={100}
                    height={100}
                    src={"/no-image.png"}
                    alt={championship.name}
                    className="w-8 h-8 mr-2 inline-block"
                  />
                )}
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
        TENNIS
      </p>
      <br />
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

export default TennisList;
