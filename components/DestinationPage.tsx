"use client";

import { useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";

interface DestinationPageProps {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  ctaHref: string;
  ctaLabel: string;
}

export function DestinationPage({ eyebrow, title, description, highlights, ctaHref, ctaLabel }: DestinationPageProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useCart();
  const wishlist = useWishlist();

  return (
    <main>
      <Header query="" cartCount={cart.itemCount} wishlistCount={wishlist.count} onQueryChange={() => {}} onOpenCart={() => setIsCartOpen(true)} />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 rounded-[2rem] bg-ink p-6 text-white md:grid-cols-[1.1fr_0.9fr] md:p-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-champagne">{eyebrow}</p>
            <h1 className="mt-3 text-4xl font-black md:text-6xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">{description}</p>
            <a href={ctaHref} className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-champagne">
              {ctaLabel}
            </a>
          </div>
          <div className="grid gap-3">
            {highlights.map((highlight) => (
              <div key={highlight} className="rounded-3xl border border-white/10 bg-white/10 p-4 text-sm font-semibold text-white/85">
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      <CartDrawer isOpen={isCartOpen} items={cart.items} subtotal={cart.subtotal} onClose={() => setIsCartOpen(false)} onRemove={cart.removeItem} onUpdateQuantity={cart.updateQuantity} />
    </main>
  );
}
