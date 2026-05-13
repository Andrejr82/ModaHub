export function Hero() {
  return (
    <section id="top" className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.05fr_0.95fr] md:py-20">
      <div className="flex flex-col justify-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-clay">Curadoria multimarcas</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-ink md:text-7xl">Moda premium para todos os seus momentos.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
          Descubra roupas, calçados, bolsas e acessórios de marcas fictícias selecionadas para criar looks completos com compra simples e entrega confiável.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#catalogo" className="rounded-full bg-ink px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay">Comprar agora</a>
          <a href="#editorial" className="rounded-full border border-ink px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.2em] text-ink transition hover:bg-ink hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-clay">Ver tendências</a>
        </div>
        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["Troca fácil", "30 dias para decidir"],
            ["Pagamento seguro", "Ambiente protegido"],
            ["Curadoria", "Peças para combinar"],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <dt className="font-semibold text-ink">{title}</dt>
              <dd className="mt-1 text-sm text-neutral-600">{text}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="relative min-h-[520px] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-champagne via-white to-stone-300 p-6 shadow-soft" role="img" aria-label="Composição editorial de moda com peças premium">
        <div className="absolute -right-16 top-10 h-56 w-56 rounded-full bg-clay/20 blur-3xl" />
        <div className="absolute bottom-10 left-8 h-72 w-72 rounded-full bg-white/70 blur-2xl" />
        <div className="relative grid h-full grid-rows-3 gap-4">
          <div className="rounded-3xl bg-white/75 p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">Campanha</p>
            <p className="mt-2 text-3xl font-black text-ink">Essenciais de meia-estação</p>
          </div>
          <div className="ml-auto w-3/4 rounded-3xl bg-ink p-6 text-white">
            <p className="text-sm text-champagne">Looks de trabalho, viagem e festa em uma única curadoria.</p>
          </div>
          <div className="rounded-3xl bg-clay p-6 text-white">
            <p className="text-4xl font-black">Até 25% off</p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em]">em achados selecionados</p>
          </div>
        </div>
      </div>
    </section>
  );
}
