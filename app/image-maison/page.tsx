import type { Metadata } from "next";
import ImageMaisonVisualizer from "@/components/ImageMaisonVisualizer";
import PlanifierButton from "@/components/PlanifierButton";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/config";

export const metadata: Metadata = {
  title: "Visualisez votre nouvelle porte de garage — Experts Portes de Garage",
  description:
    "Uploadez une photo de votre maison et visualisez différents modèles et couleurs de porte de garage pour trouver celle qui vous plaît.",
  openGraph: {
    title: "Visualisez votre nouvelle porte de garage sur votre maison",
    description: "Essayez différents modèles de portes de garage sur une photo de votre maison.",
    url: "/image-maison",
  },
};

export default function ImageMaisonPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 text-brand rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5">
            Outil gratuit
          </div>
          <h1 className="font-heading text-3xl md:text-5xl text-[#1a1a1a] uppercase leading-tight mb-4">
            Visualisez votre nouvelle{" "}
            <span className="text-brand">porte de garage</span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Uploadez une photo de votre maison, choisissez un modèle et une couleur, puis positionnez la porte pour voir le résultat.
          </p>
        </div>
      </section>

      {/* ── VISUALIZER ── */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ImageMaisonVisualizer />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1a1a1a] py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-2xl md:text-4xl text-white uppercase leading-tight mb-4">
            Vous avez trouvé le bon modèle?
          </h2>
          <p className="text-white/70 text-base mb-8 max-w-xl mx-auto">
            Nos experts se déplacent chez vous pour prendre les mesures et vous proposer un devis sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <PlanifierButton className="bg-brand text-white font-bold px-8 py-4 rounded-xl hover:bg-brand-dark transition-all text-base shadow-lg shadow-brand/20">
              Planifier une visite →
            </PlanifierButton>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:border-white hover:bg-white/10 transition-all text-base"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
