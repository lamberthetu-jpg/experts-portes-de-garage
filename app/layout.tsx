import type { Metadata } from "next";
import { Poppins, Anton } from "next/font/google";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import Footer from "@/components/Footer";
import { BookingModalProvider } from "@/context/BookingModalContext";
import ChatBot from "@/components/ChatBot";
import ConditionalWrapper from "@/components/ConditionalWrapper";
import { businessSchema, jsonLdString } from "@/lib/schema";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import ClickTracker from "@/components/ClickTracker";
import GoogleTag from "@/components/GoogleTag";
import NumeroSuivi from "@/components/NumeroSuivi";
import Script from "next/script";
import { numerosSuivi, SCRIPT_CAPTURE } from "@/lib/suivi";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const BASE_URL = "https://www.expertsportesdegarage.ca";

export const metadata: Metadata = {
  title: "Experts Portes de Garage — Réparation rapide, service local",
  description:
    "Service local de réparation de portes de garage — Granby & régions. Urgences 24/7, installation, entretien. Appelez le 438-808-9604.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    siteName: "Experts Portes de Garage",
    locale: "fr_CA",
    type: "website",
    images: [
      {
        url: "/images/maison_garage_v1.webp",
        width: 1200,
        height: 630,
        alt: "Experts Portes de Garage — Service local en Estrie et Montérégie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/maison_garage_v1.webp"],
  },
  // Vérification du domaine par Meta (portfolio Experts Portes de Garage).
  other: { "facebook-domain-verification": "1wbe5r7ij3xm9g48ke8v6cg0nxnahc" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const numeros = numerosSuivi();
  return (
    <html lang="fr" className={`${poppins.variable} ${anton.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(businessSchema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        {/* Provenance du visiteur, avant React et avant la balise Google (lib/suivi.ts). */}
        <Script id="provenance" strategy="beforeInteractive">{SCRIPT_CAPTURE}</Script>
        <BookingModalProvider>
          <ConditionalHeader />
          <main className="flex-1">{children}</main>
          <ConditionalWrapper />
          <SpeedInsights />
          <Analytics />
          <ClickTracker />
          <GoogleTag numeros={numeros} />
          <NumeroSuivi numeros={numeros} />
        </BookingModalProvider>
      </body>
    </html>
  );
}
