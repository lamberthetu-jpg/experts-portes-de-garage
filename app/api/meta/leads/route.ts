import { NextResponse } from "next/server";
import { enregistrerLead } from "@/lib/db";
import { signatureMetaValide } from "@/lib/webhooks";

const GRAPH = "https://graph.facebook.com/v23.0";

/** Vérification de l'abonnement (une fois, quand on branche le webhook dans l'app Meta). */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const jeton = process.env.META_VERIFY_TOKEN;
  if (jeton && q.get("hub.mode") === "subscribe" && q.get("hub.verify_token") === jeton) {
    return new NextResponse(q.get("hub.challenge") ?? "", { status: 200 });
  }
  return new NextResponse("Interdit", { status: 403 });
}

interface ChampMeta { name: string; values?: string[] }
interface LeadMeta { field_data?: ChampMeta[]; created_time?: string; campaign_name?: string }

/**
 * Formulaires instantanés Meta (Lead Ads, ex. la mise au point à 39,95 $).
 * Meta n'envoie que l'identifiant du lead : on va chercher ses champs dans
 * l'API Graph avec le jeton de la Page, puis il entre au CRM avec source=meta.
 * Réponse 500 en cas d'échec : Meta réessaie, et le leadgen_id (unique dans
 * lead_events) évite les doublons.
 */
export async function POST(req: Request) {
  const corps = await req.text();
  if (!signatureMetaValide(process.env.META_APP_SECRET ?? "", corps, req.headers.get("x-hub-signature-256"))) {
    return NextResponse.json({ error: "Signature invalide" }, { status: 403 });
  }

  const jeton = process.env.META_PAGE_ACCESS_TOKEN;
  if (!jeton) {
    console.error("[meta/leads] META_PAGE_ACCESS_TOKEN manquant");
    return NextResponse.json({ error: "Configuration incomplète" }, { status: 500 });
  }

  const ids: string[] = [];
  try {
    const p = JSON.parse(corps) as { entry?: { changes?: { field?: string; value?: { leadgen_id?: string } }[] }[] };
    for (const e of p.entry ?? []) for (const c of e.changes ?? []) {
      if (c.field === "leadgen" && c.value?.leadgen_id && /^\d+$/.test(c.value.leadgen_id)) ids.push(c.value.leadgen_id);
    }
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  try {
    for (const id of ids) {
      const res = await fetch(`${GRAPH}/${id}?fields=field_data,created_time,campaign_name`, {
        headers: { Authorization: `Bearer ${jeton}` },
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Graph ${res.status} pour le lead ${id}`);
      const lead = (await res.json()) as LeadMeta;
      const champ = (...noms: string[]) => {
        for (const n of noms) {
          const v = lead.field_data?.find((f) => f.name === n)?.values?.[0]?.trim();
          if (v) return v.slice(0, 200);
        }
        return null;
      };
      const prenomNom = [champ("first_name"), champ("last_name")].filter(Boolean).join(" ");
      await enregistrerLead(
        {
          telephone: champ("phone_number") ?? "",
          nom: champ("full_name") ?? (prenomNom || null),
          courriel: champ("email"),
          adresse: champ("street_address"),
          ville: champ("city"),
          code_postal: champ("post_code", "zip_code"),
        },
        {
          source: "meta",
          utm_source: "facebook",
          utm_medium: "formulaire_meta",
          utm_campaign: lead.campaign_name?.slice(0, 200) ?? null,
          first_seen_at: Date.parse(lead.created_time ?? "") ? new Date(lead.created_time ?? "").toISOString() : null,
        },
        { type: "meta_formulaire", ref_externe: id }
      );
    }
  } catch (err) {
    console.error("[meta/leads]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
