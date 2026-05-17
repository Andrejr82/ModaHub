import type { Category } from "@/types/product";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const href = category.name === "Promoções" ? "#promocoes" : category.name === "Kits/Conjuntos" ? "#kits" : category.name === "Nova Coleção" ? "#lancamentos" : "#catalogo";

  return (
    <a href={href} className={`group relative min-h-44 overflow-hidden rounded-3xl bg-gradient-to-br ${category.accent} p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-clay`}>
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/25 blur-2xl" />
      <div className="relative flex h-full flex-col justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/80">Comprar por categoria</p>
          <h3 className="mt-3 text-2xl font-black text-white drop-shadow">{category.name}</h3>
          <p className="mt-2 max-w-xs text-sm leading-6 text-white/85">{category.description}</p>
        </div>
        <span className="mt-6 inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-black text-ink transition group-hover:bg-ink group-hover:text-white">Ver produtos</span>
      </div>
    </a>
  );
}
