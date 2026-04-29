import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luiz Colombo · Desenvolvedor Backend",
  description:
    "Portfolio e blog de Luiz Colombo, desenvolvedor backend especializado em PHP, Go e Node.js.",
  keywords: ["desenvolvedor backend", "PHP", "Go", "Laravel", "portfolio"],
  openGraph: {
    title: "Luiz Colombo · Desenvolvedor Backend",
    description:
      "Portfolio e blog de Luiz Colombo, desenvolvedor backend especializado em PHP, Go e Node.js.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
