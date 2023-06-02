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

const TennisList = () => {
  const [championships, setChampionships] = useState<FootballChampionship[]>(
    []
  );
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

        const allowedCountries = ["France"];

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
          }));

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

  const filteredChampionships = championships.filter((championship) => {
    if (activeTab === "ATP") {
      return (
        championship.name.includes("ATP") &&
        !championship.name.includes("DOUBLES")
      );
    }
    if (activeTab === "WTA") {
      return (
        championship.name.includes("WTA") &&
        !championship.name.includes("DOUBLES")
      );
    }
    if (activeTab === "DOUBLES ATP") {
      return championship.name.includes("ATP Doubles");
    }
    if (activeTab === "DOUBLES WTA") {
      return championship.name.includes("WTA Doubles");
    }
    return false;
  });

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

  return (
    <div className="w-full mx-auto bg-gray-100">
      <h2 className="text-lg font-bold mb-4 pt-8 text-center text-green-600 tracking-widest">
        CHOISISSEZ LE TOURNOI
      </h2>
      {renderTabs()}
      <div className="max-w-screen-md mx-auto">
        <table className="w-full mx-auto divide-y divide-gray-200 rounded-lg overflow-hidden shadow-lg">
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredChampionships.map((championship, index) => (
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
                          src={"/no-image.jpeg"}
                          alt={championship.name}
                          className="w-8 h-8 mr-2 inline-block"
                        />
                      )}
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

export default TennisList;
