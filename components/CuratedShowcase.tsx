"use client";

import { useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import type { Product } from "@/types/product";

interface ShowcaseGroup {
  id: string;
  label: string;
  title: string;
  description: string;
  products: Product[];
}

interface CuratedShowcaseProps {
  groups: ShowcaseGroup[];
  isFavorite: (productId: string) => boolean;
  onAddToCart: (product: Product, selectedSize?: string) => void;
  onToggleFavorite: (productId: string) => void;
}

export function CuratedShowcase({ groups, isFavorite, onAddToCart, onToggleFavorite }: CuratedShowcaseProps) {
  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id ?? "");
  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? groups[0];

  if (!activeGroup) return null;

  return (
    <section id="curadoria" className="mx-auto max-w-7xl px-4 py-10" aria-labelledby="curadoria-title">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-clay">Curadoria ModaHub</p>
          <h2 id="curadoria-title" className="mt-3 text-3xl font-black text-ink md:text-5xl">Curadoria em destaque</h2>
          <p className="mt-4 max-w-2xl text-neutral-700">
            Alterne entre drop, best-sellers, sale e kits em uma vitrine rápida de navegar.
          </p>
        </div>
        <a href="/catalogo" className="inline-flex w-fit rounded-full border border-ink px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-ink hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-clay">
          Ver catálogo completo
        </a>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Vitrines de produtos">
        {groups.map((group) => (
          <button
            key={group.id}
            id={`${group.id}-tab`}
            type="button"
            role="tab"
            aria-selected={activeGroup.id === group.id}
            aria-controls={`${group.id}-panel`}
            onClick={() => setActiveGroupId(group.id)}
            className={`min-h-11 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-clay ${
              activeGroup.id === group.id ? "border-ink bg-ink text-white" : "border-neutral-300 bg-white text-neutral-700 hover:border-ink"
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div
        id={`${activeGroup.id}-panel`}
        role="tabpanel"
        aria-labelledby={`${activeGroup.id}-tab`}
        className="mt-5"
      >
        <div className="mb-5 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 className="text-2xl font-black text-ink">{activeGroup.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">{activeGroup.description}</p>
        </div>
        <ProductGrid
          products={activeGroup.products.slice(0, 8)}
          isFavorite={isFavorite}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
        />
      </div>
    </section>
  );
}
