"use client";

import { useEffect } from "react";
import Link from "next/link";
import PlanifierButton from "@/components/PlanifierButton";
import MotorSection from "@/components/MotorSection";
import ReviewsSection from "@/components/ReviewsSection";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/config";

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: "Confort",
    desc: "Ouverture automatique — plus besoin de descendre de la voiture sous la pluie ou le froid.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Sécurité",
    desc: "Détecteurs de mouvement, fermeture automatique et systèmes anti-intrusion intégrés.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    title: "Silence",
    desc: "Les moteurs modernes fonctionnent quasi silencieusement. Fini les bruits qui réveillent la maison.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "Durabilité",
    desc: "Équipements de qualité conçus pour durer des années sans entretien majeur.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" />
        <path d="M16.24 7.76a6 6 0 010 8.49m-8.48-.01a6 6 0 010-8.49m11.31-2.82a10 10 0 010 14.14m-14.14 0a10 10 0 010-14.14" />
      </svg>
    ),
    title: "Contrôle à distance",
    desc: "Télécommande, application téléphone, WiFi — ouvrez votre porte de n'importe où.",
  },
];

const services = [
  {
    tag: "Installation",
    question: "Vous achetez une nouvelle porte ou voulez motoriser votre porte manuelle?",
    points: ["Installation professionnelle complète", "Configuration et programmation", "Test de sécurité inclus"],
    cta: "En savoir plus",
    href: "/installation-de-nouvelle-porte-de-garage",
    highlight: false,
  },
  {
    tag: "Réparation",
    question: "Votre ouvre-porte ne fonctionne plus ou fait du bruit?",
    points: ["Diagnostic professionnel", "Remplacement de pièces", "Réparation rapide sur place"],
    cta: "Planifier une réparation",
    href: null,
    highlight: true,
  },
  {
    tag: "Vente",
    question: "Vous cherchez le bon moteur pour votre garage?",
    points: ["Sélection de moteurs de qualité", "Conseil expert personnalisé", "Installation disponible"],
    cta: "Voir nos moteurs",
    href: "#moteurs",
    highlight: false,
  },
];

const problems = [
  {
    label: "Moteur qui ne fonctionne plus",
    icon: (
      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    label: "Bruit excessif ou grincement",
    icon: (
      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 010 7.07" />
        <path d="M19.07 4.93a10 10 0 010 14.14" />
      </svg>
    ),
  },
  {
    label: "Télécommande qui ne marche plus",
    icon: (
      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
        <line x1="10" y1="7" x2="14" y2="7" />
        <line x1="12" y1="5" x2="12" y2="9" />
      </svg>
    ),
  },
  {
    label: "Porte qui s'arrête ou ne bouge pas",
    icon: (
      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <circle cx="6" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Courroie cassée ou usée",
    icon: (
      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="12" r="3" />
        <line x1="9" y1="10" x2="15" y2="10" />
        <line x1="9" y1="14" x2="15" y2="14" />
        <line x1="3" y1="12" x2="1" y2="12" />
        <line x1="23" y1="12" x2="21" y2="12" />
      </svg>
    ),
  },
  {
    label: "Capteurs défectueux",
    icon: (
      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
    ),
  },
];

const steps = [
  { num: "01", title: "Appel / Contact", desc: "Décrivez le problème ou dites-nous ce que vous cherchez. On est là pour vous orienter." },
  { num: "02", title: "Diagnostic", desc: "On analyse la situation et propose la meilleure solution selon votre budget et vos besoins." },
  { num: "03", title: "Devis", desc: "Vous recevez un prix clair et transparent. Aucun frais caché, aucune surprise." },
  { num: "04", title: "Service", desc: "On installe, répare ou livre — tout est fait de façon professionnelle et rapide." },
];

const d = ["d1", "d2", "d3", "d4", "d5", "d6"];

export default function OuvrePortePageContent() {
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
          {/* L'auto arrive, la porte s'ouvre, l'auto entre, la porte se referme.
              Pas de `loop` : la vidéo joue une fois et reste sur la porte fermée. */}
          <video
            src="/videos/ouvre-porte-garage.mp4"
            poster="/videos/ouvre-porte-garage-debut.jpg"
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/92 via-[#1a1a1a]/75 to-[#1a1a1a]/30" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-24 md:py-32">
          <nav className="reveal text-sm text-white/50 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white/70">Ouvre-porte de garage</span>
          </nav>
          <p className="reveal text-brand font-bold text-sm uppercase tracking-widest mb-3">Installation & réparation</p>
          <h1 className="reveal d1 font-heading text-4xl md:text-5xl lg:text-6xl text-white uppercase leading-tight mb-5">
            Ouvre-porte<br />
            <span className="text-brand">de garage</span>
          </h1>
          <p className="reveal d2 text-white/70 text-lg leading-relaxed max-w-xl mb-10">
            Installation, réparation et vente de moteurs de portes de garage. Service professionnel en Estrie et Montérégie.
          </p>
          <div className="reveal d3 flex flex-col sm:flex-row gap-4">
            <PlanifierButton className="bg-brand text-white font-heading text-base uppercase px-8 py-4 rounded-xl hover:bg-brand-dark transition-colors shadow-lg shadow-brand/20 tracking-wide">
              Planifier un service
            </PlanifierButton>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-bold px-8 py-4 rounded-xl hover:border-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.18 21 3 13.82 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" /></svg>
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. PROBLÈMES COURANTS ── */}
      <section className="bg-[#f5f5f5] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="reveal text-brand font-bold text-sm uppercase tracking-widest mb-2 text-center">On répare ça</p>
          <h2 className="reveal d1 font-heading text-2xl md:text-3xl text-[#1a1a1a] uppercase text-center mb-10 leading-tight">
            Problèmes courants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {problems.map((p, i) => (
              <div key={p.label} className={`reveal ${d[i]} flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-5 py-3.5`}>
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand flex items-center justify-center">
                  {p.icon}
                </span>
                <span className="text-[#1a1a1a] font-medium text-sm">{p.label}</span>
              </div>
            ))}
          </div>
          <p className="reveal text-center text-gray-500 text-sm">Peu importe le problème, nos techniciens qualifiés peuvent le régler rapidement.</p>
        </div>
      </section>

      {/* ── 3. NOS SERVICES ── */}
      <section className="bg-[#1a1a1a] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="reveal text-brand font-bold text-sm uppercase tracking-widest mb-2 text-center">Ce qu'on fait</p>
          <h2 className="reveal d1 font-heading text-2xl md:text-3xl text-white uppercase text-center mb-12 leading-tight">
            Nos services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={s.tag} className={`reveal-scale ${d[i]} rounded-2xl p-6 flex flex-col gap-4 ${s.highlight ? "bg-brand shadow-lg shadow-brand/25" : "bg-white/5 border border-white/10"}`}>
                <span className={`text-xs font-bold uppercase tracking-widest ${s.highlight ? "text-white/70" : "text-brand"}`}>{s.tag}</span>
                <p className={`font-heading text-lg uppercase leading-tight ${s.highlight ? "text-white" : "text-white"}`}>{s.question}</p>
                <ul className="flex flex-col gap-2 flex-1">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${s.highlight ? "text-white/70" : "text-brand"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm ${s.highlight ? "text-white/80" : "text-white/60"}`}>{p}</span>
                    </li>
                  ))}
                </ul>
                {s.href ? (
                  <Link href={s.href} className={`text-center font-bold text-sm px-4 py-2.5 rounded-lg transition-colors ${s.highlight ? "bg-white text-brand hover:bg-gray-100" : "border border-brand text-brand hover:bg-brand hover:text-white"}`}>
                    {s.cta}
                  </Link>
                ) : (
                  <PlanifierButton className={`text-center font-bold text-sm px-4 py-2.5 rounded-lg transition-colors ${s.highlight ? "bg-white text-brand hover:bg-gray-100" : "border border-brand text-brand hover:bg-brand hover:text-white"}`}>
                    {s.cta}
                  </PlanifierButton>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. POURQUOI UN BON OUVRE-PORTE ── */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="reveal text-brand font-bold text-sm uppercase tracking-widest mb-2 text-center">Les bénéfices</p>
          <h2 className="reveal d1 font-heading text-2xl md:text-3xl text-[#1a1a1a] uppercase text-center mb-12 leading-tight">
            Pourquoi un bon ouvre-porte?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <div key={b.title} className={`reveal-scale ${d[i]} bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col gap-3`}>
                <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center">{b.icon}</div>
                <p className="font-heading text-base text-[#1a1a1a] uppercase">{b.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. NOS MOTEURS ── */}
      <div id="moteurs">
        <MotorSection />
      </div>

      {/* ── 6. TÉLÉCOMMANDES ET ACCESSOIRES ── */}
      <section className="bg-brand py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <p className="reveal text-white/70 font-bold text-sm uppercase tracking-widest mb-3">Accessoires</p>
              <h2 className="reveal d1 font-heading text-2xl md:text-3xl text-white uppercase leading-tight mb-4">
                Télécommandes & accessoires
              </h2>
              <p className="reveal d2 text-white/80 text-base leading-relaxed mb-4">
                Nous vendons, programmons et réparons les télécommandes. Service rapide et professionnel.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {["Télécommandes universelles", "Programmation & remplacement", "Accessoires de sécurité", "Service de dépannage"].map((item, i) => (
                <div key={item} className={`reveal-scale ${d[i]} bg-white/15 border border-white/25 rounded-xl px-4 py-3`}>
                  <span className="text-white font-semibold text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. COMMENT ÇA MARCHE ── */}
      <section className="bg-[#1a1a1a] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="reveal text-brand font-bold text-sm uppercase tracking-widest mb-2 text-center">Le processus</p>
          <h2 className="reveal d1 font-heading text-2xl md:text-3xl text-white uppercase text-center mb-12 leading-tight">
            Comment ça marche?
          </h2>
          <div className="relative flex flex-col gap-6 max-w-2xl mx-auto">
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-brand/20" />
            {steps.map((s, i) => (
              <div key={s.num} className={`reveal ${d[i]} relative flex items-center gap-5`}>
                <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center flex-shrink-0 z-10">
                  <span className="text-white font-bold text-sm">{i + 1}</span>
                </div>
                <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                  <p className="font-heading text-white uppercase text-sm mb-1">{s.title}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. AVIS CLIENTS ── */}
      <ReviewsSection />

      {/* ── 9. CTA FINAL ── */}
      <section className="bg-brand py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="reveal font-heading text-2xl md:text-4xl text-white uppercase mb-4 leading-tight">
            Prêt à améliorer votre ouvre-porte?
          </h2>
          <p className="reveal d1 text-white/80 mb-10">Service rapide, professionnel et transparent.</p>
          <a
            href={PHONE_HREF}
            className="reveal d2 inline-flex items-center justify-center gap-3 bg-white text-brand font-heading text-lg uppercase px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg tracking-wide"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.18 21 3 13.82 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" /></svg>
            Réserver : {PHONE_DISPLAY}
          </a>
        </div>
      </section>
    </>
  );
}
