"use client";

import Image from "next/image";
import { useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductArtwork } from "@/components/ProductArtwork";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { calculateDiscountPercentage, calculateInstallmentValue, formatCurrency, getStockLabel } from "@/lib/format";
import type { Product } from "@/types/product";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const cart = useCart();
  const wishlist = useWishlist();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const hasSingleSize = product.sizes.length <= 1;
  const [selectedSize, setSelectedSize] = useState<string | undefined>(hasSingleSize ? (product.sizes[0] ?? "Único") : undefined);
  
  const isFavorite = wishlist.isFavorite(product.id);
  const discount = calculateDiscountPercentage(product.price, product.oldPrice);
  const stockLabel = getStockLabel(product.stock);
  const installmentValue = calculateInstallmentValue(product.price, product.installments);
  const isOutOfStock = product.stock <= 0;
  const needsSizeSelection = !hasSingleSize && !selectedSize;

  const addItem = () => {
    cart.addItem(product, selectedSize);
  };
  
  const openCart = () => {
    setIsCartOpen(true);
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#faf7f2]">
      <Header query="" cartCount={cart.itemCount} wishlistCount={wishlist.count} onQueryChange={() => {}} onOpenCart={openCart} />
      
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
          {/* Coluna da Imagem */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-neutral-100 border border-neutral-200">
            {!product.image.startsWith("gradient://") ? (
              <Image src={product.image} alt={product.imageAlt} fill className="object-cover" priority />
            ) : (
              <ProductArtwork product={product} className="h-full w-full" />
            )}
            <button
              type="button"
              onClick={() => wishlist.toggleFavorite(product.id)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-4 py-3 text-2xl shadow-md transition hover:bg-ink hover:text-white"
            >
              {isFavorite ? "♥" : "♡"}
            </button>
          </div>
          
          {/* Coluna de Info */}
          <div className="flex flex-col pt-4">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">{product.brand}</p>
            <h1 className="mt-2 text-3xl font-black leading-tight text-ink md:text-4xl">{product.name}</h1>
            
            <div className="mt-6 flex items-baseline gap-3">
              <p className="text-3xl font-black text-ink">{formatCurrency(product.price)}</p>
              {product.oldPrice && <p className="text-lg text-neutral-500 line-through">{formatCurrency(product.oldPrice)}</p>}
            </div>
            <p className="mt-1 text-base font-semibold text-neutral-700">{product.installments}x de {formatCurrency(installmentValue)} sem juros</p>
            
            <div className="mt-8">
              <h3 className="font-bold text-ink">Tamanhos</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      selectedSize === size ? "border-ink bg-ink text-white" : "border-neutral-300 text-neutral-700 hover:border-ink"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-10">
              <button
                type="button"
                onClick={addItem}
                disabled={isOutOfStock || needsSizeSelection}
                className="w-full rounded-full bg-ink px-6 py-4 text-base font-bold uppercase tracking-[0.18em] text-white transition hover:bg-clay disabled:cursor-not-allowed disabled:bg-neutral-300"
              >
                {isOutOfStock ? "Esgotado" : needsSizeSelection ? "Escolha o tamanho" : "Adicionar ao Carrinho"}
              </button>
              <p className={`mt-3 text-center text-sm font-bold ${isOutOfStock ? "text-red-700" : "text-emerald-700"}`}>
                {stockLabel}
              </p>
            </div>
            
            <div className="mt-12 border-t border-neutral-200 pt-8">
              <h3 className="font-bold text-ink">Descrição</h3>
              <p className="mt-4 leading-relaxed text-neutral-600">{product.description}</p>
              
              <ul className="mt-6 space-y-2 text-sm text-neutral-600">
                <li><span className="font-semibold text-ink">Categoria:</span> {product.category}</li>
                <li><span className="font-semibold text-ink">Coleção:</span> {product.collection}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <CartDrawer isOpen={isCartOpen} items={cart.items} subtotal={cart.subtotal} onClose={() => setIsCartOpen(false)} onRemove={cart.removeItem} onUpdateQuantity={cart.updateQuantity} />
    </main>
  );
}
