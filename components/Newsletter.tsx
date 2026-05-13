export function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="rounded-[2rem] bg-gradient-to-br from-champagne via-white to-stone-200 p-8 md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-clay">Newsletter ModaHub</p>
        <h2 className="mt-3 text-3xl font-black text-ink md:text-5xl">Receba tendências e ofertas selecionadas.</h2>
        <p className="mt-4 max-w-2xl text-neutral-700">Cadastro fictício para o MVP: imagine alertas de coleção, guia de looks e acesso antecipado ao sale.</p>
        <form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="newsletter-email">E-mail</label>
          <input id="newsletter-email" type="email" required placeholder="seuemail@exemplo.com" className="min-h-12 flex-1 rounded-full border border-neutral-300 px-5 outline-none focus:border-clay focus:ring-2 focus:ring-clay/20" />
          <button type="submit" className="rounded-full bg-ink px-7 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white">Quero receber</button>
        </form>
      </div>
    </section>
  );
}
