import type { Metadata } from "next";
import LandingService, { type ContenuLanding } from "@/components/LandingService";
import { IllCableSorti, IllPenche, IllRoulettes } from "@/components/illustrations/PannesRessort";
import { IllMonteCroche } from "@/components/illustrations/SignesUsure";
import { IllHorsRail, IllBruyante } from "@/components/illustrations/PannesGranby";
import { PHONE_DISPLAY } from "@/lib/config";
import { pageSchema, jsonLdString } from "@/lib/schema";

/** Page de panne : porte de garage sortie du rail, roulettes débarquées. */

const URL_PAGE = "/porte-de-garage-sortie-du-rail";
const TITRE = "Porte de garage sortie du rail à Granby | Remise en place le jour même";
const DESCRIPTION =
  `Porte de garage sortie du rail, roulettes débarquées ou porte coincée de travers à Granby et autour? ` +
  `Je la remets en place le jour même dans la plupart des cas. ${PHONE_DISPLAY}.`;

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: URL_PAGE },
  openGraph: { title: "Porte de garage sortie du rail à Granby", description: DESCRIPTION, url: URL_PAGE, type: "website" },
};

const jsonLd = pageSchema({
  url: `https://www.expertsportesdegarage.ca${URL_PAGE}`,
  nom: "Porte de garage sortie du rail, réparation à Granby",
  description: DESCRIPTION,
  ville: "Granby",
  service: "Remise sur rail de porte de garage",
});

const CONTENU: ContenuLanding = {
  source: "depannage",
  barre: "Porte sortie du rail · Granby",
  h1: "Porte de garage sortie du rail? Remise en place le jour même",
  intro:
    "Une roulette a débarqué, la porte est coincée de travers ou elle s’est arrêtée à moitié? " +
    "Je la remets sur son rail et je trouve pourquoi elle est sortie, le jour même dans la plupart des cas.",
  altHero: "Porte de garage sortie du rail à Granby",
  reassurance: [
    { icone: "horloge", titre: "Le jour même", texte: "Dans la plupart des cas." },
    { icone: "outil", titre: "Pièces dans le camion", texte: "Roulettes, câbles, supports." },
    { icone: "garantie", titre: "Pas réparée, pas payée", texte: "Si je ne peux pas la réparer, vous ne payez rien." },
  ],
  problemesTitre: "Porte hors du rail : ce que je règle",
  problemes: [
    { titre: "Roulettes sorties du rail", texte: "Une ou plusieurs roulettes ont débarqué. La porte est coincée.", Ill: IllHorsRail },
    { titre: "Porte coincée de travers", texte: "Un côté plus haut que l’autre, la porte ne bouge plus.", Ill: IllPenche },
    { titre: "Câble sorti ou cassé", texte: "Souvent la cause : la porte n’est plus tenue d’un côté.", Ill: IllCableSorti },
    { titre: "Rail plié ou mal aligné", texte: "Un coup d’auto ou un support desserré. Je redresse ou je remplace.", Ill: IllMonteCroche },
    { titre: "Roulettes usées", texte: "Des roulettes finies sortent plus facilement du rail.", Ill: IllRoulettes },
    { titre: "Porte bruyante qui force", texte: "Ça grince, ça frotte, ça cogne : souvent le signe avant qu’elle sorte.", Ill: IllBruyante },
  ],
  securite:
    "une porte sortie du rail peut tomber. N’essayez pas de la remettre vous-même, ne la faites pas " +
    "fonctionner avec l’ouvre-porte et ne passez pas en dessous. Débranchez l’ouvre-porte et appelez-moi.",
  faq: [
    {
      q: "Combien ça coûte?",
      r: "Le taux horaire est de 170 $/h, avec les pièces en sus, et je vous donne le prix avant de commencer. Si vous ne pouvez pas attendre (auto prise, porte ouverte), la sortie d’urgence est à 400 $, première heure comprise.",
    },
    {
      q: "Pourquoi ma porte est sortie du rail?",
      r: "Le plus souvent : un câble qui a lâché, un coup d’auto dans le rail, des roulettes usées ou un rail mal aligné. Je règle la cause, pas juste le symptôme.",
    },
    {
      q: "Est-ce que je dois remplacer la porte?",
      r: "Presque jamais. Dans la grande majorité des cas, une porte sortie du rail se remet en place avec des roulettes ou un câble neufs.",
    },
  ],
};

export default function PageSortieDuRail() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <LandingService contenu={CONTENU} />
    </>
  );
}
