import { NextResponse } from "next/server";
import { sendBookingEmails } from "@/lib/notifications";
import { generateQuotePdf, generateQuoteNum } from "@/lib/quote-pdf";
import type { WeatherSealBookingPayload } from "@/lib/notifications";
import { saveWeatherSealBookingToDb } from "@/lib/db";
import { attributionDuCookie } from "@/lib/suivi";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nom, telephone, courriel, adresse, ville, codePostal, seals, condition, notes, measurements, color, wantQuote } = body;

    if (!nom || !telephone || !courriel || !adresse || !ville || !codePostal || !seals) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const quoteNum = generateQuoteNum();

    const payload: WeatherSealBookingPayload = {
      serviceType: "Remplacement de coupe-froid",
      nom,
      telephone,
      courriel,
      adresse,
      ville,
      codePostal,
      seals,
      condition: condition || "",
      notes: notes || "",
      measurements: measurements || {},
      color: color || "",
      quoteNum,
    };

    if (process.env.SUPABASE_URL) {
      try { await saveWeatherSealBookingToDb(payload, attributionDuCookie(req.headers.get("cookie"))); } catch (err) { console.error("[booking-coupe-froid] supabase error:", err); }
    }
    let pdfBuffer: Buffer | undefined;
    if (wantQuote && quoteNum) {
      try { pdfBuffer = await generateQuotePdf(payload, quoteNum); } catch (err) { console.error("[booking-coupe-froid] quote pdf error:", err); }
    }
    await sendBookingEmails(payload, pdfBuffer);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[booking-coupe-froid] error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
