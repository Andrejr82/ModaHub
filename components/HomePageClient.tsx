"use client";

import { useMemo, useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { CategoryCard } from "@/components/CategoryCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionTitle } from "@/components/SectionTitle";
import { ShoppingPaths } from "@/components/ShoppingPaths";
import { TrustCompact } from "@/components/TrustCompact";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import type { Product } from "@/types/product";

interface HomePageClientProps {
  products: Product[];
  categories: any[];
}

export function HomePageClient({ products, categories }: HomePageClientProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useCart();
  const wishlist = useWishlist();

  const quickCategories = useMemo(() => categories.filter((category) => ["Nova Coleção", "Promoções", "Kits/Conjuntos"].includes(category.name)), [categories]);
  // Use products fetched from Supabase, just get 4 random or specific ones (first 4)
  const highlightedProducts = useMemo(() => products.slice(0, 4), [products]);
  const shoppingPaths = useMemo(
    () => [
      {
        eyebrow: "Produto",
        title: "Lançamentos",
        description: "Abra a área de novidades com foco em drop atual, estoque visível e compra rápida.",
        href: "/catalogo?mode=launches",
      },
      {
        eyebrow: "Produto",
        title: "Promoções",
        description: "Entre direto no sale sem atravessar vitrines repetidas na home.",
        href: "/catalogo?mode=sale",
      },
      {
        eyebrow: "Apoio",
        title: "Guia de medidas",
        description: "Consulte modelagem, oversized e caimento antes de fechar o carrinho.",
        href: "/guia-de-medidas",
      },
      {
        eyebrow: "Apoio",
        title: "Entrega e trocas",
        description: "Veja frete, prazo e primeira troca em uma área separada da vitrine principal.",
        href: "/entrega-e-trocas",
      },
    ],
    [],
  );

  const addItem = (product: Product, selectedSize?: string) => {
    cart.addItem(product, selectedSize);
  };
  const openCart = () => {
    setIsCartOpen(true);
  };

  return (
    <main>
      <Header query="" cartCount={cart.itemCount} wishlistCount={wishlist.count} onQueryChange={() => {}} onOpenCart={openCart} />
      <Hero products={products} />

      <section className="mx-auto max-w-7xl px-4 py-10" aria-label="Blocos rápidos de compra">
        <SectionTitle eyebrow="Explore coleções" title="Encontre o que quer comprar" description="Novidades, promoções e kits para entrar direto na parte certa da loja." />
        <div className="grid gap-5 md:grid-cols-3">
          {quickCategories.map((category) => <CategoryCard key={category.id} category={category} />)}
        </div>
      </section>

      <ShoppingPaths paths={shoppingPaths} />

      <section id="destaques" className="mx-auto max-w-7xl px-4 py-10" aria-label="Destaques essenciais da home">
        <SectionTitle eyebrow="Seleção da semana" title="Peças em destaque agora" description="Uma edição curta da curadoria para começar sua busca." action="4 destaques" />
        <ProductGrid products={highlightedProducts} emptyMessage="Sem destaques no momento." isFavorite={wishlist.isFavorite} onAddToCart={addItem} onToggleFavorite={wishlist.toggleFavorite} />
        <div className="mt-6 text-center">
          <a href="/catalogo" className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay">
            Abrir catálogo completo
          </a>
        </div>
      </section>

      <TrustCompact />
      <Footer />
      <CartDrawer isOpen={isCartOpen} items={cart.items} subtotal={cart.subtotal} onClose={() => setIsCartOpen(false)} onRemove={cart.removeItem} onUpdateQuantity={cart.updateQuantity} />
    </main>
  );
}
