import Image from "next/image";
import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF, EMAIL, OWNER_NAME } from "@/lib/config";
import RappelForm from "@/components/RappelForm";
import FaqAccordion from "@/components/FaqAccordion";

/**
 * Test A/B — version B de la page d'urgence. Hypothèse : une page plus courte, à la
 * première personne, avec le visage de Lambert, la promesse et les prix en haut, et un
 * rappel en 2 champs (sans recherche d'adresse) convertit mieux que la version A.
 * Composant serveur, aucune animation : tout est lisible avant le JavaScript.
 * Mêmes prix et mêmes engagements que la page A — rien de neuf n'est promis ici.
 */

const prix = [
  { titre: "Frais minimum", detail: "Une petite affaire que je règle sur place en quelques minutes.", montant: "125 $" },
  { titre: "Taux horaire", detail: "Pour tout le reste. Les pièces sont en sus et je vous donne le prix avant de commencer.", montant: "145 $/h" },
  { titre: "Sortie d’urgence", detail: "Je laisse tout tomber pour me rendre chez vous tout de suite. Comprend la première heure sur place, ensuite 145 $/h. Si votre porte peut attendre à demain, c’est le taux horaire normal.", montant: "350 $" },
];

const problemes = [
  "Porte bloquée ou coincée",
  "Ressort cassé",
  "Câble brisé ou déraillé",
  "Ouvre-porte ou moteur en panne",
  "Télécommande ou capteur",
  "Porte bruyante ou qui vibre",
];

const faq = [
  { q: "Ça coûte combien?", a: "Les prix sont affichés sur cette page : 125 $ minimum, 145 $/h pour le reste, pièces en sus. Je vous donne toujours le prix avant de commencer." },
  { q: "Vous venez le jour même?", a: "Pour une urgence, oui : je laisse tout tomber et je me rends chez vous (sortie d’urgence : 350 $ pour la première heure sur place, ensuite 145 $/h). Si votre porte peut attendre à demain, vous payez le taux horaire normal." },
  { q: "Et si vous ne pouvez pas la réparer?", a: "Vous ne payez rien. C’est aussi simple que ça." },
];

function PhoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.18 21 3 13.82 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
    </svg>
  );
}

export default function DepannagePage() {
  return (
    <>
      {/* ── Barre du haut, compacte (remplace l'en-tête du site sur cette page) ── */}
      <div className="bg-[#1a1a1a]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5">
          <Link href="/" className="shrink-0" aria-label="Experts Portes de Garage — accueil">
            <Image src="/images/logo-experts-detoure.png" alt="Experts Portes de Garage" width={120} height={40} className="h-9 w-auto" priority />
          </Link>
          <a href={PHONE_HREF} data-cta="entete" className="flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-bold text-white">
            <PhoneIcon className="h-4 w-4" /> {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* ── 1. HERO : qui, quoi, promesse, appel ── */}
      <section className="relative overflow-hidden bg-[#1a1a1a]">
        <Image src="/images/hero-urgence-nuit.webp" alt="" fill priority sizes="100vw" className="object-cover object-right opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/85" />
        <div className="relative mx-auto max-w-3xl px-4 pb-10 pt-8 text-center md:pt-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand">Granby et les environs</p>
          <h1 className="font-heading text-3xl uppercase leading-tight text-white md:text-5xl">
            Porte de garage brisée? <span className="text-brand">Appelez-moi.</span>
          </h1>

          <div className="mx-auto mt-6 flex max-w-md items-center gap-4 rounded-2xl bg-white/10 p-3 text-left ring-1 ring-white/15">
            <Image src="/images/lambert.webp" alt={`${OWNER_NAME}, technicien`} width={64} height={64} className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-brand" />
            <p className="text-sm leading-snug text-white/90">
              <span className="block font-bold text-white">{OWNER_NAME}</span>
              C’est moi qui réponds, et c’est moi qui viens chez vous.
            </p>
          </div>

          <a
            href={PHONE_HREF}
            data-cta="hero"
            className="mt-6 inline-flex w-full max-w-md items-center justify-center gap-3 rounded-xl bg-brand px-6 py-4 font-heading text-xl uppercase tracking-wide text-white shadow-lg shadow-brand/30 hover:bg-brand-dark"
          >
            <PhoneIcon /> {PHONE_DISPLAY}
          </a>
          <a href="#rappel" className="mt-3 block text-sm font-semibold text-white/80 underline underline-offset-4">
            Pas le temps de parler? Je vous rappelle.
          </a>

          <p className="mx-auto mt-6 max-w-md rounded-xl border border-brand/60 bg-brand/10 px-4 py-3 text-sm font-bold text-white">
            Si je ne suis pas capable de réparer votre porte, vous ne payez rien.
          </p>
        </div>
      </section>

      {/* ── 2. PRIX, tout de suite ── */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-5 text-center font-heading text-2xl uppercase text-[#1a1a1a]">Mes prix, sans surprise</h2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200">
            {prix.map((p) => (
              <div key={p.titre} className="flex items-start justify-between gap-4 px-5 py-4">
                <div>
                  <p className="font-bold text-[#1a1a1a]">{p.titre}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">{p.detail}</p>
                </div>
                <p className="whitespace-nowrap font-heading text-2xl text-brand">{p.montant}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. RAPPEL en 2 champs (pas de recherche d'adresse) ── */}
      <section id="rappel" className="scroll-mt-4 bg-[#f5f5f5] py-10">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="mb-2 text-center font-heading text-2xl uppercase text-[#1a1a1a]">Je vous rappelle</h2>
          <p className="mb-5 text-center text-sm text-gray-500">Votre nom et votre numéro, c’est tout ce qu’il me faut.</p>
          <RappelForm source="depannage" />
        </div>
      </section>

      {/* ── 4. CE QUE JE RÉPARE ── */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-5 text-center font-heading text-2xl uppercase text-[#1a1a1a]">Ce que je répare</h2>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {problemes.map((p) => (
              <li key={p} className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-[#1a1a1a]">
                <span className="h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 5. FAQ ── */}
      <section className="bg-[#f5f5f5] py-10">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-6 text-center font-heading text-2xl uppercase text-[#1a1a1a]">Questions fréquentes</h2>
          <FaqAccordion items={faq} />
          <p className="mt-6 text-center text-sm text-gray-500">
            Vous préférez écrire? <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a>
          </p>
        </div>
      </section>

      {/* ── Barre d'appel mobile (identique à la version A) ── */}
      <div className="h-28 md:hidden" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 md:hidden">
        <div className="px-4 pb-[calc(env(safe-area-inset-bottom)+0.85rem)] pt-3">
          <a
            href={PHONE_HREF}
            data-cta="barre_mobile"
            className="pointer-events-auto flex items-center gap-3 rounded-full bg-brand py-3 pl-3 pr-6 shadow-2xl shadow-black/40 ring-1 ring-white/20 transition-transform duration-150 active:scale-[0.97]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
              <PhoneIcon />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Appelez maintenant</span>
              <span className="block font-heading text-xl uppercase tracking-wide text-white">{PHONE_DISPLAY}</span>
            </span>
          </a>
        </div>
      </div>
      <style>{`@media (max-width: 767px){ .epg-chat { margin-bottom: 5.75rem; } }`}</style>
    </>
  );
}
