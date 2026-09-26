import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";

/**
 * Formulaire court de la page /reparation-porte-garage-granby
 * Trois champs seulement : nom, téléphone, description du problème.
 * Chaque champ de plus fait chuter le taux de remplissage.
 */
export async function POST(req: Request) {
  try {
    const { nom, telephone, probleme, source } = await req.json();
    // Page d'origine, liste fermée (jamais de texte libre du client dans le courriel).
    const page = PAGES[source as keyof typeof PAGES] ?? PAGES.granby;

    if (!nom?.trim() || !telephone?.trim()) {
      return NextResponse.json({ error: "Nom et téléphone requis" }, { status: 400 });
    }

    const propre = {
      nom: String(nom).trim().slice(0, 120),
      telephone: String(telephone).trim().slice(0, 40),
      probleme: String(probleme ?? "").trim().slice(0, 2000),
    };

    // Enregistrement au CRM. On n'échoue pas la demande si Supabase flanche :
    // le courriel reste le canal critique pour que Lambert rappelle le client.
    if (process.env.SUPABASE_URL) {
      try {
        await getSupabase()
          .from("clients")
          .upsert(
            { nom: propre.nom, telephone: propre.telephone },
            { onConflict: "telephone" }
          );
      } catch (err) {
        console.error("[rappel] supabase:", err);
      }
    }

    const resend = new Resend(process.env.RESEND_API_KEY!);
    const { error } = await resend.emails.send({
      from: `Experts Portes de Garage <${process.env.RESEND_FROM_EMAIL!}>`,
      to: [process.env.OWNER_EMAIL!],
      replyTo: process.env.OWNER_EMAIL!,
      subject: `Demande de rappel — ${propre.nom} — ${propre.telephone}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px">
          <h2 style="color:#cc0000;margin:0 0 16px">Nouvelle demande de rappel</h2>
          <p style="margin:0 0 8px"><strong>Nom :</strong> ${escapeHtml(propre.nom)}</p>
          <p style="margin:0 0 8px"><strong>Téléphone :</strong>
            <a href="tel:${propre.telephone.replace(/\D/g, "")}">${escapeHtml(propre.telephone)}</a>
          </p>
          <p style="margin:16px 0 4px"><strong>Le problème :</strong></p>
          <p style="margin:0;padding:12px;background:#f5f5f5;border-radius:6px;white-space:pre-wrap">${
            escapeHtml(propre.probleme) || "(rien d'écrit)"
          }</p>
          <p style="margin:20px 0 0;color:#666;font-size:13px">
            Reçu par la page ${page}.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[rappel] resend:", error);
      return NextResponse.json({ error: "Envoi impossible" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[rappel] error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

const PAGES = {
  granby: "Granby",
  depannage: "Dépannage (test A/B, version B)",
  ressort: "Ressorts (annonces)",
  ouvre_porte: "Ouvre-porte (annonces)",
} as const;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
