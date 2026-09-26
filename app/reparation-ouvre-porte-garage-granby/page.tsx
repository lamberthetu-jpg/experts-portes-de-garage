import type { Metadata } from "next";
import LandingService, { type ContenuLanding } from "@/components/LandingService";
import MotorSection from "@/components/MotorSection";
import { PHONE_DISPLAY } from "@/lib/config";
import { pageSchema, jsonLdString } from "@/lib/schema";

/**
 * Page d'atterrissage du groupe d'annonces « Ouvre-porte ».
 * L'ancienne page /reparation-ouvre-porte-de-garage parle aussi
 * d'installation : celle-ci ne parle que de pannes, comme les annonces.
 */

const URL_PAGE = "/reparation-ouvre-porte-garage-granby";
const TITRE = "Réparation d’ouvre-porte de garage à Granby | Moteur, télécommande, capteurs";
const DESCRIPTION =
  `Ouvre-porte de garage qui ne répond plus, moteur qui force, porte qui remonte toute seule? ` +
  `Diagnostic sur place à Granby et autour, prix donné avant les travaux. ${PHONE_DISPLAY}.`;

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: URL_PAGE },
  openGraph: {
    title: "Réparation d’ouvre-porte de garage à Granby",
    description: DESCRIPTION,
    url: URL_PAGE,
    type: "website",
  },
};

const jsonLd = pageSchema({
  url: `https://www.expertsportesdegarage.ca${URL_PAGE}`,
  nom: "Réparation d’ouvre-porte de garage à Granby",
  description: DESCRIPTION,
  ville: "Granby",
  service: "Réparation d’ouvre-porte de garage",
});

const CONTENU: ContenuLanding = {
  source: "ouvre_porte",
  barre: "Réparation d’ouvre-porte de garage · Granby",
  h1: "Ouvre-porte de garage en panne? Réparé à Granby et environs",
  intro:
    "L’ouvre-porte ne répond plus, le moteur force, la porte remonte toute seule? Je trouve la " +
    "cause sur place et je vous dis si ça se répare ou si ça se remplace, avec le prix, avant " +
    "de commencer.",
  altHero: "Réparation d’ouvre-porte de garage à Granby",
  reassurance: [
    { icone: "horloge", titre: "Le jour même", texte: "Dans la plupart des cas." },
    { icone: "diagnostic", titre: "Diagnostic honnête", texte: "Réparer ou remplacer : je vous dis ce qui est rentable." },
    { icone: "garantie", titre: "Pas réparée, pas payée", texte: "Si je ne peux pas la réparer, vous ne payez rien." },
  ],
  problemesTitre: "Les pannes d’ouvre-porte que je règle",
  problemes: [
    { titre: "Rien ne se passe", texte: "Ni la télécommande ni le bouton mural ne répondent. Alimentation, carte ou moteur." },
    { titre: "Le moteur tourne, la porte bouge pas", texte: "On entend le moteur, mais rien ne monte. Souvent l’engrenage ou la chaîne." },
    { titre: "La porte remonte toute seule", texte: "Elle touche le sol et remonte. Les capteurs ou l’ajustement de la force." },
    { titre: "Capteurs mal alignés", texte: "La lumière clignote et la porte refuse de fermer. Les « yeux électriques » près du sol." },
    { titre: "Télécommande ou clavier mort", texte: "Portée de quelques pieds, ou plus rien du tout. Piles, reprogrammation ou récepteur." },
    { titre: "Le moteur force ou arrête à mi-chemin", texte: "Souvent ce n’est pas le moteur : c’est un ressort fatigué qui lui laisse tout le poids." },
  ],
  securite:
    "si votre porte est très lourde, bloquée ou croche, ne la forcez pas avec l’ouvre-porte. " +
    "Le moteur peut brûler et la porte peut redescendre d’un coup. Laissez-la fermée et appelez-moi.",
  voieB: {
    titre: "Réparer ou remplacer l’ouvre-porte?",
    intro:
      "Un ouvre-porte qui fait des siennes n’est pas toujours fini. Voici comment je vous aide à " +
      "décider, sur place, avec le prix des deux options.",
    items: [
      { titre: "Vérifier la porte d’abord", texte: "Si la porte est lourde ou croche, un moteur neuf va lâcher lui aussi. Je vérifie les ressorts avant de toucher au moteur." },
      { titre: "Souvent réparable", texte: "Engrenage, capteurs, ajustement de la course ou de la force, télécommande : ça se règle sans changer l’appareil." },
      { titre: "Quand remplacer vaut la peine", texte: "Moteur brûlé sur un vieil appareil, pièces introuvables : je vous le dis franchement. Si on remplace, j’installe du LiftMaster." },
    ],
    miseAuPoint: false,
  },
  sectionEnPlus: <MotorSection />,
  faq: [
    {
      q: "Ma télécommande ne marche plus. C’est grave?",
      r:
        "Commencez par changer la pile. Si ça ne règle rien, c’est souvent une reprogrammation ou le " +
        "récepteur : une petite affaire réglée sur place.",
    },
    {
      q: "Réparez-vous ma marque d’ouvre-porte?",
      r:
        "Je répare la plupart des marques. Appelez-moi avec la marque et le problème, je vous le " +
        "dis tout de suite. Et si votre ouvre-porte est à remplacer, j’installe du LiftMaster.",
    },
    {
      q: "Pourquoi ma porte remonte quand elle touche le sol?",
      r:
        "C’est la sécurité de l’ouvre-porte qui réagit. Les capteurs sont mal alignés ou sales, ou " +
        "l’ajustement de la force et de la course n’est plus bon. Ça se règle généralement en une visite.",
    },
    {
      q: "Combien de temps pour la réparation?",
      r:
        "La plupart des réparations d’ouvre-porte se font en une visite. Si une pièce doit être " +
        "commandée, je vous le dis sur place avec le délai.",
    },
  ],
};

export default function PageOuvrePorte() {
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
