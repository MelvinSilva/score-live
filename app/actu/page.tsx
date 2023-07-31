"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function ActualityList() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]); // Utilisez un tableau vide pour stocker les actualités

  useEffect(() => {
    const fetchActuList = async () => {
      try {
        setLoading(true);
        const options = {
          method: "GET",
          url: "https://flashlive-sports.p.rapidapi.com/v1/news/most-read",
          params: {
            locale: "fr_FR",
          },
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_KEY,
            "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
          },
        };
        const response = await axios.request(options);
        const data = response.data.DATA;
        setData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des actualités :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActuList();
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

  return (
    <div>
      <p className="w-full mx-auto bg-gray-200 font-semibold text-sm py-1 px-4 text-sm hover:bg-gray-400 center text-center">
        LES DERNIERES ACTUALITÉS
      </p>
      <div className="max-w-5xl mx-auto">
        {data.map((actu) => (
          <a key={actu.ID} href={`actu/${actu.ID}`}>
            <div
              key={actu.ID}
              className="flex flex-col mx-auto items-center bg-white border mt-3 p-2 border-gray-200 rounded-lg shadow xs:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ml-2 mr-2"
            >
              <Image
                className="object-cover w-4 rounded-t-lg h-6 xs:h-32 xs:w-40 xs:rounded-lg"
                src={actu.ARTICLE.IMAGES[1].URL}
                width={100}
                height={100}
                alt={actu.ARTICLE.IMAGES[1].ALT_TEXT}
              />
              <div className="flex flex-col justify-between p-2 leading-normal">
                <h3
                  className="text-l font-bold tracking-tight text-gray-900 dark:text-white"
                  key={actu.ID}
                >
                  {actu.ARTICLE.TITLE}
                </h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
