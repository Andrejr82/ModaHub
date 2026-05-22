import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  gridClassName?: string;
  isFavorite: (productId: string) => boolean;
  onAddToCart: (product: Product, selectedSize?: string) => void;
  onToggleFavorite: (productId: string) => void;
}

export function ProductGrid({
  products,
  emptyMessage,
  gridClassName,
  isFavorite,
  onAddToCart,
  onToggleFavorite,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-10 text-center">
        <h3 className="text-xl font-semibold text-ink">Nenhum produto encontrado</h3>
        <p className="mt-2 text-neutral-600">{emptyMessage ?? "Ajuste a busca ou remova alguns filtros para ver mais opções."}</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ${gridClassName ?? ""}`.trim()}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} isFavorite={isFavorite(product.id)} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} />
      ))}
    </div>
  );
}
