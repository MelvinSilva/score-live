"use client";
import { useState, useEffect } from "react";
import ActualityList from "./actu/page";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("loaderTime");

    if (!lastShown) {
      setIsLoading(true);
      localStorage.setItem("loaderTime", Date.now().toString());
    } else {
      const currentTime = Date.now();
      const twoHours = 2 * 60 * 60 * 1000;

      if (currentTime - Number(lastShown) > twoHours) {
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
    <div className="max-w-5xl mx-auto">
      <main>
        <ActualityList limit={6} />
      </main>
      <Footer />
    </div>
  );
}
