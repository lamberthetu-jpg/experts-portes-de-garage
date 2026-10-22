"use client";

import { useEffect } from "react";
import { PHONE_ANNONCES_DISPLAY, PHONE_ANNONCES_HREF, vientDuneAnnonce } from "@/lib/suivi";

/** « 438-808-9604 », « 438 808-9604 », « (438) 808-9604 », « 4388089604 »… */
const TEXTE_438 = /\(?438\)?[\s. -]?808[\s. -]?9604/g;

function remplacer(racine: Node) {
  const marcheur = document.createTreeWalker(racine, NodeFilter.SHOW_TEXT);
  const aChanger: Text[] = [];
  for (let n = marcheur.nextNode(); n; n = marcheur.nextNode()) {
    if (TEXTE_438.test((n as Text).data)) aChanger.push(n as Text);
    TEXTE_438.lastIndex = 0;
  }
  for (const t of aChanger) t.data = t.data.replace(TEXTE_438, PHONE_ANNONCES_DISPLAY);
  const liens = (racine instanceof Element || racine instanceof Document ? racine : document).querySelectorAll<HTMLAnchorElement>('a[href^="tel:"], a[href^="sms:"]');
  for (const a of liens) {
    const href = a.getAttribute("href") ?? "";
    if (href.replace(/\D/g, "").endsWith("4388089604")) a.setAttribute("href", href.startsWith("sms:") ? `sms:${PHONE_ANNONCES_HREF.slice(4)}` : PHONE_ANNONCES_HREF);
  }
}

/**
 * Montre le numéro des annonces aux visiteurs venus d'une annonce Google
 * (lib/suivi.ts). Rien ne change pour les autres.
 */
export default function NumeroSuivi() {
  useEffect(() => {
    if (!vientDuneAnnonce()) return;
    remplacer(document.body);
    let attente: number | null = null;
    const obs = new MutationObserver(() => {
      if (attente !== null) return;
      attente = window.requestAnimationFrame(() => {
        attente = null;
        remplacer(document.body);
      });
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => obs.disconnect();
  }, []);
  return null;
}
