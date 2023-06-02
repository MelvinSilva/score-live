import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function SportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
