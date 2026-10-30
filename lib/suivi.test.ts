// Lancer : npm test (node --test, Node 22.18+).
import { test } from "node:test";
import assert from "node:assert/strict";
import { SCRIPT_CAPTURE, numerosSuivi, provenanceDuCookie } from "./suivi.ts";

/** Exécute le script de capture dans un faux navigateur, avec les témoins déjà présents. */
function visite(url: string, referrer = "", pots: Map<string, string> = new Map()) {
  const document = {
    referrer,
    get cookie() {
      return [...pots].map(([k, v]) => `${k}=${v}`).join("; ");
    },
    set cookie(c: string) {
      const [kv] = c.split(";");
      const i = kv.indexOf("=");
      pots.set(kv.slice(0, i), kv.slice(i + 1));
    },
  };
  const window: { egLigne?: string } = {};
  const localStorage = { getItem: () => null };
  new Function("location", "document", "localStorage", "window", SCRIPT_CAPTURE)(new URL(url), document, localStorage, window);
  const ft = JSON.parse(decodeURIComponent(pots.get("eg_ft") ?? "null"));
  return { ligne: window.egLigne, ft, pots, cookie: document.cookie };
}

const SITE = "https://www.expertsportesdegarage.ca";

test("gclid → google", () => {
  const v = visite(`${SITE}/reparation-urgente-de-porte-de-garage?gclid=abc123`);
  assert.equal(v.ligne, "google");
  assert.equal(v.ft.s, "google");
  assert.equal(v.ft.gclid, "abc123");
  assert.equal(v.ft.lp, "/reparation-urgente-de-porte-de-garage");
});

test("gbraid (iOS) → google", () => {
  assert.equal(visite(`${SITE}/?gbraid=xyz`).ligne, "google");
});

test("fbclid → meta", () => {
  const v = visite(`${SITE}/mise-au-point?fbclid=IwAR0`);
  assert.equal(v.ligne, "meta");
  assert.equal(v.ft.fbclid, "IwAR0");
});

test("utm : google/cpc → google, facebook/instagram → meta, autre → organic", () => {
  assert.equal(visite(`${SITE}/?utm_source=google&utm_medium=cpc&utm_campaign=granby`).ft.uc, "granby");
  assert.equal(visite(`${SITE}/?utm_source=google&utm_medium=cpc`).ligne, "google");
  assert.equal(visite(`${SITE}/?utm_source=google&utm_medium=organic`).ligne, "organic");
  assert.equal(visite(`${SITE}/?utm_source=facebook&utm_medium=paid`).ligne, "meta");
  assert.equal(visite(`${SITE}/?utm_source=ig`).ligne, "meta");
  assert.equal(visite(`${SITE}/mise-au-point?utm_source=autocollant&utm_medium=qr`).ft.s, "organic");
});

test("référent Facebook/Instagram sans paramètre → meta", () => {
  assert.equal(visite(`${SITE}/`, "https://l.instagram.com/").ligne, "meta");
  assert.equal(visite(`${SITE}/`, "https://www.google.com/").ligne, "organic");
});

test("rien → organic", () => {
  const v = visite(`${SITE}/`);
  assert.equal(v.ligne, "organic");
  assert.equal(v.ft.s, "organic");
});

test("le premier contact n'est jamais écrasé, la ligne suit la dernière annonce", () => {
  const pots = new Map<string, string>();
  visite(`${SITE}/`, "", pots);
  const v = visite(`${SITE}/?gclid=plus-tard`, "", pots);
  assert.equal(v.ft.s, "organic");
  assert.equal(v.ligne, "google");
  assert.equal(visite(`${SITE}/a-propos`, "", pots).ligne, "google");
});

test("provenanceDuCookie : relit le témoin, refuse le reste", () => {
  const { cookie } = visite(`${SITE}/reparation-porte-garage-granby?gclid=g1&utm_campaign=c`);
  const a = provenanceDuCookie(`autre=1; ${cookie}`);
  assert.equal(a?.source, "google");
  assert.equal(a?.gclid, "g1");
  assert.equal(a?.utm_campaign, "c");
  assert.equal(a?.fbclid, null);
  assert.equal(a?.landing_page, "/reparation-porte-garage-granby");
  assert.ok(a?.first_seen_at);
  assert.equal(provenanceDuCookie(`eg_ft=${encodeURIComponent('{"s":"admin"}')}`), null);
  assert.equal(provenanceDuCookie(`eg_ft=${encodeURIComponent('{"s":"meta","t":"pas une date"}')}`)?.first_seen_at, null);
  assert.equal(provenanceDuCookie("eg_ft=%7Bcass%C3%A9"), null);
  assert.equal(provenanceDuCookie(null), null);
});

test("numéros : Meta retombe sur l'organique tant que TWILIO_NUMBER_META est vide", () => {
  delete process.env.TWILIO_NUMBER_GOOGLE;
  delete process.env.TWILIO_NUMBER_ORGANIC;
  delete process.env.TWILIO_NUMBER_META;
  assert.deepEqual(numerosSuivi(), { google: "450-915-2421", meta: "438-808-9604", organic: "438-808-9604" });
  process.env.TWILIO_NUMBER_META = "+14505550199";
  assert.equal(numerosSuivi().meta, "450-555-0199");
  delete process.env.TWILIO_NUMBER_META;
});
