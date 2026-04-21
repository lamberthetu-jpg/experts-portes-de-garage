import { PRODUCTS } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function ProductsPageContent() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-[#f5f5f5] to-white pt-16 pb-10">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <span className="inline-block rounded-full bg-[#cc0000]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#cc0000]">
            Boutique en ligne
          </span>
          <h1 className="mt-4 font-heading text-4xl uppercase leading-tight text-[#1a1a1a] sm:text-5xl">
            Pièces et accessoires pour portes de garage
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Commandez directement en ligne les pièces dont vous avez besoin.
            Livraison rapide, paiement sécurisé par Stripe.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center sm:p-10">
          <h2 className="font-heading text-2xl uppercase text-[#1a1a1a]">
            Besoin d&apos;aide pour choisir la bonne pièce ?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-gray-600">
            Nos techniciens peuvent vous conseiller au téléphone. Appelez-nous
            pour une recommandation personnalisée ou pour un service
            d&apos;installation.
          </p>
          <a
            href="tel:4505585788"
            className="mt-5 inline-block rounded-xl bg-[#cc0000] px-6 py-3 font-semibold text-white transition hover:bg-[#aa0000]"
          >
            450-558-5788
          </a>
        </div>
      </section>
    </div>
  );
}
