import Image from "next/image";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/config";
import { LANDING } from "@/lib/landing-granby";
import UrgenceCartes from "@/components/UrgenceCartes";

/**
 * Page de la campagne « Urgence de nuit ». Volontairement dépouillée :
 * quelqu'un qui cherche à 23 h ne lit pas de prix, de garantie ni d'avis.
 * Il veut savoir qu'on répond, et appeler. Tout mène au téléphone.
 */


function Telephone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.18 21 3 13.82 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
    </svg>
  );
}

function BoutonAppel({ cta, className = "" }: { cta: string; className?: string }) {
  return (
    <a
      href={PHONE_HREF}
      data-cta={cta}
      className={`inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-brand px-6 py-5 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-colors hover:bg-brand-dark active:scale-[0.99] sm:w-auto ${className}`}
    >
      <Telephone className="h-6 w-6 shrink-0" />
      <span className="whitespace-nowrap font-heading text-2xl uppercase tracking-wide tabular-nums">
        Appelez : {PHONE_DISPLAY}
      </span>
    </a>
  );
}

export default function UrgenceNuitPage() {
  return (
    <>
      {/* ── Barre du haut ── */}
      <div className="sticky top-0 z-40 bg-brand text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2 text-sm">
          <span className="truncate font-medium">Ouvert 24 h sur 24 · Je réponds</span>
          <a href={PHONE_HREF} data-cta="entete" className="shrink-0 whitespace-nowrap font-bold tabular-nums hover:underline">
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* ── HERO : on répond, appelez ── */}
      <section className="relative flex min-h-[calc(100svh-40px)] items-end overflow-hidden bg-neutral-950 md:min-h-[620px] md:items-center">
        {LANDING.photoHero && (
          <>
            <Image
              src={LANDING.photoHero}
              alt="Réparation de porte de garage en urgence, de nuit"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[70%_center]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/25 md:bg-gradient-to-r md:from-neutral-950/95 md:via-neutral-950/70 md:to-neutral-950/10"
            />
          </>
        )}

        <div className="relative mx-auto w-full max-w-5xl px-5 pb-12 pt-24 md:py-24">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" aria-hidden="true" />
              Je réponds maintenant
            </p>
            <h1 className="mt-5 font-heading text-[2.2rem] uppercase leading-[1.02] text-white sm:text-[3rem] md:text-[3.4rem]">
              Porte de garage bloquée? Je la répare cette nuit.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/85">
              Je réponds 24 h sur 24 et j’arrive avec les pièces dans le camion. Votre porte est réparée et fermée avant que vous retourniez vous coucher.
            </p>
            <div className="mt-9">
              <BoutonAppel cta="hero" />
            </div>
            <p className="mt-6 text-sm text-white/60">
              Granby, Bromont, Cowansville, Waterloo et {LANDING.rayonKm} km autour
            </p>
          </div>
        </div>
      </section>

      {/* ── Les urgences, en cartes illustrées : chaque carte appelle ── */}
      <UrgenceCartes />

      {/* ── Dernier appel ── */}
      <section className="bg-neutral-950 pb-28 md:pb-0">
        <div className="mx-auto max-w-3xl px-5 py-14 text-center">
          <p className="font-heading text-3xl uppercase text-white">Votre porte fermée ce soir</p>
          <p className="mt-3 text-white/70">Appelez maintenant, je suis là et je m’en occupe.</p>
          <div className="mt-8">
            <BoutonAppel cta="bas" />
          </div>
        </div>
      </section>

      {/* ── Barre d'appel collée en bas, sur cellulaire ── */}
      <div className="fixed inset-x-0 bottom-0 z-40 p-3 md:hidden">
        <BoutonAppel cta="barre-mobile" className="py-4" />
      </div>
    </>
  );
}
