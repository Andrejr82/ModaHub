import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ModaHub Multimarcas | Moda premium acessível",
  description: "Loja fictícia multimarcas com roupas, calçados, bolsas e acessórios em uma experiência de e-commerce moderna e responsiva.",
  openGraph: {
    title: "ModaHub Multimarcas",
    description: "Curadoria inteligente de moda e acessórios para todos os momentos.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
