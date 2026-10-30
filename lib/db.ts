import { getSupabase } from "./supabase";
import type { GeneralBookingPayload, WeatherSealBookingPayload } from "./notifications";
import { chiffresTel, formatTel, type Attribution } from "./suivi";

const PRICE_PER_FOOT: Record<string, number> = {
  bas: 5,
  lateraux: 7,
  reteneur: 10,
};

function calcSubtotal(seals: string[], measurements: Record<string, string>): number {
  return seals
    .filter((id) => id !== "inconnu")
    .reduce((sum, id) => {
      const ft = parseFloat(measurements[id] || "0") || 0;
      return sum + ft * (PRICE_PER_FOOT[id] || 0);
    }, 0);
}

async function upsertClient(data: {
  nom: string;
  telephone: string;
  courriel: string;
  adresse: string;
  ville: string;
  codePostal: string;
}, attribution: Attribution | null): Promise<string> {
  const { data: client, error } = await getSupabase()
    .from("clients")
    .upsert(
      {
        nom: data.nom,
        telephone: data.telephone,
        courriel: data.courriel,
        adresse: data.adresse,
        ville: data.ville,
        code_postal: data.codePostal,
        ...attribution,
      },
      { onConflict: "telephone" }
    )
    .select("id")
    .single();

  if (error) throw error;
  return client.id;
}

export async function saveBookingToDb(data: GeneralBookingPayload, attribution: Attribution | null): Promise<void> {
  const clientId = await upsertClient(data, attribution);

  // La date/heure n'est plus choisie par le client : le rendez-vous est planifié
  // par téléphone après la demande.
  const { error } = await getSupabase().from("rendez_vous").insert({
    client_id: clientId,
    service: data.serviceType,
    statut: "en_attente",
  });

  if (error) throw error;
}

export async function saveWeatherSealBookingToDb(data: WeatherSealBookingPayload, attribution: Attribution | null): Promise<void> {
  const clientId = await upsertClient(data, attribution);

  const { data: rdv, error: rdvError } = await getSupabase()
    .from("rendez_vous")
    .insert({
      client_id: clientId,
      service: data.serviceType,
      statut: "en_attente",
      numero_soumission: data.quoteNum ?? null,
    })
    .select("id")
    .single();

  if (rdvError) throw rdvError;

  const measurableSeals = data.seals.filter(
    (id) => id !== "inconnu" && data.measurements[id]
  );

  if (measurableSeals.length > 0 && data.quoteNum) {
    const sous_total = calcSubtotal(data.seals, data.measurements);
    const tps = sous_total * 0.05;
    const tvq = sous_total * 0.09975;
    const total = sous_total + tps + tvq;

    const items = measurableSeals.map((id) => ({
      id,
      mesure: parseFloat(data.measurements[id] || "0") || 0,
      prix_pied: PRICE_PER_FOOT[id] || 0,
      total: (parseFloat(data.measurements[id] || "0") || 0) * (PRICE_PER_FOOT[id] || 0),
    }));

    const { error: soumError } = await getSupabase().from("soumissions").insert({
      rendez_vous_id: rdv.id,
      items,
      sous_total,
      tps,
      tvq,
      total,
      numero: data.quoteNum,
    });

    if (soumError) throw soumError;
  }
}

export interface LeadEvent {
  type: "appel" | "meta_formulaire";
  /** CallSid ou leadgen_id : un webhook rejoué n'ajoute rien. */
  ref_externe: string;
  tracking_number?: string | null;
  duree_s?: number | null;
}

/**
 * Lead entré par un appel Twilio ou un formulaire Meta. Le numéro arrive en
 * +14505551234 alors que les formulaires du site gardent ce que le client a
 * tapé : on cherche donc la fiche par ses 10 chiffres. Fiche existante : on
 * ne touche qu'aux champs vides et la provenance du premier contact est
 * protégée par le déclencheur garder_premiere_source (supabase/schema.sql).
 */
export async function enregistrerLead(
  fiche: { telephone: string; nom?: string | null; courriel?: string | null; adresse?: string | null; ville?: string | null; code_postal?: string | null },
  attribution: Partial<Attribution> & { source: Attribution["source"]; tracking_number?: string | null },
  evenement: LeadEvent
): Promise<string | null> {
  const chiffres = chiffresTel(fiche.telephone);
  if (!chiffres) return null;
  const sb = getSupabase();

  const { data: existant, error: e1 } = await sb
    .from("clients")
    .select("id, nom, courriel, adresse, ville, code_postal")
    .eq("telephone_chiffres", chiffres)
    .order("created_at")
    .limit(1)
    .maybeSingle();
  if (e1) throw e1;

  let clientId: string;
  if (existant) {
    clientId = existant.id;
    const vides = Object.fromEntries(
      (["nom", "courriel", "adresse", "ville", "code_postal"] as const)
        .filter((k) => fiche[k] && !existant[k])
        .map((k) => [k, fiche[k]])
    );
    const { error } = await sb.from("clients").update({ ...vides, ...attribution }).eq("id", clientId);
    if (error) throw error;
  } else {
    const { data, error } = await sb
      .from("clients")
      .insert({ ...fiche, nom: fiche.nom || `Appel ${formatTel(chiffres)}`, telephone: formatTel(chiffres), ...attribution })
      .select("id")
      .single();
    if (error) throw error;
    clientId = data.id;
  }

  const { error } = await sb
    .from("lead_events")
    .upsert({ client_id: clientId, source: attribution.source, ...evenement }, { onConflict: "ref_externe", ignoreDuplicates: true });
  if (error) throw error;
  return clientId;
}
