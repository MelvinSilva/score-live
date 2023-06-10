"use client";
import React from "react";
import Image from "next/image";

const LoadingSpinner: React.FC = () => {
  return (
    <div>
      <br />
      <Image
        src="/Spin-1.2s-200px.svg"
        width={100}
        height={100}
        alt="spinner"
        className="mx-auto block"
      />
    </div>
  );
};

export default LoadingSpinner;
