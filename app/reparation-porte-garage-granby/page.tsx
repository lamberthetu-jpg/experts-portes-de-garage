import type { Metadata } from "next";
import LandingGranby from "@/components/LandingGranby";
import { PHONE_DISPLAY } from "@/lib/config";
import { pageSchema, jsonLdString } from "@/lib/schema";
import { LANDING } from "@/lib/landing-granby";

const URL_PAGE = "/reparation-porte-garage-granby";
const TITRE = "Réparation de porte de garage à Granby | Ressort cassé, porte bloquée";
const DESCRIPTION =
  `Réparation de porte de garage à Granby et 45 km autour. Ressort cassé, câble brisé, ` +
  `porte bloquée : réparé le jour même. Prix donné avant les travaux. ${PHONE_DISPLAY}.`;

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: URL_PAGE },
  openGraph: {
    title: "Réparation de porte de garage à Granby",
    description: DESCRIPTION,
    url: URL_PAGE,
    type: "website",
  },
};

/**
 * La page renvoie a l'entreprise par son identifiant. Elle ne redeclare
 * pas une fiche : il n'y a qu'une seule entreprise sur ce site.
 */
const jsonLd = pageSchema({
  url: `https://www.expertsportesdegarage.ca${URL_PAGE}`,
  nom: "Réparation de porte de garage à Granby",
  description: DESCRIPTION,
  ville: "Granby",
});

export default function PageGranby() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
      <LandingGranby />
    </>
  );
}
