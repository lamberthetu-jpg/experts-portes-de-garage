import { randomUUID } from "node:crypto";
import { provenanceDuCookie } from "./suivi.ts";

/**
 * Envoie une demande du site au CRM de Lambert (Vitryne, /api/demandes/site)
 * avec le premier contact du visiteur (témoin eg_ft, lib/suivi.ts). Vitryne
 * crée la fiche avec sa source (Google Ads, Facebook, site web) et texte
 * Lambert.
 *
 * Rend false si Vitryne n'a pas pris la demande (jeton absent, panne,
 * refus) : l'appelant envoie alors le courriel habituel à Lambert. Une
 * demande n'est jamais perdue.
 */
export async function envoyerAVitryne(
  req: Request,
  demande: { nom: string; telephone: string; courriel?: string; adresse?: string; ville?: string; service?: string; message?: string; page?: string }
): Promise<boolean> {
  const jeton = process.env.VITRYNE_JETON_SITE;
  if (!jeton) return false;
  try {
    const res = await fetch(`${process.env.VITRYNE_URL || "https://vitryne.ca"}/api/demandes/site`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-jeton": jeton },
      body: JSON.stringify({
        ...demande,
        id_source: randomUUID(),
        provenance: provenanceDuCookie(req.headers.get("cookie")),
      }),
      // Le client attend la réponse du formulaire : on n'attend pas Vitryne plus de 8 s.
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!res.ok) console.error("[vitryne] demande refusée :", res.status, await res.text().catch(() => ""));
    return res.ok;
  } catch (err) {
    console.error("[vitryne] injoignable :", err);
    return false;
  }
}
