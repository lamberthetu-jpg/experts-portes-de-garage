import { LANDING } from "@/lib/landing-granby";

/**
 * Tous les vrais avis de la fiche Google (lib/landing-granby.ts), qui
 * défilent en boucle, avec la note moyenne et le lien vers la fiche.
 * Un seul bloc pour tout le site : pages de pub, accueil et pages de
 * services. Masqué tant qu'il n'y a pas de vrais avis.
 *
 * La note est calculée à partir de la liste : garder la liste complète
 * et à jour pour qu'elle corresponde à celle affichée sur Google.
 */
export default function AvisGoogle() {
  const avis = LANDING.avis;
  if (avis.length === 0) return null;

  const moyenne = avis.reduce((t, a) => t + a.etoiles, 0) / avis.length;
  const note = moyenne.toFixed(1).replace(".", ",");

  return (
    <section className="overflow-hidden border-y border-gray-100 bg-white">
      <div className="mx-auto max-w-5xl px-5 pt-16 sm:pt-20">
        <h2 className="font-heading text-3xl uppercase sm:text-4xl">Ce que mes clients en disent</h2>
        <p className="mt-2 text-gray-600">
          <span className="font-semibold text-gray-900">{note}</span>{" "}
          <span className="text-[#F5B400]" aria-hidden="true">★</span> sur {avis.length} avis laissés sur ma fiche
          Google.
        </p>
      </div>

      {/* Liste doublée : l'animation glisse de la moitié pour boucler sans saut. */}
      <div className="mt-7 pb-2">
        <ul className="avis-defile flex w-max gap-4 px-5">
          {[...avis, ...avis].map((a, i) => (
            <li key={i} aria-hidden={i >= avis.length} className="w-72 shrink-0 sm:w-80">
              <blockquote className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_8px_24px_-20px_rgba(0,0,0,0.35)]">
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
            </li>
          ))}
        </ul>
      </div>

      {LANDING.lienAvisGoogle && (
        <div className="mx-auto max-w-5xl px-5 pb-16 sm:pb-20">
          <a
            href={LANDING.lienAvisGoogle}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm font-semibold text-brand underline underline-offset-2"
          >
            Voir tous les avis sur Google
          </a>
        </div>
      )}
    </section>
  );
}
