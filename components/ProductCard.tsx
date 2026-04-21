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
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <span aria-hidden className="text-7xl">
            {product.emoji}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 inline-block w-fit rounded-full bg-[#cc0000]/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#cc0000]">
          {product.category}
        </span>
        <Link href={`/produits/${product.id}`} className="group/title">
          <h3 className="font-heading text-xl text-[#1a1a1a] transition group-hover/title:text-[#cc0000]">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-3">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-[#1a1a1a]">
            {formatPrice(product.priceCents)}
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <Link
            href={`/produits/${product.id}`}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#1a1a1a] transition hover:border-[#cc0000] hover:text-[#cc0000]"
          >
            Voir détails
          </Link>
          <BuyButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}
