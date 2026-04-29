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
  title: "Luiz Colombo · Desenvolvedor Full Stack",
  description:
    "Portfolio e blog de Luiz Colombo, desenvolvedor Full Stack especializado em PHP/Laravel, .NET Core, React e BI. Poços de Caldas, MG.",
  keywords: [
    "desenvolvedor full stack",
    "PHP",
    "Laravel",
    "Go",
    ".NET Core",
    "React",
    "Power BI",
    "Oracle",
    "portfolio",
    "blog",
  ],
  openGraph: {
    title: "Luiz Colombo · Desenvolvedor Full Stack",
    description:
      "Portfolio e blog de Luiz Colombo, desenvolvedor Full Stack especializado em PHP/Laravel, .NET Core, React e BI.",
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
