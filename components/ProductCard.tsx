import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProductArtwork } from "@/components/ProductArtwork";
import { calculateDiscountPercentage, calculateInstallmentValue, formatCurrency, getStockLabel } from "@/lib/format";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onAddToCart: (product: Product, selectedSize?: string) => void;
  onToggleFavorite: (productId: string) => void;
}

export function ProductCard({ product, isFavorite, onAddToCart, onToggleFavorite }: ProductCardProps) {
  const hasSingleSize = product.sizes.length <= 1;
  const [selectedSize, setSelectedSize] = useState<string | undefined>(hasSingleSize ? (product.sizes[0] ?? "Único") : undefined);
  const discount = calculateDiscountPercentage(product.price, product.oldPrice);
  const stockLabel = getStockLabel(product.stock);
  const installmentValue = calculateInstallmentValue(product.price, product.installments);
  const isOutOfStock = product.stock <= 0;
  const needsSizeSelection = !hasSingleSize && !selectedSize;
  const badges = [
    product.isBestSeller ? { label: "Best-seller", className: "bg-ink text-white" } : null,
    product.isNew || product.isLaunch ? { label: "Novo", className: "bg-white text-ink" } : null,
    discount > 0 ? { label: `-${discount}%`, className: "bg-red-600 text-white" } : null,
    product.freeShipping ? { label: "Frete grátis", className: "bg-emerald-600 text-white" } : null,
    product.stock > 0 && product.stock <= 5 ? { label: "Últimas unidades", className: "bg-amber-300 text-ink" } : null,
  ].filter(Boolean) as { label: string; className: string }[];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/produto/${product.id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-inset">
        <div
          className="relative flex aspect-[4/5] min-h-[320px] overflow-hidden bg-gradient-to-br from-[#efe8de] via-[#f7f2ea] to-[#e6dacb] p-5 pt-16"
          role="img"
          aria-label={product.imageAlt}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.95),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(111,75,58,0.08),transparent_28%)]" />
          <div className="absolute inset-x-8 top-14 h-40 rounded-full bg-white/70 blur-3xl" />
          <div className="absolute inset-x-3 top-3 right-16">
            <div className="flex max-w-full flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow-sm ${badge.className}`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
          <div className="relative mt-auto flex w-full flex-1 flex-col justify-end pt-20">
            {!product.image.startsWith("gradient://") ? (
              <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/60 shadow-[0_22px_55px_rgba(15,23,42,0.14)]">
                <Image src={product.image} alt={product.imageAlt} fill className="object-cover" />
              </div>
            ) : (
              <ProductArtwork product={product} className="mx-auto h-40 w-[78%] border border-white/60 shadow-[0_22px_55px_rgba(15,23,42,0.14)]" />
            )}
            <div className="mt-5 rounded-[1.75rem] border border-white/80 bg-white/70 px-4 py-4 text-ink shadow-sm backdrop-blur-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-neutral-500">{product.collection}</p>
              <p className="mt-3 text-sm font-semibold text-ink">{product.category} • {product.subcategory}</p>
            </div>
          </div>
        </div>
      </Link>

      <button
        type="button"
        aria-label={isFavorite ? `Remover ${product.name} da wishlist` : `Adicionar ${product.name} à wishlist`}
        aria-pressed={isFavorite}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleFavorite(product.id);
        }}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/95 px-3 py-2 text-lg shadow-sm transition hover:bg-ink hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
      >
        {isFavorite ? "♥" : "♡"}
      </button>

      <div className="flex flex-1 flex-col space-y-4 p-5">
        <div>
          <Link href={`/produto/${product.id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-inset">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">{product.brand}</p>
            <h3 className="mt-1 text-lg font-black leading-tight text-ink group-hover:text-clay transition-colors">{product.name}</h3>
          </Link>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">{product.description}</p>
        </div>
        <div className="flex flex-wrap gap-2" aria-label={`Tamanhos disponíveis: ${product.sizes.join(", ")}`}>
          {product.sizes.slice(0, 5).map((size) => (
            <button
              key={size}
              type="button"
              aria-pressed={selectedSize === size}
              aria-label={`Selecionar tamanho ${size} para ${product.name}`}
              onClick={() => setSelectedSize(size)}
              className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-clay ${
                selectedSize === size ? "border-ink bg-ink text-white" : "border-neutral-300 text-neutral-700 hover:border-ink"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        {!hasSingleSize ? (
          <p className={`text-sm font-semibold ${selectedSize ? "text-emerald-700" : "text-neutral-500"}`}>
            {selectedSize ? `Tamanho selecionado: ${selectedSize}` : "Escolha o tamanho para comprar"}
          </p>
        ) : null}
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className={`font-bold ${isOutOfStock ? "text-red-700" : product.stock <= 5 ? "text-amber-700" : "text-emerald-700"}`}>{stockLabel}</span>
          <span className="font-medium text-neutral-700" aria-label={`${product.rating} de 5 estrelas`}>★ {product.rating} <span className="text-neutral-400">({product.reviewCount})</span></span>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-black text-ink">{formatCurrency(product.price)}</p>
            {product.oldPrice ? <p className="text-sm text-neutral-500 line-through">{formatCurrency(product.oldPrice)}</p> : null}
          </div>
          <p className="mt-1 text-sm font-semibold text-neutral-700">{product.installments}x de {formatCurrency(installmentValue)} sem juros</p>
        </div>
        <button
          type="button"
          onClick={() => onAddToCart(product, selectedSize)}
          disabled={isOutOfStock || needsSizeSelection}
          className="mt-auto w-full rounded-full bg-ink px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-white/80"
        >
          {isOutOfStock ? "Esgotado" : needsSizeSelection ? "Escolha o tamanho" : "Comprar"}
        </button>
      </div>
    </article>
  );
}
