import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import BuyButton from "./BuyButton";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/produits/${product.id}`}
        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 transition group-hover:scale-105"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-3 sm:p-4"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <span aria-hidden className="text-5xl sm:text-7xl">
            {product.emoji}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <span className="mb-2 inline-block w-fit rounded-full bg-[#cc0000]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#cc0000] sm:px-2.5 sm:text-xs">
          {product.category}
        </span>
        <Link href={`/produits/${product.id}`} className="group/title">
          <h3 className="font-heading text-sm leading-tight text-[#1a1a1a] transition group-hover/title:text-[#cc0000] sm:text-xl">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 hidden flex-1 text-sm text-gray-600 line-clamp-3 sm:block">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between sm:mt-4">
          <span className="text-lg font-bold text-[#1a1a1a] sm:text-2xl">
            {formatPrice(product.priceCents)}
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-2 sm:mt-4">
          <Link
            href={`/produits/${product.id}`}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-xs font-semibold text-[#1a1a1a] transition hover:border-[#cc0000] hover:text-[#cc0000] sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
          >
            Voir détails
          </Link>
          <BuyButton
            productId={product.id}
            className="w-full rounded-lg bg-[#cc0000] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-[#aa0000] disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
