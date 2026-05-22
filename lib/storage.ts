import type { CartItem } from "@/types/product";

export const CART_STORAGE_KEY = "modahub-cart";
export const WISHLIST_STORAGE_KEY = "modahub-wishlist";
const STORAGE_CHANGE_EVENT = "modahub-storage-change";

function dispatchStorageChange(key: string): void {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new CustomEvent(STORAGE_CHANGE_EVENT, { detail: { key } }));
}

export function readCartStorage(storage: Storage): CartItem[] {
  const raw = storage.getItem(CART_STORAGE_KEY);
  if (!raw) return [];
  const parsed = JSON.parse(raw) as CartItem[];
  return Array.isArray(parsed) ? parsed : [];
}

export function writeCartStorage(storage: Storage, items: CartItem[]): void {
  storage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  dispatchStorageChange(CART_STORAGE_KEY);
}

export function readWishlistStorage(storage: Storage): string[] {
  const raw = storage.getItem(WISHLIST_STORAGE_KEY);
  if (!raw) return [];
  const parsed = JSON.parse(raw) as string[];
  return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
}

export function writeWishlistStorage(storage: Storage, productIds: string[]): void {
  storage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(productIds));
  dispatchStorageChange(WISHLIST_STORAGE_KEY);
}

export function subscribeStorageKey(key: string, onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (event.key === key) onChange();
  };

  const handleCustomStorage = (event: Event) => {
    const detail = (event as CustomEvent<{ key?: string }>).detail;
    if (!detail?.key || detail.key === key) onChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(STORAGE_CHANGE_EVENT, handleCustomStorage);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(STORAGE_CHANGE_EVENT, handleCustomStorage);
  };
}
