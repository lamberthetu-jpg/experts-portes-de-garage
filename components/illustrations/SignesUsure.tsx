/**
 * Illustrations claires des signes d'usure (section « votre ressort est en
 * train de lâcher? »). Gris et ambre : « attention, ça s'use, planifiez »,
 * pour ne pas crier « urgence » comme les cartes noires et rouges du haut.
 */

const AMBRE = "#d97706";
const AMBRE_PALE = "#fef3c7";
const TRAIT = "#9c948d";
const PANNEAU = "#e7e2dc";
const CADRE = "#d6cfc7";

/** Étiquette ambre. */
function Etiquette({ children, x, y }: { children: string; x: number; y: number }) {
  const l = children.length * 5.6 + 16;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-l / 2} y="-10" width={l} height="20" rx="6" fill={AMBRE_PALE} stroke={AMBRE} strokeOpacity="0.5" />
      <text x="0" y="4" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">
        {children}
      </text>
    </g>
  );
}

/** Porte de garage (panneaux), en coordonnées SVG. */
function Porte({ x, y, l = 110, h = 80, panneaux = 4 }: { x: number; y: number; l?: number; h?: number; panneaux?: number }) {
  const hp = (h - 6 - (panneaux - 1) * 4) / panneaux;
  return (
    <g>
      <rect x={x} y={y} width={l} height={h} rx="4" fill="#f5f2ee" stroke={CADRE} />
      {Array.from({ length: panneaux }).map((_, i) => (
        <rect key={i} x={x + 4} y={y + 3 + i * (hp + 4)} width={l - 8} height={hp} rx="2" fill={PANNEAU} />
      ))}
    </g>
  );
}

function Cadre({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 240 130" className="h-full w-full" aria-hidden="true">
      {children}
    </svg>
  );
}

export function IllPorteLourde() {
  return (
    <Cadre>
      <Porte x={65} y={18} />
      {/* main qui soulève */}
      <path d="M100 118v-14q0-6 6-6h28q6 0 6 6v14" fill="none" stroke={TRAIT} strokeWidth="3" strokeLinecap="round" />
      <path d="M108 98v-8M116 98v-10M124 98v-10M132 98v-8" stroke={TRAIT} strokeWidth="3" strokeLinecap="round" />
      <Etiquette x={195} y={38}>Lourde</Etiquette>
      <path d="M195 52v18m-6-6 6 6 6-6" fill="none" stroke={AMBRE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Cadre>
  );
}

export function IllMiHauteur() {
  return (
    <Cadre>
      <rect x="65" y="18" width="110" height="96" rx="4" fill="#faf8f5" stroke={CADRE} />
      <Porte x={65} y={18} h={48} panneaux={2} />
      <path d="M195 30v40m-7-8 7 8 7-8" fill="none" stroke={AMBRE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 66h-10M190 66h10" stroke={AMBRE} strokeWidth="2" strokeDasharray="3 3" />
      <Etiquette x={120} y={92}>Redescend toute seule</Etiquette>
    </Cadre>
  );
}

export function IllEspaceRessort() {
  return (
    <Cadre>
      <rect x="10" y="58" width="220" height="6" rx="3" fill={PANNEAU} />
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse key={`g${i}`} cx={30 + i * 9} cy="61" rx="5" ry="20" fill="none" stroke={TRAIT} strokeWidth="3" />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse key={`d${i}`} cx={146 + i * 9} cy="61" rx="5" ry="20" fill="none" stroke={TRAIT} strokeWidth="3" />
      ))}
      <circle cx="120" cy="61" r="24" fill="none" stroke={AMBRE} strokeWidth="2.5" strokeDasharray="5 4" />
      <Etiquette x={120} y={112}>Un trou entre les spires</Etiquette>
    </Cadre>
  );
}

export function IllMoteurGrogne() {
  return (
    <Cadre>
      <rect x="80" y="30" width="80" height="44" rx="8" fill="#f5f2ee" stroke={CADRE} />
      <rect x="92" y="40" width="56" height="5" rx="2.5" fill={PANNEAU} />
      <rect x="92" y="50" width="36" height="5" rx="2.5" fill={PANNEAU} />
      <rect x="108" y="62" width="24" height="6" rx="2" fill={AMBRE_PALE} stroke={AMBRE} strokeOpacity="0.5" />
      <path d="M66 38q-8 14 0 28M54 30q-14 22 0 44" fill="none" stroke={AMBRE} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M174 38q8 14 0 28M186 30q14 22 0 44" fill="none" stroke={AMBRE} strokeWidth="2.5" strokeLinecap="round" />
      <Etiquette x={120} y={104}>Grogne, ralentit</Etiquette>
    </Cadre>
  );
}

export function IllCableEffiloche() {
  return (
    <Cadre>
      <path d="M120 6v70" stroke={TRAIT} strokeWidth="4" />
      <path d="M120 76l-10 16M120 76l-3 20M120 76l4 19M120 76l11 15" stroke={AMBRE} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="120" cy="84" r="22" fill="none" stroke={AMBRE} strokeWidth="2" strokeDasharray="5 4" />
      <rect x="40" y="96" width="160" height="10" rx="3" fill={PANNEAU} />
      <Etiquette x={120} y={117}>Des brins qui dépassent</Etiquette>
    </Cadre>
  );
}

export function IllMonteCroche() {
  return (
    <Cadre>
      <g transform="rotate(-7 120 50)">
        <Porte x={65} y={10} h={72} />
      </g>
      <path d="M50 98h140" stroke={CADRE} strokeWidth="3" strokeLinecap="round" />
      <path d="M200 34v-14m-5 5 5-5 5 5" fill="none" stroke={AMBRE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 74v14m-5-5 5 5 5-5" fill="none" stroke={AMBRE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <Etiquette x={120} y={116}>Un côté lève avant l’autre</Etiquette>
    </Cadre>
  );
}
