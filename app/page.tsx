import ActualityList from "./actu/page";
import TwitterFeed from "./components/TwitterFeed";

export default function Home() {
  const classementId = "0W4LIGb1"; // Remplacer "LIGUE_1_ID" par l'ID réel du championnat de la Ligue 1

  return (
    <div className="max-w-5xl mx-auto">
      <br />
      {/*       <header className="w-full mx-auto mb-12">
        <h1 className="text-xl font-bold text-center">
          Bienvenue sur SPORTY SCORE
        </h1>
        <p className="text-lg text-center">
          Nous proposons les résultats et dernières actualités sportives
        </p>
      </header> */}

      <main>
        {/* Ici on inclut le composant ActualityList pour afficher les 5 dernières actualités */}
        <ActualityList limit={5} />
      </main>
    </div>
  );
}
