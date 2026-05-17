"use client";

import { useMemo, useState } from "react";
import { Benefits } from "@/components/Benefits";
import { CartDrawer } from "@/components/CartDrawer";
import { CategoryCard } from "@/components/CategoryCard";
import { Filters } from "@/components/Filters";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Newsletter } from "@/components/Newsletter";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionTitle } from "@/components/SectionTitle";
import { categories, products } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { defaultFilterState, getVisibleProducts } from "@/lib/filter-products";
import type { FilterState, ProductCategory, SortOption } from "@/types/product";

const instagramPosts = [
  ["Look cargo completo", "Cliente fictício: 'A calça veste solta e ficou pronta com a oversized.'"],
  ["Drop de acessórios", "Cliente fictício: 'A shoulder bag virou minha peça de todo dia.'"],
  ["Conjunto premium", "Cliente fictício: 'Comprei o kit e resolvi o look inteiro.'"],
  ["Resort urbano", "Cliente fictício: 'Camisa leve, bonita e fácil de combinar.'"],
];

export default function Home() {
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);
  const [sort, setSort] = useState<SortOption>("relevance");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useCart();
  const wishlist = useWishlist();

  const launches = useMemo(() => products.filter((product) => product.isLaunch || product.isNew).slice(0, 8), []);
  const bestSellers = useMemo(() => products.filter((product) => product.isBestSeller).slice(0, 8), []);
  const deals = useMemo(() => products.filter((product) => product.hasDiscount).slice(0, 8), []);
  const kits = useMemo(() => products.filter((product) => product.category === "Kits/Conjuntos" || product.tags.includes("kit")).slice(0, 4), []);
  const visibleProducts = useMemo(() => getVisibleProducts(products, filters, sort), [filters, sort]);
  const brandNames = useMemo(() => Array.from(new Set(products.map((product) => product.brand))).sort(), []);
  const categoryNames = useMemo(() => categories.map((category) => category.name) as ProductCategory[], []);
  const sizes = useMemo(() => Array.from(new Set(products.flatMap((product) => product.sizes))).sort(), []);
  const quickCategories = useMemo(() => categories.filter((category) => ["Nova Coleção", "Promoções", "Kits/Conjuntos"].includes(category.name)), []);

  const setQuery = (query: string) => setFilters((current) => ({ ...current, query }));

  return (
    <main>
      <Header query={filters.query} cartCount={cart.itemCount} wishlistCount={wishlist.count} onQueryChange={setQuery} onOpenCart={() => setIsCartOpen(true)} />
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-10" aria-label="Blocos rápidos de compra">
        <SectionTitle eyebrow="Compra rápida" title="Comece pelo que mais converte" description="Atalhos comerciais para nova coleção, promoções e kits prontos." />
        <div className="grid gap-5 md:grid-cols-3">
          {quickCategories.map((category) => <CategoryCard key={category.id} category={category} />)}
        </div>
      </section>

      <section id="lancamentos" className="mx-auto max-w-7xl px-4 py-10" aria-label="Lançamentos">
        <SectionTitle eyebrow="Nova coleção 2026" title="Lançamentos streetwear premium" description="Drops recentes com estoque, tamanho, frete e parcelamento visíveis." action="Compra rápida" />
        <ProductGrid products={launches} isFavorite={wishlist.isFavorite} onAddToCart={cart.addItem} onToggleFavorite={wishlist.toggleFavorite} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10" aria-label="Destaques e mais vendidos">
        <SectionTitle eyebrow="Destaques" title="Mais vendidos" description="Peças com alta procura para montar looks urbanos completos." action="Atualizado hoje" />
        <ProductGrid products={bestSellers} isFavorite={wishlist.isFavorite} onAddToCart={cart.addItem} onToggleFavorite={wishlist.toggleFavorite} />
      </section>

      <section id="promocoes" className="mx-auto max-w-7xl px-4 py-10" aria-label="Promoções até 50% off">
        <SectionTitle eyebrow="Ofertas" title="Promoções até 50% off" description="Seleção fictícia com preço antigo, desconto calculado e últimas unidades." />
        <ProductGrid products={deals} isFavorite={wishlist.isFavorite} onAddToCart={cart.addItem} onToggleFavorite={wishlist.toggleFavorite} />
      </section>

      <section id="kits" className="mx-auto max-w-7xl px-4 py-10" aria-label="Kits e conjuntos">
        <SectionTitle eyebrow="Looks completos" title="Kits e conjuntos" description="Combinações prontas para aumentar ticket médio e facilitar a decisão." />
        <ProductGrid products={kits} isFavorite={wishlist.isFavorite} onAddToCart={cart.addItem} onToggleFavorite={wishlist.toggleFavorite} />
      </section>

      <section id="catalogo" className="mx-auto max-w-7xl px-4 py-10" aria-label="Catálogo com filtros">
        <SectionTitle eyebrow="Catálogo" title="Encontre sua próxima peça" description="Busque por produto, marca, tamanho, categoria, desconto, novidade ou best-seller." />
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <Filters filters={filters} brands={brandNames} categories={categoryNames} sizes={sizes} sort={sort} total={visibleProducts.length} onFiltersChange={setFilters} onSortChange={setSort} />
          <ProductGrid products={visibleProducts} emptyMessage="Não encontramos produtos com esses critérios. Experimente buscar por camisa, cargo, boné, Asfalto Studio ou limpar filtros." isFavorite={wishlist.isFavorite} onAddToCart={cart.addItem} onToggleFavorite={wishlist.toggleFavorite} />
        </div>
      </section>

      <Benefits />

      <section className="mx-auto max-w-7xl px-4 py-12" aria-label="Prova social Instagram">
        <SectionTitle eyebrow="Social proof" title="Looks reais, inspiração diária" description="Posts simulados e comentários fictícios para demonstrar confiança e comunidade." action="@modahub.demo" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {instagramPosts.map(([title, comment], index) => (
            <article key={title} className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
              <div className={`h-56 bg-gradient-to-br ${index % 2 === 0 ? "from-zinc-950 via-neutral-700 to-stone-300" : "from-clay via-amber-200 to-stone-100"}`} role="img" aria-label={`Post simulado: ${title}`} />
              <div className="p-5">
                <h3 className="font-black text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{comment}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a href="#top" className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-clay">Seguir perfil</a>
        </div>
      </section>

      <Newsletter />
      <Footer />
      <CartDrawer isOpen={isCartOpen} items={cart.items} subtotal={cart.subtotal} onClose={() => setIsCartOpen(false)} onRemove={cart.removeItem} onUpdateQuantity={cart.updateQuantity} />
    </main>
  );
}
