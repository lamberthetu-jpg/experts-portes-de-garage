import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Commande confirmée — Experts Portes de Garage",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-[#f5f5f5] to-white px-4 py-20">
      <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-4xl">
          ✅
        </div>
        <h1 className="font-heading text-3xl uppercase text-[#1a1a1a] sm:text-4xl">
          Merci pour votre commande !
        </h1>
        <p className="mt-4 text-gray-600">
          Votre paiement a été confirmé. Vous recevrez un courriel de
          confirmation dans les prochaines minutes avec les détails de votre
          commande.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Notre équipe préparera votre commande dans les plus brefs délais.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/produits"
            className="rounded-xl bg-[#cc0000] px-6 py-3 font-semibold text-white transition hover:bg-[#aa0000]"
          >
            Retour à la boutique
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-[#1a1a1a] transition hover:bg-gray-50"
          >
            Accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
