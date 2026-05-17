const benefits = [
  ["💳", "Parcele em até 12x", "Compra facilitada com opções de parcelamento."],
  ["🔁", "Primeira troca grátis", "Mais segurança para escolher seu tamanho."],
  ["🏷️", "10% off na primeira compra", "Cupom de boas-vindas para novos clientes."],
  ["💬", "Atendimento via WhatsApp", "Ajuda rápida para medidas, pedidos e dúvidas."],
];

export function Benefits() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12" aria-label="Benefícios comerciais">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(([icon, title, text]) => (
          <article key={title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-3xl" aria-hidden>{icon}</p>
            <h3 className="mt-4 text-lg font-black text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
