"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Erreur lors de la création du paiement");
      }
      const { url } = await res.json();
      if (!url) throw new Error("URL de paiement manquante");
      window.location.href = url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
      setLoading(false);
    }
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 transition group-hover:scale-105">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <span aria-hidden className="text-7xl">{product.emoji}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 inline-block w-fit rounded-full bg-[#cc0000]/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#cc0000]">
          {product.category}
        </span>
        <h3 className="font-heading text-xl text-[#1a1a1a]">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm text-gray-600">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-[#1a1a1a]">
            {formatPrice(product.priceCents)}
          </span>
        </div>
        <button
          onClick={handleBuy}
          disabled={loading}
          className="mt-4 w-full rounded-xl bg-[#cc0000] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#aa0000] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Redirection…" : "Acheter"}
        </button>
        {error && (
          <p className="mt-2 text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
