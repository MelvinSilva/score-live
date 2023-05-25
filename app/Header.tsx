import React from "react";
import { FaBars } from "react-icons/fa";
import { IoFootballOutline } from "react-icons/io5";

export default function Header() {
  return (
    <header className="flex items-center justify-center w-full py-4 bg-gradient-to-r from-green-400 to-green-700 shadow-md relative">
      <a href="/">
        <h1 className="flex text-center text-white text-4xl font-bold">
          <span className="text-yellow-300">S</span>
          <span className="text-green-300">C</span>
          <IoFootballOutline className="h-10 text-yellow-300" />
          <span className="text-green-300">R</span>
          <span className="text-yellow-300">E</span>&nbsp;&nbsp;
          <span className="text-yellow-300">L</span>
          <span className="text-green-300">I</span>
          <span className="text-yellow-300">V</span>
          <span className="text-green-300">E</span>
        </h1>
      </a>
      <div className="md:hidden absolute inset-y-0 right-0 pr-4 flex items-center">
        <button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-green-600 focus:outline-none focus:bg-green-700 focus:text-white transition duration-150 ease-in-out">
          <FaBars className="block h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
