export function Testimonials() {
  const testimonials = [
    ["Marina L.", "A curadoria facilita muito. Montei look de trabalho e jantar em poucos minutos.", "5.0"],
    ["Rafael P.", "Gostei dos filtros por ocasião e do carrinho simples. A experiência parece de loja premium.", "4.9"],
    ["Bianca T.", "Os produtos têm descrição clara, preço visível e wishlist fácil de usar.", "4.8"],
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map(([name, text, rating]) => (
          <figure key={name} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-clay" aria-label={`${rating} de 5 estrelas`}>★★★★★ <span className="text-sm font-semibold text-ink">{rating}</span></p>
            <blockquote className="mt-4 text-lg leading-8 text-ink">“{text}”</blockquote>
            <figcaption className="mt-5 text-sm font-bold text-neutral-600">{name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
