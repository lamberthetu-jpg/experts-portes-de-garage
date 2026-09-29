import { Alerte, Notification, Porte, Puce, ROUGE } from "@/components/CartesIllustrees";

/**
 * Illustrations des 6 pannes d'ouvre-porte (page de pub Ouvre-porte),
 * dans le style des cartes sombres de CartesIllustrees.
 */

const GRIS = "#8a7d74";

/** Télécommande vue de face. */
function Telecommande({ className = "" }: { className?: string }) {
  return (
    <div className={`flex w-20 flex-col items-center gap-2 rounded-2xl border border-white/10 bg-[#2b2521] py-4 shadow-xl ${className}`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-6 w-6 rounded-full bg-[#3a322d]" />
      ))}
    </div>
  );
}

/** Boîtier du moteur au plafond. */
function Moteur({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-[#2b2521] shadow-xl ${className}`}>
      <div className="mx-3 mt-3 h-2 rounded-full bg-[#3a322d]" />
      <div className="mx-3 mt-2 h-2 w-2/3 rounded-full bg-[#3a322d]" />
      <div className="mx-auto mb-3 mt-4 h-3 w-10 rounded-sm bg-[#f5e6c8]/20" />
    </div>
  );
}

export function IllRienNeSePasse() {
  return (
    <div className="relative h-full w-full">
      <Telecommande className="absolute left-8 top-8 -rotate-12" />
      <div className="absolute left-32 top-24 flex h-16 w-12 items-center justify-center rounded-lg border border-white/10 bg-[#2b2521] shadow-xl">
        <span className="h-6 w-6 rounded-md bg-[#3a322d]" />
      </div>
      <Notification titre="Ouvre-porte" etat="Aucune réponse" className="absolute right-6 top-8" texte="Ni la télécommande ni le bouton mural." />
    </div>
  );
}

export function IllMoteurTourne() {
  return (
    <div className="relative h-full w-full">
      <Moteur className="absolute left-1/2 top-10 w-40 -translate-x-1/2" />
      <svg viewBox="0 0 120 40" className="absolute left-1/2 top-4 w-48 -translate-x-1/2" aria-hidden="true">
        <path d="M8 30q6-10 0-20M18 34q10-14 0-28" fill="none" stroke={GRIS} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M112 30q-6-10 0-20M102 34q-10-14 0-28" fill="none" stroke={GRIS} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <svg viewBox="0 0 60 60" className="absolute right-10 top-28 h-16 w-16" aria-hidden="true">
        <circle cx="30" cy="30" r="16" fill="#3a1614" stroke={ROUGE} strokeWidth="3" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          if (i === 2) return null;
          return (
            <rect key={i} x="27" y="6" width="6" height="8" rx="1" fill={ROUGE} transform={`rotate(${(a * 180) / Math.PI} 30 30)`} />
          );
        })}
        <circle cx="30" cy="30" r="5" fill={ROUGE} />
      </svg>
      <Puce className="absolute bottom-6 left-1/2 -translate-x-1/2 -rotate-2">Le moteur tourne · rien ne monte</Puce>
    </div>
  );
}

export function IllRemonte() {
  return (
    <div className="relative h-full w-full">
      <Porte className="absolute left-1/2 top-6 w-48 -translate-x-1/2" panneaux={4} />
      <div className="absolute left-1/2 top-[152px] h-1 w-60 -translate-x-1/2 rounded-full bg-[#3a322d]" />
      <svg viewBox="0 0 60 90" className="absolute right-8 top-6 h-32" aria-hidden="true">
        <path d="M20 10v60q0 10 10 10t10-10V26" fill="none" stroke={ROUGE} strokeWidth="3" strokeLinecap="round" />
        <path d="M32 34l8-10 8 10" fill="none" stroke={ROUGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <Puce className="absolute bottom-6 left-1/2 -translate-x-1/2 rotate-1">Touche le sol et remonte</Puce>
    </div>
  );
}

export function IllCapteurs() {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 260 130" className="absolute left-1/2 top-8 w-64 -translate-x-1/2" aria-hidden="true">
        <rect x="6" y="80" width="26" height="20" rx="4" fill="#2b2521" stroke="#ffffff1a" />
        <circle cx="26" cy="90" r="4" fill={ROUGE} />
        <rect x="228" y="62" width="26" height="20" rx="4" fill="#2b2521" stroke="#ffffff1a" />
        <circle cx="234" cy="72" r="4" fill="#3a322d" />
        <path d="M32 90 228 72" stroke={ROUGE} strokeWidth="2.5" strokeDasharray="6 6" />
        <path d="M0 112h260" stroke="#3a322d" strokeWidth="4" />
        <circle cx="130" cy="22" r="12" fill="#f5b400" opacity="0.2" />
        <circle cx="130" cy="22" r="6" fill="#f5b400" />
      </svg>
      <Alerte className="absolute right-8 top-6" />
      <Puce className="absolute bottom-6 left-1/2 -translate-x-1/2 -rotate-1">Yeux électriques mal alignés</Puce>
    </div>
  );
}

export function IllTelecommande() {
  return (
    <div className="relative h-full w-full">
      <Telecommande className="absolute left-1/2 top-8 -translate-x-1/2 rotate-6" />
      <svg viewBox="0 0 80 60" className="absolute right-12 top-10 w-24" aria-hidden="true">
        <path d="M10 50q20-30 60-30M20 50q14-18 40-18M30 50q8-8 20-8" fill="none" stroke={GRIS} strokeWidth="3" strokeLinecap="round" />
        <path d="M14 14l52 36" stroke={ROUGE} strokeWidth="3.5" strokeLinecap="round" />
      </svg>
      <div className="absolute left-10 top-24 flex items-center gap-1 rounded-md border border-white/10 bg-[#241f1c] p-1.5">
        <span className="h-4 w-2 rounded-sm" style={{ background: ROUGE }} />
        <span className="h-4 w-2 rounded-sm bg-[#3a322d]" />
        <span className="h-4 w-2 rounded-sm bg-[#3a322d]" />
        <span className="ml-0.5 h-2 w-1 rounded-sm bg-[#3a322d]" />
      </div>
      <Puce className="absolute bottom-6 left-1/2 -translate-x-1/2 rotate-2">Pile, programmation ou récepteur</Puce>
    </div>
  );
}

export function IllMoteurForce() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-1/2 top-6 h-[140px] w-48 -translate-x-1/2 overflow-hidden rounded-md border border-white/10 bg-[#0e0b0a]">
        <Porte className="absolute inset-x-0 top-0 rounded-none border-0" panneaux={2} />
      </div>
      <svg viewBox="0 0 40 60" className="absolute right-10 top-10 h-20" aria-hidden="true">
        <path d="M20 4v44" stroke={ROUGE} strokeWidth="3" strokeLinecap="round" />
        <path d="M10 38l10 12 10-12" fill="none" stroke={ROUGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <Alerte className="absolute left-8 top-12" />
      <Puce className="absolute bottom-6 left-1/2 -translate-x-1/2 -rotate-2">Arrête à mi-chemin · ressort fatigué</Puce>
    </div>
  );
}
