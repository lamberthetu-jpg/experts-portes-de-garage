import { LANDING } from "@/lib/landing-granby";

/**
 * Les 3 vrais avis de la fiche Google (lib/landing-granby.ts), avec le lien
 * vers la fiche. Un seul bloc pour tout le site : pages de pub, accueil et
 * pages de services. Masqué tant qu'il n'y a pas de vrais avis.
 */
export default function AvisGoogle() {
  if (LANDING.avis.length === 0) return null;

  return (
    <section className="border-y border-gray-100 bg-white">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <h2 className="font-heading text-3xl uppercase sm:text-4xl">Ce que mes clients en disent</h2>
        <p className="mt-2 text-gray-600">Avis laissés sur ma fiche Google.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {LANDING.avis.slice(0, 3).map((a, i) => (
            <blockquote
              key={i}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_8px_24px_-20px_rgba(0,0,0,0.35)]"
            >
              <p className="text-lg leading-none tracking-[0.15em] text-[#F5B400]" aria-label={`${a.etoiles} étoiles sur 5`}>
                {"★".repeat(a.etoiles)}
                <span className="text-gray-200">{"★".repeat(5 - a.etoiles)}</span>
              </p>
              <p className="mt-3 flex-1 leading-relaxed text-gray-700">«&nbsp;{a.texte}&nbsp;»</p>
              <footer className="mt-4 text-sm font-semibold text-gray-500">
                {a.prenom}
                {a.ville && <>, {a.ville}</>}
              </footer>
            </blockquote>
          ))}
        </div>
        {LANDING.lienAvisGoogle && (
          <a
            href={LANDING.lienAvisGoogle}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm font-semibold text-brand underline underline-offset-2"
          >
            Voir tous les avis sur Google
          </a>
        )}
      </div>
    </section>
  );
}
