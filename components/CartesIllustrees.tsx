import { PHONE_HREF } from "@/lib/config";

/**
 * Section sombre de cartes illustrées (problème + réponse, toute la carte
 * appelle). Les illustrations sont dessinées en HTML/SVG avec les petites
 * pièces exportées ici, pour garder le même style d'une page à l'autre.
 */

export const ROUGE = "#e5484d";

export function Alerte({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex h-11 w-11 items-center justify-center rounded-full border-2 bg-[#3a1614] ${className}`}
      style={{ borderColor: ROUGE }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill={ROUGE}>
        <path d="M12 2 1 21h22L12 2Zm1 15h-2v-2h2v2Zm0-4h-2V9h2v4Z" />
      </svg>
    </span>
  );
}

export function Puce({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg border bg-[#2a1715] px-3 py-1.5 text-xs font-medium text-[#f0a3a0] ${className}`}
      style={{ borderColor: `${ROUGE}80` }}
    >
      {children}
    </span>
  );
}

/** Porte de garage vue de face : panneaux horizontaux. */
export function Porte({ className = "", panneaux = 4 }: { className?: string; panneaux?: number }) {
  return (
    <div className={`flex flex-col gap-1.5 rounded-md border border-white/10 bg-[#2b2521] p-2 ${className}`}>
      {Array.from({ length: panneaux }).map((_, i) => (
        <div key={i} className="h-5 rounded-sm bg-[#3a322d]" />
      ))}
    </div>
  );
}

/** Petite fenêtre de notification, comme sur un téléphone. */
export function Notification({
  titre,
  texte,
  etat,
  className = "",
}: {
  titre: string;
  texte?: string;
  etat: string;
  className?: string;
}) {
  return (
    <div className={`w-52 rounded-xl border border-white/10 bg-[#241f1c] p-3 shadow-xl ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white/85">{titre}</p>
        <Alerte className="h-8 w-8" />
      </div>
      {texte && <p className="mt-2 text-xs leading-relaxed text-white/50">{texte}</p>}
      <div className="mt-3 rounded-lg border px-2 py-1.5 text-[11px] text-[#f0a3a0]" style={{ borderColor: `${ROUGE}80` }}>
        {etat}
      </div>
    </div>
  );
}

export type CarteIllustree = {
  titre: string;
  texte: string;
  Ill: () => React.ReactNode;
};

export default function CartesIllustrees({
  titre,
  sousTitre = "Touchez votre problème pour m’appeler tout de suite.",
  cartes,
  note,
}: {
  titre: string;
  sousTitre?: string;
  cartes: CarteIllustree[];
  /** Encadré sous les cartes (ex. sécurité). */
  note?: { etiquette: string; texte: string };
}) {
  return (
    <section className="bg-[#120e0c]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <h2 className="font-heading text-3xl uppercase text-white sm:text-4xl">{titre}</h2>
        <p className="mt-2 text-white/55">{sousTitre}</p>

        <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cartes.map(({ titre: t, texte, Ill }) => (
            <li key={t}>
              <a
                href={PHONE_HREF}
                data-cta="probleme"
                className="group relative flex h-[380px] flex-col overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#1b1613] transition-colors hover:border-white/15"
              >
                <div className="relative flex-1">
                  <Ill />
                </div>
                <div className="flex items-end justify-between gap-4 px-6 pb-6">
                  <div>
                    <p className="text-2xl font-semibold leading-tight tracking-tight text-white">{t}</p>
                    <p className="mt-2 text-sm leading-snug text-white/60">{texte}</p>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors group-hover:bg-brand">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.18 21 3 13.82 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                    </svg>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {note && (
          <p className="mt-10 rounded-2xl border-l-4 border-brand bg-white/[0.04] p-4 text-sm leading-relaxed text-white/75">
            <strong className="text-white">{note.etiquette}</strong> {note.texte}
          </p>
        )}
      </div>
    </section>
  );
}
