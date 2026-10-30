import { NextResponse } from "next/server";
import { sendBookingEmails } from "@/lib/notifications";
import type { GeneralBookingPayload } from "@/lib/notifications";
import { saveBookingToDb } from "@/lib/db";
import { attributionDuCookie } from "@/lib/suivi";

const SERVICE_LABELS: Record<string, string> = {
  "reparation-porte": "Réparation de porte de garage",
  "reparation-urgente": "Réparation urgente",
  "reparation-ouvre-porte": "Réparation d'ouvre-porte",
  "installation-ouvre-porte": "Installation d'ouvre-porte",
  "installation-porte": "Installation de nouvelle porte",
  "coupe-froid": "Remplacement de coupe-froid",
  "inspection": "Inspection / Entretien",
  "autre": "Autre / À déterminer",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { service, nom, telephone, courriel, adresse, ville, codePostal } = body;

    if (!nom || !telephone || !courriel || !adresse || !ville || !codePostal) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const payload: GeneralBookingPayload = {
      serviceType: SERVICE_LABELS[service] ?? "Réparation / Remplacement de porte",
      nom,
      telephone,
      courriel,
      adresse,
      ville,
      codePostal,
    };

    if (process.env.SUPABASE_URL) {
      try { await saveBookingToDb(payload, attributionDuCookie(req.headers.get("cookie"))); } catch (err) { console.error("[booking] supabase error:", err); }
    }
    await sendBookingEmails(payload);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[booking] error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
