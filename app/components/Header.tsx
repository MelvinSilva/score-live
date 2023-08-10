"use client";
import React from "react";
import { FaBars, FaHome, FaArrowLeft } from "react-icons/fa";
import { IoFootballOutline, IoTennisballOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="flex flex-col items-center justify-center w-full py-4 bg-gradient-to-r from-denim-600 to-denim-900  shadow-md relative">
      <button
        onClick={() => router.back()}
        className="absolute left-4 top-7 text-white hover:text-white"
      >
        <FaArrowLeft className="h-4 w-4" />
      </button>
      <a
        href="/"
        className="flex items-center text-center text-white text-2xl font-bold"
      >
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
      </a>
      <a
        href="/"
        className="absolute right-4 top-7 text-white hover:text-white"
      >
        <FaHome className="h-4 w-4" />
      </a>
    </header>
  );
}
