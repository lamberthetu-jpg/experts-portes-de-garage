// Lancer : npm test (node --test, Node 22.18+).
import { test } from "node:test";
import assert from "node:assert/strict";
import { envoyerAVitryne } from "./vitryne.ts";

const req = (cookie = "") => new Request("https://www.expertsportesdegarage.ca/api/rappel", { method: "POST", headers: { cookie } });
const DEMANDE = { nom: "Louis", telephone: "450 555-1234" };

function fauxFetch(reponse: () => Promise<Response>) {
  const appels: { url: string; init: RequestInit }[] = [];
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    appels.push({ url, init });
    return reponse();
  }) as typeof fetch;
  return appels;
}

test("sans jeton : false, aucun appel (le courriel part)", async () => {
  delete process.env.VITRYNE_JETON_SITE;
  const appels = fauxFetch(async () => new Response("{}"));
  assert.equal(await envoyerAVitryne(req(), DEMANDE), false);
  assert.equal(appels.length, 0);
});

test("Vitryne accepte : true, jeton et premier contact transmis", async () => {
  process.env.VITRYNE_JETON_SITE = "a".repeat(48);
  const appels = fauxFetch(async () => new Response('{"ok":true}', { status: 200 }));
  const ft = encodeURIComponent(JSON.stringify({ s: "google", gclid: "g1", lp: "/reparation-porte-garage-granby", t: "2026-10-30T12:00:00Z" }));
  assert.equal(await envoyerAVitryne(req(`eg_ft=${ft}`), DEMANDE), true);
  assert.equal(appels[0].url, "https://vitryne.ca/api/demandes/site");
  assert.equal((appels[0].init.headers as Record<string, string>)["x-jeton"], "a".repeat(48));
  const corps = JSON.parse(String(appels[0].init.body));
  assert.equal(corps.provenance.source, "google");
  assert.equal(corps.provenance.gclid, "g1");
  assert.match(corps.id_source, /^[0-9a-f-]{36}$/);
});

test("Vitryne refuse (401/500) : false, le courriel part", async () => {
  process.env.VITRYNE_JETON_SITE = "a".repeat(48);
  fauxFetch(async () => new Response("Unauthorized", { status: 401 }));
  assert.equal(await envoyerAVitryne(req(), DEMANDE), false);
});

test("Vitryne injoignable : false, le courriel part", async () => {
  process.env.VITRYNE_JETON_SITE = "a".repeat(48);
  fauxFetch(async () => { throw new TypeError("fetch failed"); });
  assert.equal(await envoyerAVitryne(req(), DEMANDE), false);
});
