import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Paiement annulé — Experts Portes de Garage",
  robots: { index: false, follow: false },
};

export default function CancelPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-[#f5f5f5] to-white px-4 py-20">
      <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-4xl">
          ↩️
        </div>
        <h1 className="font-heading text-3xl uppercase text-[#1a1a1a] sm:text-4xl">
          Paiement annulé
        </h1>
        <p className="mt-4 text-gray-600">
          Aucune somme n&apos;a été débitée. Vous pouvez retourner à la
          boutique pour finaliser votre achat quand vous êtes prêt.
        </p>
        <div className="mt-8">
          <Link
            href="/produits"
            className="inline-block rounded-xl bg-[#cc0000] px-6 py-3 font-semibold text-white transition hover:bg-[#aa0000]"
          >
            Retour à la boutique
          </Link>
        </div>
      </div>
    </section>
  );
}
