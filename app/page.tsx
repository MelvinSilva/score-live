import ActualityList from "./actu/page";
import { Fragment } from "react";

export default function Home() {
  return (
    <div className="p-4">
      <header className="w-full mx-auto mb-12">
        <h1 className="text-3xl font-bold text-center">
          Bienvenue sur SPORTY SCORE
        </h1>
        <p className="text-lg text-center">
          Nous proposons les résultats et dernières actualités sportives
        </p>
      </header>

      <main className="flex flex-col lg:flex-row gap-12">
        {/* Ici on inclut le composant ActualityList pour afficher les 5 dernières actualités */}
        <ActualityList limit={5} />

        <aside className="flex flex-col gap-6">
          <section className="p-4 border-2 border-gray-200 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4">A propos de nous</h2>
            <p>
              Nous sommes une plateforme dédiée aux actualités sportives. Notre
              mission est de vous fournir les dernières nouvelles et mises à
              jour du monde du sport.
            </p>
          </section>

          <section className="p-4 border-2 border-gray-200 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Nous contacter</h2>
            <p>Email: contact@notresite.com</p>
            <p>Tél: 01 23 45 67 89</p>
          </section>
        </aside>
      </main>
    </div>
  );
}
