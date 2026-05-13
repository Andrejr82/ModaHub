import type { ChangeEvent } from "react";

interface HeaderProps {
  query: string;
  cartCount: number;
  wishlistCount: number;
  onQueryChange: (query: string) => void;
  onOpenCart: () => void;
}

const navItems = ["Feminino", "Masculino", "Calçados", "Bolsas", "Acessórios", "Sale"];

export function Header({ query, cartCount, wishlistCount, onQueryChange, onOpenCart }: HeaderProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onQueryChange(event.target.value);

  return (
    <>
      <div className="bg-ink px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white">
        Frete grátis acima de R$ 299 • Troca fácil em 30 dias • 10% off na primeira compra
      </div>
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <a href="#top" className="text-2xl font-black tracking-tight text-ink" aria-label="ModaHub página inicial">
              Moda<span className="text-clay">Hub</span>
            </a>
            <button className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold lg:hidden" type="button" aria-label="Abrir menu de categorias">
              Menu
            </button>
          </div>
          <nav className="flex gap-2 overflow-x-auto text-sm font-semibold text-neutral-700" aria-label="Categorias principais">
            {navItems.map((item) => (
              <a key={item} href="#catalogo" className="whitespace-nowrap rounded-full px-3 py-2 transition hover:bg-sand hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-clay">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="sr-only" htmlFor="site-search">Buscar produtos</label>
            <input
              id="site-search"
              value={query}
              onChange={handleChange}
              placeholder="Buscar por peça, marca ou ocasião"
              className="min-w-0 rounded-full border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20 sm:w-72"
            />
            <div className="flex gap-2">
              <a href="#catalogo" className="rounded-full border border-neutral-300 px-4 py-3 text-sm font-semibold" aria-label={`Wishlist com ${wishlistCount} itens`}>
                ♥ {wishlistCount}
              </a>
              <button type="button" onClick={onOpenCart} className="rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay" aria-label={`Abrir carrinho com ${cartCount} itens`}>
                Carrinho ({cartCount})
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
