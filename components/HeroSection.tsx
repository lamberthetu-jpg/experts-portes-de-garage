import Image from "next/image";
import PlanifierButton from "@/components/PlanifierButton";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/config";

export default function HeroSection() {
  const services = [
    "Ressort cassé ou brisé",
    "Câbles & roulettes",
    "Coupe-froid & joints",
    "Ouvre-porte motorisé",
    "Remplacement de porte",
  ];

  return (
    <section className="relative overflow-hidden">

      {/* Background image — next/image avec preload : c'est l'élément LCP,
          un background CSS serait découvert trop tard par le navigateur */}
      <div className="absolute inset-0">
        <Image
          src="/images/maison_garage_v1.webp"
          alt=""
          fill
          preload
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/60 lg:to-white/25" />

      {/* Red accent top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-0 md:pt-24 md:pb-0">
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-10">

          {/* LEFT — Text */}
          <div
            className="flex-1 text-center lg:text-left pb-16 hero-fade-in"
          >
            {/* Zone label */}
            <div className="inline-flex items-center gap-2 bg-brand/8 border border-brand/20 text-brand rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6">
              Estrie &amp; Montérégie
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] text-[#1a1a1a] uppercase leading-tight mb-5">
              Bienvenue chez{" "}
              <span className="text-brand">Experts Portes de Garage</span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Une entreprise locale spécialisée en portes de garage, basée en Estrie et Montérégie.{" "}
              <strong className="text-[#1a1a1a]">On intervient directement chez vous, avec soin et transparence.</strong>
            </p>

            {/* Who we are row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 mb-10">
              <span className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <svg className="w-4 h-4 text-brand flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Entreprise locale
              </span>
              <span className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <svg className="w-4 h-4 text-brand flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Techniciens spécialisés
              </span>
              <span className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <svg className="w-4 h-4 text-brand flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Travail transparent
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <PlanifierButton className="bg-brand text-white font-bold px-8 py-4 rounded-xl text-base hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 hover:shadow-brand/30 hover:-translate-y-0.5 w-full sm:w-auto">
                Planifier une visite →
              </PlanifierButton>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2.5 border-2 border-brand text-brand font-bold px-8 py-4 rounded-full text-base hover:bg-brand hover:text-white transition-all w-full sm:w-auto"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* RIGHT — Services card */}
          <div
            className="w-full lg:w-auto lg:flex-shrink-0 pb-16 hero-fade-in-delay"
          >
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/80 border border-gray-100 overflow-hidden w-full lg:w-[320px]">

              {/* Card header */}
              <div className="bg-brand px-6 py-4">
                <p className="text-white font-bold text-sm uppercase tracking-widest">Experts Portes de Garage</p>
                <p className="text-white/90 text-xs mt-0.5">Bienvenue — on est là pour vous aider</p>
              </div>

              {/* Services list */}
              <div className="px-6 py-3">
                {services.map((item) => (
                  <div key={item} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center">
                      <svg className="w-3 h-3 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[#1a1a1a] text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* Card footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <p className="text-center text-xs text-gray-600 font-medium">
                  Prix clair avant les travaux · Réponse rapide
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
