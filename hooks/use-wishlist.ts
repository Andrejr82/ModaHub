"use client";

import { useEffect, useMemo, useState } from "react";
import { readWishlistStorage, writeWishlistStorage } from "@/lib/storage";

export function useWishlist() {
  const [ids, setIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIds(readWishlistStorage(window.localStorage));
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) writeWishlistStorage(window.localStorage, ids);
  }, [ids, isHydrated]);

  const wishlistSet = useMemo(() => new Set(ids), [ids]);

  return {
    ids,
    count: ids.length,
    isFavorite: (productId: string) => wishlistSet.has(productId),
    toggleFavorite: (productId: string) =>
      setIds((current) => (current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId])),
    removeFavorite: (productId: string) => setIds((current) => current.filter((id) => id !== productId)),
  };
}
