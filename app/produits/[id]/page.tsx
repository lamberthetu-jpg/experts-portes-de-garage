import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuyButton from "@/components/BuyButton";
import {
  PRODUCTS,
  formatPrice,
  getAllProductIds,
  getProduct,
} from "@/lib/products";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/config";

const BASE_URL = "https://www.expertsportesdegarage.ca";

export async function generateStaticParams() {
  return getAllProductIds().map((id) => ({ id }));
}

export async function generateMetadata(
  props: PageProps<"/produits/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const product = getProduct(id);
  if (!product) return {};
  const title = `${product.name} — ${formatPrice(product.priceCents)} | Experts Portes de Garage`;
  return {
    title,
    description: product.description,
    alternates: { canonical: `${BASE_URL}/produits/${id}` },
    openGraph: {
      title: product.name,
      description: product.description,
      url: `${BASE_URL}/produits/${id}`,
      type: "website",
      locale: "fr_CA",
      images: product.image ? [{ url: product.image, alt: product.name }] : [],
    },
  };
}

export default async function ProductDetailPage(
  props: PageProps<"/produits/[id]">,
) {
  const { id } = await props.params;
  const product = getProduct(id);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.id !== id).slice(0, 3);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    ...(product.image ? { image: `${BASE_URL}${product.image}` } : {}),
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/produits/${id}`,
      priceCurrency: "CAD",
      price: (product.priceCents / 100).toFixed(2),
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Boutique",
        item: `${BASE_URL}/produits`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${BASE_URL}/produits/${id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-[#f5f5f5] pb-16">
        {/* Breadcrumbs */}
        <nav className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <li>
              <Link href="/" className="hover:text-[#cc0000]">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/produits" className="hover:text-[#cc0000]">
                Boutique
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-400">{product.category}</li>
            <li>/</li>
            <li className="line-clamp-1 font-semibold text-[#1a1a1a]">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Product details */}
        <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
              {/* LEFT: Image */}
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-8"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <span aria-hidden className="text-9xl">
                    {product.emoji}
                  </span>
                )}
              </div>

              {/* RIGHT: Info */}
              <div className="flex flex-col">
                <span className="mb-3 inline-block w-fit rounded-full bg-[#cc0000]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#cc0000]">
                  {product.category}
                </span>

                <h1 className="font-heading text-3xl uppercase text-[#1a1a1a] sm:text-4xl">
                  {product.name}
                </h1>

                <p className="mt-4 text-base text-gray-600">
                  {product.description}
                </p>

                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-[#1a1a1a]">
                    {formatPrice(product.priceCents)}
                  </span>
                  <span className="text-sm text-gray-500">CAD</span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-green-700">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">En stock</span>
                  <span className="text-gray-500">— expédition rapide</span>
                </div>

                {product.features && product.features.length > 0 && (
                  <ul className="mt-6 flex flex-col gap-2">
                    {product.features.slice(0, 5).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#cc0000]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-8">
                  <BuyButton
                    productId={product.id}
                    label="Acheter maintenant"
                    className="w-full rounded-xl bg-[#cc0000] px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-[#aa0000] disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#1a1a1a]">
                    <svg
                      className="h-4 w-4 text-[#cc0000]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Options de livraison
                  </p>
                  <ul className="mt-2 flex flex-col gap-1 text-xs text-gray-600">
                    <li className="flex justify-between">
                      <span>Ramassage en magasin (Granby)</span>
                      <span className="font-semibold text-green-700">Gratuit</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Livraison Estrie / Montérégie</span>
                      <span className="font-semibold">19,99 $</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 flex items-center justify-center gap-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Paiement sécurisé Stripe
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Garantie fabricant
                  </span>
                </div>
              </div>
            </div>

            {/* Description longue + specs */}
            {(product.longDescription ||
              product.features ||
              product.specs) && (
              <div className="border-t border-gray-100 bg-gray-50 p-6 md:p-10">
                <div className="grid gap-10 md:grid-cols-2">
                  {/* Description */}
                  {product.longDescription && (
                    <div>
                      <h2 className="font-heading text-xl uppercase text-[#1a1a1a]">
                        Description
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-gray-700">
                        {product.longDescription}
                      </p>
                      {product.features && product.features.length > 0 && (
                        <>
                          <h3 className="mt-6 font-bold text-[#1a1a1a]">
                            Caractéristiques
                          </h3>
                          <ul className="mt-3 flex flex-col gap-2">
                            {product.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-2 text-sm text-gray-700"
                              >
                                <svg
                                  className="mt-0.5 h-4 w-4 shrink-0 text-[#cc0000]"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  )}

                  {/* Specs */}
                  {product.specs && Object.keys(product.specs).length > 0 && (
                    <div>
                      <h2 className="font-heading text-xl uppercase text-[#1a1a1a]">
                        Spécifications techniques
                      </h2>
                      <dl className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
                        {Object.entries(product.specs).map(
                          ([key, value], idx, arr) => (
                            <div
                              key={key}
                              className={`flex justify-between px-4 py-3 text-sm ${
                                idx !== arr.length - 1
                                  ? "border-b border-gray-100"
                                  : ""
                              } ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                            >
                              <dt className="font-semibold text-gray-700">
                                {key}
                              </dt>
                              <dd className="text-right text-gray-900">
                                {value}
                              </dd>
                            </div>
                          ),
                        )}
                      </dl>

                      <div className="mt-6 rounded-xl border border-[#cc0000]/20 bg-[#cc0000]/5 p-4">
                        <p className="text-sm font-bold text-[#1a1a1a]">
                          Des questions sur ce produit ?
                        </p>
                        <p className="mt-1 text-xs text-gray-600">
                          Notre équipe vous aide à choisir la bonne pièce pour
                          votre porte.
                        </p>
                        <a
                          href={PHONE_HREF}
                          className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#cc0000] hover:underline"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          {PHONE_DISPLAY}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6">
            <h2 className="font-heading text-2xl uppercase text-[#1a1a1a]">
              Ça pourrait aussi vous intéresser
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/produits/${p.id}`}
                  className="group flex gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-[#cc0000] hover:shadow-md"
                >
                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-contain p-1"
                        sizes="80px"
                      />
                    ) : (
                      <span aria-hidden className="text-3xl">
                        {p.emoji}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <h3 className="text-sm font-semibold text-[#1a1a1a] group-hover:text-[#cc0000] line-clamp-2">
                      {p.name}
                    </h3>
                    <span className="text-base font-bold text-[#1a1a1a]">
                      {formatPrice(p.priceCents)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
