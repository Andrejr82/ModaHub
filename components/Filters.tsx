import type { ChangeEvent } from "react";
import type { FilterState, ProductCategory, SortOption } from "@/types/product";

interface FiltersProps {
  filters: FilterState;
  brands: string[];
  categories: ProductCategory[];
  sizes: string[];
  sort: SortOption;
  total: number;
  onFiltersChange: (filters: FilterState) => void;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "relevance", label: "Relevância" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "best-sellers", label: "Mais vendidos" },
  { value: "newest", label: "Novidades" },
  { value: "rating", label: "Melhor avaliação" },
];

function toggleValue<T extends string>(values: T[], value: T): T[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function Filters({ filters, brands, categories, sizes, sort, total, onFiltersChange, onSortChange }: FiltersProps) {
  const setPrice = (event: ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, priceRange: [0, Number(event.target.value)] });
  };

  return (
    <aside className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm" aria-label="Filtros do catálogo">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-ink">Filtrar curadoria</h3>
          <p className="text-sm text-neutral-600">{total} produtos encontrados</p>
        </div>
        <button type="button" onClick={() => onFiltersChange({ ...filters, categories: [], brands: [], priceRange: [0, 600], discountOnly: false, minRating: 0, sizes: [], newOnly: false, bestSellerOnly: false })} className="text-sm font-semibold text-clay">
          Limpar
        </button>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-1">
        <label className="block text-sm font-semibold text-ink">
          Ordenar
          <select value={sort} onChange={(event) => onSortChange(event.target.value as SortOption)} className="mt-2 w-full rounded-2xl border border-neutral-300 px-3 py-3 font-normal">
            {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Categorias</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button key={category} type="button" aria-pressed={filters.categories.includes(category)} onClick={() => onFiltersChange({ ...filters, categories: toggleValue(filters.categories, category) })} className={`rounded-full border px-3 py-2 text-sm ${filters.categories.includes(category) ? "border-ink bg-ink text-white" : "border-neutral-300 bg-white text-neutral-700"}`}>{category}</button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Marcas</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {brands.map((brand) => (
              <button key={brand} type="button" aria-pressed={filters.brands.includes(brand)} onClick={() => onFiltersChange({ ...filters, brands: toggleValue(filters.brands, brand) })} className={`rounded-full border px-3 py-2 text-sm ${filters.brands.includes(brand) ? "border-ink bg-ink text-white" : "border-neutral-300 bg-white text-neutral-700"}`}>{brand}</button>
            ))}
          </div>
        </fieldset>
        <label className="block text-sm font-semibold text-ink">
          Preço até R$ {filters.priceRange[1]}
          <input type="range" min="80" max="600" step="10" value={filters.priceRange[1]} onChange={setPrice} className="mt-3 w-full accent-clay" />
        </label>
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Tamanhos</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button key={size} type="button" aria-pressed={filters.sizes.includes(size)} onClick={() => onFiltersChange({ ...filters, sizes: toggleValue(filters.sizes, size) })} className={`rounded-full border px-3 py-2 text-sm ${filters.sizes.includes(size) ? "border-ink bg-ink text-white" : "border-neutral-300 bg-white text-neutral-700"}`}>{size}</button>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-3 text-sm text-neutral-700">
          <label className="flex items-center gap-2"><input type="checkbox" checked={filters.discountOnly} onChange={(e) => onFiltersChange({ ...filters, discountOnly: e.target.checked })} /> Com desconto</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={filters.newOnly} onChange={(e) => onFiltersChange({ ...filters, newOnly: e.target.checked })} /> Novidades</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={filters.bestSellerOnly} onChange={(e) => onFiltersChange({ ...filters, bestSellerOnly: e.target.checked })} /> Mais vendidos</label>
          <label className="block font-semibold text-ink">Avaliação mínima
            <select value={filters.minRating} onChange={(e) => onFiltersChange({ ...filters, minRating: Number(e.target.value) })} className="mt-2 w-full rounded-2xl border border-neutral-300 px-3 py-3 font-normal">
              <option value={0}>Todas</option><option value={4}>4+ estrelas</option><option value={4.5}>4,5+ estrelas</option>
            </select>
          </label>
        </div>
      </div>
    </aside>
  );
}
