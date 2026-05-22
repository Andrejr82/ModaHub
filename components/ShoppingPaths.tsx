interface ShoppingPath {
  title: string;
  description: string;
  href: string;
  eyebrow: string;
}

interface ShoppingPathsProps {
  paths: ShoppingPath[];
}

export function ShoppingPaths({ paths }: ShoppingPathsProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10" aria-labelledby="shopping-paths-title">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-clay">Áreas da loja</p>
          <h2 id="shopping-paths-title" className="mt-3 text-3xl font-black text-ink md:text-5xl">Escolha como quer navegar</h2>
          <p className="mt-4 max-w-2xl text-neutral-700">
            Veja produtos, medidas, entrega e atendimento em páginas pensadas para cada etapa da compra.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {paths.map((path) => (
          <a
            key={path.title}
            href={path.href}
            className="group flex min-h-56 flex-col justify-between rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-clay">{path.eyebrow}</p>
              <h3 className="mt-3 text-2xl font-black text-ink">{path.title}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{path.description}</p>
            </div>
            <span className="mt-6 inline-flex w-fit rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition group-hover:bg-clay">
              Abrir
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
