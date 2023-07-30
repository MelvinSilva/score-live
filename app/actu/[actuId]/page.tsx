"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

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
        .replace(/\[\/p\]/g, "</p>")
        .replace(/\[h1\]/g, "<h1>")
        .replace(/\[\/h1\]/g, "</h1>")
        .replace(/\[h2\]/g, "<h2>")
        .replace(/\[\/h2\]/g, "</h2>")
        .replace(/\[i\]/g, "<i>")
        .replace(/\[\/i\]/g, "</i>")
        .replace(
          /\[embed guid=\"(.*?)\" url=\"(.*?)\" social-type=\"(.*?)\" \/]/g,
          ""
        )
        .replace(
          /\[lslink-news-article cms-href=\"(.*?)\" slug=\"(.*?)\" article-id=\"(.*?)\"\]/g,
          '</br><a href="$1">'
        )
        .replace(/\[\/lslink-news-article\]/g, "</a>")
        .replace(/\[a href=\"(.*?)\"\]/g, '<a href="$1">')
        .replace(/\[\/a\]/g, "</a></br/>")
        .replace(/\[lslink[^]*?\](.*?)\[\/lslink[^]*?\]/g, "$1")
        .replace(/\[image[^]*?\/]/g, "")
    );

    // Continuez à remplacer d'autres balises...
  };

  return (
    <div>
      {data ? (
        <>
          <p>{data.TITLE}</p>
          <br />
          {parse(data.CONTENT)}
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
