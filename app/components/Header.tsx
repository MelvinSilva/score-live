import React from "react";
import { FaBars, FaHome } from "react-icons/fa";
import { IoFootballOutline, IoTennisballOutline } from "react-icons/io5";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center w-full py-4 bg-gray-900 shadow-md relative">
      <a
        href="/"
        className="flex items-center text-center text-white text-3xl font-bold"
      >
        <span className="text-gray-200">S</span>
        <span className="text-gray-400">C</span>
        <IoFootballOutline className="h-10 text-white" />
        <span className="text-gray-200">R</span>
        <span className="text-gray-400">E</span>&nbsp;&nbsp;
        <span className="text-gray-200">S</span>
        <span className="text-gray-400">P</span>
        <IoTennisballOutline className="h-10 text-white" />
        <span className="text-gray-200">R</span>
        <span className="text-gray-400">T</span>
      </a>
      {/* <p className="text-gray-400 text-xs font-light">
        Consultation de résultat sportif
      </p> */}
      {/* <div className="md:hidden absolute inset-y-0 right-0 pr-4 flex items-center">
        <button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-green-600 focus:outline-none focus:bg-green-700 focus:text-white transition duration-150 ease-in-out">
          <FaBars className="block h-6 w-6" />
        </button>
      </div> */}
      <a href="/" className="absolute left-4 top-6 text-white hover:text-white">
        <FaHome className="h-5 w-5" />
      </a>
    </header>
  );
}
