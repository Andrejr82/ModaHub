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
import { Testimonials } from "@/components/Testimonials";
import { brands, categories, products } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { defaultFilterState, getVisibleProducts } from "@/lib/filter-products";
import type { FilterState, ProductCategory, SortOption } from "@/types/product";

const occasions = [
  ["Trabalho", "Alfaiataria leve, bolsas espaçosas e acessórios discretos."],
  ["Casual", "Básicos premium, tênis e camadas confortáveis."],
  ["Festa", "Acetinados, metalizados e peças com presença."],
  ["Viagem", "Looks versáteis, compactos e fáceis de combinar."],
  ["Presente", "Acessórios certeiros e tamanhos únicos."],
];

const editorials = [
  ["Guia de camadas elegantes", "Como combinar blazer, moletom premium e acessórios para meia-estação."],
  ["A força dos neutros", "Tons areia, off-white e caramelo criam uma base sofisticada e durável."],
  ["Acessórios que elevam", "Relógios, lenços e óculos mudam a leitura de um look simples."],
];

export default function Home() {
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);
  const [sort, setSort] = useState<SortOption>("relevance");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useCart();
  const wishlist = useWishlist();

  const bestSellers = useMemo(() => products.filter((product) => product.isBestSeller).slice(0, 8), []);
  const newProducts = useMemo(() => [...products].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()).slice(0, 8), []);
  const visibleProducts = useMemo(() => getVisibleProducts(products, filters, sort), [filters, sort]);
  const brandNames = useMemo(() => Array.from(new Set(products.map((product) => product.brand))).sort(), []);
  const categoryNames = useMemo(() => Array.from(new Set(products.map((product) => product.category))) as ProductCategory[], []);
  const sizes = useMemo(() => Array.from(new Set(products.flatMap((product) => product.sizes))).sort(), []);

  const setQuery = (query: string) => setFilters((current) => ({ ...current, query }));

  return (
    <main>
      <Header query={filters.query} cartCount={cart.itemCount} wishlistCount={wishlist.count} onQueryChange={setQuery} onOpenCart={() => setIsCartOpen(true)} />
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-12" aria-label="Categorias em destaque">
        <SectionTitle eyebrow="Atalhos" title="Categorias em destaque" description="Comece por segmentos essenciais da curadoria ModaHub." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => <CategoryCard key={category.id} category={category} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12" aria-label="Mais vendidos">
        <SectionTitle eyebrow="Top curadoria" title="Mais vendidos" description="Peças com alta procura, ótimo rating e combinação fácil." action="Atualizado hoje" />
        <ProductGrid products={bestSellers} isFavorite={wishlist.isFavorite} onAddToCart={cart.addItem} onToggleFavorite={wishlist.toggleFavorite} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12" aria-label="Novidades da semana">
        <SectionTitle eyebrow="Drop semanal" title="Novidades da semana" description="Lançamentos fictícios para renovar looks de trabalho, festa, viagem e rotina." />
        <ProductGrid products={newProducts} isFavorite={wishlist.isFavorite} onAddToCart={cart.addItem} onToggleFavorite={wishlist.toggleFavorite} />
      </section>

      <section id="catalogo" className="mx-auto max-w-7xl px-4 py-12" aria-label="Catálogo com filtros">
        <SectionTitle eyebrow="Catálogo inteligente" title="Encontre sua próxima peça" description="Combine busca, filtros e ordenação para refinar a vitrine em tempo real." />
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <Filters filters={filters} brands={brandNames} categories={categoryNames} sizes={sizes} sort={sort} total={visibleProducts.length} onFiltersChange={setFilters} onSortChange={setSort} />
          <ProductGrid products={visibleProducts} emptyMessage="Não encontramos produtos com esses critérios. Experimente buscar por casual, trabalho, Aurora Studio ou limpar filtros." isFavorite={wishlist.isFavorite} onAddToCart={cart.addItem} onToggleFavorite={wishlist.toggleFavorite} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12" aria-label="Escolha por ocasião">
        <SectionTitle eyebrow="Styling" title="Escolha por ocasião" description="Uma forma rápida de transformar intenção em compra." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {occasions.map(([title, text]) => (
            <article key={title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="editorial" className="mx-auto max-w-7xl px-4 py-12" aria-label="Editorial da temporada">
        <SectionTitle eyebrow="Revista ModaHub" title="Editorial da temporada" description="Conteúdos fictícios, objetivos e úteis para inspirar combinações." />
        <div className="grid gap-5 md:grid-cols-3">
          {editorials.map(([title, text], index) => (
            <article key={title} className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
              <div className={`h-56 bg-gradient-to-br ${index === 0 ? "from-stone-200 to-champagne" : index === 1 ? "from-amber-100 to-white" : "from-clay/30 to-stone-100"}`} />
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay">Matéria {index + 1}</p>
                <h3 className="mt-3 text-2xl font-black text-ink">{title}</h3>
                <p className="mt-3 text-neutral-600">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12" aria-label="Marcas em destaque">
        <SectionTitle eyebrow="Parceiras fictícias" title="Marcas em destaque" description="Nomes genéricos criados para demonstrar uma curadoria multimarcas sem uso indevido de marcas reais." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <article key={brand.id} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-2xl font-black text-ink">{brand.name}</p>
              <p className="mt-2 text-sm text-neutral-600">{brand.description}</p>
              {brand.featured ? <span className="mt-4 inline-flex rounded-full bg-sand px-3 py-1 text-xs font-semibold text-clay">Marca destaque</span> : null}
            </article>
          ))}
        </div>
      </section>

      <Benefits />
      <Testimonials />
      <Newsletter />
      <Footer />
      <CartDrawer isOpen={isCartOpen} items={cart.items} subtotal={cart.subtotal} onClose={() => setIsCartOpen(false)} onRemove={cart.removeItem} onUpdateQuantity={cart.updateQuantity} />
    </main>
  );
}
