import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/config";

/** Bouton d'appel collé en bas de l'écran, sur cell seulement (pages de ville). */
export default function BarreAppelMobile() {
  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 md:hidden">
        {/* Aucun degrade derriere le bouton. Le `from-black/30` d avant
            etait pense pour le hero sombre : sur les sections blanches il
            devenait un rectangle gris sale sur toute la largeur, avec un
            bord franc. L ombre portee du bouton suffit a le detacher, et
            elle fonctionne sur n importe quel fond. */}
        <div className="px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.85rem)]">
          <a
            href={PHONE_HREF}
            data-cta="barre_mobile"
            className="pointer-events-auto flex items-center gap-3 rounded-full bg-brand py-3 pl-3 pr-6 shadow-2xl shadow-black/40 ring-1 ring-white/20 transition-transform duration-150 active:scale-[0.97]"
          >
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Appelez maintenant</span>
              <span className="block font-heading text-xl uppercase tracking-wide text-white">{PHONE_DISPLAY}</span>
            </span>
            <svg className="h-5 w-5 flex-shrink-0 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
      {/* Remonte la bulle du chatbot au-dessus du bouton d appel, sur cette page seulement */}
      <style>{`@media (max-width: 767px){ .epg-chat { margin-bottom: 5.75rem; } }`}</style>
    </>
  );
}
