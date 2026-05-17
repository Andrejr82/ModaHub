export type ProductCategory =
  | "Nova Coleção"
  | "Promoções"
  | "Kits/Conjuntos"
  | "Camisas"
  | "Bermudas"
  | "Calças"
  | "Calçados"
  | "Bonés"
  | "Acessórios";

export type SortOption = "relevance" | "price-asc" | "price-desc" | "best-sellers" | "newest" | "rating";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subcategory: string;
  description: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors: string[];
  tags: string[];
  image: string;
  imageAlt: string;
  isNew: boolean;
  isBestSeller: boolean;
  hasDiscount: boolean;
  stock: number;
  releaseDate: string;
  salesCount: number;
  palette: string;
  freeShipping: boolean;
  installments: number;
  collection: string;
  isFeatured: boolean;
  isLaunch: boolean;
}

export interface Category {
  id: string;
  name: ProductCategory;
  description: string;
  accent: string;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  featured: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
  selectedSize?: string;
}

export interface FilterState {
  query: string;
  categories: ProductCategory[];
  brands: string[];
  priceRange: [number, number];
  discountOnly: boolean;
  minRating: number;
  sizes: string[];
  newOnly: boolean;
  bestSellerOnly: boolean;
}
