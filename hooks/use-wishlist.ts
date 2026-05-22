"use client";

import { useMemo, useSyncExternalStore } from "react";
import { readWishlistStorage, subscribeStorageKey, WISHLIST_STORAGE_KEY, writeWishlistStorage } from "@/lib/storage";

const EMPTY_WISHLIST: string[] = [];
let lastWishlistRaw: string | null | undefined;
let lastWishlistSnapshot: string[] = EMPTY_WISHLIST;

function getWishlistSnapshot(): string[] {
  if (typeof window === "undefined") return EMPTY_WISHLIST;

  const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
  if (raw === lastWishlistRaw) return lastWishlistSnapshot;

  lastWishlistRaw = raw;
  lastWishlistSnapshot = raw ? readWishlistStorage(window.localStorage) : EMPTY_WISHLIST;
  return lastWishlistSnapshot;
}

export function useWishlist() {
  const ids = useSyncExternalStore(
    (onStoreChange) => subscribeStorageKey(WISHLIST_STORAGE_KEY, onStoreChange),
    getWishlistSnapshot,
    () => EMPTY_WISHLIST,
  );

  const wishlistSet = useMemo(() => new Set(ids), [ids]);

  return {
    ids,
    count: ids.length,
    isFavorite: (productId: string) => wishlistSet.has(productId),
    toggleFavorite: (productId: string) =>
      writeWishlistStorage(
        window.localStorage,
        ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId],
      ),
    removeFavorite: (productId: string) =>
      writeWishlistStorage(window.localStorage, ids.filter((id) => id !== productId)),
  };
}
