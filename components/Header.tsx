"use client";

import Link from "next/link";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useUser } from "@/hooks/use-user";

interface HeaderProps {
  query: string;
  cartCount: number;
  wishlistCount: number;
  onQueryChange?: (query: string) => void;
  onOpenCart?: () => void;
}

const navItems = [
  { label: "Nova Coleção", href: "/catalogo?mode=launches" },
  { label: "Promoções", href: "/catalogo?mode=sale" },
  { label: "Kits/Conjuntos", href: "/catalogo?mode=kits" },
  { label: "Mais Vendidos", href: "/catalogo?mode=best-sellers" },
  { label: "Guia de Medidas", href: "/guia-de-medidas" },
  { label: "Entrega e Trocas", href: "/entrega-e-trocas" },
  { label: "Atendimento", href: "/atendimento" },
];

export function Header({ query, cartCount, wishlistCount, onQueryChange, onOpenCart }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [draftQuery, setDraftQuery] = useState(query);
  const { user } = useUser();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraftQuery(event.target.value);
    if (onQueryChange) onQueryChange(event.target.value);
  };
  const closeMenu = () => setIsMenuOpen(false);
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = draftQuery.trim();
    window.location.href = trimmedQuery ? `/catalogo?q=${encodeURIComponent(trimmedQuery)}` : "/catalogo";
  };

  return (
    <>
      <div className="bg-ink px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.16em] text-white">
        Frete grátis acima de R$299 • Primeira troca grátis • 10% off na primeira compra
      </div>
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4">
          <div className="flex items-center justify-between gap-3 lg:hidden">
            <Link href="/" className="text-2xl font-black tracking-tight text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-clay" aria-label="ModaHub página inicial" onClick={closeMenu}>
              Moda<span className="text-clay">Hub</span>
            </Link>
            <div className="flex items-center gap-2">
              <a href="https://wa.me/5500000000000" className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 sm:inline-flex" aria-label="Atendimento ModaHub pelo WhatsApp">WhatsApp</a>
              <button
                type="button"
                onClick={onOpenCart}
                className="rounded-full bg-ink px-3 py-2 text-sm font-bold text-white transition hover:bg-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
                aria-label={`Abrir carrinho com ${cartCount} itens`}
              >
                Carrinho ({cartCount})
              </button>
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
            <Link href="/" className="text-2xl font-black tracking-tight text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-clay" aria-label="ModaHub página inicial">
              Moda<span className="text-clay">Hub</span>
            </Link>
            <SearchBox id="site-search-desktop" query={draftQuery} onQueryChange={handleChange} onSubmit={handleSearchSubmit} className="w-96" />
            <div className="flex items-center gap-2">
              {user ? (
                <a href="/minha-conta" className="rounded-full border border-neutral-300 px-4 py-3 text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-clay">
                  Minha Conta
                </a>
              ) : (
                <a href="/login" className="rounded-full border border-neutral-300 px-4 py-3 text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-clay">
                  Entrar
                </a>
              )}
              <a href="/catalogo" className="rounded-full border border-neutral-300 px-4 py-3 text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-clay" aria-label={`Wishlist com ${wishlistCount} itens`}>
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
            <SearchBox id="site-search-mobile" query={draftQuery} onQueryChange={handleChange} onSubmit={handleSearchSubmit} />
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" aria-label="Ações rápidas">
              {user ? (
                <a href="/minha-conta" onClick={closeMenu} className="rounded-full border border-neutral-300 px-3 py-3 text-center text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-clay">
                  Minha Conta
                </a>
              ) : (
                <a href="/login" onClick={closeMenu} className="rounded-full border border-neutral-300 px-3 py-3 text-center text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-clay">
                  Entrar
                </a>
              )}
              <a href="/catalogo" onClick={closeMenu} className="rounded-full border border-neutral-300 px-3 py-3 text-center text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-clay" aria-label={`Wishlist com ${wishlistCount} itens`}>
                ♥ Wishlist ({wishlistCount})
              </a>
              <button type="button" onClick={() => { closeMenu(); if (onOpenCart) onOpenCart(); }} className="rounded-full bg-ink px-3 py-3 text-sm font-bold text-white transition hover:bg-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay sm:col-span-2" aria-label={`Abrir carrinho com ${cartCount} itens`}>
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

function SearchBox({ id, query, onQueryChange, onSubmit, className = "" }: { id: string; query: string; onQueryChange: (event: ChangeEvent<HTMLInputElement>) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void; className?: string }) {
  return (
    <form className={className} onSubmit={onSubmit}>
      <label className="sr-only" htmlFor={id}>Buscar produtos</label>
      <input
        id={id}
        value={query}
        onChange={onQueryChange}
        placeholder="Buscar camisa, cargo, boné..."
        className="w-full rounded-full border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20"
      />
    </form>
  );
}
