import React from "react";

export default function Footer() {
  return (
    <div>
      <br />
      <footer className="flex flex-col items-center justify-center w-full py-4 bg-gradient-to-r from-denim-600 to-denim-900 shadow-md relative">
        <p className="text-gray-200">
          © 2023 Score Live - Tous droits réservés
        </p>
        <a
          href="https://melvinsilva.tech/"
          className="text-denim-300 font-semibold text-lg"
        >
          <span className="text-white">Réalisé par</span>&nbsp;Melvin Silva
        </a>
        <a
          href="https://melvinsilva.tech/"
          className="text-denim-300 text-xs mt-3"
        >
          <span className="text-white">Mon portfolio ☛</span>
          &nbsp;melvinsilva.tech
        </a>
        <p className="text-white text-xs">
          Contact ☛
          <span className="text-denim-300">&nbsp;silva.melvin@orange.fr</span>
        </p>
      </footer>
    </div>
  );
}
