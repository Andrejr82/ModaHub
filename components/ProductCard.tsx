import { calculateDiscountPercentage, calculateInstallmentValue, formatCurrency, getStockLabel } from "@/lib/format";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
}

export function ProductCard({ product, isFavorite, onAddToCart, onToggleFavorite }: ProductCardProps) {
  const discount = calculateDiscountPercentage(product.price, product.oldPrice);
  const stockLabel = getStockLabel(product.stock);
  const installmentValue = calculateInstallmentValue(product.price, product.installments);
  const isOutOfStock = product.stock <= 0;

  return (
    <article className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className={`relative flex aspect-[4/5] items-end overflow-hidden bg-gradient-to-br ${product.palette} p-4`} role="img" aria-label={product.imageAlt}>
        <div className="absolute inset-x-8 top-12 h-56 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute left-3 top-3 flex max-w-[70%] flex-wrap gap-2">
          {product.isBestSeller ? <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">Best-seller</span> : null}
          {product.isNew || product.isLaunch ? <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">Novo</span> : null}
          {discount > 0 ? <span className="rounded-full bg-red-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">-{discount}%</span> : null}
          {product.freeShipping ? <span className="rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">Frete grátis</span> : null}
          {product.stock > 0 && product.stock <= 5 ? <span className="rounded-full bg-amber-300 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">Últimas unidades</span> : null}
        </div>
        <button
          type="button"
          aria-label={isFavorite ? `Remover ${product.name} da wishlist` : `Adicionar ${product.name} à wishlist`}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(product.id)}
          className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-2 text-lg shadow-sm transition hover:bg-ink hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
        >
          {isFavorite ? "♥" : "♡"}
        </button>
        <div className="relative w-full rounded-3xl border border-white/50 bg-white/80 p-4 backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">{product.collection}</p>
          <div className="mt-3 h-24 rounded-2xl border border-white/70 bg-gradient-to-br from-white/70 to-white/20 shadow-inner" aria-hidden />
          <p className="mt-3 text-sm font-semibold text-ink">{product.category} • {product.subcategory}</p>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">{product.brand}</p>
          <h3 className="mt-1 text-lg font-black leading-tight text-ink">{product.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">{product.description}</p>
        </div>
        <div className="flex flex-wrap gap-2" aria-label={`Tamanhos disponíveis: ${product.sizes.join(", ")}`}>
          {product.sizes.slice(0, 5).map((size) => (
            <span key={size} className="rounded-full border border-neutral-300 px-2.5 py-1 text-xs font-semibold text-neutral-700">{size}</span>
          ))}
        </div>
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
          onClick={() => onAddToCart(product)}
          disabled={isOutOfStock}
          className="w-full rounded-full bg-ink px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          {isOutOfStock ? "Esgotado" : "Comprar"}
        </button>
      </div>
    </article>
  );
}
