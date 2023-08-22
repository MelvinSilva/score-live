import React, { useState, useEffect } from "react";
import styles from "./loader.module.css";
import { IoFootballOutline, IoTennisballOutline } from "react-icons/io5";

function Loader() {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => (prev < 100 ? prev + 1 : prev));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-denim-600 to-denim-900 flex-col fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center">
      <p className="flex items-center text-center text-white text-2xl font-bold">
        <span className="text-denim-200">S</span>
        <span className="text-denim-400">P</span>
        <IoFootballOutline className="h-10 text-white" />
        <span className="text-denim-400">R</span>
        <span className="text-denim-200">T</span>
        <span className="text-denim-400">Y</span>&nbsp;
        <span className="text-denim-200">S</span>
        <span className="text-denim-400">C</span>
        <IoTennisballOutline className="h-10 text-white" />
        <span className="text-denim-200">R</span>
        <span className="text-denim-400">E</span>
        <span className="text-denim-200">S</span>
      </p>
      <div className={styles.loaderBar}></div>
      <p className={styles.percentage}>{percentage}%</p>
    </div>
  );
}

export default Loader;
