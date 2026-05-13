import type { CartItem } from "@/types/product";

export const CART_STORAGE_KEY = "modahub-cart";
export const WISHLIST_STORAGE_KEY = "modahub-wishlist";

export function readCartStorage(storage: Storage): CartItem[] {
  const raw = storage.getItem(CART_STORAGE_KEY);
  if (!raw) return [];
  const parsed = JSON.parse(raw) as CartItem[];
  return Array.isArray(parsed) ? parsed : [];
}

export function writeCartStorage(storage: Storage, items: CartItem[]): void {
  storage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function readWishlistStorage(storage: Storage): string[] {
  const raw = storage.getItem(WISHLIST_STORAGE_KEY);
  if (!raw) return [];
  const parsed = JSON.parse(raw) as string[];
  return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
}

export function writeWishlistStorage(storage: Storage, productIds: string[]): void {
  storage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(productIds));
}
