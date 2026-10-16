import Link from "next/link";

/**
 * Bandeau de l'accueil pendant l'offre d'hiver. Le QR des cartes
 * d'affaires mène à l'accueil : c'est par ici qu'ils trouvent l'offre.
 * Pour le retirer au printemps : enlever <BanniereMiseAuPoint /> de app/page.tsx.
 */
export default function BanniereMiseAuPoint() {
  return (
    <Link
      href="/mise-au-point"
      data-cta="banniere_mise_au_point"
      className="group block bg-brand text-white transition-colors hover:bg-brand-dark"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-3 text-center sm:px-6">
        <span className="font-heading text-lg uppercase tracking-wide">
          Mise au point d’hiver : 39,95 $ tout inclus
        </span>
        <span className="text-sm text-white/85">Garantie 30 jours · déplacement inclus</span>
        <span className="text-sm font-semibold underline underline-offset-4 group-hover:no-underline">
          Réserver →
        </span>
      </div>
    </Link>
  );
}
