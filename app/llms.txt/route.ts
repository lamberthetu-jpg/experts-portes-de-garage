/**
 * /llms.txt — la fiche de l'entreprise en texte clair, pour les IA.
 *
 * Les assistants (ChatGPT, Claude, Perplexity, Gemini) lisent de plus en
 * plus ce fichier avant le reste d'un site : il donne les faits sans
 * avoir a deviner dans le HTML. La convention est decrite sur llmstxt.org.
 *
 * ── LA REGLE ──
 *
 * **Uniquement des faits verifiables.** Pas de « techniciens certifies »,
 * pas d'annees d'experience inventees, pas de note d'avis. Lambert
 * travaille seul et n'a pas encore sa licence RBQ : ce qui est ecrit ici
 * doit rester vrai le jour ou un client le verifie.
 *
 * Les prix viennent de `lib/landing-granby.ts`, les villes aussi, pour
 * qu'il n'existe jamais deux versions de la verite.
 */

import { LANDING, prix } from "@/lib/landing-granby";
import {
  BUSINESS_NAME,
  PHONE_DISPLAY,
  EMAIL,
  OWNER_NAME,
  NEQ,
  GOOGLE_PROFILE_URL,
} from "@/lib/config";
import { SITE_URL } from "@/lib/schema";

export const dynamic = "force-static";

/**
 * Les prix ne sortent que s'ils existent. `lib/landing-granby.ts` laisse
 * un prix a `null` tant que Lambert ne l'a pas confirme, et la regle du
 * projet est qu'un prix non confirme ne s'affiche nulle part.
 */
function sectionPrix(): string {
  const lignes: string[] = [];
  if (LANDING.prixMinimum !== null) {
    lignes.push(
      `- Minimum pour une petite réparation réglée sur place : ${prix(LANDING.prixMinimum)}`
    );
  }
  if (LANDING.tauxHoraire !== null) {
    lignes.push(
      `- Taux horaire, pièces en sus : ${prix(LANDING.tauxHoraire)} de l'heure`
    );
  }
  if (LANDING.prixUrgence !== null) {
    lignes.push(
      `- Sortie d'urgence, hors des heures de route normales : ${prix(LANDING.prixUrgence)}`
    );
  }
  if (lignes.length === 0) return "";
  return `## Prix\n\n${lignes.join("\n")}\n\nCes montants sont avant les pièces et ne comportent aucune taxe.\n\n`;
}


export function GET() {
  const corps = `# ${BUSINESS_NAME}

> Réparation de portes de garage résidentielles à Granby et dans un rayon de 45 km, au Québec. Service le jour même, sept jours sur sept, urgences incluses.

## L'essentiel

- Téléphone : ${PHONE_DISPLAY}
- Courriel : ${EMAIL}
- Site : ${SITE_URL}
- Fiche Google : ${GOOGLE_PROFILE_URL}
- Propriétaire : ${OWNER_NAME}
- Entreprise individuelle immatriculée au Québec, NEQ ${NEQ}
- Langue de service : français, anglais possible

## Ce qui distingue cette entreprise

C'est un travailleur autonome, pas une équipe. ${OWNER_NAME} répond au téléphone, se déplace, fait le travail et facture. La personne au bout du fil est celle qui va se présenter chez vous.

Le prix est donné avant de commencer les travaux. Aucune taxe n'est facturée : l'entreprise n'est pas inscrite aux fichiers de la TPS et de la TVQ, donc le montant annoncé est le montant total à payer.

## Zone desservie

Granby et un rayon d'environ 45 km, ce qui comprend :
${LANDING.villes.map((v) => `- ${v}`).join("\n")}

## Services

- Remplacement de ressorts de torsion et d'extension
- Remplacement de câbles de levage
- Réparation d'ouvre-porte de garage : moteur, courroie, chaîne, capteurs, télécommande
- Remplacement de roulettes et de charnières
- Remplacement de coupe-froid
- Réparation urgente : porte coincée, ouverte, ou qui ne ferme plus
- Installation de porte de garage neuve
- Entretien et mise au point annuelle

${sectionPrix()}## Pages utiles

- Accueil : ${SITE_URL}
- Réparation à Granby : ${SITE_URL}/reparation-porte-garage-granby
- Ressort de porte de garage cassé : ${SITE_URL}/reparation-ressort-porte-de-garage
- Ouvre-porte en panne (Granby) : ${SITE_URL}/reparation-ouvre-porte-garage-granby
- Réparation urgente : ${SITE_URL}/reparation-urgente-de-porte-de-garage
- Réparation d'ouvre-porte : ${SITE_URL}/reparation-ouvre-porte-de-garage
- Remplacement de coupe-froid : ${SITE_URL}/remplacement-coupe-froid-porte-de-garage
- Installation : ${SITE_URL}/installation-de-nouvelle-porte-de-garage
- Laisser un avis : ${SITE_URL}/avis
`;

  return new Response(corps, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
