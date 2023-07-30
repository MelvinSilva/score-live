"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import Image from "next/image";

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

        fetchedData.CONTENT = replaceTags(fetchedData.CONTENT);

        setData(fetchedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des actualités", error);
      }
    };

    fetchDetailsActuality();
  }, [params.actuId]);

  const replaceTags = (content: string): string => {
    return (
      content
        // Remplacement des balises [b] par <b>, [p] par <p> etc...
        .replace(/\[b\]/g, "<b>")
        .replace(/\[\/b\]/g, "</b>")
        .replace(/\[p\]/g, "<p>")
        .replace(/\[\/p\]/g, "</p><br>")
        .replace(/\[h1\]/g, "<h1>")
        .replace(/\[\/h1\]/g, "</h1>")
        .replace(/\[h2\]/g, "<h2>")
        .replace(/\[\/h2\]/g, "</h2>")
        .replace(/\[i\]/g, "<i>")
        .replace(/\[\/i\]/g, "</i>")
        .replace(/\[br\]/g, "<br>")
        .replace(
          /\[embed guid=\"(.*?)\" url=\"(.*?)\" social-type=\"(.*?)\" \/]/g,
          ""
        )
        .replace(
          /\[lslink-news-article cms-href=\"(.*?)\" slug=\"(.*?)\" article-id=\"(.*?)\"\]/g,
          ""
        )
        .replace(/\[\/lslink-news-article\]/g, "")
        .replace(/\[a href=\"(.*?)\"\]/g, "")
        .replace(/\[\/a\]/g, "</a>")
        .replace(/\[lslink[^]*?\](.*?)\[\/lslink[^]*?\]/g, "$1")
        .replace(/\[image[^]*?\/]/g, "")
        .replace(/Plus d'infos ici\./g, "")
        .replace(/https:\/\/\S*/g, "")
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {data ? (
        <>
          <div
            className="relative bg-cover bg-top h-64 rounded-t-lg"
            style={{ backgroundImage: `url(${data.IMAGES[0].URL})` }} // Met l'image en fond
          >
            <h1 className="text-3xl font-bold absolute z-10 text-white bottom-0 bg-black bg-opacity-30 w-full p-2">
              {data.TITLE}
            </h1>
          </div>
          <div className="border-b-2 border-gray-200 mb-4"></div>
          <p className="prose text-justify">{parse(data.CONTENT)}</p>
          <i>Crédit : {data.CREDIT}</i>
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
