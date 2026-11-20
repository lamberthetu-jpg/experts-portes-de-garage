import type { Metadata } from "next";
import OuvrePortePageContent from "@/components/OuvrePortePageContent";

export const metadata: Metadata = {
  title: "Ouvre-porte de Garage — Installation & Réparation — Experts Portes de Garage",
  description:
    "Installation et réparation d'ouvre-porte de garage en Estrie et Montérégie. Belt Drive, Chain Drive, Screw Drive, Jackshaft. Techniciens qualifiés. Appelez le 438-808-9604.",
  openGraph: {
    title: "Ouvre-porte de Garage — Installation & Réparation",
    description:
      "Installez ou réparez votre ouvre-porte de garage avec un technicien qualifié. Prix clairs, service rapide en Estrie et Montérégie.",
    url: "/reparation-ouvre-porte-de-garage",
  },
};

export default function ReparationOuvrePorteDeGaragePage() {
  return <OuvrePortePageContent />;
}
