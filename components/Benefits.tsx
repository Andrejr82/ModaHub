export function Benefits() {
  const benefits = [
    ["Frete inteligente", "Frete grátis acima de R$ 299 e cálculo transparente."],
    ["Troca fácil", "30 dias para experimentar com suporte humano."],
    ["Pagamento seguro", "Ambiente protegido e checkout fictício no MVP."],
    ["Curadoria multimarcas", "Peças combináveis por ocasião, estilo e rotina."],
  ];
  return (
    <section className="bg-ink py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(([title, text]) => (
          <article key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-neutral-300">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
