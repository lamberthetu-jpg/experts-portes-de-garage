import { Alerte, Porte, Puce, ROUGE } from "@/components/CartesIllustrees";

/**
 * Illustrations des 6 problèmes de ressorts et câbles (page de pub Ressorts),
 * dans le style des cartes sombres de CartesIllustrees.
 */

const GRIS = "#8a7d74";

/** Spires d'un ressort, vues de côté. */
function Spires({ x, n, rouge = false }: { x: number; n: number; rouge?: boolean }) {
  return (
    <>
      {Array.from({ length: n }).map((_, i) => (
        <ellipse key={i} cx={x + i * 9} cy="45" rx="5" ry="22" fill="none" stroke={rouge ? ROUGE : GRIS} strokeWidth="3" />
      ))}
    </>
  );
}

export function IllTorsion() {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 240 90" className="absolute left-1/2 top-12 w-64 -translate-x-1/2" aria-hidden="true">
        <rect x="0" y="42" width="240" height="6" rx="3" fill="#3a322d" />
        <Spires x={22} n={9} />
        <Spires x={146} n={9} />
        <path d="M108 20 118 38 110 50 122 70" fill="none" stroke={ROUGE} strokeWidth="3" strokeLinecap="round" />
        <path d="M126 22 132 36 126 48 134 66" fill="none" stroke={ROUGE} strokeWidth="3" strokeLinecap="round" />
      </svg>
      <Alerte className="absolute right-8 top-5" />
      <Puce className="absolute bottom-6 left-1/2 -translate-x-1/2 -rotate-2">Un gros « bang » · la porte ne lève plus</Puce>
    </div>
  );
}

export function IllExtension() {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 260 110" className="absolute left-1/2 top-8 w-64 -translate-x-1/2" aria-hidden="true">
        <path d="M10 30h240" stroke="#3a322d" strokeWidth="10" strokeLinecap="round" />
        <path d="M10 80h240" stroke="#3a322d" strokeWidth="10" strokeLinecap="round" />
        <path d="M30 30q5-10 10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0" fill="none" stroke={GRIS} strokeWidth="3" />
        <path d="M30 80q5-10 10 0t10 0t10 0" fill="none" stroke={ROUGE} strokeWidth="3" />
        <path d="M76 70l8 12M84 70l-6 14" stroke={ROUGE} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <Alerte className="absolute right-8 top-24" />
      <Puce className="absolute bottom-6 left-1/2 -translate-x-1/2 rotate-1">Ressort d’un côté · lâché</Puce>
    </div>
  );
}

export function IllCableSorti() {
  return (
    <div className="relative h-full w-full">
      <Porte className="absolute left-1/2 top-9 w-48 -translate-x-1/2" />
      <svg viewBox="0 0 60 150" className="absolute right-10 top-4 h-40" aria-hidden="true">
        <path d="M30 0v70" stroke={GRIS} strokeWidth="3" />
        <path d="M30 70l-8 14M30 70l3 16M30 70l10 12" stroke={ROUGE} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <Puce className="absolute bottom-6 left-1/2 -translate-x-1/2 -rotate-1">Câble effiloché · sorti de la poulie</Puce>
    </div>
  );
}

export function IllPenche() {
  return (
    <div className="relative h-full w-full">
      <Porte className="absolute left-1/2 top-9 w-48 -translate-x-1/2 rotate-[-8deg]" />
      <div className="absolute left-1/2 top-[168px] h-1 w-56 -translate-x-1/2 rounded-full bg-[#3a322d]" />
      <Alerte className="absolute right-8 top-6" />
      <Puce className="absolute bottom-6 left-1/2 -translate-x-1/2 rotate-2">Monte croche · un côté a lâché</Puce>
    </div>
  );
}

export function IllLourde() {
  return (
    <div className="relative h-full w-full">
      <Porte className="absolute left-1/2 top-8 w-44 -translate-x-1/2" />
      <div className="absolute left-10 top-20 flex h-16 w-16 flex-col items-center justify-center rounded-xl border bg-[#2a1715] shadow-xl" style={{ borderColor: `${ROUGE}80` }}>
        <span className="font-heading text-xl leading-none text-[#f0a3a0]">150</span>
        <span className="text-[10px] uppercase tracking-wider text-[#f0a3a0]/70">lb</span>
      </div>
      <svg viewBox="0 0 40 60" className="absolute right-10 top-12 h-20" aria-hidden="true">
        <path d="M20 4v44" stroke={ROUGE} strokeWidth="3" strokeLinecap="round" />
        <path d="M10 38l10 12 10-12" fill="none" stroke={ROUGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <Puce className="absolute bottom-6 left-1/2 -translate-x-1/2 -rotate-2">Pèse une tonne à la main</Puce>
    </div>
  );
}

export function IllRoulettes() {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 240 130" className="absolute left-1/2 top-6 w-64 -translate-x-1/2" aria-hidden="true">
        <path d="M20 120V50a30 30 0 0 1 30-30h180" fill="none" stroke="#3a322d" strokeWidth="14" strokeLinecap="round" />
        <path d="M20 120V50a30 30 0 0 1 30-30h180" fill="none" stroke="#1a1512" strokeWidth="6" strokeLinecap="round" />
        <circle cx="20" cy="100" r="9" fill={GRIS} />
        <circle cx="120" cy="20" r="9" fill={GRIS} />
        <circle cx="20" cy="64" r="10" fill="#3a1614" stroke={ROUGE} strokeWidth="3" />
        <path d="M13 58l14 12M27 58 13 70" stroke={ROUGE} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <Alerte className="absolute right-8 top-16" />
      <Puce className="absolute bottom-6 left-1/2 -translate-x-1/2 rotate-1">Roulette usée · je la vérifie aussi</Puce>
    </div>
  );
}
