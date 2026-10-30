/**
 * PROVENANCE DES CLIENTS (oct. 2026).
 *
 * D'où vient chaque client : google (annonce Google), meta (Facebook ou
 * Instagram) ou organic (le reste : recherche, bouche-à-oreille, autocollant).
 *
 * 1. Au premier passage, le site note la provenance dans un témoin du site
 *    lui-même (eg_ft, 90 jours) : source, utm, gclid/fbclid, page d'arrivée.
 *    On ne l'écrase jamais : c'est le premier contact qui compte.
 * 2. Le numéro affiché suit la provenance (témoin eg_n, 90 jours) : un
 *    visiteur venu d'une annonce Google voit la ligne Google, un visiteur de
 *    Facebook/Instagram la ligne Meta, les autres la ligne organique. Chaque
 *    ligne est un numéro Twilio de Vitryne : Vitryne sait par quelle ligne
 *    le client a appelé (lignes_suivi).
 * 3. Les formulaires n'ont rien à envoyer : le serveur lit eg_ft dans la
 *    requête et le passe à Vitryne avec la demande (lib/vitryne.ts).
 *
 * Les numéros viennent des variables TWILIO_NUMBER_GOOGLE / _META / _ORGANIC
 * (format +14509152421). Le robot de Google ne passe jamais par une annonce :
 * il voit la ligne organique, le même numéro que la fiche Google.
 */

type Ligne = "google" | "meta" | "organic";

/** Les 10 chiffres d'un numéro nord-américain, ou "" si ce n'en est pas un. */
function chiffresTel(tel: string): string {
  const c = tel.replace(/\D/g, "");
  return c.length >= 10 ? c.slice(-10) : "";
}

/** « 4505551234 » ou « +14505551234 » → « 450-555-1234 ». */
export function formatTel(tel: string): string {
  const c = chiffresTel(tel);
  return c ? `${c.slice(0, 3)}-${c.slice(3, 6)}-${c.slice(6)}` : tel;
}

/** Les trois lignes, format affiché. Serveur seulement (lit l'environnement). */
export function numerosSuivi(): Record<Ligne, string> {
  const organic = formatTel(process.env.TWILIO_NUMBER_ORGANIC || "4388089604");
  return {
    google: formatTel(process.env.TWILIO_NUMBER_GOOGLE || "4509152421"),
    // ponytail: sans 3e numéro, Meta partage la ligne organique ; acheter le numéro et poser la variable suffit.
    meta: process.env.TWILIO_NUMBER_META ? formatTel(process.env.TWILIO_NUMBER_META) : organic,
    organic,
  };
}

/**
 * Script en ligne, exécuté avant React (layout, beforeInteractive) : lit
 * l'URL, pose les témoins et met la ligne à afficher dans window.egLigne.
 * ES5 exprès, il tourne tel quel dans le navigateur.
 */
export const SCRIPT_CAPTURE = `(function(){
var MAX='; Max-Age=7776000; Path=/; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'');
function lire(n){var m=document.cookie.match(new RegExp('(?:^|; )'+n+'=([^;]*)'));return m?decodeURIComponent(m[1]):''}
function ecrire(n,v){document.cookie=n+'='+encodeURIComponent(v)+MAX}
try{
var q=new URLSearchParams(location.search);
function p(k){return (q.get(k)||'').slice(0,200)}
var us=p('utm_source').toLowerCase(),um=p('utm_medium').toLowerCase(),ref='';
try{ref=document.referrer?new URL(document.referrer).hostname:''}catch(e){}
var gclid=p('gclid')||p('gbraid')||p('wbraid');
var s=(gclid||(us==='google'&&/^(cpc|ppc|paid)/.test(um)))?'google'
:(p('fbclid')||/^(facebook|fb|instagram|ig|meta)$/.test(us)||/(^|\\.)(facebook|instagram)\\.com$/.test(ref))?'meta'
:'organic';
// Visiteurs d'annonce d'avant oct. 2026 (localStorage eg_src). Retirer après le 2027-01-20.
if(!lire('eg_n')){var v=JSON.parse(localStorage.getItem('eg_src')||'null');if(v&&v.s==='google_ads'&&Date.now()-v.t<7776e6)ecrire('eg_n','google')}
if(!lire('eg_ft'))ecrire('eg_ft',JSON.stringify({s:s,us:us,um:um,uc:p('utm_campaign'),gclid:gclid,fbclid:p('fbclid'),lp:location.pathname,t:new Date().toISOString()}));
if(s!=='organic')ecrire('eg_n',s);
var n=lire('eg_n');
window.egLigne=(n==='google'||n==='meta')?n:'organic';
}catch(e){window.egLigne=window.egLigne||'organic'}
})();`;

/** Le premier contact, tel que Vitryne le reçoit (/api/demandes/site). */
export type Provenance = {
  source: Ligne;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  gclid: string | null;
  fbclid: string | null;
  landing_page: string | null;
  first_seen_at: string | null;
};

/**
 * Lit le témoin eg_ft dans l'en-tête Cookie d'une requête. Le témoin vient du
 * navigateur : tout est revalidé ici (liste fermée, longueurs bornées).
 * Sans témoin (bloqué, autre appareil) ou source inconnue : null, Vitryne
 * classe alors la demande « site web ».
 */
export function provenanceDuCookie(cookieHeader: string | null): Provenance | null {
  const m = (cookieHeader ?? "").match(/(?:^|;\s*)eg_ft=([^;]*)/);
  if (!m) return null;
  try {
    const v = JSON.parse(decodeURIComponent(m[1])) as Record<string, unknown>;
    const t = (k: string, max = 200) => (typeof v[k] === "string" && v[k] ? (v[k] as string).slice(0, max) : null);
    const s = t("s");
    const date = t("t", 40);
    if (s !== "google" && s !== "meta" && s !== "organic") return null;
    return {
      source: s,
      utm_source: t("us"),
      utm_medium: t("um"),
      utm_campaign: t("uc"),
      gclid: t("gclid"),
      fbclid: t("fbclid"),
      landing_page: t("lp", 300),
      first_seen_at: date && !Number.isNaN(Date.parse(date)) ? new Date(date).toISOString() : null,
    };
  } catch {
    return null;
  }
}
