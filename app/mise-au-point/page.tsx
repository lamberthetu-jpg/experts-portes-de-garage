import type { Metadata } from "next";
import MiseAuPoint from "@/components/MiseAuPoint";

const URL_PAGE = "/mise-au-point";
const DESCRIPTION =
  "Mise au point de porte de garage à 39,95 $ tout inclus, à Granby et 35 km autour. " +
  "Lubrification, inspection des ressorts et câbles, réglage de l'ouvre-porte. Garantie 30 jours.";

export const metadata: Metadata = {
  title: "Mise au point de porte de garage 39,95 $ | Granby",
  description: DESCRIPTION,
  alternates: { canonical: URL_PAGE },
  openGraph: {
    title: "Mise au point de porte de garage : 39,95 $ tout inclus",
    description: DESCRIPTION,
    url: URL_PAGE,
    type: "website",
    images: ["/images/mise-au-point-lubrification.webp"],
  },
};

export default function PageMiseAuPoint() {
  return <MiseAuPoint />;
}
