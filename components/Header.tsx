"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";

interface HeaderProps {
  query: string;
  cartCount: number;
  wishlistCount: number;
  onQueryChange: (query: string) => void;
  onOpenCart: () => void;
}

const navItems = [
  { label: "Nova Coleção", href: "#lancamentos" },
  { label: "Promoções", href: "#promocoes" },
  { label: "Kits/Conjuntos", href: "#kits" },
  { label: "Camisas", href: "#catalogo" },
  { label: "Bermudas", href: "#catalogo" },
  { label: "Calças", href: "#catalogo" },
  { label: "Calçados", href: "#catalogo" },
  { label: "Bonés", href: "#catalogo" },
  { label: "Acessórios", href: "#catalogo" },
];

export function Header({ query, cartCount, wishlistCount, onQueryChange, onOpenCart }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onQueryChange(event.target.value);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="bg-ink px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.16em] text-white">
        Frete grátis acima de R$299 • Primeira troca grátis • 10% off na primeira compra
      </div>
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4">
          <div className="flex items-center justify-between gap-3 lg:hidden">
            <a href="#top" className="text-2xl font-black tracking-tight text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-clay" aria-label="ModaHub página inicial" onClick={closeMenu}>
              Moda<span className="text-clay">Hub</span>
            </a>
            <div className="flex items-center gap-2">
              <a href="https://wa.me/5500000000000" className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600" aria-label="Atendimento ModaHub pelo WhatsApp">WhatsApp</a>
              <button
                type="button"
                className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-bold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
                aria-label={isMenuOpen ? "Fechar menu de categorias" : "Abrir menu de categorias"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-commerce-menu"
                onClick={() => setIsMenuOpen((current) => !current)}
              >
                Menu
              </button>
            </div>
          </div>

          <div className="hidden items-center justify-between gap-6 lg:flex">
            <a href="#top" className="text-2xl font-black tracking-tight text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-clay" aria-label="ModaHub página inicial">
              Moda<span className="text-clay">Hub</span>
            </a>
            <SearchBox id="site-search-desktop" query={query} onQueryChange={handleChange} className="w-96" />
            <div className="flex items-center gap-2">
              <a href="#catalogo" className="rounded-full border border-neutral-300 px-4 py-3 text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-clay" aria-label={`Wishlist com ${wishlistCount} itens`}>
                ♥ {wishlistCount}
              </a>
              <a href="https://wa.me/5500000000000" className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600" aria-label="Atendimento ModaHub pelo WhatsApp">
                WhatsApp
              </a>
              <button type="button" onClick={onOpenCart} className="rounded-full bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay" aria-label={`Abrir carrinho com ${cartCount} itens`}>
                Carrinho ({cartCount})
              </button>
            </div>
          </div>

          <div id="mobile-commerce-menu" className={`${isMenuOpen ? "grid" : "hidden"} gap-3 lg:hidden`}>
            <SearchBox id="site-search-mobile" query={query} onQueryChange={handleChange} />
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" aria-label="Ações rápidas">
              <a href="#catalogo" onClick={closeMenu} className="rounded-full border border-neutral-300 px-3 py-3 text-center text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-clay" aria-label={`Wishlist com ${wishlistCount} itens`}>
                ♥ Wishlist ({wishlistCount})
              </a>
              <button type="button" onClick={() => { closeMenu(); onOpenCart(); }} className="rounded-full bg-ink px-3 py-3 text-sm font-bold text-white transition hover:bg-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay sm:col-span-2" aria-label={`Abrir carrinho com ${cartCount} itens`}>
                Carrinho ({cartCount})
              </button>
            </div>
          </div>

          <nav className={`${isMenuOpen ? "grid" : "hidden"} gap-2 text-sm font-bold text-neutral-700 lg:flex lg:gap-2 lg:overflow-x-auto lg:pb-1`} aria-label="Categorias principais">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={closeMenu} className="whitespace-nowrap rounded-full border border-neutral-200 px-3 py-2 text-center transition hover:bg-sand hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-clay">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}

function SearchBox({ id, query, onQueryChange, className = "" }: { id: string; query: string; onQueryChange: (event: ChangeEvent<HTMLInputElement>) => void; className?: string }) {
  return (
    <div className={className}>
      <label className="sr-only" htmlFor={id}>Buscar produtos</label>
      <input
        id={id}
        value={query}
        onChange={onQueryChange}
        placeholder="Buscar camisa, cargo, boné..."
        className="w-full rounded-full border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20"
      />
    </div>
  );
}
