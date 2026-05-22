import type { Category } from "@/types/product";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const href =
    category.name === "Kits/Conjuntos"
      ? "/catalogo?mode=kits"
      : category.name === "Promoções"
        ? "/catalogo?mode=sale"
        : category.name === "Nova Coleção"
          ? "/catalogo?mode=launches"
          : `/catalogo?category=${encodeURIComponent(category.name)}`;

  return (
    <a href={href} className="group relative min-h-44 overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-[#171412] via-[#332a25] to-[#6f4b3a] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-clay">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%)]" aria-hidden />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/12 blur-2xl" />
      <div className="relative flex h-full flex-col justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/85">Comprar por categoria</p>
          <h3 className="mt-3 text-2xl font-black text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.35)]">{category.name}</h3>
          <p className="mt-2 max-w-xs text-sm leading-6 text-white/92">{category.description}</p>
        </div>
        <span className="mt-6 inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-black text-ink shadow-sm transition group-hover:bg-ink group-hover:text-white">Ver produtos</span>
      </div>
    </a>
  );
}
