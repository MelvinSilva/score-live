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
    <div>
      <main className="max-w-5xl mx-auto">
        <ActualityList />
      </main>
      <Footer />
    </div>
  );
}
