import type { Metadata } from "next";
import LandingService, { type ContenuLanding } from "@/components/LandingService";
import { IllCableSorti, IllPenche, IllRoulettes, IllTorsion } from "@/components/illustrations/PannesRessort";
import { IllCableEffiloche, IllMonteCroche } from "@/components/illustrations/SignesUsure";
import { IllHorsRail } from "@/components/illustrations/PannesGranby";
import { PHONE_DISPLAY } from "@/lib/config";
import { pageSchema, jsonLdString } from "@/lib/schema";

/** Page de panne : câble de porte de garage cassé ou sorti de sa poulie. */

const URL_PAGE = "/reparation-cable-porte-de-garage";
const TITRE = "Câble de porte de garage cassé ou sorti à Granby | Réparé le jour même";
const DESCRIPTION =
  `Câble de porte de garage cassé, débarqué ou effiloché à Granby et autour? Je le remplace ` +
  `le jour même dans la plupart des cas. Urgence 24/7. ${PHONE_DISPLAY}.`;

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: URL_PAGE },
  openGraph: { title: "Câble de porte de garage cassé à Granby", description: DESCRIPTION, url: URL_PAGE, type: "website" },
};

const jsonLd = pageSchema({
  url: `https://www.expertsportesdegarage.ca${URL_PAGE}`,
  nom: "Réparation de câble de porte de garage à Granby",
  description: DESCRIPTION,
  ville: "Granby",
  service: "Réparation de câble de porte de garage",
});

const CONTENU: ContenuLanding = {
  source: "depannage",
  barre: "Câble de porte de garage cassé · Granby",
  h1: "Câble de porte de garage cassé ou sorti? Réparé le jour même",
  intro:
    "La porte penche d’un côté, un câble pend le long du rail ou la porte est restée coincée " +
    "à moitié? C’est un câble. Je le remplace le jour même dans la plupart des cas, à Granby et autour.",
  altHero: "Réparation de câble de porte de garage à Granby",
  reassurance: [
    { icone: "horloge", titre: "Le jour même", texte: "Dans la plupart des cas." },
    { icone: "outil", titre: "Câbles dans le camion", texte: "Câbles, poulies, ressorts et roulettes." },
    { icone: "garantie", titre: "Pas réparée, pas payée", texte: "Si je ne peux pas la réparer, vous ne payez rien." },
  ],
  problemesTitre: "Câbles : ce que je répare",
  problemes: [
    { titre: "Câble débarqué de la poulie", texte: "Le câble a sauté du tambour en haut. La porte reste croche ou bloquée à moitié.", Ill: IllCableSorti },
    { titre: "Câble cassé", texte: "Le câble a lâché d’un côté. La porte tombe de ce côté et ne lève plus droit.", Ill: IllPenche },
    { titre: "Câble effiloché", texte: "Des brins qui dépassent près du bas de la porte : il va casser bientôt.", Ill: IllCableEffiloche },
    { titre: "Porte qui monte croche", texte: "Un côté lève avant l’autre. Souvent un câble étiré ou mal enroulé.", Ill: IllMonteCroche },
    { titre: "Ressort cassé en même temps", texte: "Quand le ressort lâche, le câble se détend et sort souvent avec lui.", Ill: IllTorsion },
    { titre: "Porte sortie du rail", texte: "Un câble qui casse peut faire sortir les roulettes du rail.", Ill: IllHorsRail },
    { titre: "Roulettes et poulies usées", texte: "Je les vérifie en même temps pour que le câble neuf ne lâche pas.", Ill: IllRoulettes },
  ],
  securite:
    "un câble est relié au ressort, qui est sous très forte tension. Ne tirez pas sur le câble, " +
    "ne levez pas la porte avec l’ouvre-porte et ne tirez pas la corde rouge si la porte penche : " +
    "elle peut tomber d’un coup. Laissez-la où elle est et appelez-moi.",
  faq: [
    {
      q: "Combien coûte une réparation de câble?",
      r: "Le taux horaire est de 170 $/h, avec les câbles en sus, et je vous donne le prix avant de commencer. Si vous ne pouvez pas attendre (auto prise, porte ouverte la nuit), la sortie d’urgence est à 400 $, première heure comprise.",
    },
    {
      q: "Pourquoi mon câble a sorti?",
      r: "Souvent un ressort fatigué ou cassé : le câble perd sa tension et saute de la poulie. Parfois un obstacle sous la porte quand elle descend. Je trouve la cause pour que ça ne recommence pas.",
    },
    {
      q: "Je change les deux câbles?",
      r: "Ils ont le même âge et le même usage. Je vous montre l’état de l’autre sur place, avec le prix des deux options, et c’est vous qui décidez.",
    },
    {
      q: "Je peux remettre le câble moi-même?",
      r: "Je vous le déconseille : pour le remettre, il faut contrôler la tension du ressort. C’est la cause de la plupart des blessures avec les portes de garage.",
    },
  ],
};

export default function PageCable() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <LandingService contenu={CONTENU} />
    </>
  );
}
