import React from "react";

export default function Footer() {
  return (
    <div>
      <br />
      <footer className="flex flex-col items-center justify-center w-full py-4 bg-gradient-to-r from-denim-600 to-denim-900 shadow-md mb-12 lg:mb-0 xl:mb-0 2xl:mb-0 ">
        <p className="text-gray-200">
          © 2023 Sporty Score - Tous droits réservés
        </p>
        <a
          href="https://melvinsilva.tech/"
          className="text-denim-300 font-semibold text-md"
        >
          <span className="text-gray-200">Réalisé par</span>&nbsp;Melvin Silva
        </a>
        <a
          href="https://melvinsilva.tech/"
          className="text-denim-300 text-xs mt-3"
        >
          <span className="text-gray-200">Mon portfolio ☛</span>
          &nbsp;melvinsilva.tech
        </a>
        <p className="text-gray-200 text-xs">
          Contact ☛
          <span className="text-denim-300">&nbsp;silva.melvin@orange.fr</span>
        </p>
      </footer>
    </div>
  );
}
