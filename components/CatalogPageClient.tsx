"use client";

import { useMemo, useState } from "react";
import { Benefits } from "@/components/Benefits";
import { CartDrawer } from "@/components/CartDrawer";
import { Filters } from "@/components/Filters";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionTitle } from "@/components/SectionTitle";
import { categories } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { defaultFilterState, getVisibleProducts } from "@/lib/filter-products";
import type { FilterState, Product, ProductCategory, SortOption } from "@/types/product";

interface CatalogPageClientProps {
  searchParams?: Record<string, string | string[] | undefined>;
  products: Product[];
}

function buildFiltersFromParams(searchParams: URLSearchParams): { filters: FilterState; sort: SortOption } {
  const category = searchParams.get("category");
  const mode = searchParams.get("mode");
  const query = searchParams.get("q") ?? "";
  const sortParam = searchParams.get("sort");
  const nextFilters: FilterState = {
    ...defaultFilterState,
    query,
  };
  let nextSort: SortOption = "relevance";

  if (category) nextFilters.categories = [category as ProductCategory];
  if (searchParams.get("discount") === "1") nextFilters.discountOnly = true;
  if (searchParams.get("new") === "1") nextFilters.newOnly = true;
  if (searchParams.get("best") === "1") nextFilters.bestSellerOnly = true;

  switch (mode) {
    case "launches":
      nextFilters.newOnly = true;
      nextSort = "newest";
      break;
    case "sale":
      nextFilters.discountOnly = true;
      nextSort = "price-asc";
      break;
    case "kits":
      nextFilters.categories = ["Kits/Conjuntos"];
      break;
    case "best-sellers":
      nextFilters.bestSellerOnly = true;
      nextSort = "best-sellers";
      break;
    default:
      break;
  }

  if (sortParam && ["relevance", "price-asc", "price-desc", "best-sellers", "newest", "rating"].includes(sortParam)) {
    nextSort = sortParam as SortOption;
  }

  return { filters: nextFilters, sort: nextSort };
}

function normalizeSearchParams(searchParams?: Record<string, string | string[] | undefined>): URLSearchParams {
  const params = new URLSearchParams();
  if (!searchParams) return params;

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => params.append(key, entry));
      return;
    }
    if (typeof value === "string") params.set(key, value);
  });

  return params;
}

export function CatalogPageClient({ searchParams, products }: CatalogPageClientProps) {
  const initialState = useMemo(() => buildFiltersFromParams(normalizeSearchParams(searchParams)), [searchParams]);
  const [filters, setFilters] = useState<FilterState>(initialState.filters);
  const [sort, setSort] = useState<SortOption>(initialState.sort);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useCart();
  const wishlist = useWishlist();

  const visibleProducts = useMemo(() => getVisibleProducts(products, filters, sort), [filters, sort]);
  const brandNames = useMemo(() => Array.from(new Set(products.map((product) => product.brand))).sort(), []);
  const categoryNames = useMemo(() => categories.map((category) => category.name) as ProductCategory[], []);
  const sizes = useMemo(() => Array.from(new Set(products.flatMap((product) => product.sizes))).sort(), []);

  const setQuery = (query: string) => setFilters((current) => ({ ...current, query }));
  const addItem = (product: Product, selectedSize?: string) => {
    cart.addItem(product, selectedSize);
  };
  const openCart = () => {
    setIsCartOpen(true);
  };

  return (
    <main>
      <Header query={filters.query} cartCount={cart.itemCount} wishlistCount={wishlist.count} onQueryChange={setQuery} onOpenCart={openCart} />

      <section className="mx-auto max-w-7xl px-4 py-10" aria-labelledby="catalog-title">
        <div className="rounded-[2rem] bg-ink p-6 text-white md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-champagne">Catálogo ModaHub</p>
          <h1 id="catalog-title" className="mt-3 text-4xl font-black md:text-6xl">Encontre as peças do seu estilo</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">
            Busque por categoria, marca, tamanho, faixa de preço e ofertas para montar o look do seu jeito.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8" aria-label="Catálogo com filtros">
        <SectionTitle eyebrow="Refine sua busca" title="Escolha por categoria, marca ou tamanho" description="Use os filtros para chegar mais rápido às peças, kits e ofertas que combinam com você." action={`${visibleProducts.length} produtos`} />
        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
          <Filters filters={filters} brands={brandNames} categories={categoryNames} sizes={sizes} sort={sort} total={visibleProducts.length} onFiltersChange={setFilters} onSortChange={setSort} />
          <ProductGrid products={visibleProducts} gridClassName="xl:grid-cols-2 2xl:grid-cols-3" emptyMessage="Não encontramos produtos com esses critérios. Experimente buscar por camisa, cargo, boné, Asfalto Studio ou limpar filtros." isFavorite={wishlist.isFavorite} onAddToCart={addItem} onToggleFavorite={wishlist.toggleFavorite} />
        </div>
      </section>

      <Benefits />
      <Footer />
      <CartDrawer isOpen={isCartOpen} items={cart.items} subtotal={cart.subtotal} onClose={() => setIsCartOpen(false)} onRemove={cart.removeItem} onUpdateQuantity={cart.updateQuantity} />
    </main>
  );
}
