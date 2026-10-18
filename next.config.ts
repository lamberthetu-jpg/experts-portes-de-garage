import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["googleapis", "google-auth-library", "@anthropic-ai/sdk"],
  // Pages de villes hors de la zone de 45 km autour de Granby, retirées le
  // 29 sept. 2026 : elles brouillaient la zone de service aux yeux de Google.
  async redirects() {
    return [
      "sherbrooke",
      "longueuil",
      "brossard",
      "sainte-julie",
      "chateauguay",
      "sorel-tracy",
    ]
      .map((ville) => ({
        source: `/portes-de-garage-${ville}`,
        destination: "/",
        permanent: true,
      }))
      .concat([
        // Code QR des autocollants (oct. 2026). Temporaire exprès : on peut
        // changer la destination ici sans réimprimer les autocollants.
        {
          source: "/qr",
          // Hiver 2026 : l'offre de mise au point. Au printemps, remettre "/".
          destination: "/mise-au-point?utm_source=autocollant&utm_medium=qr",
          permanent: false,
        },
        // Liens envoyés aux clients par Vitryne (oct. 2026) : le texto montre
        // expertsportesdegarage.ca, la page elle-même vit sur vitryne.ca.
        // f = facture, e = soumission, p = portail client.
        ...["f", "e", "p"].map((type) => ({
          source: `/${type}/:token`,
          destination: `https://vitryne.ca/${type}/:token`,
          permanent: false,
        })),
      ]);
  },
};

export default nextConfig;
