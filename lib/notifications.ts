import { Resend } from "resend";
import { PHONE_DISPLAY, PHONE_HREF, EMAIL } from "@/lib/config";

// ── Types ──────────────────────────────────────────────────────────────────

export interface BaseBookingPayload {
  nom: string;
  telephone: string;
  courriel: string;
  adresse: string;
  ville: string;
  codePostal: string;
}

export interface GeneralBookingPayload extends BaseBookingPayload {
  serviceType: string;
}

export interface WeatherSealBookingPayload extends BaseBookingPayload {
  serviceType: "Remplacement de coupe-froid";
  seals: string[];
  condition: string;
  notes: string;
  measurements: Record<string, string>;
  color: string;
  quoteNum?: string;
}

export type BookingPayload = GeneralBookingPayload | WeatherSealBookingPayload;

// ── Constants ─────────────────────────────────────────────────────────────

const SEAL_LABELS: Record<string, string> = {
  bas: "Joint de bas de porte",
  lateraux: "Joints latéraux et de tête",
  reteneur: "Reteneur du bas",
  inconnu: "Inspection complète",
};

const CONDITION_LABELS: Record<string, string> = {
  craquele: "Craquelé ou durci",
  decolle: "Décollé ou arraché",
  infiltration: "Infiltrations d'air ou d'eau",
  insectes: "Insectes ou nuisibles",
  autre: "Autre / Je ne sais pas",
};

const PRICE_PER_FOOT: Record<string, number> = {
  bas: 5,
  lateraux: 7,
  reteneur: 10,
};

// ── Helpers ───────────────────────────────────────────────────────────────

function calcTotal(seals: string[], measurements: Record<string, string>): number {
  return seals
    .filter((id) => id !== "inconnu")
    .reduce((sum, id) => {
      const ft = parseFloat(measurements[id] || "0") || 0;
      return sum + ft * (PRICE_PER_FOOT[id] || 0);
    }, 0);
}

// ── Email HTML builders ───────────────────────────────────────────────────

const baseStyle = `font-family: Arial, sans-serif; color: #1a1a1a;`;

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding: 6px 12px 6px 0; font-size: 13px; color: #666; white-space: nowrap; vertical-align: top;">${label}</td>
      <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #1a1a1a;">${value}</td>
    </tr>`;
}

function section(title: string, rows: string): string {
  return `
    <div style="margin-bottom: 24px;">
      <p style="margin: 0 0 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #DC2626;">${title}</p>
      <table style="border-collapse: collapse; width: 100%;">${rows}</table>
    </div>`;
}

function isWeatherSealPayload(data: BookingPayload): data is WeatherSealBookingPayload {
  return "seals" in data && Array.isArray((data as WeatherSealBookingPayload).seals);
}

export function buildOwnerEmailHtml(data: BookingPayload): string {
  const ws = isWeatherSealPayload(data) ? data : null;
  const total = ws ? calcTotal(ws.seals, ws.measurements) : 0;

  const appointmentRows = row("Service :", data.serviceType);

  const clientRows =
    row("Nom :", data.nom) +
    row("Téléphone :", `<a href="tel:${data.telephone}" style="color: #DC2626;">${data.telephone}</a>`) +
    row("Courriel :", `<a href="mailto:${data.courriel}" style="color: #DC2626;">${data.courriel}</a>`);

  const addressRows =
    row("Adresse :", data.adresse) +
    row("Ville :", `${data.ville}, QC`) +
    row("Code postal :", data.codePostal);

  let sealSection = "";
  if (ws) {
    const sealNames = ws.seals.map((s) => SEAL_LABELS[s] || s).join(", ");
    const conditionLabel = CONDITION_LABELS[ws.condition] || ws.condition;
    let sealRows = row("Joints :", sealNames) + row("Condition :", conditionLabel);
    if (ws.color) sealRows += row("Couleur :", ws.color.charAt(0).toUpperCase() + ws.color.slice(1));
    const measurableSeals = ws.seals.filter((s) => s !== "inconnu");
    if (measurableSeals.length > 0) {
      const mesuresText = measurableSeals
        .filter((s) => ws.measurements[s])
        .map((s) => `${SEAL_LABELS[s]}: ${ws.measurements[s]} pi`)
        .join("<br>");
      if (mesuresText) sealRows += row("Mesures :", mesuresText);
    }
    if (total > 0) sealRows += row("Estimation :", `<strong style="color: #DC2626; font-size: 15px;">${total.toFixed(2)}$</strong>`);
    if (ws.notes) sealRows += row("Notes :", ws.notes);
    sealSection = section("Détails du service", sealRows);
  }

  return `
    <div style="${baseStyle} max-width: 600px; margin: 0 auto;">
      <div style="background: #DC2626; padding: 24px 28px; border-radius: 8px 8px 0 0;">
        <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 1px;">Experts Portes de Garage</p>
        <h1 style="margin: 6px 0 0; font-size: 22px; color: #fff;">Nouvelle demande de rendez-vous</h1>
      </div>
      <div style="background: #fff; padding: 28px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <div style="background: #fef2f2; border: 2px solid #DC2626; border-radius: 10px; padding: 14px 18px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 14px; font-weight: 700; color: #DC2626;">📞 Contactez le client pour planifier le rendez-vous.</p>
        </div>
        ${section("Demande", appointmentRows)}
        ${section("Client", clientRows)}
        ${section("Adresse de service", addressRows)}
        ${sealSection}
        <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 20px 0;">
        <p style="margin: 0; font-size: 12px; color: #9ca3af; text-align: center;">
          Experts Portes de Garage · ${PHONE_DISPLAY} · ${EMAIL}
        </p>
      </div>
    </div>`;
}

export function buildClientEmailHtml(data: BookingPayload, pdfAttached?: boolean): string {
  const prenom = data.nom.trim().split(/\s+/)[0];

  let priceSection = "";
  if (isWeatherSealPayload(data)) {
    const ws = data;
    const hasCustomColor = ws.seals.includes("lateraux") && ws.color && ws.color !== "noir" && ws.color !== "blanc";
    const measurableSeals = ws.seals.filter((id) => id !== "inconnu" && ws.measurements[id]);
    const subtotal = calcTotal(ws.seals, ws.measurements);
    const tps = subtotal * 0.05;
    const tvq = subtotal * 0.09975;
    const total = subtotal + tps + tvq;
    if (hasCustomColor) {
      priceSection = `
        <div style="margin: 24px 0; background: #f9fafb; border-radius: 8px; padding: 16px 20px;">
          <p style="margin: 0 0 6px; font-size: 13px; font-weight: 700; color: #DC2626; text-transform: uppercase; letter-spacing: 0.5px;">💰 Estimation</p>
          <p style="margin: 0; font-size: 14px; color: #6b7280;">Le prix des joints latéraux dépend de la couleur choisie — notre technicien vous confirmera le montant exact lors du rendez-vous.</p>
        </div>`;
    } else if (subtotal > 0) {
      const rows = measurableSeals.map((id) => {
        const ft = parseFloat(ws.measurements[id] || "0") || 0;
        const lineTotal = ft * (PRICE_PER_FOOT[id] || 0);
        return `<tr>
          <td style="padding: 8px 0; font-size: 14px; color: #1a1a1a; border-bottom: 1px solid #f3f4f6;">${SEAL_LABELS[id]}</td>
          <td style="padding: 8px 0; font-size: 14px; color: #6b7280; text-align: center; border-bottom: 1px solid #f3f4f6;">${ft} pi</td>
          <td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #1a1a1a; text-align: right; border-bottom: 1px solid #f3f4f6;">${lineTotal.toFixed(2)} $</td>
        </tr>`;
      }).join("");
      priceSection = `
        <div style="margin: 24px 0;">
          <p style="margin: 0 0 12px; font-size: 13px; font-weight: 700; color: #DC2626; text-transform: uppercase; letter-spacing: 0.5px;">💰 Votre estimation</p>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f9fafb;">
                <th style="padding: 8px 0; font-size: 11px; color: #6b7280; text-align: left; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Description</th>
                <th style="padding: 8px 0; font-size: 11px; color: #6b7280; text-align: center; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Mesure</th>
                <th style="padding: 8px 0; font-size: 11px; color: #6b7280; text-align: right; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Montant</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
            <tr><td style="padding: 4px 0; font-size: 13px; color: #6b7280;">Sous-total</td><td style="padding: 4px 0; font-size: 13px; text-align: right; color: #1a1a1a;">${subtotal.toFixed(2)} $</td></tr>
            <tr><td style="padding: 4px 0; font-size: 13px; color: #6b7280;">TPS (5%)</td><td style="padding: 4px 0; font-size: 13px; text-align: right; color: #1a1a1a;">${tps.toFixed(2)} $</td></tr>
            <tr><td style="padding: 4px 0; font-size: 13px; color: #6b7280;">TVQ (9,975%)</td><td style="padding: 4px 0; font-size: 13px; text-align: right; color: #1a1a1a;">${tvq.toFixed(2)} $</td></tr>
            <tr style="border-top: 2px solid #DC2626;">
              <td style="padding: 10px 0 4px; font-size: 15px; font-weight: 700; color: #1a1a1a;">Total (taxes incluses)</td>
              <td style="padding: 10px 0 4px; font-size: 18px; font-weight: 700; color: #DC2626; text-align: right;">${total.toFixed(2)} $</td>
            </tr>
            ${pdfAttached ? `
            <tr style="background: #f9fafb; border-radius: 8px;">
              <td colspan="3" style="padding: 12px 0 0;">
                <div style="background: #f9fafb; border-radius: 8px; padding: 12px 16px;">
                  <p style="margin: 0 0 4px; font-size: 13px; font-weight: 700; color: #1a1a1a;">💳 Payer en avance par virement Interac</p>
                  <p style="margin: 0 0 2px; font-size: 13px; color: #1a1a1a;">Envoyez <strong>${total.toFixed(2)} $</strong> à : <strong style="color: #DC2626;">${EMAIL}</strong></p>
                  <p style="margin: 0; font-size: 11px; color: #9ca3af;">Votre numéro de soumission se trouve sur le PDF ci-joint.</p>
                </div>
              </td>
            </tr>` : ""}
          </table>
        </div>`;
    }
  }

  return `
    <div style="${baseStyle} max-width: 600px; margin: 0 auto;">
      <div style="background: #DC2626; padding: 24px 28px; border-radius: 8px 8px 0 0;">
        <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 1px;">Experts Portes de Garage</p>
        <h1 style="margin: 6px 0 0; font-size: 22px; color: #fff;">Bonjour ${prenom}, votre demande est reçue!</h1>
      </div>
      <div style="background: #fff; padding: 28px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="font-size: 15px; line-height: 1.7; color: #1a1a1a;">
          Merci d'avoir choisi <strong>Experts Portes de Garage</strong>. Nous avons bien reçu votre demande —
          <strong>nous vous contacterons sous peu pour planifier le rendez-vous</strong> à un moment qui vous convient.
          Des centaines de clients nous font confiance chaque année — nous avons hâte de vous offrir le même service de qualité.
        </p>

        <div style="background: #fef2f2; border: 2px solid #DC2626; border-radius: 10px; padding: 20px 24px; margin: 20px 0;">
          <p style="margin: 0 0 12px; font-size: 13px; font-weight: 700; color: #DC2626; text-transform: uppercase; letter-spacing: 0.5px;">📋 Votre demande</p>
          <p style="margin: 6px 0; font-size: 15px;"><strong>Service :</strong> ${data.serviceType}</p>
          <p style="margin: 6px 0; font-size: 15px;"><strong>Adresse :</strong> ${data.adresse}, ${data.ville}</p>
          <p style="margin: 12px 0 0; font-size: 14px; color: #4b5563;">📞 <strong>Prochaine étape :</strong> nous vous appellerons pour fixer la date et l'heure de la visite.</p>
        </div>

        ${priceSection}

        <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">
          Des questions? Appelez-nous au <a href="${PHONE_HREF}" style="color: #DC2626; font-weight: 700;">${PHONE_DISPLAY}</a> ou répondez à ce courriel — nous sommes là pour vous.
        </p>
        <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 20px 0;">
        <p style="margin: 0; font-size: 12px; color: #9ca3af; text-align: center;">
          Experts Portes de Garage · ${PHONE_DISPLAY} · ${EMAIL}
        </p>
      </div>
    </div>`;
}

export function buildReviewEmailHtml(nom: string): string {
  const prenom = nom.trim().split(/\s+/)[0];
  return `
    <div style="${baseStyle} max-width: 600px; margin: 0 auto;">
      <div style="background: #DC2626; padding: 24px 28px; border-radius: 8px 8px 0 0;">
        <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 1px;">Experts Portes de Garage</p>
        <h1 style="margin: 6px 0 0; font-size: 22px; color: #fff;">Merci ${prenom}! 🙏</h1>
      </div>
      <div style="background: #fff; padding: 28px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="font-size: 15px; line-height: 1.7; color: #1a1a1a;">
          C'était un plaisir de vous aider! Nous espérons que vous êtes satisfait du service rendu par notre équipe.
        </p>
        <p style="font-size: 15px; line-height: 1.7; color: #1a1a1a;">
          Si vous avez une minute, votre avis Google aide énormément d'autres clients à nous trouver et fait une vraie différence pour notre petite entreprise. 😊
        </p>
        <div style="text-align: center; margin: 28px 0;">
          <a href="https://g.page/r/CT-AI6_v4mdPEAI/review"
             style="display: inline-block; background: #DC2626; color: #fff; font-weight: 700; padding: 16px 36px; border-radius: 10px; text-decoration: none; font-size: 16px; letter-spacing: 0.3px;">
            ⭐ Laisser un avis Google
          </a>
        </div>
        <p style="font-size: 13px; color: #9ca3af; text-align: center; line-height: 1.6;">
          Ça ne prend que 30 secondes et ça nous aide vraiment!
        </p>
        <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 20px 0;">
        <p style="margin: 0; font-size: 12px; color: #9ca3af; text-align: center;">
          Experts Portes de Garage · ${PHONE_DISPLAY} · ${EMAIL}
        </p>
      </div>
    </div>`;
}

// Resend v6 ne lance pas d'erreur en cas d'échec d'envoi — il retourne { data, error }.
// Sans cette vérification, un envoi refusé passe silencieusement pour un succès.
async function sendOrThrow(resend: Resend, payload: Parameters<typeof resend.emails.send>[0]): Promise<void> {
  const { error } = await resend.emails.send(payload);
  if (error) {
    throw new Error(`Resend (${error.name}): ${error.message}`);
  }
}

export async function sendReviewEmail(nom: string, courriel: string): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const prenom = nom.trim().split(/\s+/)[0];
  await sendOrThrow(resend, {
    from: `Experts Portes de Garage <${process.env.RESEND_FROM_EMAIL!}>`,
    to: [courriel],
    subject: `Merci ${prenom}! Un petit avis Google? ⭐`,
    html: buildReviewEmailHtml(nom),
  });
}

// ── Resend ────────────────────────────────────────────────────────────────

/** `avertirLambert` : faux quand Vitryne a déjà pris la demande (lib/vitryne.ts) — le client reçoit quand même son courriel. */
export async function sendBookingEmails(data: BookingPayload, pdfBuffer?: Buffer, avertirLambert = true): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const from = `Experts Portes de Garage <${process.env.RESEND_FROM_EMAIL!}>`;
  const clientEmail: Parameters<typeof resend.emails.send>[0] = {
    from,
    to: [data.courriel],
    subject: `Bonjour ${data.nom.trim().split(/\s+/)[0]}, nous avons bien reçu votre demande — Experts Portes de Garage`,
    html: buildClientEmailHtml(data, !!pdfBuffer),
  };
  if (pdfBuffer) {
    const quoteNum = isWeatherSealPayload(data) ? data.quoteNum : undefined;
    clientEmail.attachments = [{
      filename: `soumission_coupe_froid_${quoteNum ?? "epg"}.pdf`,
      content: pdfBuffer,
    }];
  }
  await Promise.all([
    avertirLambert &&
      sendOrThrow(resend, {
        from,
        to: [process.env.OWNER_EMAIL!],
        subject: `Nouvelle demande — ${data.serviceType} — ${data.nom}`,
        html: buildOwnerEmailHtml(data),
      }),
    sendOrThrow(resend, clientEmail),
  ]);
}
