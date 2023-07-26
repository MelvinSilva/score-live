import React from "react";

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 right-0">
      <footer className="flex flex-col items-center justify-center w-full py-8 bg-gray-900 shadow-md relative">
        <p className="text-gray-200">
          © 2023 Score Live - Tous droits réservés
        </p>
        <a
          href="https://melvinsilva.tech/"
          className="text-gray-400 font-semibold"
        >
          <span className="text-gray-200 font-normal">Réalisé par</span>&nbsp;
          Melvin Silva
        </a>
      </footer>
    </div>
  );
}
