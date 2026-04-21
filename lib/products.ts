export type Product = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  category: string;
  emoji: string;
  image?: string;
  features?: string[];
  specs?: Record<string, string>;
  longDescription?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "moteur-ddo-8900w",
    name: "Moteur LiftMaster DDO 8900W",
    description:
      "Ouvre-porte jackshaft mural avec Wi-Fi intégré, batterie de secours et verrou automatique.",
    priceCents: 44999,
    category: "Moteurs",
    emoji: "⚙️",
    image: "/images/moteurs/ddo-8900w.webp",
    longDescription:
      "Le LiftMaster DDO 8900W est un ouvre-porte jackshaft à installation murale pour portes sectionnelles. Son Wi-Fi intégré et la plateforme myQ vous permettent d'ouvrir, de fermer et de surveiller votre porte depuis votre téléphone, où que vous soyez. Avec la batterie de secours incluse, la porte continue de fonctionner pendant les pannes de courant, et le verrou automatique sécurise la porte à chaque fermeture. L'installation murale libère complètement le plafond de votre garage.",
    features: [
      "Wi-Fi intégré avec application myQ (iOS et Android)",
      "Batterie de secours incluse — fonctionne pendant les pannes",
      "Verrou de porte automatique intégré",
      "Sécurité Security+ 2.0 (code roulant chiffré)",
      "Installation murale — aucun rail au plafond",
      "Ouverture 50 % plus rapide que la plupart des moteurs",
      "Compatible avec la plateforme myQ Business",
    ],
    specs: {
      "Type d'entraînement": "Jackshaft mural",
      "Hauteur de porte max": "14 pi (4,27 m)",
      "Poids de porte max": "300 lb (136 kg)",
      "Alimentation": "120 V AC / 60 Hz / 2,0 A",
      "Connectivité": "Wi-Fi 2,4 GHz",
      "Télécommande": "Security+ 2.0",
      "Dégagement requis": "3 po au-dessus de l'arbre de torsion",
      "Garantie": "Moteur 5 ans / pièces 1 an",
    },
  },
  {
    id: "ressort-torsion-paire",
    name: "Ressort de torsion (paire)",
    description:
      "Paire de ressorts de torsion haute qualité, garantie 10 000 cycles.",
    priceCents: 14999,
    category: "Ressorts",
    emoji: "🌀",
    longDescription:
      "Paire de ressorts de torsion galvanisés fabriqués pour résister aux hivers québécois. Dimensionnés pour les portes résidentielles standard de 7 à 8 pi de hauteur. La paire garantit un équilibrage parfait de la porte et une tension symétrique.",
    features: [
      "Galvanisés contre la corrosion",
      "Garantie 10 000 cycles (≈ 13 ans d'usage normal)",
      "Fabriqués en acier à haute teneur en carbone",
      "Vendus en paire pour équilibrage optimal",
    ],
    specs: {
      "Matériau": "Acier galvanisé",
      "Durée de vie": "10 000 cycles",
      "Compatibilité": "Portes résidentielles 7 à 8 pi",
      "Quantité": "Paire (2 ressorts)",
    },
  },
  {
    id: "coupe-froid-bas-porte",
    name: "Coupe-froid bas de porte 16 pi",
    description:
      "Joint d'étanchéité bas de porte pour portes 16 pieds. Résistant au gel.",
    priceCents: 4999,
    category: "Coupe-froid",
    emoji: "🧊",
    longDescription:
      "Coupe-froid en caoutchouc EPDM résistant au gel jusqu'à -40 °C. Conçu pour sceller hermétiquement le bas de votre porte de garage double (16 pi) contre le froid, la pluie, la neige et les rongeurs.",
    features: [
      "Caoutchouc EPDM résistant aux UV et au gel -40 °C",
      "Longueur 16 pi (convient aux portes doubles standard)",
      "Profil en U — s'insère dans la rainure existante",
      "Bloque courant d'air, humidité et insectes",
    ],
    specs: {
      "Matériau": "Caoutchouc EPDM",
      "Longueur": "16 pi (4,88 m)",
      "Température d'opération": "-40 °C à +80 °C",
      "Profil": "En U (standard nord-américain)",
    },
  },
  {
    id: "courroie-moteur",
    name: "Courroie de moteur remplacement",
    description:
      "Courroie de rechange universelle pour ouvre-porte à entraînement par courroie.",
    priceCents: 3499,
    category: "Pièces moteur",
    emoji: "🔗",
    longDescription:
      "Courroie de rechange renforcée de fibre de verre pour ouvre-porte à entraînement par courroie. Fonctionnement silencieux, idéale pour les garages attenants à une chambre.",
    features: [
      "Renforcée de fibre de verre",
      "Fonctionnement ultra-silencieux",
      "Compatible LiftMaster, Chamberlain, Craftsman",
      "Installation simple avec outils standard",
    ],
    specs: {
      "Matériau": "Caoutchouc renforcé fibre de verre",
      "Compatibilité": "La plupart des modèles à courroie",
      "Bruit": "Très faible",
    },
  },
  {
    id: "roulettes-set-10",
    name: "Roulettes (set de 10)",
    description:
      "Set de 10 roulettes en nylon silencieuses sur roulement à billes.",
    priceCents: 5999,
    category: "Roulettes",
    emoji: "⚫",
    longDescription:
      "Set complet de 10 roulettes en nylon montées sur roulements à billes scellés. Remplacent les roulettes métalliques bruyantes pour un fonctionnement beaucoup plus silencieux et une durée de vie supérieure.",
    features: [
      "10 roulettes en nylon silencieuses",
      "Roulements à billes scellés (sans entretien)",
      "Tige de 4 po standard",
      "Réduit le bruit de 70 % vs roulettes métalliques",
    ],
    specs: {
      "Matériau": "Nylon renforcé",
      "Roulement": "À billes scellé",
      "Tige": "7/16 po × 4 po",
      "Quantité": "10 roulettes",
    },
  },
  {
    id: "pentures-renforcees-set-4",
    name: "Pentures renforcées (set de 4)",
    description:
      "Set de 4 pentures galvanisées pour portes sectionnelles standard.",
    priceCents: 3999,
    category: "Pentures",
    emoji: "🔧",
    longDescription:
      "Set de 4 pentures en acier galvanisé renforcé pour portes sectionnelles. Compatibles avec la majorité des portes résidentielles standard. Vis et boulons inclus.",
    features: [
      "Acier galvanisé résistant à la corrosion",
      "Vis et boulons inclus",
      "Compatibles portes sectionnelles standard",
      "Calibres #1 à #4 disponibles",
    ],
    specs: {
      "Matériau": "Acier galvanisé",
      "Quantité": "4 pentures",
      "Quincaillerie": "Incluse",
    },
  },
  {
    id: "telecommande-universelle",
    name: "Télécommande universelle",
    description:
      "Télécommande programmable compatible avec la plupart des ouvre-portes.",
    priceCents: 5499,
    category: "Accessoires",
    emoji: "📡",
    longDescription:
      "Télécommande universelle programmable compatible avec plus de 90 % des ouvre-portes résidentiels sur le marché. Supporte les fréquences 300, 310, 315 et 390 MHz, ainsi que les protocoles Security+ et Security+ 2.0.",
    features: [
      "Compatible 90 %+ des ouvre-portes",
      "Multi-fréquences (300-390 MHz)",
      "Jusqu'à 3 portes programmables",
      "Pile CR2032 incluse",
    ],
    specs: {
      "Fréquences": "300, 310, 315, 390 MHz",
      "Protocoles": "Security+ et Security+ 2.0",
      "Portes programmables": "Jusqu'à 3",
      "Pile": "CR2032 (incluse)",
    },
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getAllProductIds(): string[] {
  return PRODUCTS.map((p) => p.id);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}
