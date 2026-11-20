"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PlanifierButton from "@/components/PlanifierButton";
import FaqAccordion from "@/components/FaqAccordion";
import ReviewsSection from "@/components/ReviewsSection";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/config";

const reasons = [
  {
    icon: (
      <svg className="w-6 h-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Sécurité améliorée",
    desc: "Une porte moderne offre de meilleures serrures, des matériaux plus résistants et des systèmes anti-intrusion pour protéger votre maison et votre famille.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Économies d'énergie",
    desc: "Une porte bien isolée réduit les pertes de chaleur en hiver et garde le frais en été — visible directement sur votre facture d'énergie.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
      </svg>
    ),
    title: "Silencieuse et moderne",
    desc: "Fini les bruits de grincement et l'apparence vieillie. Les portes modernes sont quasi silencieuses et rehaussent l'aspect de votre maison.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Valeur de la maison",
    desc: "Une nouvelle porte de garage augmente directement la valeur de revente de votre propriété. C'est un investissement qui rapporte.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: "Plus pratique",
    desc: "Ouverture automatique, télécommande, contrôle par application — ouvrez votre porte sans descendre de la voiture, de partout dans le monde.",
  },
];

const steps = [
  {
    num: "01",
    title: "Consultation gratuite",
    desc: "On regarde votre porte actuelle, on comprend vos besoins, on vous explique les options disponibles selon votre budget.",
  },
  {
    num: "02",
    title: "Vous choisissez",
    desc: "Vous sélectionnez le style, la couleur et les fonctionnalités qui vous plaisent. On vous guide, mais c'est vous qui décidez.",
  },
  {
    num: "03",
    title: "Devis transparent",
    desc: "Vous recevez un prix clair, honnête, sans frais cachés. Vous savez exactement ce que vous payez avant de vous engager.",
  },
  {
    num: "04",
    title: "Installation professionnelle",
    desc: "On s'occupe de tout — démontage de l'ancienne porte, installation, tests complets. Vous repartez avec une porte qui fonctionne parfaitement.",
  },
];

const doorTypes = [
  {
    title: "Sectionnelles",
    tag: "Notre spécialité",
    desc: "Composée de panneaux horizontaux qui s'enroulent vers le plafond. Gain de place maximal, silencieuse, excellente isolation. Idéale pour presque tous les garages résidentiels.",
    highlight: true,
  },
];

const addons = [
  {
    icon: (
      <svg className="w-5 h-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
        <path d="M15.54 8.46a5 5 0 010 7.07M8.46 8.46a5 5 0 000 7.07" />
      </svg>
    ),
    title: "Ouverture automatique",
    desc: "Plus besoin de descendre de la voiture.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: "Contrôle par app",
    desc: "Ouvrez votre porte de n'importe où dans le monde.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
      </svg>
    ),
    title: "Éclairage LED",
    desc: "Garage bien éclairé, automatiquement.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: "Capteurs de sécurité",
    desc: "Protégez vos enfants et animaux.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 3H8L2 7h20l-6-4z" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
    title: "Télécommande",
    desc: "Confort au quotidien.",
  },
];

const whyUs = [
  { title: "Installation garantie", desc: "Garantie complète sur l'installation et les pièces." },
  { title: "Travail professionnel", desc: "Pas de bricolage — des techniciens formés et expérimentés." },
  { title: "Transparence totale", desc: "Pas de frais cachés. Le prix qu'on vous donne est le prix final." },
  { title: "Conseils personnalisés", desc: "On vous aide à choisir selon votre budget et vos besoins réels." },
  { title: "Service complet", desc: "On enlève l'ancienne porte — vous n'avez rien à faire." },
  { title: "Équipe expérimentée", desc: "Des années d'expérience en installation de portes de garage." },
];

const timeline = [
  { label: "Consultation", time: "30–45 min" },
  { label: "Retrait de l'ancienne porte", time: "1–2 h" },
  { label: "Installation de la nouvelle", time: "2–3 h" },
  { label: "Tests & remise en service", time: "15–30 min" },
];

const faqItems = [
  {
    q: "Ça va coûter combien?",
    a: "Ça dépend du modèle, du matériau et des options choisis. Appelez-nous pour un devis gratuit et sans obligation — vous saurez le prix exact avant de décider quoi que ce soit.",
  },
  {
    q: "Vous offrez une garantie?",
    a: "Oui. Garantie complète sur l'installation et les pièces. Vous êtes protégé si quoi que ce soit ne fonctionne pas comme prévu.",
  },
  {
    q: "Est-ce que je dois sortir ma voiture?",
    a: "Oui, la porte doit être accessible pendant les travaux. On vous prévient à l'avance pour que vous puissiez planifier ça facilement.",
  },
  {
    q: "Est-ce que ça marche avec mon ouvre-porte existant?",
    a: "Souvent oui! On vérifie la compatibilité pendant la consultation. Si votre ouvre-porte est trop vieux ou incompatible, on peut vous proposer une mise à niveau.",
  },
  {
    q: "Les travaux durent longtemps?",
    a: "Généralement une seule journée. Vous repartez le soir avec une nouvelle porte qui fonctionne parfaitement.",
  },
  {
    q: "Et si je n'aime pas le prix?",
    a: "Aucune obligation. Le devis est gratuit. Vous prenez le temps d'y réfléchir et vous décidez quand vous êtes prêt — sans pression.",
  },
];

export default function InstallationPageContent() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal, .reveal-scale, .reveal-left").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/maison_garage_v1.webp" alt="" fill preload fetchPriority="high" sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/90 via-[#1a1a1a]/70 to-[#1a1a1a]/30" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-24 md:py-32">
          <nav className="reveal text-sm text-white/50 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white/70">Installation de porte</span>
          </nav>
          <p className="reveal text-brand font-bold text-sm uppercase tracking-widest mb-3">Service professionnel</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white uppercase leading-tight mb-5">
            Installer une nouvelle<br />
            <span className="text-brand">porte de garage</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-xl mb-10">
            Modernisez votre garage — sécurité améliorée, économies d&apos;énergie et confort au quotidien. Devis gratuit, sans obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <PlanifierButton className="bg-brand text-white font-heading text-base uppercase px-8 py-4 rounded-xl hover:bg-brand-dark transition-colors shadow-lg shadow-brand/20 tracking-wide">
              Demander un devis gratuit
            </PlanifierButton>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-bold px-8 py-4 rounded-xl hover:border-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.18 21 3 13.82 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" /></svg>
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. POURQUOI CHANGER ── */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="reveal text-brand font-bold text-sm uppercase tracking-widest mb-2 text-center">Les vraies raisons</p>
          <h2 className="reveal d1 font-heading text-2xl md:text-3xl text-[#1a1a1a] uppercase text-center mb-12 leading-tight">
            Pourquoi changer de porte?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reasons.map((r, i) => (
              <div key={r.title} className={`reveal-scale d${i + 1} bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col gap-3`}>
                <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center">
                  {r.icon}
                </div>
                <p className="font-heading text-base text-[#1a1a1a] uppercase">{r.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. LE PROCESSUS ── */}
      <section className="bg-[#1a1a1a] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="reveal text-brand font-bold text-sm uppercase tracking-widest mb-2 text-center">Simple et rapide</p>
          <h2 className="reveal d1 font-heading text-2xl md:text-3xl text-white uppercase text-center mb-12 leading-tight">
            Comment ça se passe?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <div key={s.num} className={`reveal d${i + 1} flex gap-5 bg-white/5 border border-white/10 rounded-2xl p-6`}>
                <span className="font-heading text-4xl text-brand leading-none flex-shrink-0">{s.num}</span>
                <div>
                  <p className="font-heading text-white uppercase text-base mb-2">{s.title}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. TYPES DE PORTES ── */}
      <section className="bg-[#f5f5f5] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="reveal text-brand font-bold text-sm uppercase tracking-widest mb-2 text-center">Nos options</p>
          <h2 className="reveal d1 font-heading text-2xl md:text-3xl text-[#1a1a1a] uppercase text-center mb-8 leading-tight">
            Types de portes disponibles
          </h2>
          <div className="reveal d2 relative w-full aspect-[16/6] rounded-2xl overflow-hidden shadow-md mb-10">
            <Image src="/images/blog/blog-choisir-porte.webp" alt="Types de portes de garage disponibles" fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <p className="absolute bottom-4 left-6 text-white font-heading text-lg uppercase tracking-wide">Trouvez la porte qui correspond à votre maison</p>
          </div>
          <div className="reveal-scale d1 max-w-2xl mx-auto bg-brand rounded-2xl p-8 flex flex-col gap-4 shadow-lg shadow-brand/20">
            <span className="text-white/70 text-xs font-bold uppercase tracking-widest">Notre spécialité</span>
            <p className="font-heading text-3xl text-white uppercase">Portes sectionnelles</p>
            <p className="text-white/80 text-base leading-relaxed">
              Composée de panneaux horizontaux qui s&apos;enroulent vers le plafond. Gain de place maximal, silencieuse, excellente isolation — idéale pour presque tous les garages résidentiels.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
              {["Silencieuse", "Bien isolée", "Durable"].map((f) => (
                <div key={f} className="bg-white/15 border border-white/25 rounded-xl px-3 py-2 text-center">
                  <span className="text-white text-xs font-semibold">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CE QUE VOUS POUVEZ AJOUTER ── */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="reveal text-brand font-bold text-sm uppercase tracking-widest mb-2 text-center">Options & accessoires</p>
          <h2 className="reveal d1 font-heading text-2xl md:text-3xl text-[#1a1a1a] uppercase text-center mb-12 leading-tight">
            Ce que vous pouvez ajouter
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addons.map((a, i) => (
              <div key={a.title} className={`reveal d${i + 1} flex items-start gap-4 border border-gray-100 rounded-xl p-5`}>
                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
                  {a.icon}
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a1a] text-sm mb-1">{a.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. POURQUOI NOUS CHOISIR ── */}
      <section className="bg-brand py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="reveal text-white/70 font-bold text-sm uppercase tracking-widest mb-2 text-center">Confiance & rassurance</p>
          <h2 className="reveal d1 font-heading text-2xl md:text-3xl text-white uppercase text-center mb-12 leading-tight">
            Pourquoi nous choisir?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyUs.map((w, i) => (
              <div key={w.title} className={`reveal-scale d${i + 1} bg-white/10 border border-white/20 rounded-xl p-5 flex gap-4`}>
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div>
                  <p className="text-white font-bold text-sm mb-1">{w.title}</p>
                  <p className="text-white/70 text-xs leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. COMBIEN DE TEMPS ── */}
      <section className="bg-[#1a1a1a] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="reveal text-brand font-bold text-sm uppercase tracking-widest mb-2 text-center">Timeline réaliste</p>
          <h2 className="reveal d1 font-heading text-2xl md:text-3xl text-white uppercase text-center mb-12 leading-tight">
            Combien de temps ça prend?
          </h2>
          <div className="relative flex flex-col gap-6">
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-brand/20" />
            {timeline.map((t, i) => (
              <div key={t.label} className={`reveal d${i + 1} relative flex items-center gap-5`}>
                <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center flex-shrink-0 z-10">
                  <span className="text-white font-bold text-sm">{i + 1}</span>
                </div>
                <div className="flex-1 flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-white font-medium text-sm">{t.label}</p>
                  <span className="text-brand font-bold text-sm bg-brand/10 px-3 py-1 rounded-full ml-4 whitespace-nowrap">{t.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal mt-10 bg-brand/10 border border-brand/20 rounded-2xl px-6 py-5 text-center">
            <p className="font-heading text-white text-xl uppercase mb-1">Total : généralement une seule journée</p>
            <p className="text-white/60 text-sm">Vous repartez avec une nouvelle porte qui fonctionne parfaitement.</p>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="reveal text-brand font-bold text-sm uppercase tracking-widest mb-2 text-center">Vos vraies questions</p>
          <h2 className="reveal d1 font-heading text-2xl md:text-3xl text-[#1a1a1a] uppercase text-center mb-10 leading-tight">
            Foire aux questions
          </h2>
          <div className="reveal d2">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* ── 9. CTA FINAL ── */}
      <section className="bg-brand py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="reveal font-heading text-2xl md:text-4xl text-white uppercase mb-4 leading-tight">
            Prêt à moderniser votre garage?
          </h2>
          <p className="reveal d1 text-white/80 mb-10 text-lg">
            Appelez aujourd&apos;hui pour un devis gratuit, sans obligation.
          </p>
          <div className="reveal d2 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-3 bg-white text-brand font-heading text-lg uppercase px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg tracking-wide"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.18 21 3 13.82 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" /></svg>
              Appeler : {PHONE_DISPLAY}
            </a>
            <PlanifierButton className="border-2 border-white text-white font-heading text-base uppercase px-8 py-4 rounded-xl hover:bg-white hover:text-brand transition-colors tracking-wide">
              Demander un devis par formulaire
            </PlanifierButton>
          </div>
        </div>
      </section>

      <ReviewsSection />
    </>
  );
}
