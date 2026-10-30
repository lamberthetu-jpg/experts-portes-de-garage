import { SOURCE_LABELS, type Source } from "@/lib/suivi";

const COULEURS: Record<Source, string> = {
  google: "text-sky-300 bg-sky-500/10 border-sky-500/20",
  meta: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
  organic: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
  direct: "text-white/50 bg-white/5 border-white/10",
  unknown: "text-white/40 bg-white/5 border-white/10",
};

/** Provenance du client (CRM). Rien pour les fiches d'avant le suivi. */
export default function BadgeSource({ source }: { source?: Source | null }) {
  if (!source) return null;
  return (
    <span title="Provenance du premier contact" className={`text-xs font-semibold px-2 py-0.5 rounded-full border shrink-0 ${COULEURS[source]}`}>
      {SOURCE_LABELS[source]}
    </span>
  );
}
