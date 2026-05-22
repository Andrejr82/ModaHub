const trustItems = [
  ["4.8/5", "avaliação média fictícia"],
  ["R$299+", "frete grátis no pedido"],
  ["1ª troca", "sem custo no primeiro ajuste"],
  ["VIP drops", "acesso antecipado à curadoria"],
];

export function TrustCompact() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10" aria-label="Confiança e comunidade ModaHub">
      <div className="grid gap-5 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm lg:grid-cols-[1fr_0.95fr] lg:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-clay">Confiança sem excesso de conteúdo</p>
          <h2 className="mt-3 text-3xl font-black text-ink md:text-4xl">Sinais comerciais onde a decisão acontece</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {trustItems.map(([value, label]) => (
              <div key={value} className="rounded-2xl bg-sand p-4">
                <p className="text-2xl font-black text-ink">{value}</p>
                <p className="mt-1 text-sm font-semibold text-neutral-700">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-champagne via-white to-stone-200 p-5">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-clay">Lista VIP</p>
          <h3 className="mt-3 text-2xl font-black text-ink">Receba drop, restock e sale antes da vitrine abrir.</h3>
          <form className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="vip-email">E-mail para lista VIP</label>
            <input
              id="vip-email"
              type="email"
              required
              placeholder="seuemail@exemplo.com"
              className="min-h-12 rounded-full border border-neutral-300 px-5 outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
            />
            <button type="submit" className="min-h-12 rounded-full bg-ink px-6 text-sm font-bold uppercase tracking-[0.16em] text-white">
              Entrar
            </button>
          </form>
          <blockquote className="mt-5 rounded-2xl bg-white/70 p-4 text-sm leading-6 text-neutral-700">
            A curadoria facilita montar look completo sem abrir dez seções diferentes.
          </blockquote>
        </div>
      </div>
    </section>
  );
}
