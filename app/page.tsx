"use client";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ActualityList from "./actu/page";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("loaderTime");

    if (!lastShown) {
      setIsLoading(true);
      localStorage.setItem("loaderTime", Date.now().toString());
    } else {
      const currentTime = Date.now();
      const twentyMinutes = 20 * 60 * 1000;

      if (currentTime - Number(lastShown) > twentyMinutes) {
        setIsLoading(true);
        localStorage.setItem("loaderTime", Date.now().toString());
      }
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <main className="max-w-5xl mx-auto">
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <ActualityList />
      </main>
      <Footer />
    </div>
  );
}
