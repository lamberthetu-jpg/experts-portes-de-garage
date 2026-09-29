import type { Metadata } from "next";
import UrgenceNuitPage from "@/components/UrgenceNuitPage";
import { PHONE_DISPLAY } from "@/lib/config";
import { pageSchema, jsonLdString } from "@/lib/schema";

/**
 * Page d'atterrissage de la campagne « Urgence de nuit » (18 h à 6 h).
 * Quelqu'un qui cherche à 23 h a l'auto prise dans le garage ou la porte
 * ouverte pour la nuit : la page dit tout de suite qu'on se déplace le
 * soir, et combien ça coûte.
 */

const URL_PAGE = "/urgence-porte-de-garage-nuit";
const TITRE = "Urgence porte de garage 24 h sur 24 | Granby et environs";
const DESCRIPTION =
  `Porte de garage bloquée, de jour comme de nuit, à Granby et 45 km autour? Je réponds ` +
  `24 h sur 24 et je me déplace. Appelez le ${PHONE_DISPLAY}.`;

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: URL_PAGE },
  openGraph: {
    title: "Urgence porte de garage 24 h sur 24",
    description: DESCRIPTION,
    url: URL_PAGE,
    type: "website",
  },
};

const jsonLd = pageSchema({
  url: `https://www.expertsportesdegarage.ca${URL_PAGE}`,
  nom: "Urgence porte de garage de soir et de nuit à Granby",
  description: DESCRIPTION,
  ville: "Granby",
  service: "Réparation d'urgence de porte de garage",
});

export default function PageUrgenceNuit() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
      <UrgenceNuitPage />
    </>
  );
}
