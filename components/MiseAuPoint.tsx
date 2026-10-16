import Image from "next/image";
import RappelForm from "@/components/RappelForm";
import AvisGoogle from "@/components/AvisGoogle";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/config";
import { LANDING } from "@/lib/landing-granby";

/**
 * Page /mise-au-point : l'offre d'hiver à 39,95 $ (Facebook, QR des
 * autocollants, bannière de l'accueil). Mêmes promesses que les pubs :
 * tout inclus, garantie 30 jours, prix donné avant toute réparation,
 * 20 rendez-vous par semaine. Rien d'autre.
 */
export const OFFRE = {
  prix: "39,95 $",
  rayonKm: 35,
  placesParSemaine: 20,
  garantieJours: 30,
};

const INCLUS = [
  "Lubrification des ressorts, roulettes, charnières et roulements",
  "Serrage de toute la quincaillerie (vis et boulons)",
  "Inspection des ressorts, des câbles, des roulettes et des poulies",
  "Test d’équilibre de la porte",
  "Test des capteurs et de l’arrêt de sécurité de l’ouvre-porte",
  "Réglage de l’ouvre-porte (force et course)",
  "Déplacement, partout dans la zone",
];

const PAS_INCLUS = [
  "Remplacement de pièces (ressorts, câbles, roulettes, charnières, coupe-froid)",
  "Remise à niveau de la porte et ajustement de la tension des ressorts",
];

const SIGNES = [
  { titre: "Elle grince ou cogne", texte: "Des roulettes et des charnières sèches ou usées. Ça tire sur le reste." },
  { titre: "Elle force en descendant", texte: "Les ressorts perdent leur tension bien avant de casser." },
  { titre: "Elle remonte croche", texte: "Un câble qui s’use d’un côté, ou une porte mal balancée." },
  { titre: "L’ouvre-porte peine", texte: "Il compense une porte trop lourde. Il s’use plus vite." },
];

export default function MiseAuPoint() {
  return (
    <div className="pb-20 md:pb-0">
      {/* ── Barre du haut ──────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-brand text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2 text-sm">
          <span className="truncate font-medium">Mise au point de porte de garage · {OFFRE.prix}</span>
          <a href={PHONE_HREF} data-cta="entete" className="shrink-0 whitespace-nowrap font-bold tabular-nums hover:underline">
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[calc(100svh-40px)] items-end overflow-hidden bg-neutral-950 md:min-h-[620px] md:items-center">
        <Image
          src="/images/mise-au-point-lubrification.webp"
          alt="Lambert lubrifie les charnières d’une porte de garage"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_30%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/20 md:bg-gradient-to-r md:from-neutral-950/95 md:via-neutral-950/70 md:to-neutral-950/10"
        />

        <div className="relative mx-auto w-full max-w-5xl px-5 pb-12 pt-24 md:py-24">
          <div className="max-w-2xl">
            <p className="inline-block rounded-md bg-white px-3 py-1 font-heading text-sm uppercase tracking-wide text-brand">
              Offre d’hiver
            </p>
            <h1 className="mt-4 font-heading text-[2.1rem] uppercase leading-[1.02] tracking-[0.01em] text-white sm:text-[2.9rem] md:text-[3.3rem]">
              Mise au point de porte de garage : {OFFRE.prix} tout inclus
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
              Je lubrifie, je resserre, j’inspecte les ressorts et les câbles, pis je règle l’ouvre-porte.
              Le déplacement est inclus. Si une pièce est usée, je vous la montre avec le prix. Vous décidez.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#reserver"
                data-cta="hero_reserver"
                className="inline-flex w-full items-center justify-center rounded-xl bg-brand px-7 py-4 font-heading text-lg uppercase tracking-wide text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-colors hover:bg-brand-dark sm:w-auto"
              >
                Réserver ma mise au point
              </a>
              <a
                href={PHONE_HREF}
                data-cta="hero"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-4 font-semibold text-white ring-1 ring-white/30 transition-colors hover:bg-white/20 sm:w-auto"
              >
                <PhoneIcon className="h-5 w-5" />
                <span className="tabular-nums">{PHONE_DISPLAY}</span>
              </a>
            </div>

            <p className="mt-8 flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-white/60">
              <span>Garantie {OFFRE.garantieJours} jours</span>
              <span aria-hidden className="text-white/30">·</span>
              <span>{OFFRE.placesParSemaine} rendez-vous par semaine</span>
              <span aria-hidden className="text-white/30">·</span>
              <span>Granby et {OFFRE.rayonKm} km autour</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Les 3 promesses ────────────────────────────────────────────── */}
      <section className="relative z-10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_24px_-18px_rgba(0,0,0,0.25)]">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 py-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-gray-200 sm:py-12">
          <Promesse titre={`${OFFRE.prix} tout inclus`} texte="Déplacement compris, partout dans la zone. Pas de frais cachés." />
          <Promesse titre={`Garantie ${OFFRE.garantieJours} jours`} texte="Si votre porte force ou grince encore, je reviens gratis." />
          <Promesse titre="Le prix avant" texte="Aucune réparation sans que vous ayez le prix et dit oui." />
        </div>
      </section>

      {/* ── Inclus / pas inclus ────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <h2 className="font-heading text-3xl uppercase sm:text-4xl">Ce que vous avez pour {OFFRE.prix}</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <ul className="space-y-3">
            {INCLUS.map((i) => (
              <li key={i} className="flex gap-3 text-gray-800">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="leading-relaxed">{i}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl bg-muted p-6">
            <p className="font-bold text-gray-900">Pas inclus, mais toujours avec le prix d’avance :</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-600">
              {PAS_INCLUS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Si je trouve quelque chose, je vous le montre sur place. Vous décidez si on le fait maintenant,
              plus tard, ou jamais.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pourquoi avant l'hiver ─────────────────────────────────────── */}
      <section className="bg-muted">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
          <h2 className="font-heading text-3xl uppercase sm:text-4xl">Une porte avertit avant de casser</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-gray-600">
            C’est au froid que les ressorts lâchent. Un petit ajustement aujourd’hui évite une grosse facture cet hiver.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {SIGNES.map((s) => (
              <div key={s.titre} className="rounded-2xl bg-white p-6">
                <p className="font-bold text-gray-900">{s.titre}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{s.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Qui vient chez vous ────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.3fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-200">
            <Image
              src="/images/mise-au-point-genoux.webp"
              alt="Lambert inspecte le bas d’une porte de garage"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-[65%_center]"
            />
          </div>
          <div>
            <h2 className="font-heading text-3xl uppercase sm:text-4xl">Moi, c’est Lambert</h2>
            <p className="mt-4 leading-relaxed text-gray-700">
              Je suis de Granby pis je travaille seul. C’est moi qui réponds au téléphone, et c’est moi qui viens chez vous.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Une mise au point pas chère qui finit en facture de 800 $, ça arrive. Pas avec moi : si une pièce est vraiment
              usée, je vous la montre et je vous donne le prix. Si tout est beau, vous avez payé {OFFRE.prix} pour passer
              l’hiver tranquille. C’est tout.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Comme je suis seul, je prends {OFFRE.placesParSemaine} mises au point par semaine. Quand c’est plein, c’est la semaine d’après.
            </p>
          </div>
        </div>
      </section>

      {/* ── Avis Google (vrais) ────────────────────────────────────────── */}
      <AvisGoogle />

      {/* ── Zone ───────────────────────────────────────────────────────── */}
      <section className="bg-muted">
        <div className="mx-auto max-w-5xl px-5 py-12">
          <h2 className="font-heading text-2xl uppercase sm:text-3xl">Zone desservie</h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            Granby et {OFFRE.rayonKm} km autour : {LANDING.villes.join(", ")}.
          </p>
          <p className="mt-3 text-gray-600">
            Pas certain si vous êtes dans la zone?{" "}
            <a href={PHONE_HREF} data-cta="zone" className="font-semibold text-brand underline underline-offset-2">
              Appelez, je vous le dis tout de suite.
            </a>
          </p>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
        <h2 className="font-heading text-3xl uppercase sm:text-4xl">Questions fréquentes</h2>
        <div className="mt-7 divide-y divide-gray-200 border-y border-gray-200">
          <Question q={`C’est vraiment ${OFFRE.prix} tout inclus?`}>
            Oui. Le déplacement est compris partout dans la zone. Il n’y a rien d’autre à payer, sauf si vous choisissez
            une réparation, et vous en aurez le prix avant.
          </Question>
          <Question q="Combien de temps ça prend?">Environ 30 à 45 minutes. Vous n’avez pas besoin de rester dans le garage.</Question>
          <Question q={`Qu’est-ce que la garantie de ${OFFRE.garantieJours} jours couvre?`}>
            Si votre porte force ou grince encore dans les {OFFRE.garantieJours} jours après la mise au point, je reviens
            la réajuster gratuitement. Ça ne couvre pas une pièce usée qui casse : ça, c’est une réparation, avec le prix
            donné avant.
          </Question>
          <Question q="Ma porte a un problème en ce moment, c’est quoi?">
            Si elle ne lève plus, si un câble est sorti ou si vous avez entendu un gros « bang », ce n’est pas une mise au
            point. Appelez-moi au {PHONE_DISPLAY}, je viens pour la réparation.
          </Question>
          <Question q="Vous faites le commercial?">Non, résidentiel seulement.</Question>
        </div>
      </section>

      {/* ── Réserver ───────────────────────────────────────────────────── */}
      <section id="reserver" className="scroll-mt-14 bg-muted">
        <div className="mx-auto max-w-xl px-5 py-16 sm:py-20">
          <h2 className="font-heading text-3xl uppercase sm:text-4xl">Réserver ma mise au point</h2>
          <p className="mt-2 mb-6 text-gray-600">Laissez votre nom et votre numéro. Je vous rappelle dans la journée pour fixer l’heure.</p>
          <RappelForm source="mise_au_point" />
        </div>
      </section>

      <footer className="bg-neutral-900 py-8 text-center text-sm text-white/60">
        <p className="font-semibold text-white/80">Experts Portes de Garage</p>
        <p className="mt-1">Granby, Québec · NEQ {LANDING.neq}</p>
        <p className="mt-1">
          <a href={PHONE_HREF} className="hover:text-white">{PHONE_DISPLAY}</a>
          {" · "}
          <a href="/politique-de-confidentialite" className="hover:text-white">Confidentialité</a>
        </p>
      </footer>

      <a
        href={PHONE_HREF}
        data-cta="barre_mobile"
        className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-3 bg-brand py-4 font-heading text-lg uppercase tracking-wide text-white shadow-[0_-4px_20px_rgba(0,0,0,0.25)] md:hidden"
      >
        <PhoneIcon className="h-5 w-5" />
        Appeler : {PHONE_DISPLAY}
      </a>
    </div>
  );
}

function Promesse({ titre, texte }: { titre: string; texte: string }) {
  return (
    <div className="sm:px-8 sm:first:pl-0 sm:last:pr-0">
      <p className="font-heading text-xl uppercase text-brand">{titre}</p>
      <p className="mt-1 text-sm leading-relaxed text-gray-600">{texte}</p>
    </div>
  );
}

function Question({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
        {q}
        <span className="shrink-0 text-brand transition-transform group-open:rotate-45">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </summary>
      <p className="mt-3 leading-relaxed text-gray-600">{children}</p>
    </details>
  );
}

function PhoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}
