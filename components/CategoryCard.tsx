import type { Category } from "@/types/product";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <a href="#catalogo" className={`group rounded-3xl bg-gradient-to-br ${category.accent} p-6 transition hover:-translate-y-1 hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-clay`}>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-600">Categoria</p>
      <h3 className="mt-8 text-2xl font-black text-ink">{category.name}</h3>
      <p className="mt-2 text-sm leading-6 text-neutral-700">{category.description}</p>
      <span className="mt-6 inline-flex font-semibold text-ink">Explorar →</span>
    </a>
  );
}
