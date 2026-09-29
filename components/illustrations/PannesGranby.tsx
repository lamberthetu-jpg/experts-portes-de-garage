import { Alerte, Porte, Puce, ROUGE } from "@/components/CartesIllustrees";

/**
 * Illustrations propres à la page générale Granby. Les autres cartes de
 * cette page réutilisent celles des pages Ressorts et Ouvre-porte.
 */

const GRIS = "#8a7d74";

export function IllHorsRail() {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 240 130" className="absolute left-1/2 top-6 w-64 -translate-x-1/2" aria-hidden="true">
        <path d="M20 120V50a30 30 0 0 1 30-30h180" fill="none" stroke="#3a322d" strokeWidth="14" strokeLinecap="round" />
        <path d="M20 120V50a30 30 0 0 1 30-30h180" fill="none" stroke="#1a1512" strokeWidth="6" strokeLinecap="round" />
        <circle cx="20" cy="100" r="9" fill={GRIS} />
        <circle cx="120" cy="20" r="9" fill={GRIS} />
        <circle cx="52" cy="66" r="10" fill="#3a1614" stroke={ROUGE} strokeWidth="3" />
        <path d="M24 62 42 66" stroke={ROUGE} strokeWidth="2.5" strokeDasharray="4 4" />
      </svg>
      <Alerte className="absolute right-8 top-16" />
      <Puce className="absolute bottom-6 left-1/2 -translate-x-1/2 rotate-2">Sortie de sa track · bloquée</Puce>
    </div>
  );
}

export function IllBruyante() {
  return (
    <div className="relative h-full w-full">
      <Porte className="absolute left-1/2 top-9 w-44 -translate-x-1/2" />
      <svg viewBox="0 0 60 80" className="absolute left-6 top-14 h-24" aria-hidden="true">
        <path d="M44 20q-12 20 0 40M32 12q-18 28 0 56" fill="none" stroke={ROUGE} strokeWidth="3" strokeLinecap="round" />
      </svg>
      <svg viewBox="0 0 60 80" className="absolute right-6 top-14 h-24" aria-hidden="true">
        <path d="M16 20q12 20 0 40M28 12q18 28 0 56" fill="none" stroke={ROUGE} strokeWidth="3" strokeLinecap="round" />
      </svg>
      <Puce className="absolute bottom-6 left-1/2 -translate-x-1/2 -rotate-1">Grince, force ou accroche</Puce>
    </div>
  );
}
