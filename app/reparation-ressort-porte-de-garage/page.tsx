import type { Metadata } from "next";
import LandingService, { type ContenuLanding } from "@/components/LandingService";
import { PHONE_DISPLAY } from "@/lib/config";
import { pageSchema, jsonLdString } from "@/lib/schema";

/**
 * Page d'atterrissage du groupe d'annonces « Ressorts et câbles ».
 * Une recherche « ressort porte de garage cassé » doit atterrir sur une
 * page qui parle de ressorts dès la première ligne : c'est ce que Google
 * mesure dans « l'expérience sur la page de destination ».
 */

const URL_PAGE = "/reparation-ressort-porte-de-garage";
const TITRE = "Ressort de porte de garage cassé à Granby | Réparé le jour même";
const DESCRIPTION =
  `Ressort de porte de garage cassé ou câble brisé à Granby et autour? Remplacé le jour même ` +
  `dans la plupart des cas. Prix donné avant les travaux. ${PHONE_DISPLAY}.`;

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: URL_PAGE },
  openGraph: {
    title: "Ressort de porte de garage cassé à Granby",
    description: DESCRIPTION,
    url: URL_PAGE,
    type: "website",
  },
};

const jsonLd = pageSchema({
  url: `https://www.expertsportesdegarage.ca${URL_PAGE}`,
  nom: "Réparation de ressort de porte de garage à Granby",
  description: DESCRIPTION,
  ville: "Granby",
  service: "Réparation de ressort de porte de garage",
});

const CONTENU: ContenuLanding = {
  source: "ressort",
  barre: "Ressort de porte de garage cassé · Granby",
  h1: "Ressort de porte de garage cassé? Réparé le jour même",
  intro:
    "Un gros « bang » dans le garage et la porte ne lève plus? C’est presque toujours un " +
    "ressort. Je le remplace le jour même dans la plupart des cas, à Granby et autour. " +
    "Prix donné avant de commencer.",
  altHero: "Réparation de ressort de porte de garage à Granby",
  reassurance: [
    { icone: "horloge", titre: "Le jour même", texte: "Dans la plupart des cas." },
    { icone: "outil", titre: "Ressorts dans le camion", texte: "Ressorts, câbles et roulettes." },
    { icone: "garantie", titre: "Pas réparée, pas payée", texte: "Si je ne peux pas la réparer, vous ne payez rien." },
  ],
  problemesTitre: "Ressorts et câbles : ce que je répare",
  problemes: [
    { titre: "Ressort de torsion cassé", texte: "Le ressort au-dessus de la porte s’est séparé en deux. La porte ne lève plus ou pèse une tonne." },
    { titre: "Ressorts sur les côtés", texte: "Les ressorts d’extension, le long des rails. Un seul qui lâche et la porte monte croche." },
    { titre: "Câble sorti ou brisé", texte: "Le câble pend à côté de la porte ou s’est effiloché. La porte penche d’un côté." },
    { titre: "Porte qui penche ou reste croche", texte: "Souvent un câble ou un ressort qui a lâché d’un seul côté." },
    { titre: "Porte très lourde à la main", texte: "Le ressort a perdu sa tension. Le moteur force et va finir par lâcher lui aussi." },
    { titre: "Roulettes usées ou sorties du rail", texte: "Elles accompagnent souvent un ressort fatigué. Je les vérifie en même temps." },
  ],
  securite:
    "un ressort de torsion est sous très forte tension. Si le vôtre est cassé, ne forcez pas " +
    "la porte à la main, ne la levez pas avec l’ouvre-porte et ne touchez pas au ressort : " +
    "appelez-moi.",
  voieB: {
    titre: "Votre ressort est en train de lâcher?",
    intro:
      "Un ressort ne casse pas du jour au lendemain. Ces signes-là veulent dire qu’il est fatigué. " +
      "Le changer avant qu’il casse, c’est une visite planifiée à votre horaire au lieu d’une urgence.",
    items: [
      { titre: "La porte est lourde", texte: "Débrayée, elle devrait se lever facilement à la main. Si elle pèse, les ressorts n’ont plus leur tension." },
      { titre: "Elle ne reste pas à mi-hauteur", texte: "Levée à moitié à la main, une porte bien équilibrée reste en place. Si elle redescend, c’est un signe." },
      { titre: "Un espace dans le ressort", texte: "Un trou de quelques pouces entre deux spires du ressort du haut : il est cassé." },
      { titre: "Le moteur force", texte: "L’ouvre-porte grogne, ralentit ou arrête en montant. Souvent, c’est le ressort et pas le moteur." },
      { titre: "Câble effiloché", texte: "Des brins qui dépassent près du bas de la porte. Un câble qui casse peut faire tomber la porte croche." },
      { titre: "La porte monte croche", texte: "Un côté lève avant l’autre. Un ressort ou un câble est plus faible d’un côté." },
    ],
    miseAuPoint: true,
  },
  faq: [
    {
      q: "Combien de temps pour changer un ressort?",
      r: "La plupart des ressorts et des câbles se font en une visite, entre 45 minutes et 2 heures.",
    },
    {
      q: "Pourquoi mon ressort a cassé?",
      r:
        "C’est de l’usure normale. Un ressort est fait pour un certain nombre d’ouvertures, et chaque " +
        "ouverture le fatigue un peu. Le froid l’achève souvent : c’est pour ça que tant de ressorts " +
        "cassent en plein hiver.",
    },
    {
      q: "Ma porte a deux ressorts et un seul est cassé. Je change les deux?",
      r:
        "Les deux ont le même âge et ont travaillé autant, alors l’autre n’est souvent pas loin. " +
        "Je vous explique les deux options sur place, avec le prix de chacune, et c’est vous qui décidez.",
    },
    {
      q: "Est-ce que je peux utiliser ma porte en attendant?",
      r:
        "Non. Sans ressort, c’est le moteur qui essaie de lever tout le poids de la porte : il peut " +
        "brûler, et la porte peut redescendre d’un coup. Laissez-la fermée et appelez-moi.",
    },
  ],
};

export default function PageRessort() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
      <LandingService contenu={CONTENU} />
    </>
  );
}
