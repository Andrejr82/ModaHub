const campaignBadges = [
  { title: "Até 50% off", text: "seleção limitada" },
  { title: "Frete grátis", text: "acima de R$299" },
  { title: "3x sem juros", text: "nos produtos" },
  { title: "Últimas unidades", text: "estoque visível" },
];

const heroProducts = [
  { name: "Conjunto Moletom Oversized", meta: "3x sem juros • Frete grátis", badge: "-20%", palette: "from-zinc-950 to-stone-300", price: "R$ 399,90" },
  { name: "Calça Cargo Street", meta: "Últimas unidades", badge: "Novo", palette: "from-olive-500 to-zinc-950", price: "R$ 289,90" },
];

export function Hero() {
  return (
    <section id="top" className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.05fr_0.95fr] md:py-16">
      <div className="flex flex-col justify-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-clay">Nova coleção 2026</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl md:text-7xl">Nova coleção streetwear premium</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
          Camisas oversized, bermudas, conjuntos, calças cargo e acessórios para montar looks completos com estilo urbano.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#lancamentos" className="rounded-full bg-ink px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay">Comprar lançamentos</a>
          <a href="#promocoes" className="rounded-full border border-ink px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-ink transition hover:bg-ink hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-clay">Ver promoções</a>
        </div>
        <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {campaignBadges.map((badge) => (
            <div key={badge.title} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <dt className="font-black text-ink">{badge.title}</dt>
              <dd className="mt-1 text-sm text-neutral-600">{badge.text}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="relative min-h-[480px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-zinc-950 via-neutral-800 to-clay p-5 shadow-soft sm:min-h-[520px]" role="img" aria-label="Campanha fictícia de streetwear premium com cards de produtos">
        <div className="absolute -right-16 top-10 h-56 w-56 rounded-full bg-clay/40 blur-3xl" />
        <div className="absolute bottom-10 left-8 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex h-full flex-col justify-between gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-white backdrop-blur">
            <p className="text-sm uppercase tracking-[0.24em] text-champagne">Drop Rua 2026</p>
            <p className="mt-2 text-3xl font-black">Oversized + cargo + acessórios</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">Monte o look completo com peças fictícias, preços claros e compra rápida.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {heroProducts.map((product, index) => (
              <article key={product.name} className={`rounded-3xl p-5 shadow-soft ${index === 0 ? "bg-white" : "bg-champagne sm:translate-y-8"}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase text-white ${product.badge.startsWith("-") ? "bg-red-600" : "bg-emerald-600"}`}>{product.badge}</span>
                  <span className="text-sm font-black text-ink">{product.price}</span>
                </div>
                <div className={`mt-4 h-36 rounded-2xl bg-gradient-to-br ${product.palette}`} aria-hidden />
                <h2 className="mt-4 font-black text-ink">{product.name}</h2>
                <p className="text-sm font-bold text-clay">{product.meta}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
