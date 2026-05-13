import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
}

export function ProductCard({ product, isFavorite, onAddToCart, onToggleFavorite }: ProductCardProps) {
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <article className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className={`relative flex aspect-[4/5] items-end bg-gradient-to-br ${product.palette} p-5`} role="img" aria-label={product.imageAlt}>
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.isBestSeller ? <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">Best-seller</span> : null}
          {product.isNew ? <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink">Novo</span> : null}
          {product.hasDiscount ? <span className="rounded-full bg-clay px-3 py-1 text-xs font-semibold text-white">-{discount}%</span> : null}
        </div>
        <button
          type="button"
          aria-label={isFavorite ? `Remover ${product.name} da wishlist` : `Adicionar ${product.name} à wishlist`}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(product.id)}
          className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-2 text-lg shadow-sm transition hover:bg-ink hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
        >
          {isFavorite ? "♥" : "♡"}
        </button>
        <div className="rounded-2xl bg-white/70 p-4 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">{product.category}</p>
          <p className="mt-1 text-lg font-semibold text-ink">{product.subcategory}</p>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="text-sm font-semibold text-clay">{product.brand}</p>
          <h3 className="mt-1 text-lg font-semibold text-ink">{product.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">{product.description}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xl font-bold text-ink">{formatCurrency(product.price)}</p>
            {product.oldPrice ? <p className="text-sm text-neutral-500 line-through">{formatCurrency(product.oldPrice)}</p> : null}
          </div>
          <p className="text-sm font-medium text-neutral-700" aria-label={`${product.rating} de 5 estrelas`}>
            ★ {product.rating} <span className="text-neutral-400">({product.reviewCount})</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          disabled={product.stock <= 0}
          className="w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
}
