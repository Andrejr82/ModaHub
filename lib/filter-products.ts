import type { FilterState, Product, ProductCategory, SortOption } from "@/types/product";

export const defaultFilterState: FilterState = {
  query: "",
  categories: [],
  brands: [],
  priceRange: [0, 600],
  discountOnly: false,
  minRating: 0,
  sizes: [],
  newOnly: false,
  bestSellerOnly: false,
};

const normalize = (value: string): string =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export function searchProducts(products: Product[], query: string): Product[] {
  const term = normalize(query);
  if (!term) return products;
  return products.filter((product) => {
    const haystack = [product.name, product.brand, product.category, product.subcategory, product.description, ...product.tags]
      .map(normalize)
      .join(" ");
    return haystack.includes(term);
  });
}

function productMatchesCategory(product: Product, category: ProductCategory): boolean {
  if (category === "Promoções") return product.hasDiscount || product.tags.includes("promoções");
  if (category === "Nova Coleção") return product.category === category || product.isNew || product.isLaunch || product.tags.includes("nova coleção");
  if (category === "Kits/Conjuntos") return product.category === category || product.tags.includes("kit") || product.tags.includes("conjunto");
  return product.category === category;
}

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  return searchProducts(products, filters.query).filter((product) => {
    const inCategory = filters.categories.length === 0 || filters.categories.some((category) => productMatchesCategory(product, category));
    const inBrand = filters.brands.length === 0 || filters.brands.includes(product.brand);
    const inPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const inDiscount = !filters.discountOnly || product.hasDiscount;
    const inRating = product.rating >= filters.minRating;
    const inSize = filters.sizes.length === 0 || filters.sizes.some((size) => product.sizes.includes(size));
    const inNew = !filters.newOnly || product.isNew;
    const inBestSeller = !filters.bestSellerOnly || product.isBestSeller;
    return inCategory && inBrand && inPrice && inDiscount && inRating && inSize && inNew && inBestSeller;
  });
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "best-sellers":
      return sorted.sort((a, b) => b.salesCount - a.salesCount);
    case "newest":
      return sorted.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case "relevance":
    default:
      return sorted.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller) || b.salesCount - a.salesCount);
  }
}

export function getVisibleProducts(products: Product[], filters: FilterState, sort: SortOption): Product[] {
  return sortProducts(filterProducts(products, filters), sort);
}
