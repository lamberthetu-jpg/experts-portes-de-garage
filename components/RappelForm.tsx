"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { gtagConversion } from "@/lib/gtag";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/config";

/** `source` = page d'origine, reprise dans le courriel reçu et dans les stats (défaut : granby). */
export type SourceRappel = "granby" | "depannage" | "ressort" | "ouvre_porte";

export default function RappelForm({ source = "granby" }: { source?: SourceRappel }) {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [probleme, setProbleme] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [envoye, setEnvoye] = useState(false);
  const [erreur, setErreur] = useState("");

  async function soumettre(e: React.FormEvent) {
    e.preventDefault();
    if (!nom.trim() || !telephone.trim()) {
      setErreur("Il me faut au moins votre nom et votre numéro.");
      return;
    }
    setEnvoi(true);
    setErreur("");
    try {
      const res = await fetch("/api/rappel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, telephone, probleme, source }),
      });
      if (!res.ok) throw new Error();
      track("demande_rappel", { formulaire: source });
      gtagConversion("demande_rappel", { cta: `formulaire_${source}` });
      setEnvoye(true);
    } catch {
      setErreur(`L'envoi n'a pas fonctionné. Appelez-moi au ${PHONE_DISPLAY}.`);
    } finally {
      setEnvoi(false);
    }
  }

  if (envoye) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-black/5">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand/10">
          <svg className="h-8 w-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl uppercase text-brand">Message reçu</h3>
        <p className="mt-3 text-gray-600">
          Je vous rappelle au {telephone}. Si c’est pressant, appelez-moi tout de suite.
        </p>
        <a
          href={PHONE_HREF}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-bold text-white transition-colors hover:bg-brand-dark"
        >
          <PhoneIcon /> {PHONE_DISPLAY}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={soumettre} className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5 sm:p-8">
      <div className="space-y-4">
        <div>
          <label htmlFor="nom" className="mb-1.5 block text-sm font-semibold text-gray-700">
            Votre nom
          </label>
          <input
            id="nom"
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            autoComplete="name"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base outline-none transition-colors focus:border-brand"
            placeholder="Jean Tremblay"
          />
        </div>

        <div>
          <label htmlFor="tel" className="mb-1.5 block text-sm font-semibold text-gray-700">
            Votre téléphone
          </label>
          <input
            id="tel"
            type="tel"
            inputMode="tel"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            autoComplete="tel"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base outline-none transition-colors focus:border-brand"
            placeholder="450 555-1234"
          />
        </div>

        <div>
          <label htmlFor="probleme" className="mb-1.5 block text-sm font-semibold text-gray-700">
            Qu’est-ce qui se passe avec votre porte?
          </label>
          <textarea
            id="probleme"
            value={probleme}
            onChange={(e) => setProbleme(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-base outline-none transition-colors focus:border-brand"
            placeholder="Un gros bang ce matin et la porte ne lève plus."
          />
        </div>
      </div>

      {erreur && <p className="mt-4 text-sm font-medium text-brand">{erreur}</p>}

      <button
        type="submit"
        disabled={envoi}
        className="mt-5 w-full rounded-xl bg-brand px-6 py-4 font-heading text-lg uppercase tracking-wide text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
      >
        {envoi ? "Envoi en cours..." : "Envoyer — je vous rappelle"}
      </button>

      <p className="mt-4 text-center text-sm text-gray-500">
        Pour une urgence, appelez plutôt au{" "}
        <a href={PHONE_HREF} className="font-semibold text-brand underline underline-offset-2">
          {PHONE_DISPLAY}
        </a>
        , c’est plus rapide.
      </p>
    </form>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}
