/**
 * Les demandes du site vont aussi dans Vitryne (16 nov. 2026).
 *
 * Avant : seulement un courriel à Lambert (la base Supabase du site est en
 * pause). Les demandes restaient dans Gmail, hors du CRM : Alain Trudel
 * (coupe-froid blanc, 332 $) n'avait pas de fiche.
 *
 * Vitryne (/api/demandes/site) crée la demande et la fiche du client, met
 * les détails dans ses notes, et avertit Lambert par texto. Il ne texte
 * PAS le client. Le courriel continue de partir : si Vitryne ne répond
 * pas, rien n'est perdu.
 *
 * Variables : VITRYNE_JETON_SITE (le jeton `entree_site:<tenant>` de
 * Vitryne), VITRYNE_URL (défaut https://vitryne.ca).
 */

import { randomUUID } from "crypto";

export type DemandeVitryne = {
  nom: string;
  telephone: string;
  courriel?: string | null;
  adresse?: string | null;
  ville?: string | null;
  codePostal?: string | null;
  service?: string | null;
  /** Tout ce que le client a rempli, en texte (coupe-froid, couleur, mesures, estimation…). */
  message?: string | null;
  /** La page du site d'où vient la demande. */
  page?: string | null;
  /** Vient d'une annonce Google (gclid ou paramètre annonce). */
  annonceGoogle?: boolean;
};

export async function envoyerAVitryne(d: DemandeVitryne): Promise<void> {
  const jeton = process.env.VITRYNE_JETON_SITE;
  if (!jeton) {
    console.warn("[vitryne] VITRYNE_JETON_SITE absente : la demande reste seulement par courriel.");
    return;
  }
  const url = `${(process.env.VITRYNE_URL ?? "https://vitryne.ca").replace(/\/$/, "")}/api/demandes/site`;
  const adresse = [d.adresse, d.ville ? `${d.ville}, QC` : null, d.codePostal].filter(Boolean).join(", ");
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", "x-jeton": jeton },
      body: JSON.stringify({
        id_source: randomUUID().replace(/-/g, ""),
        nom: d.nom,
        telephone: d.telephone,
        courriel: d.courriel ?? null,
        adresse: adresse || null,
        ville: d.ville ?? null,
        service: d.service ?? null,
        message: d.message ?? null,
        page: d.page ?? null,
        provenance: d.annonceGoogle ? { source: "google" } : { source: "organic" },
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) console.error("[vitryne] demande refusée :", r.status, (await r.text()).slice(0, 200));
  } catch (err) {
    console.error("[vitryne] demande non transmise :", err);
  }
}
