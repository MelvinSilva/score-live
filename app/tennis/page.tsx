"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import SportSelector from "../page";

type TennisChampionship = {
  name: string;
  image: string;
  country: string;
  url: string; // Nouveau champ pour l'URL du championnat
  stageId: string;
};

const TennisList = () => {
  const [championships, setChampionships] = useState<TennisChampionship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("ATP"); // Onglet actif par défaut

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
        ];

        const filteredChampionships = data
          .filter((item: any) => {
            const isAllowedCountry = allowedCountries.includes(
              item.COUNTRY_NAME
            );
            const hasATP = item.LEAGUE_NAME.includes("ATP");
            const hasWTA = item.LEAGUE_NAME.includes("WTA");
            const hasATPdoubles = item.LEAGUE_NAME.includes("ATP DOUBLES");
            const hasWTAdoubles = item.LEAGUE_NAME.includes("WTA DOUBLES");

            return (
              isAllowedCountry &&
              (hasATP || hasWTA || hasATPdoubles || hasWTAdoubles)
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
            ];
            return (
              countriesOrder.indexOf(a.country) -
              countriesOrder.indexOf(b.country)
            );
          });

        setChampionships(filteredChampionships);
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
          src="/Spin-1s-200px.gif"
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
    return (
      <div className="text-sm flex flex-wrap justify-center mb-4">
        <button
          className={`mr-4 mb-2 px-2 py-2 rounded-lg ${
            activeTab === "ATP"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-500"
          } sm:w-auto sm:px-2 sm:py-3`}
          onClick={() => handleTabClick("ATP")}
        >
          Homme ATP
        </button>
        <button
          className={`mr-4 mb-2 px-2 py-2 rounded-lg ${
            activeTab === "WTA"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-500"
          } sm:w-auto sm:px-2 sm:py-3`}
          onClick={() => handleTabClick("WTA")}
        >
          Femme WTA
        </button>
      </div>
    );
  };

  const renderCountryChampionships = () => {
    const countries: { [key: string]: TennisChampionship[] } = {};

    championships.forEach((championship) => {
      const country = championship.country;
      if (!countries[country]) {
        countries[country] = [];
      }
      countries[country].push(championship);
    });

    return Object.entries(countries).map(([country, countryChampionships]) => (
      <React.Fragment key={country}>
        <tr>
          <td
            colSpan={2}
            className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase"
          >
            {country}
          </td>
        </tr>
        {countryChampionships
          .filter((championship) => {
            if (activeTab === "ATP") {
              return (
                championship.name.includes("ATP") &&
                !championship.name.includes("Doubles")
              );
            }
            if (activeTab === "WTA") {
              return (
                championship.name.includes("WTA") &&
                !championship.name.includes("Doubles")
              );
            }
            return false;
          })
          .map((championship) => (
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
    ));
  };

  return (
    <div className="w-full mx-auto bg-gray-100">
      <h2 className="text-lg font-bold mb-4 pt-8 text-center text-green-600 tracking-widest">
        CHOISISSEZ LE TOURNOI
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

export default TennisList;
