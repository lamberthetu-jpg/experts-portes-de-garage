import { getAllBlogSlugs, getBlogPostBySlug, getAllBlogPosts } from "@/lib/content";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF, BUSINESS_NAME } from "@/lib/config";
import PlanifierButton from "@/components/PlanifierButton";

const BLOG_IMAGES: Record<string, string> = {
  "ressort-porte-garage-brise": "/images/blog/blog-ressort-brise.webp",
  "entretien-porte-garage-hiver-quebec": "/images/blog/blog-entretien-hiver.webp",
  "signes-porte-garage-besoin-entretien": "/images/blog/blog-signes-usure.webp",
  "ouvre-porte-garage-reparer-ou-remplacer": "/images/blog/blog-ouvre-porte-reparer.webp",
  "ouvre-porte-garage-wifi-guide": "/images/blog/blog-ouvre-porte-wifi.webp",
  "choisir-porte-garage-quebec": "/images/blog/blog-choisir-porte.webp",
  "cout-reparation-porte-garage-quebec": "/images/blog/technicien-avec-client.webp",
};

const BASE_URL = "https://www.expertsportesdegarage.ca";

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${BUSINESS_NAME}`,
    description: post.excerpt,
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      locale: "fr_CA",
      images: [
        {
          url: "/images/maison_garage_v1.webp",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();
  const featuredImage = BLOG_IMAGES[slug] ?? null;

  const allPosts = getAllBlogPosts().filter((p) => p.slug !== slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": BUSINESS_NAME,
      "url": BASE_URL,
    },
    "publisher": {
      "@type": "Organization",
      "name": BUSINESS_NAME,
      "url": BASE_URL,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "Blogue", "item": `${BASE_URL}/blog` },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `${BASE_URL}/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-[#1a1a1a]" />
        )}
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <nav className="text-sm text-white/50 mb-5 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blogue</Link>
            <span>/</span>
            <span className="text-white/80 line-clamp-1">{post.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="bg-brand/15 border border-brand/30 text-brand text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-white/50 text-xs">{post.readTime} de lecture</span>
            <span className="text-white/50 text-xs">
              {new Date(post.date).toLocaleDateString("fr-CA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="font-heading text-2xl md:text-4xl text-white uppercase leading-tight">
            {post.title}
          </h1>
          <p className="text-white/65 mt-4 text-base leading-relaxed">{post.excerpt}</p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <div className="bg-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
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
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-brand font-semibold hover:underline"
                  {...(href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {children}
                </a>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-8">
                  <table className="w-full border-collapse text-sm">{children}</table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-brand text-white">{children}</thead>
              ),
              th: ({ children }) => (
                <th className="px-4 py-3 text-left font-semibold">{children}</th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-3 border-b border-gray-100 text-gray-700">{children}</td>
              ),
              tr: ({ children }) => (
                <tr className="even:bg-gray-50">{children}</tr>
              ),
              hr: () => <hr className="my-10 border-gray-200" />,
            }}
          >
            {post.content}
          </ReactMarkdown>

          {/* CTA inline */}
          <div className="mt-10 bg-[#f5f5f5] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-heading text-lg text-brand uppercase mb-1">
                Besoin d&apos;un technicien?
              </p>
              <p className="text-gray-500 text-sm">
                Intervention rapide en Estrie et Montérégie, urgence 24/7.
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

      {/* ── ARTICLES SUGGÉRÉS ── */}
      {allPosts.length > 0 && (
        <section className="bg-[#f5f5f5] py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading text-2xl text-brand uppercase text-center mb-8">
              Articles connexes
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {allPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand mb-2 block">
                    {related.category}
                  </span>
                  <h3 className="font-bold text-[#1a1a1a] text-sm leading-snug group-hover:text-brand transition-colors mb-2">
                    {related.title}
                  </h3>
                  <span className="text-brand text-xs font-semibold group-hover:underline">
                    Lire →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
