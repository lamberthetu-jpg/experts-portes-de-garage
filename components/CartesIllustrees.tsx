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


/** Étoiles du ciel de nuit : positions fixes en % (x, y, taille px, délai s). */
const ETOILES: [number, number, number, number][] = [
  [4, 8, 2, 0], [11, 22, 1, 1.2], [17, 6, 1.5, 2.1], [23, 31, 1, 0.6], [29, 12, 2, 1.8],
  [35, 4, 1, 2.6], [41, 26, 1.5, 0.3], [47, 9, 1, 1.5], [53, 18, 2, 2.9], [58, 3, 1, 0.9],
  [63, 28, 1, 2.2], [68, 11, 1.5, 0.1], [7, 40, 1, 1.9], [14, 55, 1.5, 0.7], [21, 47, 1, 2.4],
  [33, 62, 1, 1.1], [44, 44, 1.5, 2.7], [51, 70, 1, 0.4], [60, 52, 1, 1.6], [66, 66, 1.5, 2.3],
  [72, 38, 1, 0.8], [78, 58, 1, 2], [84, 46, 1.5, 1.3], [90, 64, 1, 0.2], [96, 36, 1, 2.5],
  [3, 78, 1, 1.4], [26, 84, 1.5, 0.5], [39, 90, 1, 2.8], [57, 86, 1, 1], [75, 80, 1.5, 1.7],
  [88, 92, 1, 0.9], [94, 74, 1, 2.1], [18, 94, 1, 1.6], [48, 96, 1.5, 0.3], [82, 22, 1, 2.6],
];

/** Fond de nuit : étoiles qui scintillent et lune qui éclaire le coin droit. */
function CielDeNuit() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Halo de lumière lunaire */}
      <div className="absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(190,210,255,0.18)_0%,rgba(150,175,235,0.07)_35%,transparent_68%)]" />
      {/* Lune */}
      <div className="absolute right-[8%] top-12 h-20 w-20 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fbf6e9_0%,#e8e1cf_55%,#c9c2b0_100%)] shadow-[0_0_60px_20px_rgba(220,230,255,0.25)] sm:h-24 sm:w-24">
        <span className="absolute left-[22%] top-[30%] h-3 w-3 rounded-full bg-[#cfc8b6]/70" />
        <span className="absolute left-[55%] top-[55%] h-4 w-4 rounded-full bg-[#cfc8b6]/60" />
        <span className="absolute left-[60%] top-[22%] h-2 w-2 rounded-full bg-[#cfc8b6]/60" />
      </div>
      {ETOILES.map(([x, y, t, d], i) => (
        <span
          key={i}
          className="etoile absolute rounded-full bg-white"
          style={{ left: `${x}%`, top: `${y}%`, width: t, height: t, animationDelay: `${d}s` }}
        />
      ))}
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
  nuit = false,
  fondBlanc = false,
}: {
  titre: string;
  sousTitre?: string;
  cartes: CarteIllustree[];
  /** Encadré sous les cartes (ex. sécurité). */
  note?: { etiquette: string; texte: string };
  /** Ambiance de nuit : ciel étoilé, lune et reflet lunaire sur les cartes. */
  nuit?: boolean;
  /** Section sur fond blanc (les cartes restent sombres). */
  fondBlanc?: boolean;
}) {
  return (
    <section
      className={
        nuit
          ? "relative overflow-hidden bg-[linear-gradient(180deg,#0a0f1f_0%,#0d1020_45%,#120e0c_100%)]"
          : fondBlanc
            ? "bg-white"
            : "bg-[#120e0c]"
      }
    >
      {nuit && <CielDeNuit />}
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <h2 className={`font-heading text-3xl uppercase sm:text-4xl ${fondBlanc ? "text-gray-900" : "text-white"}`}>{titre}</h2>
        <p className={`mt-2 ${fondBlanc ? "text-gray-600" : "text-white/55"}`}>{sousTitre}</p>

        {/* Cellulaire : les cartes glissent à l'horizontale (une par écran, la
            suivante dépasse un peu pour montrer qu'il y en a d'autres).
            Tablette et ordinateur : grille. */}
        <p className={`mt-4 text-sm sm:hidden ${fondBlanc ? "text-gray-400" : "text-white/40"}`} aria-hidden="true">Glissez pour voir les autres →</p>
        <ul className="-mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-9 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {cartes.map(({ titre: t, texte, Ill }) => (
            <li key={t} className="w-[85%] shrink-0 snap-start sm:w-auto">
              <a
                href={PHONE_HREF}
                data-cta="probleme"
                className={`group relative flex h-[380px] flex-col overflow-hidden rounded-[28px] border transition-colors ${
                  nuit
                    ? "border-[#c8d6ff]/[0.10] bg-[#16151c]/90 shadow-[0_20px_50px_-30px_rgba(120,150,255,0.35)] backdrop-blur-sm hover:border-[#c8d6ff]/25"
                    : "border-white/[0.06] bg-[#1b1613] hover:border-white/15"
                }`}
              >
                {nuit && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_85%_0%,rgba(200,215,255,0.10),transparent_60%)]"
                  />
                )}
                <div className="relative flex-1">
                  <Ill />
                </div>
                <div className="relative flex items-end justify-between gap-4 px-6 pb-6">
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
          <p
            className={`mt-10 rounded-2xl border-l-4 border-brand p-4 text-sm leading-relaxed ${
              fondBlanc ? "bg-brand/5 text-gray-800" : "bg-white/[0.04] text-white/75"
            }`}
          >
            <strong className={fondBlanc ? "text-gray-900" : "text-white"}>{note.etiquette}</strong> {note.texte}
          </p>
        )}
      </div>
    </section>
  );
}
