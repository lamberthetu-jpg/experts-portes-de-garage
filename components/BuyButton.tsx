"use client";

import { useState } from "react";

type Props = {
  productId: string;
  className?: string;
  label?: string;
};

export default function BuyButton({
  productId,
  className,
  label = "Acheter",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
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
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleBuy}
        disabled={loading}
        className={
          className ??
          "w-full rounded-xl bg-[#cc0000] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#aa0000] disabled:cursor-not-allowed disabled:opacity-60"
        }
      >
        {loading ? "Redirection…" : label}
      </button>
      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
