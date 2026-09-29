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
    ].map((ville) => ({
      source: `/portes-de-garage-${ville}`,
      destination: "/",
      permanent: true,
    }));
  },
};

export default nextConfig;
