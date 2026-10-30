import { createHmac, timingSafeEqual } from "node:crypto";

function egal(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/**
 * En-tête X-Twilio-Signature : HMAC-SHA1 (jeton du compte) de l'URL exacte
 * appelée par Twilio suivie des paramètres POST triés, clé puis valeur, en base64.
 */
export function signatureTwilioValide(jeton: string, url: string, params: Record<string, string>, signature: string | null): boolean {
  if (!jeton || !signature) return false;
  const donnees = url + Object.keys(params).sort().map((k) => k + params[k]).join("");
  return egal(createHmac("sha1", jeton).update(donnees, "utf8").digest("base64"), signature);
}

/** En-tête X-Hub-Signature-256 de Meta : « sha256= » + HMAC-SHA256 (clé secrète de l'app) du corps brut. */
export function signatureMetaValide(secret: string, corps: string, signature: string | null): boolean {
  if (!secret || !signature) return false;
  return egal(`sha256=${createHmac("sha256", secret).update(corps, "utf8").digest("hex")}`, signature);
}
