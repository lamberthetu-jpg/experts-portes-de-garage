/**
 * SUIVI DES APPELS GOOGLE ADS (21 oct. 2026).
 *
 * Un visiteur arrivé par une annonce Google (gclid, gbraid, wbraid ou
 * utm google/cpc) voit le numéro des annonces, (450) 915-2421, au lieu du
 * 438, pendant 90 jours. Ce numéro sonne chez Lambert comme le 438, mais
 * Vitryne sait que le client vient de Google Ads.
 *
 * Tout le monde d'autre, y compris le robot de Google qui lit le site pour
 * le référencement, voit le 438 : le même numéro que la fiche Google.
 */
export const PHONE_ANNONCES_DISPLAY = "450-915-2421";
export const PHONE_ANNONCES_HREF = "tel:4509152421";

const CLE = "eg_src";
const DUREE_MS = 90 * 86_400_000;

/** Le code tel quel, pour le script en ligne de la balise Google (avant React). */
export const SCRIPT_DETECTION = `(function(){try{var q=new URLSearchParams(location.search);if(q.get('gclid')||q.get('gbraid')||q.get('wbraid')||(q.get('utm_source')==='google'&&q.get('utm_medium')==='cpc')){localStorage.setItem('${CLE}',JSON.stringify({s:'google_ads',t:Date.now()}));return true}var v=JSON.parse(localStorage.getItem('${CLE}')||'null');return !!(v&&v.s==='google_ads'&&Date.now()-v.t<${DUREE_MS})}catch(e){return false}})()`;

/** Vrai si ce visiteur est arrivé par une annonce Google (dans les 90 derniers jours). */
export function vientDuneAnnonce(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const q = new URLSearchParams(window.location.search);
    if (q.get("gclid") || q.get("gbraid") || q.get("wbraid") || (q.get("utm_source") === "google" && q.get("utm_medium") === "cpc")) {
      window.localStorage.setItem(CLE, JSON.stringify({ s: "google_ads", t: Date.now() }));
      return true;
    }
    const v = JSON.parse(window.localStorage.getItem(CLE) || "null") as { s?: string; t?: number } | null;
    return Boolean(v && v.s === "google_ads" && typeof v.t === "number" && Date.now() - v.t < DUREE_MS);
  } catch {
    return false;
  }
}
