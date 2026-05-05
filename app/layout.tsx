import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Julian Mercier — Architect-Developer",
  description:
    "Julian Mercier is an architect-developer practice. The studio designs and develops residences, hospitality, and retreats in select places around the world.",
  metadataBase: new URL("https://mercier.studio"),
  openGraph: {
    title: "Julian Mercier — Architect-Developer",
    description:
      "Architect-developer practice designing and developing residences, hospitality, and retreats.",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-linen text-ink min-h-screen flex flex-col">
        <SmoothScroll />
        <ScrollProgress />
        <Header />
        <main className="flex-1 page-enter">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
