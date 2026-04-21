export type Product = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  category: string;
  emoji: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "moteur-liftmaster-12hp",
    name: "Moteur LiftMaster 1/2 HP",
    description: "Ouvre-porte résidentiel robuste, 1/2 HP. Idéal pour portes simples et doubles.",
    priceCents: 44999,
    category: "Moteurs",
    emoji: "⚙️",
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
