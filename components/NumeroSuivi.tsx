"use client";

import { useEffect } from "react";

/** « 438-808-9604 », « 438 808-9604 », « (438) 808-9604 », « 4388089604 »… */
const TEXTE_438 = /\(?438\)?[\s. -]?808[\s. -]?9604/g;

function remplacer(racine: Node, affiche: string) {
  const href = `tel:${affiche.replace(/\D/g, "")}`;
  const marcheur = document.createTreeWalker(racine, NodeFilter.SHOW_TEXT);
  const aChanger: Text[] = [];
  for (let n = marcheur.nextNode(); n; n = marcheur.nextNode()) {
    if (TEXTE_438.test((n as Text).data)) aChanger.push(n as Text);
    TEXTE_438.lastIndex = 0;
  }
  for (const t of aChanger) t.data = t.data.replace(TEXTE_438, affiche);
  const liens = (racine instanceof Element || racine instanceof Document ? racine : document).querySelectorAll<HTMLAnchorElement>('a[href^="tel:"], a[href^="sms:"]');
  for (const a of liens) {
    const h = a.getAttribute("href") ?? "";
    if (h.replace(/\D/g, "").endsWith("4388089604")) a.setAttribute("href", h.startsWith("sms:") ? `sms:${href.slice(4)}` : href);
  }
}

declare global {
  interface Window {
    egLigne?: "google" | "meta" | "organic";
  }
}

/**
 * Montre la ligne de la provenance du visiteur (lib/suivi.ts) à la place du
 * 438 écrit dans les pages. Rien ne change quand la ligne est le 438.
 */
export default function NumeroSuivi({ numeros }: { numeros: Record<"google" | "meta" | "organic", string> }) {
  useEffect(() => {
    const affiche = numeros[window.egLigne ?? "organic"];
    if (affiche.replace(/\D/g, "") === "4388089604") return;
    remplacer(document.body, affiche);
    let attente: number | null = null;
    const obs = new MutationObserver(() => {
      if (attente !== null) return;
      attente = window.requestAnimationFrame(() => {
        attente = null;
        remplacer(document.body, affiche);
      });
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => obs.disconnect();
  }, [numeros]);
  return null;
}
