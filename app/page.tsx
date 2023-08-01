"use client";
import React, { useState, useEffect } from "react";
import ActualityList from "./actu/page";
import ClassementTournament from "./football/[classementId]/page";

export default function Home() {
  const classementId = "0W4LIGb1";
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(progressInterval);
          setLoading(false);
        }
        return Math.min(oldProgress + 1, 100);
      });
    }, 20);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <br />
      {loading && (
        <div className="loader-container">
          <div
            className="loader-progress"
            style={{ width: `${progress}%` }}
          ></div>
          <span className="loader-text">{progress}%</span>
        </div>
      )}
      <header className="w-full mx-auto mb-12">
        <h1 className="text-xl font-bold text-center">
          Bienvenue sur SPORTY SCORE
        </h1>
        <p className="text-lg text-center">
          Nous proposons les résultats et dernières actualités sportives
        </p>
      </header>

      <main className="flex flex-col lg:flex-row gap-4 no-marge">
        <ActualityList limit={5} />

        <aside className="flex flex-col gap-4 max-w-2xl">
          <p className="w-full mx-auto bg-gray-200 font-semibold text-sm py-1 px-4 text-sm center text-center">
            LIGUE 1
          </p>
          <section className="p-4 border-2 border-gray-200 rounded-md shadow-lg">
            <ClassementTournament params={{ classementId }} />
          </section>

          <section className="p-4 border-2 border-gray-200 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Nous contacter</h2>
            <p>Email: contact@notresite.com</p>
            <p>Tél: 01 23 45 67 89</p>
          </section>
        </aside>
      </main>
    </div>
  );
}
