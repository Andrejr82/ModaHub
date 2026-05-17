export function Footer() {
  const institutional = ["Quem Somos", "Como Comprar", "Como Chegar", "Atendimento"];
  const help = ["Política de Privacidade", "Trocas e Devoluções", "Guia de Medidas", "Prazo de Entrega"];
  const socials = ["Instagram", "Facebook", "YouTube", "TikTok"];

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr_1fr]">
        <div>
          <p className="text-3xl font-black">Moda<span className="text-clay">Hub</span></p>
          <p className="mt-4 text-sm leading-6 text-white/70">Streetwear premium multimarcas com produtos fictícios para demonstração de uma loja online real, comercial e responsiva.</p>
          <form className="mt-5 flex gap-2" aria-label="Newsletter compacta do rodapé">
            <label className="sr-only" htmlFor="footer-email">Email</label>
            <input id="footer-email" type="email" placeholder="seu email" className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50" />
            <button type="button" className="rounded-full bg-clay px-4 py-3 text-sm font-bold">OK</button>
          </form>
        </div>
        <FooterColumn title="Institucional" items={institutional} />
        <FooterColumn title="Ajuda" items={help} />
        <div>
          <h2 className="font-black">Contato</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>WhatsApp: (00) 90000-0000</li>
            <li>Email: atendimento@modahub.demo</li>
            <li>Telefone: (00) 3000-0000</li>
            <li>Endereço: Rua Demo Street, 299 — São Paulo/SP</li>
          </ul>
        </div>
        <FooterColumn title="Redes sociais" items={socials} />
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-white/70 lg:flex-row lg:items-center lg:justify-between">
          <p>Meios de pagamento: Visa • Mastercard • Amex • Elo • Pix</p>
          <p>Meios de envio: Correios • Transportadora</p>
          <p>© 2026 ModaHub. Loja fictícia para demonstração.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="font-black">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm text-white/70">
        {items.map((item) => (
          <li key={item}><a href="#top" className="transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-clay">{item}</a></li>
        ))}
      </ul>
    </div>
  );
}
