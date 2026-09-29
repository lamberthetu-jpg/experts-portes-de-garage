import { getAllPageSlugs, getPageBySlug } from "@/lib/content";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PlanifierButton from "@/components/PlanifierButton";
import ReviewsSection from "@/components/ReviewsSection";
import FaqAccordion from "@/components/FaqAccordion";
import { PHONE_DISPLAY, PHONE_HREF, BUSINESS_NAME, EMAIL } from "@/lib/config";
import { pageSchema, jsonLdString } from "@/lib/schema";

const BASE_URL = "https://www.expertsportesdegarage.ca";
const HERO_BG = "/images/maison_garage_v1.png";
const LOGO_SRC = "/images/logo_experts.png";

const PAGE_IMAGES: Record<string, string> = {
  "a-propos": "/images/blog/technicien-avec-client.webp",
  "carriere": "/images/blog/blog-ouvre-porte-reparer.webp",
  "planifier-une-visite": "/images/blog/technicien-avec-client.webp",
  "reservation": "/images/blog/blog-choisir-porte.webp",
};

const CITY_IMAGES: Record<string, string> = {
  "portes-de-garage-granby": "/images/villes/ville-granby.webp",
  "portes-de-garage-saint-hyacinthe": "/images/villes/ville-saint-hyacinthe.webp",
  "portes-de-garage-magog": "/images/villes/ville-magog.webp",
  "portes-de-garage-saint-jean-sur-richelieu": "/images/villes/ville-saint-jean-sur-richelieu.webp",
  "portes-de-garage-bromont": "/images/villes/ville-bromont.webp",
  "portes-de-garage-waterloo": "/images/villes/ville-waterloo.webp",
  "portes-de-garage-beloeil": "/images/villes/ville-beloeil.webp",
};

const CITY_LINKS = [
  { label: "Granby", slug: "portes-de-garage-granby" },
  { label: "Saint-Hyacinthe", slug: "portes-de-garage-saint-hyacinthe" },
  { label: "Magog", slug: "portes-de-garage-magog" },
  { label: "Saint-Jean-sur-Richelieu", slug: "portes-de-garage-saint-jean-sur-richelieu" },
  { label: "Bromont", slug: "portes-de-garage-bromont" },
  { label: "Waterloo", slug: "portes-de-garage-waterloo" },
  { label: "Beloeil", slug: "portes-de-garage-beloeil" },
];

export async function generateStaticParams() {
  return getAllPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = getPageBySlug(slug);
  if (!page) return {};
  return {
    title: `${page.title} — Experts Portes de Garage`,
    description: page.excerpt,
    alternates: {
      canonical: `${BASE_URL}/${slug}`,
    },
    openGraph: {
      title: `${page.title} — Experts Portes de Garage`,
      description: page.excerpt ?? undefined,
      url: `${BASE_URL}/${slug}`,
      locale: "fr_CA",
      type: "website",
      images: [
        {
          url: "/images/maison_garage_v1.webp",
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
  };
}

export default async function SlugPage(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;
  const page = getPageBySlug(slug);
  if (!page) notFound();

  // Schema FAQPage pour rich snippets Google
  const faqSchema = page.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": page.faq.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a,
          },
        })),
      }
    : null;

  // La page renvoie a l'entreprise par son identifiant au lieu d'en
  // redeclarer une. Avant, chaque page de ville declarait un
  // LocalBusiness distinct : 15 commerces au meme nom pour une machine.
  // Le nom de ville se lit apres le « a » du titre : « Reparation de
  // Portes de Garage a Cowansville ». Pas de \b avant le « a » accentue :
  // en JavaScript \w est ASCII, donc la frontiere de mot ne s'applique pas
  // a un caractere accentue et le motif echouait en silence.
  const ville = / à /.test(page.title)
    ? page.title.split(/ à /).pop()?.trim()
    : undefined;
  const schemaPage = pageSchema({
    url: `${BASE_URL}/${slug}`,
    nom: page.title,
    description: page.excerpt,
    ville,
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": BASE_URL,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": page.title,
        "item": `${BASE_URL}/${slug}`,
      },
    ],
  };

  const isCityPage = slug.startsWith("portes-de-garage-");
  const otherCities = CITY_LINKS.filter((c) => c.slug !== slug);
  const cityImage = CITY_IMAGES[slug] ?? null;
  const heroImage = cityImage ?? PAGE_IMAGES[slug] ?? null;

  return (
    <>
      {/* ── JSON-LD SCHEMAS ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(schemaPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(faqSchema) }}
        />
      )}

      {/* ── 1. HERO ── */}
      <section className="relative bg-cover bg-center overflow-hidden">
        {heroImage ? (
          <Image src={heroImage} alt={page.title} fill className="object-cover" priority />
        ) : (
          <Image src={HERO_BG} alt={page.title} fill className="object-cover" priority />
        )}
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
              {page.excerpt && (
                <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {page.excerpt}
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
                <div className="px-5 pt-4 pb-4">
                  <p className="text-gray-600 leading-snug text-sm mb-4">
                    Faites-nous savoir ce dont vous avez besoin, choisissez le
                    moment qui vous convient le mieux, et nous serons sur place.
                  </p>
                  <PlanifierButton className="w-full bg-brand text-white font-bold py-2.5 px-4 rounded-lg hover:bg-brand-dark transition-colors text-sm">
                    Planifier une réparation
                  </PlanifierButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. INSPECTION BANNER ── */}

      {/* ── 3. MAIN CONTENT ── */}
      <div className="bg-white pt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-14">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ src, alt }) =>
                src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt={alt ?? ""}
                    className="rounded-lg max-w-full h-auto my-6 shadow-sm"
                  />
                ) : null,
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-brand font-semibold hover:underline"
                  {...(href?.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {children}
                </a>
              ),
              h1: ({ children }) => (
                <h1 className="font-heading text-3xl text-brand text-center mt-2 mb-8 uppercase">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="font-heading text-2xl text-brand mt-12 mb-4 pb-2 border-b-2 border-brand/20 uppercase">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-3">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-5 leading-relaxed text-gray-700 text-[1.02rem]">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-none pl-0 mb-6 flex flex-col gap-2 text-gray-700">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-brand" />
                  <span>{children}</span>
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-[#1a1a1a]">{children}</strong>
              ),
            }}
          >
            {page.bodyContent}
          </ReactMarkdown>

          {/* Mid-page CTA */}
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
                href={PHONE_HREF}
                className="border-2 border-brand text-brand font-bold px-5 py-3 rounded-lg hover:bg-brand hover:text-white transition-colors text-sm"
              >
                {PHONE_DISPLAY}
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

      {/* ── 6. LIENS INTERNES VILLES (pages villes seulement) ── */}
      {isCityPage && otherCities.length > 0 && (
        <section className="bg-muted py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading text-xl text-brand text-center uppercase mb-6">
              Nous desservons aussi
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {otherCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:border-brand hover:text-brand transition-colors shadow-sm"
                >
                  Porte de garage {city.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
