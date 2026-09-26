/**
 * DONNÉES STRUCTURÉES (JSON-LD) — l'entreprise vue par les machines.
 *
 * Google, ChatGPT, Claude, Perplexity et Gemini lisent cette fiche pour
 * décider si Experts Portes de Garage est une vraie entreprise, où elle
 * travaille, et ce qu'elle fait. Ils ne lisent pas le design.
 *
 * ── LA RÈGLE QUI STRUCTURE TOUT ──
 *
 * Il y a **une seule entreprise**, et elle porte **un seul identifiant** :
 * `BUSINESS_ID`. Chaque page qui parle de l'entreprise pointe vers cet
 * identifiant au lieu de redéclarer une fiche complète.
 *
 * Avant, les 15 pages de ville déclaraient chacune un `LocalBusiness`
 * avec une `url` différente. Une machine y voyait 15 commerces distincts
 * partageant un nom et un numéro de téléphone, ce qui est exactement le
 * motif d'une ferme de fausses fiches. C'est pire que de n'avoir rien.
 *
 * ── CE QU'ON N'ÉCRIT PAS ICI ──
 *
 * Pas d'adresse civique : Lambert travaille depuis chez lui et se déplace
 * chez le client. Une entreprise de zone de service ne publie pas son
 * adresse, c'est la règle de Google et c'est aussi une question de vie
 * privée.
 *
 * Pas de note ni de nombre d'avis : `aggregateRating` inventé est une
 * fausse représentation. On l'ajoutera quand les vrais avis Google
 * s'accumuleront, en recopiant les vrais chiffres.
 *
 * Pas de ville hors du rayon réel. La liste vient de `LANDING.villes`,
 * qui est la zone que Lambert dessert pour vrai. Les pages de villes
 * éloignées existent pour le référencement, mais promettre un service
 * qu'on ne rend pas se retourne contre nous.
 */

import {
  BUSINESS_NAME,
  PHONE_DISPLAY,
  EMAIL,
  GOOGLE_PROFILE_URL,
  NEQ,
  OWNER_NAME,
} from "@/lib/config";
import { LANDING } from "@/lib/landing-granby";

export const SITE_URL = "https://www.expertsportesdegarage.ca";

/** L'identifiant stable de l'entreprise. Ne change jamais. */
export const BUSINESS_ID = `${SITE_URL}/#entreprise`;

/** Coordonnées de Granby, le point d'où part chaque déplacement. */
const GEO = { latitude: 45.4001, longitude: -72.7333 };

/** Le rayon réellement desservi, en mètres. Le même que la pub Google. */
const RAYON_METRES = 45000;

const SERVICES = [
  {
    nom: "Réparation de ressort de porte de garage",
    description:
      "Remplacement de ressorts de torsion ou d'extension cassés, réglage de la tension et équilibrage de la porte.",
  },
  {
    nom: "Réparation de câble de porte de garage",
    description:
      "Remplacement des câbles de levage effilochés ou sortis du tambour, et réenroulement.",
  },
  {
    nom: "Réparation urgente de porte de garage",
    description:
      "Porte coincée, ouverte ou qui ne ferme plus. Sortie le jour même, sept jours sur sept.",
  },
  {
    nom: "Réparation d'ouvre-porte de garage",
    description:
      "Diagnostic et réparation du moteur, de la courroie, de la chaîne, des capteurs et de la télécommande.",
  },
  {
    nom: "Remplacement de roulettes et de charnières",
    description:
      "Remplacement des roulettes usées et des pentures brisées pour une porte silencieuse.",
  },
  {
    nom: "Remplacement de coupe-froid de porte de garage",
    description:
      "Remplacement du coupe-froid du bas et des côtés pour arrêter l'eau, la neige et les courants d'air.",
  },
  {
    nom: "Installation de porte de garage",
    description:
      "Installation d'une porte neuve, incluant le démontage de l'ancienne et l'ajustement final.",
  },
  {
    nom: "Entretien de porte de garage",
    description:
      "Mise au point annuelle : lubrification, serrage de la quincaillerie, vérification de l'équilibre et des capteurs.",
  },
];

/**
 * La fiche complète de l'entreprise. Une seule page doit l'émettre,
 * l'accueil, pour qu'il n'y ait jamais deux définitions concurrentes.
 */
export const businessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": BUSINESS_ID,
  name: BUSINESS_NAME,
  legalName: BUSINESS_NAME,
  description:
    "Réparation de portes de garage résidentielles à Granby et dans un rayon de 45 km. Ressorts, câbles, roulettes, ouvre-portes et coupe-froid. Service le jour même, sept jours sur sept. Un seul homme se déplace, Lambert Hétu, du premier appel jusqu'à la fin des travaux.",
  url: SITE_URL,
  telephone: PHONE_DISPLAY,
  email: EMAIL,
  logo: `${SITE_URL}/images/logo_experts.png`,
  image: `${SITE_URL}/images/logo_experts.png`,
  inLanguage: "fr-CA",
  knowsLanguage: ["fr-CA", "en-CA"],
  currenciesAccepted: "CAD",
  paymentAccepted: "Comptant, virement Interac",
  priceRange: "$$",
  identifier: {
    "@type": "PropertyValue",
    name: "NEQ",
    value: NEQ,
  },
  founder: {
    "@type": "Person",
    name: OWNER_NAME,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Granby",
    addressRegion: "QC",
    postalCode: "J2H",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  },
  /** La zone réelle : un cercle de 45 km autour de Granby. */
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    geoRadius: RAYON_METRES,
  },
  /** Les villes nommées, pour les questions du genre « à Cowansville ». */
  areaServed: LANDING.villes.map((ville) => ({
    "@type": "City",
    name: ville,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Québec",
    },
  })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  knowsAbout: SERVICES.map((s) => s.nom),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services de porte de garage",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.nom,
        description: s.description,
        serviceType: s.nom,
        provider: { "@id": BUSINESS_ID },
      },
    })),
  },
  sameAs: [GOOGLE_PROFILE_URL],
};

/**
 * Ce qu'une page secondaire émet : elle décrit son sujet et **renvoie**
 * à l'entreprise par son identifiant, sans la redéclarer.
 */
export function pageSchema(options: {
  url: string;
  nom: string;
  description?: string;
  ville?: string;
  /** Nom du service précis. Par défaut : « Réparation de porte de garage ». */
  service?: string;
}) {
  const service = options.service ?? "Réparation de porte de garage";
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${options.url}#page`,
    url: options.url,
    name: options.nom,
    ...(options.description ? { description: options.description } : {}),
    inLanguage: "fr-CA",
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#site`, url: SITE_URL },
    about: { "@id": BUSINESS_ID },
    ...(options.ville
      ? {
          mainEntity: {
            "@type": "Service",
            name: `${service} à ${options.ville}`,
            serviceType: service,
            provider: { "@id": BUSINESS_ID },
            areaServed: { "@type": "City", name: options.ville },
          },
        }
      : {}),
  };
}

/**
 * Sérialise en neutralisant `<`, comme le recommande la doc Next
 * (`node_modules/next/dist/docs/01-app/02-guides/json-ld.md`) : sans ça,
 * un texte de contenu contenant une balise peut fermer le `<script>`.
 */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
