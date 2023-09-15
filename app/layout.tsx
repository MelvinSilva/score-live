import Head from "next/head";
import Header from "./components/Header";
import SportSelector from "./components/SportSelector";
import "./globals.css";
import { Sen } from "next/font/google";

const sen = Sen({ weight: ["800", "700", "400"], subsets: ["latin"] });

export const metadata = {
  title: "Sporty Score - Résultats et actualité sportive",
  description: "Résultats et actualité sportive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <Head>
        <title>Sporty Score - Accueil</title>
        <meta name="description" content="Résultats et actualité sportive" />
      </Head>
      <body className={`${sen.className} w-full mx-auto bg-gray-100`}>
        <Header />
        <div>
          <SportSelector />
        </div>
        {children}
      </body>
    </html>
  );
}
