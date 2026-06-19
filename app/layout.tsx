import type { Metadata } from "next";
import "./globals.css";

import { Header } from "../compentents/layout/Header";
import { Footer } from "../compentents/layout/Footer";

export const metadata: Metadata = {
  title: "AMICIS",
  description: "Plataforma Inteligente de Bem-Estar Animal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}