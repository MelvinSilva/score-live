import ActualityList from "./actu/page";
import TwitterFeed from "./components/TwitterFeed";

export default function Home() {
  const classementId = "0W4LIGb1"; // Remplacer "LIGUE_1_ID" par l'ID réel du championnat de la Ligue 1

  return (
    <div className="max-w-5xl mx-auto">
      <br />
      <header className="w-full mx-auto mb-12">
        <h1 className="text-xl font-bold text-center">
          Bienvenue sur SPORTY SCORE
        </h1>
        <p className="text-lg text-center">
          Nous proposons les résultats et dernières actualités sportives
        </p>
      </header>

      <main className="flex flex-col lg:flex-row gap-4 no-marge">
        {/* Ici on inclut le composant ActualityList pour afficher les 5 dernières actualités */}
        <ActualityList limit={5} />

        <aside className="flex flex-col gap-4 max-w-2xl">
          <p className="w-full mx-auto bg-gray-200 font-semibold text-sm py-1 px-4 text-sm center text-center">
            Fil Twitter
          </p>
          <section className="p-4 border-2 border-gray-200 rounded-md shadow-lg">
            <TwitterFeed />
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
