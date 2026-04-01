import { getPageBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PlanifierButton from "@/components/PlanifierButton";
import ReviewsSection from "@/components/ReviewsSection";
import FaqAccordion from "@/components/FaqAccordion";
import GallerySection from "@/components/GallerySection";

const SLUG = "reparation-urgente-de-porte-de-garage";

const HERO_BG =
  "/images/gallery-5.webp";
const LOGO_SRC =
  "/images/logo.webp";

function extractFullExcerpt(raw: string): string {
  const lines = raw.split("\n");
  let collecting = false;
  const paragraphLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (collecting && paragraphLines.length > 0) break;
      continue;
    }
    if (trimmed.startsWith("#") || trimmed.startsWith("![]") || trimmed.startsWith("Planifier")) {
      if (collecting) break;
      continue;
    }
    collecting = true;
    paragraphLines.push(trimmed);
  }

  return paragraphLines
    .join(" ")
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
}

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageBySlug(SLUG);
  if (!page) return {};
  return {
    title: `${page.title} — Experts Portes de Garage`,
    description: page.excerpt,
  };
}

export default function ReparationUrgenteDePorteDeGaragePage() {
  const page = getPageBySlug(SLUG);
  if (!page) notFound();

  const heroExcerpt = extractFullExcerpt(page.content);

  return (
    <>
      {/* ── 1. HERO ── */}
      <section
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      >
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 md:pt-20 pb-10">
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14">
            {/* Left — title + excerpt */}
            <div className="flex-1 text-center lg:text-left">
              <nav className="text-sm text-white/60 mb-5 flex items-center gap-2 justify-center lg:justify-start">
                <Link href="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
                <span>/</span>
                <span className="text-white/80">{page.title}</span>
              </nav>
              <h1 className="font-heading text-3xl md:text-4xl text-white uppercase leading-tight mb-5">
                {page.title}
              </h1>
              {heroExcerpt && (
                <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {heroExcerpt}
                </p>
              )}
            </div>

            {/* Right — booking card */}
            <div className="w-full lg:min-w-[420px] lg:w-[420px] shrink-0">
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-brand px-5 py-4 flex items-center justify-between gap-3">
                  <Image
                    src={LOGO_SRC}
                    alt="Experts Portes de Garage"
                    width={160}
                    height={52}
                    className="h-10 w-auto object-contain brightness-0 invert shrink-0"
                  />
                  <span className="font-heading text-white text-sm text-right leading-tight uppercase">
                    Réservez votre service
                  </span>
                </div>
                <div className="bg-brand-dark px-5 py-2">
                  <p className="text-white/90 text-xs text-center font-medium">
                    Service rapide de porte de garage — Réparation ou remplacement.
                  </p>
                </div>
                <div className="px-5 pt-4 pb-0">
                  <p className="text-gray-600 leading-snug text-sm mb-3">
                    Faites-nous savoir ce dont vous avez besoin, choisissez le
                    moment qui vous convient le mieux, et nous serons sur place.
                  </p>
                  <div className="flex items-end gap-3">
                    <div className="flex-1 pb-4">
                      <PlanifierButton className="w-full bg-brand text-white font-bold py-2.5 px-4 rounded-lg hover:bg-brand-dark transition-colors text-sm">
                        Planifier une réparation
                      </PlanifierButton>
                    </div>
                    <div className="w-24 shrink-0 flex items-end justify-center">
                      <Image
                        src="/images/equipe.webp"
                        alt=""
                        width={96}
                        height={130}
                        className="h-32 w-auto object-contain object-bottom"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. URGENT BANNER ── */}
      <section className="bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-heading text-white text-xl md:text-2xl uppercase tracking-wide mb-1">
              VOTRE PORTE EST BLOQUÉE? ON SE DÉPLACE AUJOURD&apos;HUI!
            </p>
            <p className="text-gray-400 text-sm">
              Service d&apos;urgence 24h/24 — nos techniciens interviennent le jour même.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:4505585788"
              className="bg-brand text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors text-sm whitespace-nowrap shadow-sm text-center"
            >
              Appelez maintenant
            </a>
            <a
              href="tel:4505585788"
              className="border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white hover:text-[#1a1a1a] transition-colors text-sm whitespace-nowrap text-center"
            >
              450-558-5788
            </a>
          </div>
        </div>
      </section>

      {/* ── 3. MAIN CONTENT ── */}
      <div className="bg-white pt-10">

        {/* Intro section */}
        <div className="px-8 md:px-16 py-4 text-center">
          <h2 className="font-heading text-2xl text-brand mt-4 mb-4 pb-2 border-b-2 border-brand/20 uppercase">
            Signes que vous avez besoin d&apos;une réparation urgente de porte de garage
          </h2>
          <p className="mb-5 leading-relaxed text-gray-700 text-[1.02rem]">
            Votre porte de garage est coincée, fait des bruits étranges ou refuse d&apos;ouvrir ou de fermer&nbsp;? Les pannes arrivent presque toujours au pire moment — vous laissant bloqué à l&apos;extérieur ou compromettant la sécurité de votre maison. Voici quelques-unes des raisons les plus fréquentes nécessitant une réparation urgente de porte de garage&nbsp;:
          </p>
        </div>

        {/* ── Hardcoded image+text sections ── */}
        {[
          {
            img: "/images/coupe-froid/joint_de_bas_de_portes_de_garage.jpg",
            title: "Votre porte de garage ne s'ouvre plus ou ne se ferme plus ?",
            content: `Plusieurs causes peuvent expliquer ce problème. L'une des plus fréquentes est une défaillance de la roue d'entraînement principale du moteur, souvent causée par une porte déséquilibrée, une chaîne ou une courroie trop tendue, une utilisation fréquente ou simplement l'usure avec le temps. D'autres raisons possibles incluent des capteurs mal alignés, un problème électrique ou un moteur défectueux.\n\nAvant d'appeler un technicien, assurez-vous que l'ouvre-porte est bien branché et que les capteurs de sécurité ne sont pas obstrués. Si le problème persiste, une inspection professionnelle est fortement recommandée.`,
            list: null as string[] | null,
          },
          {
            img: "/images/gallery-2.webp",
            title: "Votre porte de garage est coincée ou bloquée",
            content: `Une porte de garage fonctionne grâce à plusieurs composantes qui doivent être parfaitement synchronisées. Lorsqu'elle se bloque ou se coince, une réparation urgente devient souvent nécessaire.\n\nIl est probable que les ressorts soient brisés. Évitez de forcer l'ouverture ou la fermeture — cela pourrait aggraver les dommages.`,
            list: [
              "Câbles défectueux ou brisés",
              "Système de poulies usé ou endommagé",
              "Rails tordus, obstrués ou désalignés",
              "Ressorts cassés",
            ],
          },
          {
            img: "/images/urgence.webp",
            title: "Le type de bruit peut souvent révéler la cause du problème",
            content: `Si le bruit persiste, une réparation urgente est généralement nécessaire.`,
            list: [
              "Claquements (popping) – Souvent causés par des roulettes usées ou détériorées.",
              "Grincements (squeaking) – Indiquent généralement un manque de lubrification.",
              "Frottements ou grattements (scraping/grinding) – Peuvent être dus à un câble effiloché ou des rails désalignés.",
            ],
          },
          {
            img: "/images/coupe-froid/coupe_froid_de_cote.jpg",
            title: "Votre télécommande de porte de garage ne fonctionne plus ?",
            content: `Si votre porte et votre ouvre-porte semblent en bon état, mais que la télécommande ne répond plus, le problème peut provenir de plusieurs causes :\n\nEssayez de remplacer les piles, de reprogrammer la télécommande ou de vous rapprocher de l'ouvre-porte lorsque vous l'utilisez. Si le problème persiste, il est conseillé de faire appel à un technicien pour un diagnostic et une réparation professionnelle.`,
            list: [
              "Piles faibles ou déchargées – C'est la cause la plus simple et la plus fréquente.",
              "Interférences de signal – D'autres appareils sans fil à la maison peuvent perturber la communication.",
              "Erreur de programmation – La télécommande doit peut-être être reprogrammée pour se synchroniser avec l'ouvre-porte.",
              "Récepteur défectueux – Si le bouton mural fonctionne mais pas la télécommande, le problème vient probablement du récepteur de l'ouvre-porte.",
            ],
          },
        ].map((section, idx) => (
          <div key={idx} className="max-w-5xl mx-auto px-6 md:px-10 mb-12 flex flex-col sm:flex-row items-start gap-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={section.img}
              alt={section.title}
              className="w-64 h-48 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h2 className="font-heading text-xl text-brand mb-3 pb-1 border-b-2 border-brand/20 uppercase">
                {section.title}
              </h2>
              {section.content.split("\n\n").map((para, i, arr) =>
                section.list && i === 0 && arr.length > 1 ? (
                  // First paragraph shown before list when there are multiple paragraphs
                  <p key={i} className="mb-4 leading-relaxed text-gray-700 text-[1.02rem]">{para}</p>
                ) : null
              )}
              {section.list && (
                <ul className="list-none pl-0 mb-4 flex flex-col gap-2 text-gray-700">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.content.split("\n\n").map((para, i, arr) =>
                !section.list || i > 0 || arr.length === 1 ? (
                  <p key={i} className="mb-4 leading-relaxed text-gray-700 text-[1.02rem]">{para}</p>
                ) : null
              )}
            </div>
          </div>
        ))}

        {/* Mid-page CTA */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-14">
          <div className="mt-6 bg-muted rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-heading text-lg text-brand uppercase mb-1">
                Prêt à planifier votre service?
              </p>
              <p className="text-gray-500 text-sm">
                Nos techniciens se déplacent rapidement partout en Estrie et Montérégie.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <PlanifierButton className="bg-brand text-white font-bold px-5 py-3 rounded-lg hover:bg-brand-dark transition-colors text-sm">
                Planifier maintenant
              </PlanifierButton>
              <a
                href="tel:4505585788"
                className="border-2 border-brand text-brand font-bold px-5 py-3 rounded-lg hover:bg-brand hover:text-white transition-colors text-sm"
              >
                450-558-5788
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. REVIEWS ── */}
      <ReviewsSection />

      {/* ── 5. FAQ ACCORDION ── */}
      {page.faq.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading text-2xl md:text-3xl text-brand text-center uppercase mb-10">
              Foire aux questions
            </h2>
            <FaqAccordion items={page.faq} />
          </div>
        </section>
      )}

      {/* ── 6. GALLERY ── */}
      <GallerySection />
    </>
  );
}
