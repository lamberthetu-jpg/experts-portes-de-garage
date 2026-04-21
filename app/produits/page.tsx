import type { Metadata } from "next";
import ProductsPageContent from "@/components/ProductsPageContent";

export const metadata: Metadata = {
  title: "Boutique — Pièces pour portes de garage | Experts Portes de Garage",
  description:
    "Achetez en ligne vos pièces pour portes de garage : moteurs, ressorts, coupe-froid, roulettes, pentures, courroies et télécommandes. Paiement sécurisé.",
  openGraph: {
    title: "Boutique en ligne — Pièces pour portes de garage",
    description:
      "Commandez directement vos pièces de porte de garage. Paiement sécurisé par Stripe.",
    url: "/produits",
  },
};

export default function ProduitsPage() {
  return <ProductsPageContent />;
}
