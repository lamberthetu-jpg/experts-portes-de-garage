import type { Metadata } from "next";
import LandingService, { type ContenuLanding } from "@/components/LandingService";
import { IllCableSorti, IllLourde, IllTorsion } from "@/components/illustrations/PannesRessort";
import { IllRienNeSePasse, IllRemonte, IllCapteurs } from "@/components/illustrations/PannesOuvrePorte";
import { IllHorsRail } from "@/components/illustrations/PannesGranby";
import { PHONE_DISPLAY } from "@/lib/config";
import { pageSchema, jsonLdString } from "@/lib/schema";

/** Page de panne : porte bloquée fermée, auto prise dans le garage (ou porte restée ouverte). */

const URL_PAGE = "/porte-de-garage-bloquee-auto-prise";
const TITRE = "Auto prise dans le garage? Porte bloquée à Granby | Urgence 24/7";
const DESCRIPTION =
  `Porte de garage bloquée et auto prise à l’intérieur, ou porte qui ne ferme plus, à Granby et autour? ` +
  `Je me déplace aujourd’hui, 7 jours sur 7. ${PHONE_DISPLAY}.`;

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: URL_PAGE },
  openGraph: { title: "Auto prise dans le garage? Porte de garage bloquée", description: DESCRIPTION, url: URL_PAGE, type: "website" },
};

const jsonLd = pageSchema({
  url: `https://www.expertsportesdegarage.ca${URL_PAGE}`,
  nom: "Porte de garage bloquée, dépannage d’urgence à Granby",
  description: DESCRIPTION,
  ville: "Granby",
  service: "Dépannage d’urgence de porte de garage",
});

const CONTENU: ContenuLanding = {
  source: "depannage",
  barre: "Porte bloquée, auto prise · Urgence 24/7",
  h1: "Auto prise dans le garage? Je me déplace aujourd’hui",
  intro:
    "La porte ne lève plus et votre auto est prise à l’intérieur, ou la porte est restée ouverte " +
    "et ne ferme plus? Appelez-moi : je me déplace aujourd’hui, 7 jours sur 7, à Granby et autour.",
  altHero: "Porte de garage bloquée, auto prise à l’intérieur",
  reassurance: [
    { icone: "horloge", titre: "Aujourd’hui", texte: "7 jours sur 7, urgence 24/7." },
    { icone: "outil", titre: "Pièces dans le camion", texte: "Ressorts, câbles, roulettes." },
    { icone: "garantie", titre: "Pas réparée, pas payée", texte: "Si je ne peux pas la réparer, vous ne payez rien." },
  ],
  problemesTitre: "Pourquoi votre porte est bloquée",
  problemes: [
    { titre: "Gros « bang » puis plus rien", texte: "Presque toujours un ressort cassé. La porte pèse trop lourd pour le moteur.", Ill: IllTorsion },
    { titre: "La porte pèse une tonne", texte: "Débrayée, elle ne lève pas à la main : le ressort a lâché.", Ill: IllLourde },
    { titre: "Câble sorti, porte croche", texte: "La porte est restée penchée ou coincée à moitié.", Ill: IllCableSorti },
    { titre: "Porte sortie du rail", texte: "Les roulettes ont débarqué. La porte est coincée de travers.", Ill: IllHorsRail },
    { titre: "L’ouvre-porte ne réagit plus", texte: "Rien ne se passe quand vous appuyez sur la manette ou le bouton.", Ill: IllRienNeSePasse },
    { titre: "La porte remonte toute seule", texte: "Elle touche le sol et remonte. Elle reste ouverte la nuit ou en plein froid.", Ill: IllRemonte },
    { titre: "Elle refuse de fermer", texte: "La lumière clignote : souvent les « yeux électriques » près du sol.", Ill: IllCapteurs },
  ],
  securite:
    "si vous avez entendu un « bang », ne tirez pas la corde rouge et ne levez pas la porte à la main : " +
    "avec un ressort cassé, elle peut redescendre d’un coup. Ne mettez personne en dessous et appelez-moi.",
  faq: [
    {
      q: "Combien ça coûte pour sortir mon auto aujourd’hui?",
      r: "La sortie d’urgence est à 400 $, première heure sur place comprise, ensuite 170 $/h, avec les pièces en sus. Si ça peut attendre à demain, vous payez seulement le taux horaire normal.",
    },
    {
      q: "Vous venez vraiment aujourd’hui?",
      r: "Oui, 7 jours sur 7. Pour une auto prise ou une porte qui ne ferme plus, je laisse ma route de la journée pour me rendre chez vous.",
    },
    {
      q: "Est-ce que je peux débrayer la porte avec la corde rouge?",
      r: "Seulement si vous êtes certain que le ressort n’est pas cassé. Après un « bang », ne tirez pas : la porte n’est plus retenue et peut tomber.",
    },
    {
      q: "Et si ma porte ne ferme plus le soir?",
      r: "C’est aussi une urgence : votre maison est ouverte. Appelez-moi, même le soir.",
    },
  ],
};

export default function PageAutoPrise() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <LandingService contenu={CONTENU} />
    </>
  );
}
