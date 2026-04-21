export type Product = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  category: string;
  emoji: string;
  image?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "moteur-ddo-8900w",
    name: "Moteur LiftMaster DDO 8900W",
    description: "Ouvre-porte jackshaft mural commercial léger. Wi-Fi intégré avec myQ, verrou automatique, batterie de secours et Security+ 2.0. Pour portes jusqu'à 14 pi / 300 lb. Ouverture 50 % plus rapide. 120V / 2,0A.",
    priceCents: 44999,
    category: "Moteurs",
    emoji: "⚙️",
    image: "/images/moteurs/ddo-8900w.webp",
  },
  {
    id: "ressort-torsion-paire",
    name: "Ressort de torsion (paire)",
    description: "Paire de ressorts de torsion haute qualité, garantie 10 000 cycles.",
    priceCents: 14999,
    category: "Ressorts",
    emoji: "🌀",
  },
  {
    id: "coupe-froid-bas-porte",
    name: "Coupe-froid bas de porte 16 pi",
    description: "Joint d'étanchéité bas de porte pour portes 16 pieds. Résistant au gel.",
    priceCents: 4999,
    category: "Coupe-froid",
    emoji: "🧊",
  },
  {
    id: "courroie-moteur",
    name: "Courroie de moteur remplacement",
    description: "Courroie de rechange universelle pour ouvre-porte à entraînement par courroie.",
    priceCents: 3499,
    category: "Pièces moteur",
    emoji: "🔗",
  },
  {
    id: "roulettes-set-10",
    name: "Roulettes (set de 10)",
    description: "Set de 10 roulettes en nylon silencieuses sur roulement à billes.",
    priceCents: 5999,
    category: "Roulettes",
    emoji: "⚫",
  },
  {
    id: "pentures-renforcees-set-4",
    name: "Pentures renforcées (set de 4)",
    description: "Set de 4 pentures galvanisées pour portes sectionnelles standard.",
    priceCents: 3999,
    category: "Pentures",
    emoji: "🔧",
  },
  {
    id: "telecommande-universelle",
    name: "Télécommande universelle",
    description: "Télécommande programmable compatible avec la plupart des ouvre-portes.",
    priceCents: 5499,
    category: "Accessoires",
    emoji: "📡",
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}
