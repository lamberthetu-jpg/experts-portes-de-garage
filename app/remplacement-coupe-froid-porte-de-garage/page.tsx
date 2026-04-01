import type { Metadata } from "next";
import type { FaqItem } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import WeatherSealPlanifierButton from "@/components/WeatherSealPlanifierButton";
import SealTypeSelector from "@/components/SealTypeSelector";
import AnimatedTestimonials from "@/components/AnimatedTestimonials";
import AnimatedPainPoints from "@/components/AnimatedPainPoints";
import AnimatedSteps from "@/components/AnimatedSteps";
import { WeatherSealBookingProvider } from "@/context/WeatherSealBookingContext";

const HERO_BG =
  "/images/coupe-froid/page_coupe_froid_background.jpg";
const LOGO_SRC =
  "/images/logo.webp";

export const metadata: Metadata = {
  title: "Remplacement de coupe-froid de porte de garage — Experts Portes de Garage",
  description:
    "Votre coupe-froid est usé, craquelé ou décollé? Nos techniciens remplacent rapidement les joints d'étanchéité pour protéger votre garage du froid, de l'humidité et des infiltrations — Estrie et Montérégie.",
};

const faqItems: FaqItem[] = [
  {
    q: "Combien de temps dure le remplacement d'un coupe-froid?",
    a: "La plupart des remplacements sont complétés en 30 à 60 minutes. Si plusieurs types de joints doivent être remplacés en même temps, comptez 1 à 2 heures.",
  },
  {
    q: "Comment savoir si mon coupe-froid doit être remplacé ou simplement ajusté?",
    a: "Si le joint est craquelé, durci ou décollé, le remplacement est nécessaire. Si la porte est simplement mal alignée, un ajustement peut suffire. Nos techniciens évaluent la situation sur place et vous recommandent la meilleure solution.",
  },
  {
    q: "Est-ce que vous intervenez en urgence pour un coupe-froid?",
    a: "Oui, nous pouvons intervenir rapidement si votre garage est exposé au froid ou à l'eau en raison d'un joint défectueux.",
  },
  {
    q: "Quelle est la durée de vie d'un coupe-froid de qualité professionnelle?",
    a: "Un joint EPDM ou vinyle renforcé installé correctement peut durer de 8 à 15 ans, contre 2 à 4 ans pour un joint générique vendu en quincaillerie.",
  },
  {
    q: "Desservez-vous toute la région de Granby et l'Estrie?",
    a: "Oui, nous intervenons dans toute la région de Granby, Bromont, Waterloo, Cowansville, Magog, Sherbrooke et les environs en Estrie et Montérégie.",
  },
];

export default function RemplacementCoupeFroidPage() {
  return (
    <WeatherSealBookingProvider>
    <>
      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-[#1a1a1a] py-2.5 px-4 text-center">
        <p className="text-white text-xs sm:text-sm font-medium">
          <span className="text-brand font-bold">🎁 OFFRE SPÉCIALE : </span>
          Inspection + lubrification complète{" "}
          <span className="font-bold text-white underline decoration-brand decoration-2">OFFERTES</span>{" "}
          (valeur 125$) avec tout remplacement
        </p>
      </div>

      {/* ── 1. HERO ── */}
      <section
        className="relative bg-cover bg-center min-h-[92vh] flex items-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/70" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* ── Left copy ── */}
            <div className="flex-1 text-center lg:text-left">

              {/* Breadcrumb */}
              <nav className="text-xs text-white/50 mb-6 flex items-center gap-1.5 justify-center lg:justify-start">
                <Link href="/" className="hover:text-white/80 transition-colors">Accueil</Link>
                <span>/</span>
                <span className="text-white/70">Coupe-froid de porte de garage</span>
              </nav>

              {/* Urgency badge */}
              <div className="inline-flex items-center gap-2 bg-brand/20 border border-brand/50 text-brand rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-5">
                <span className="w-2 h-2 bg-brand rounded-full" />
                Offre limitée — Printemps 2025
              </div>

              {/* Headline */}
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white uppercase leading-[1.05] mb-6">
                Votre garage laisse entrer<br />
                <span className="text-brand">le froid et l&apos;eau?</span>
              </h1>

              <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
                Nos techniciens remplacent tous vos coupe-froids en moins d&apos;une heure — joints de bas, latéraux, de tête et reteneuse. Travail garanti, déplacement inclus.
              </p>

              {/* Trust row */}
              <div className="flex items-center gap-5 justify-center lg:justify-start mb-8 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292Z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white font-bold text-sm">4.9</span>
                  <span className="text-white/50 text-xs">/ 200+ avis</span>
                </div>
                <span className="text-white/20 hidden sm:block">|</span>
                <div className="flex items-center gap-1.5 text-white/70 text-xs">
                  <svg className="w-4 h-4 text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Travail garanti 2 ans
                </div>
                <span className="text-white/20 hidden sm:block">|</span>
                <div className="flex items-center gap-1.5 text-white/70 text-xs">
                  <svg className="w-4 h-4 text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Disponible 7j/7
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <WeatherSealPlanifierButton className="bg-brand text-white font-bold px-8 py-4 rounded-xl hover:bg-brand-dark transition-all text-base shadow-[0_4px_24px_rgba(220,38,38,0.45)] hover:shadow-[0_4px_32px_rgba(220,38,38,0.6)] hover:-translate-y-0.5 active:translate-y-0">
                  Planifier mon remplacement →
                </WeatherSealPlanifierButton>
                <a
                  href="tel:4505585788"
                  className="flex items-center justify-center gap-2 border-2 border-white/40 text-white font-bold px-8 py-4 rounded-xl hover:border-white hover:bg-white/10 transition-all text-base"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  450-558-5788
                </a>
              </div>
            </div>

            {/* ── Right — Offer card ── */}
            <div className="w-full lg:w-[420px] shrink-0">
              <div className="bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

                {/* Card header */}
                <div className="bg-brand px-5 py-4 flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                  <span className="font-heading text-white text-lg leading-tight uppercase tracking-wide">
                    Prix instantané en ligne
                  </span>
                </div>

                {/* Big offer badge */}
                <div className="bg-[#1a1a1a] px-5 py-5 text-center">
                  <p className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-1">Inclus avec votre remplacement</p>
                  <p className="text-white font-heading text-xl uppercase leading-tight mb-3">
                    Inspection + Lubrification
                  </p>
                  <div className="inline-flex items-center gap-3 bg-brand rounded-xl px-5 py-3">
                    <div className="text-left">
                      <p className="text-white/70 text-xs line-through">Valeur 125$</p>
                      <p className="text-white font-heading text-2xl uppercase leading-none">100% GRATUIT</p>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <svg className="w-10 h-10 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>
                  </div>
                </div>

                {/* Card body */}
                <div className="px-5 py-5 flex flex-col gap-3">
                  {/* Checklist */}
                  <div className="flex flex-col gap-2 mb-1">
                    {[
                      "Technicien certifié qui se déplace chez vous",
                      "Devis exact avant de commencer",
                      "Travail complété en 1 heure ou moins",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-brand shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                        </svg>
                        <p className="text-gray-600 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>

                  <WeatherSealPlanifierButton className="w-full bg-brand text-white font-bold py-4 px-4 rounded-xl hover:bg-brand-dark transition-all text-base shadow-md hover:shadow-lg">
                    Planifier mon remplacement →
                  </WeatherSealPlanifierButton>
                  <a href="tel:4505585788"
                    className="w-full flex items-center justify-center gap-2 border-2 border-brand text-brand font-bold py-3.5 px-4 rounded-xl hover:bg-brand hover:text-white transition-all text-sm text-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    Appeler le 450-558-5788
                  </a>
                  <p className="text-gray-400 text-xs text-center">Sans engagement · Réponse le jour même</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ── */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292Z" />
                  </svg>
                ))}
              </div>
              <span className="font-bold text-gray-800">4.9/5</span>
              <span>sur Google · 200+ avis</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-gray-200" />
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span><span className="font-semibold text-gray-800">Garantie 2 ans</span> pièces et main-d&apos;œuvre</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-gray-200" />
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span>Granby, Bromont, Sherbrooke <span className="font-semibold text-gray-800">et environs</span></span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-gray-200" />
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span>Disponible <span className="font-semibold text-gray-800">7 jours sur 7</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PAIN POINTS ── */}
      <AnimatedPainPoints />

      {/* ── 3. SEAL TYPES ── */}
      <SealTypeSelector />

      {/* ── 4. EXCLUSIVE OFFER BANNER ── */}
      <section className="relative overflow-hidden bg-[#1a1a1a] py-16">
        {/* Background accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.15),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-brand/20 border border-brand/40 text-brand rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 bg-brand rounded-full" />
            Offre exclusive — Durée limitée
          </div>
          <h2 className="font-heading text-3xl md:text-5xl text-white uppercase leading-tight mb-5">
            Inspection complète +<br />
            <span className="text-brand">Lubrification GRATUITES</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 bg-white/10 max-w-[100px]" />
            <div className="bg-brand text-white font-heading text-4xl px-6 py-2 rounded-xl shadow-[0_4px_24px_rgba(220,38,38,0.4)] line-through">
              Valeur régulière 125$
            </div>
            <div className="h-px flex-1 bg-white/10 max-w-[100px]" />
          </div>
          <p className="text-white/80 text-base mb-10 max-w-lg mx-auto leading-relaxed">
            Nos techniciens vérifient votre porte en entier et lubrifient toutes les pièces mobiles — sans frais supplémentaires, à chaque remplacement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WeatherSealPlanifierButton className="bg-brand text-white font-bold px-10 py-4 rounded-xl hover:bg-brand-dark transition-all text-base shadow-[0_4px_24px_rgba(220,38,38,0.45)] hover:-translate-y-0.5">
              Profiter de l&apos;offre →
            </WeatherSealPlanifierButton>
            <a href="tel:4505585788"
              className="flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-10 py-4 rounded-xl hover:border-white hover:bg-white/10 transition-all text-base text-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              450-558-5788
            </a>
          </div>
        </div>
      </section>

      {/* ── 5. PROCESS STEPS ── */}
      <AnimatedSteps />

      {/* ── 6. TESTIMONIALS ── */}
      <AnimatedTestimonials />

      {/* ── 7. SERVICE DETAILS BAND ── */}
      <section className="bg-[#1a1a1a] py-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <p className="font-heading text-white uppercase text-sm">Zone de service</p>
              <p className="text-gray-400 text-xs">Granby, Bromont, Waterloo, Cowansville, Magog, Sherbrooke et environs</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <p className="font-heading text-white uppercase text-sm">Travail garanti</p>
              <p className="text-gray-400 text-xs">Matériaux EPDM et vinyle renforcé — durée de vie de 8 à 15 ans</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <p className="font-heading text-white uppercase text-sm">Intervention rapide</p>
              <p className="text-gray-400 text-xs">Disponibles 7 jours sur 7 — Réponse le jour même dans la plupart des cas</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className="bg-muted py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl md:text-3xl text-brand text-center uppercase mb-10">
            Foire aux questions
          </h2>
          <FaqAccordion items={faqItems} />
        </div>
      </section>


    </>
    </WeatherSealBookingProvider>
  );
}
