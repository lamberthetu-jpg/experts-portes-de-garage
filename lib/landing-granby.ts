/**
 * Données d'affaires de la page /reparation-porte-garage-granby
 *
 * ── COMMENT REMPLIR ──────────────────────────────────────────────────────
 * Tout ce qui est `null` est MASQUÉ sur la page. Rien de faux ne sera
 * jamais affiché. Dès que tu remplis une valeur, la section apparaît.
 *
 * Ne mets JAMAIS un prix ou un délai que tu ne peux pas tenir : la page
 * devient une promesse, et le client la lit comme un engagement.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const LANDING = {
  /** Disponibilité réelle, en phrase complète (affichée sous les boutons du hero). null = masquée. */
  heuresReponse: "Urgences en tout temps, 7 jours sur 7" as string | null, // phrase complète, affichée telle quelle

  /** Rayon réel de déplacement, en km. Le même que la pub Google (45 km, vérifié dans Google Ads le 25 sept. 2026). */
  rayonKm: 45,

  /** Numéro d'entreprise du Québec. */
  neq: "2281545188",

  /**
   * Lien de prise de rendez-vous en ligne (Google Calendar / Calendly).
   * null = le bouton « Ça peut attendre » descend vers le formulaire.
   */
  lienRendezVous: null as string | null,

  /** Photo du hero : toi devant ton camion. null = fond dégradé sans photo. */
  photoHero: "/images/hero-urgence-nuit.webp" as string | null,

  /** Ta photo de visage pour la section « Qui vient chez vous ». */
  photoLambert: "/images/lambert.webp" as string | null,

  /**
   * Tarification reelle de Lambert.
   * Mettre a null pour masquer toute la section Prix.
   */
  prixMinimum: 125 as number | null,      // petite job reglee sur place
  tauxHoraire: 145 as number | null,      // par heure, pieces en sus
  prixUrgence: 350 as number | null,      // sortie d'urgence : laisser tout tomber, hors route

  /** Mise au point annuelle : prix et durée. */
  miseAuPoint: {
    prix: null as number | null,
    minutes: 45,
  },

  /** Réponses FAQ. null = la question est retirée de la page. */
  faq: {
    soirEtFinDeSemaine: "Oui. Pour une urgence, je me déplace en tout temps, le soir comme la fin de semaine." as string | null,
    garantie: "Oui. La main-d'œuvre est garantie 90 jours. Pour les pièces, la garantie dépend de la pièce : je vous la précise avant de l'installer." as string | null,
    paiements: null as string | null,          // ex. "Comptant, virement Interac et carte de crédit."
  },

  /**
   * Vrais avis Google seulement. Tableau vide = section masquée.
   * N'invente jamais d'avis : c'est illégal et ça se retourne contre toi.
   */
  avis: [] as { prenom: string; ville: string; texte: string }[],

  /** Lien vers ta fiche Google pour « Voir tous les avis ». */
  lienAvisGoogle: null as string | null,

  /** Villes desservies, affichées en texte (bon pour le référencement). */
  villes: [
    "Granby", "Bromont", "Waterloo", "Cowansville", "Shefford",
    "Roxton Pond", "Saint-Alphonse-de-Granby", "Saint-Paul-d'Abbotsford",
    "Farnham", "Sainte-Cécile-de-Milton",
  ],
} as const;

/** Formate un prix en dollars canadiens sans décimales inutiles. */
export function prix(n: number): string {
  return `${n.toLocaleString("fr-CA")} $`;
}
