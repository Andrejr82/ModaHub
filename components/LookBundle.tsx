import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types/product";

interface LookBundleProps {
  products: Product[];
  onAddToCart: (product: Product, selectedSize?: string) => void;
}

export function LookBundle({ products, onAddToCart }: LookBundleProps) {
  const bundleProducts = products.slice(0, 3);
  const total = bundleProducts.reduce((sum, product) => sum + product.price, 0);

  return (
    <section id="look-completo" className="mx-auto max-w-7xl px-4 py-10" aria-labelledby="look-title">
      <div className="grid gap-6 rounded-[2rem] bg-ink p-6 text-white md:grid-cols-[0.9fr_1.1fr] md:p-8">
        <div className="flex flex-col justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-champagne">Complete o look</p>
            <h2 id="look-title" className="mt-3 text-3xl font-black md:text-5xl">Um kit pronto para sair do scroll</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/75">
              Combine oversized, cargo e acessório em uma compra rápida. Esse bloco substitui seções longas por uma proposta clara de ticket médio.
            </p>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-white/60">Total do look</p>
            <p className="mt-2 text-3xl font-black">{formatCurrency(total)}</p>
            <p className="mt-1 text-sm font-semibold text-champagne">3x sem juros + frete grátis se passar de R$299</p>
          </div>
        </div>

        <div className="grid gap-3">
          {bundleProducts.map((product) => (
            <article key={product.id} className="grid grid-cols-[88px_1fr_auto] items-center gap-3 rounded-3xl bg-white p-3 text-ink">
              <div className={`h-24 rounded-2xl bg-gradient-to-br ${product.palette}`} role="img" aria-label={product.imageAlt} />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-clay">{product.brand}</p>
                <h3 className="font-black leading-tight">{product.name}</h3>
                <p className="mt-1 text-sm font-semibold text-neutral-700">{formatCurrency(product.price)}</p>
              </div>
              <button
                type="button"
                onClick={() => onAddToCart(product, product.sizes[0])}
                className="min-h-11 rounded-full bg-ink px-4 text-sm font-bold text-white transition hover:bg-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
              >
                +
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
