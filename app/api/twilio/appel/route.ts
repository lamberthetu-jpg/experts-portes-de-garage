import { NextResponse } from "next/server";
import { enregistrerLead } from "@/lib/db";
import { formatTel, sourceDuNumero } from "@/lib/suivi";
import { signatureTwilioValide } from "@/lib/webhooks";

/** Seuls les statuts de fin portent la durée ; les autres (ringing…) sont ignorés. */
const FIN = new Set(["completed", "busy", "no-answer", "failed", "canceled"]);

/**
 * « Status callback » des lignes Twilio : à la fin de chaque appel entrant,
 * le client (numéro de l'appelant) entre au CRM avec la provenance de la
 * ligne composée et la durée de l'appel (lead_events, 60 s+ = appel qualifié).
 * Le routage de l'appel vers Lambert ne passe pas par ici.
 */
export async function POST(req: Request) {
  const params = Object.fromEntries(
    [...(await req.formData()).entries()].map(([k, v]) => [k, String(v)])
  );
  if (!signatureTwilioValide(process.env.TWILIO_AUTH_TOKEN ?? "", req.url, params, req.headers.get("x-twilio-signature"))) {
    return NextResponse.json({ error: "Signature invalide" }, { status: 403 });
  }

  if (params.Direction !== "inbound" || !FIN.has(params.CallStatus) || !params.CallSid) {
    return new NextResponse(null, { status: 204 });
  }

  try {
    await enregistrerLead(
      { telephone: params.From ?? "" },
      { source: sourceDuNumero(params.To ?? ""), tracking_number: formatTel(params.To ?? "") },
      {
        type: "appel",
        ref_externe: params.CallSid,
        tracking_number: formatTel(params.To ?? ""),
        duree_s: Number.parseInt(params.CallDuration ?? "0", 10) || 0,
      }
    );
  } catch (err) {
    // 500 : Twilio ne réessaie pas les status callbacks, mais l'erreur paraît dans sa console (Debugger).
    console.error("[twilio/appel] supabase:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
  return new NextResponse(null, { status: 204 });
}
