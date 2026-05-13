export function Footer() {
  const columns = {
    Institucional: ["Sobre a ModaHub", "Carreiras", "Moda responsável"],
    Atendimento: ["Central de ajuda", "Trocas e devoluções", "Frete e entrega"],
    Políticas: ["Privacidade", "Termos de uso", "Cookies"],
    Sociais: ["Instagram fictício", "TikTok fictício", "Pinterest fictício"],
  };
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <p className="text-2xl font-black text-ink">Moda<span className="text-clay">Hub</span></p>
          <p className="mt-3 text-sm leading-6 text-neutral-600">Loja fictícia multimarcas para demonstração de e-commerce moderno.</p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-neutral-500">Pix • Cartão • Boleto • Carteiras digitais</p>
        </div>
        {Object.entries(columns).map(([title, links]) => (
          <div key={title}>
            <h3 className="font-bold text-ink">{title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              {links.map((link) => <li key={link}><a href="#top" className="hover:text-clay">{link}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-neutral-200 px-4 py-5 text-center text-sm text-neutral-500">© 2026 ModaHub Multimarcas. Projeto fictício sem venda real.</div>
    </footer>
  );
}
