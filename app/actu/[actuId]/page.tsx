"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function DetailsActuality({
  params,
}: {
  params: { actuId: string };
}) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchDetailsActuality = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://flashlive-sports.p.rapidapi.com/v1/news/details",
          params: {
            article_id: params.actuId,
            locale: "fr_FR",
          },
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_KEY,
            "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        const fetchedData = response.data.DATA;

        setData(fetchedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des actualités", error);
      }
    };

    fetchDetailsActuality();
  }, [params.actuId]);

  return (
    <div>
      {data ? (
        <>
          <p>{data.TITLE}</p>
          <br />
          {data.CONTENT}
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
