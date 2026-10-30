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
  tauxHoraire: 170 as number | null,      // par heure, pieces en sus
  prixUrgence: 400 as number | null,      // sortie d'urgence : laisser tout tomber, hors route

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
   * Vrais avis Google seulement (fiche relue le 29 oct. 2026 : 23 avis, 5,0/5).
   * Plus récent en premier. Un avis sans texte (étoiles seulement) a texte vide :
   * il compte dans la note mais n'a pas de carte.
   * Prénom + initiale, pas de ville (les avis Google ne la donnent pas).
   * Tableau vide = section masquée.
   * N'invente jamais d'avis : c'est illégal et ça se retourne contre toi.
   */
  avis: [
    {
      prenom: "Louis R.",
      ville: "",
      etoiles: 5,
      texte: "Bon service.",
    },
    {
      prenom: "Un client",
      ville: "",
      etoiles: 5,
      texte: "Très professionnel, belle approche avec les clientèle.",
    },
    {
      prenom: "Véronique T.",
      ville: "",
      etoiles: 5,
      texte: "Nous reçu un très bon service. Nous recommandons ses services.",
    },
    {
      prenom: "Cassandra C.",
      ville: "",
      etoiles: 5,
      texte: "Merci Lambert pour ton très bon travail !",
    },
    {
      prenom: "Tiger F.",
      ville: "",
      etoiles: 5,
      texte: "Excellent service, je recommande",
    },
    {
      prenom: "Luce T.",
      ville: "",
      etoiles: 5,
      texte: "Très bon service : ponctuel, minutieux. Je le recommande sans hésitation.",
    },
    {
      prenom: "Garry C.",
      ville: "",
      etoiles: 5,
      texte:
        "Fournisseur est arrivé à l’heure prévue. Tout ce dont il avait besoin était dans son véhicule. " +
        "Il a décelé quelques petits problèmes avec la porte et a fait les ajustements nécessaires pour les régler. " +
        "Il a remplacé le caoutchouc du bas sur le champ car l’autre est devenu raide et aplati. " +
        "La porte est plus silencieuse maintenant et ouvre / ferme avec moins d’effort du moteur.",
    },
    {
      prenom: "Michel M.",
      ville: "",
      etoiles: 5,
      texte:
        "Excellent service par des gens compétents et respectueux. Travail rapide et propre. " +
        "Explications claires. Prix très raisonnables. Je les recommande absolument.",
    },
    {
      prenom: "Mélanie R.",
      ville: "",
      etoiles: 5,
      texte: "Bon service, courtois, minutieux et prend le temps de nous expliquer.",
    },
    {
      prenom: "Jocelyne B.",
      ville: "",
      etoiles: 5,
      texte: "Très bon service, rapide et courtois, professionnel. Je recommande fortement.",
    },
    {
      prenom: "Eric L.",
      ville: "",
      etoiles: 5,
      texte: "",
    },
    {
      prenom: "Sylvie-Anne T.",
      ville: "",
      etoiles: 5,
      texte: "Super service, rapide et efficace et ils sont super gentils",
    },
    {
      prenom: "Denny C.",
      ville: "",
      etoiles: 5,
      texte:
        "Excellent service! Courtois, professionnel et fiable, Lambert a pu évaluer le problème le jour même " +
        "et m'offrir une solution temporaire pour faire fonctionner la porte de garage. " +
        "Le problème a été réparé la semaine suivante! Merci! Je suis impressionné par la qualité du service.",
    },
    {
      prenom: "Mathieu",
      ville: "",
      etoiles: 5,
      texte: "Super service, bon prix! Je recommande.",
    },
    {
      prenom: "Thomas C.",
      ville: "",
      etoiles: 5,
      texte: "Excellent service! Très professionnel, compétent et efficace. Je recommande fortement!",
    },
    {
      prenom: "Christian T.",
      ville: "",
      etoiles: 5,
      texte:
        "Professionnel, rapide et efficaces je ne ferais plus jamais affaire avec un autre fournisseur.",
    },
    {
      prenom: "Yvan P.",
      ville: "",
      etoiles: 5,
      texte:
        "Bon technicien. Prend le temps d'écouter le client. Donne un bon service. " +
        "Répond à ses messages et ses appels. Je le recommande",
    },
    {
      prenom: "Frédéric L.",
      ville: "",
      etoiles: 5,
      texte:
        "Service rapide, courtois et professionnel. Je suis très satisfait du nouveau " +
        "moteur qui a été remplacé. Je recommande",
    },
    {
      prenom: "Lucie L.",
      ville: "",
      etoiles: 4,
      texte:
        "Très bon service et service rapide et professionnel, travail très bien. " +
        "Personne compétente et consciencieuse. Je vous le recommande sans hésiter",
    },
    {
      prenom: "Martin G.",
      ville: "",
      etoiles: 5,
      texte: "Excellent service, très sympathique",
    },
    {
      prenom: "Anne",
      ville: "",
      etoiles: 5,
      texte: "Efficace, professionnel, aimable",
    },
    {
      prenom: "Marielle B.",
      ville: "",
      etoiles: 5,
      texte: "Très poli et connaît son produit.",
    },
    {
      prenom: "Ronald S.",
      ville: "",
      etoiles: 5,
      texte: "Bon service, gentil, je le recommande",
    },
  ] as { prenom: string; ville: string; etoiles: number; texte: string }[],

  /** Lien vers ta fiche Google pour « Voir tous les avis ». */
  lienAvisGoogle: "https://g.page/r/CT-AI6_v4mdPEBM" as string | null,

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
