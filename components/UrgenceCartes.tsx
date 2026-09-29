import { PHONE_HREF } from "@/lib/config";

/**
 * Les 6 urgences de nuit, en cartes sombres illustrées. Chaque illustration
 * est dessinée en HTML/SVG (pas d'image à charger) : de petits éléments
 * d'interface ou de mécanique qui montrent le problème, en rouge.
 * Toute la carte appelle.
 */

const ROUGE = "#e5484d";

function Alerte({ className = "" }: { className?: string }) {
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

function Puce({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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
function Porte({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 rounded-md border border-white/10 bg-[#2b2521] p-2 ${className}`}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-5 rounded-sm bg-[#3a322d]" />
      ))}
    </div>
  );
}

function IllAuto() {
  return (
    <div className="relative h-full w-full">
      <Porte className="absolute left-1/2 top-8 w-52 -translate-x-1/2" />
      <div className="absolute left-6 top-4 -rotate-6 rounded-xl border border-white/10 bg-[#241f1c] px-4 py-3 shadow-xl">
        <p className="text-[11px] uppercase tracking-wider text-white/40">Demain</p>
        <p className="font-semibold text-white/85">6 h 30 · Départ</p>
      </div>
      <Alerte className="absolute right-8 top-6" />
      <Puce className="absolute bottom-5 left-1/2 -translate-x-1/2 rotate-2">Porte bloquée · l’auto est dedans</Puce>
    </div>
  );
}

function IllOuverte() {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 220 150" className="absolute left-1/2 top-6 w-56 -translate-x-1/2" aria-hidden="true">
        <path d="M20 70 110 20l90 50v70H20Z" fill="#2b2521" stroke="#ffffff1a" />
        <rect x="55" y="80" width="110" height="60" rx="3" fill="#0e0b0a" />
        <rect x="55" y="80" width="110" height="12" rx="2" fill="#3a322d" />
        <rect x="68" y="100" width="40" height="22" rx="3" fill={ROUGE} opacity="0.25" />
        <circle cx="190" cy="18" r="10" fill="#f5e6c8" opacity="0.8" />
        <circle cx="195" cy="14" r="9" fill="#141110" />
      </svg>
      <div className="absolute bottom-5 left-1/2 w-60 -translate-x-1/2 rounded-xl border bg-[#241f1c] p-3" style={{ borderColor: `${ROUGE}80` }}>
        <div className="flex items-center gap-3">
          <Alerte className="h-8 w-8" />
          <div>
            <p className="text-sm font-semibold text-white/85">Porte de garage</p>
            <p className="text-xs text-[#f0a3a0]">Ouverte depuis 23 h 14</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IllRessort() {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 240 90" className="absolute left-1/2 top-12 w-64 -translate-x-1/2" aria-hidden="true">
        <rect x="0" y="42" width="240" height="6" rx="3" fill="#3a322d" />
        {Array.from({ length: 9 }).map((_, i) => (
          <ellipse key={`g${i}`} cx={22 + i * 9} cy="45" rx="5" ry="22" fill="none" stroke="#8a7d74" strokeWidth="3" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <ellipse key={`d${i}`} cx={146 + i * 9} cy="45" rx="5" ry="22" fill="none" stroke="#8a7d74" strokeWidth="3" />
        ))}
        <path d="M108 20 118 38 110 50 122 70" fill="none" stroke={ROUGE} strokeWidth="3" strokeLinecap="round" />
        <path d="M126 22 132 36 126 48 134 66" fill="none" stroke={ROUGE} strokeWidth="3" strokeLinecap="round" />
      </svg>
      <Alerte className="absolute right-8 top-5" />
      <Puce className="absolute bottom-6 left-1/2 -translate-x-1/2 -rotate-2">Ressort de torsion · cassé</Puce>
    </div>
  );
}

function IllCable() {
  return (
    <div className="relative h-full w-full">
      <Porte className="absolute left-1/2 top-9 w-48 -translate-x-1/2 rotate-[-7deg]" />
      <svg viewBox="0 0 60 150" className="absolute right-10 top-4 h-40" aria-hidden="true">
        <path d="M30 0v70" stroke="#8a7d74" strokeWidth="3" />
        <path d="M30 70l-8 14M30 70l3 16M30 70l10 12" stroke={ROUGE} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <Puce className="absolute bottom-6 left-1/2 -translate-x-1/2 rotate-1">Câble brisé · porte croche</Puce>
    </div>
  );
}

function IllRail() {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 240 130" className="absolute left-1/2 top-6 w-64 -translate-x-1/2" aria-hidden="true">
        <path d="M20 120V50a30 30 0 0 1 30-30h180" fill="none" stroke="#3a322d" strokeWidth="14" strokeLinecap="round" />
        <path d="M20 120V50a30 30 0 0 1 30-30h180" fill="none" stroke="#1a1512" strokeWidth="6" strokeLinecap="round" />
        <circle cx="20" cy="100" r="9" fill="#8a7d74" />
        <circle cx="20" cy="66" r="9" fill="#8a7d74" />
        <circle cx="120" cy="20" r="9" fill="#8a7d74" />
        <circle cx="86" cy="52" r="10" fill="#3a1614" stroke={ROUGE} strokeWidth="3" />
        <path d="M60 32 78 46" stroke={ROUGE} strokeWidth="2.5" strokeDasharray="4 4" />
      </svg>
      <Alerte className="absolute right-8 top-16" />
      <Puce className="absolute bottom-6 left-1/2 -translate-x-1/2 rotate-2">Roulette sortie du rail</Puce>
    </div>
  );
}

function IllOuvrePorte() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-8 top-8 flex w-20 -rotate-12 flex-col items-center gap-2 rounded-2xl border border-white/10 bg-[#2b2521] py-4 shadow-xl">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-6 w-6 rounded-full bg-[#3a322d]" />
        ))}
      </div>
      <div className="absolute right-6 top-10 w-52 rounded-xl border border-white/10 bg-[#241f1c] p-3 shadow-xl">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-white/85">Ouvre-porte</p>
          <Alerte className="h-8 w-8" />
        </div>
        <p className="mt-2 text-xs leading-relaxed text-white/50">La porte ne répond pas à la télécommande ni au bouton mural.</p>
        <div className="mt-3 rounded-lg border px-2 py-1.5 text-[11px] text-[#f0a3a0]" style={{ borderColor: `${ROUGE}80` }}>
          Aucune réponse
        </div>
      </div>
    </div>
  );
}

const CARTES = [
  { probleme: "L’auto est prise", solution: "Je débloque la porte, vous partez demain matin.", Ill: IllAuto },
  { probleme: "La porte reste ouverte", solution: "Je la referme, la maison est en sécurité pour la nuit.", Ill: IllOuverte },
  { probleme: "Ressort cassé", solution: "Je le remplace sur place, j’ai les ressorts dans le camion.", Ill: IllRessort },
  { probleme: "Câble brisé", solution: "Je remets la porte droite et je change le câble.", Ill: IllCable },
  { probleme: "Porte sortie du rail", solution: "Je la remets en place sans l’abîmer.", Ill: IllRail },
  { probleme: "L’ouvre-porte ne répond plus", solution: "Je trouve la panne et je remets la porte en marche.", Ill: IllOuvrePorte },
];

export default function UrgenceCartes() {
  return (
    <section className="bg-[#120e0c]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <h2 className="font-heading text-3xl uppercase text-white sm:text-4xl">Je règle ça cette nuit</h2>
        <p className="mt-2 text-white/55">Touchez votre urgence pour m’appeler.</p>

        <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARTES.map(({ probleme, solution, Ill }) => (
            <li key={probleme}>
              <a
                href={PHONE_HREF}
                data-cta="urgence"
                className="group relative flex h-[380px] flex-col overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#1b1613] transition-colors hover:border-white/15"
              >
                <div className="relative flex-1">
                  <Ill />
                </div>
                <div className="flex items-end justify-between gap-4 px-6 pb-6">
                  <div>
                    <p className="text-2xl font-semibold leading-tight tracking-tight text-white">{probleme}</p>
                    <p className="mt-2 text-sm leading-snug text-white/60">{solution}</p>
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

        <p className="mt-10 rounded-2xl border-l-4 border-brand bg-white/[0.04] p-4 text-sm leading-relaxed text-white/75">
          <strong className="text-white">En attendant :</strong> ne forcez pas la porte et ne passez pas dessous. Un
          ressort cassé est sous très forte tension.
        </p>
      </div>
    </section>
  );
}
