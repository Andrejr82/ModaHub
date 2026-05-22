"use client";

import { useMemo, useSyncExternalStore } from "react";
import { addCartItem, calculateCartSubtotal, removeCartItem, updateCartItemQuantity } from "@/lib/cart-utils";
import { CART_STORAGE_KEY, readCartStorage, subscribeStorageKey, writeCartStorage } from "@/lib/storage";
import type { CartItem, Product } from "@/types/product";

const EMPTY_CART: CartItem[] = [];
let lastCartRaw: string | null | undefined;
let lastCartSnapshot: CartItem[] = EMPTY_CART;

function getCartSnapshot(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_CART;

  const raw = window.localStorage.getItem(CART_STORAGE_KEY);
  if (raw === lastCartRaw) return lastCartSnapshot;

  lastCartRaw = raw;
  lastCartSnapshot = raw ? readCartStorage(window.localStorage) : EMPTY_CART;
  return lastCartSnapshot;
}

export function useCart() {
  const items = useSyncExternalStore(
    (onStoreChange) => subscribeStorageKey(CART_STORAGE_KEY, onStoreChange),
    getCartSnapshot,
    () => EMPTY_CART,
  );

  const subtotal = useMemo(() => calculateCartSubtotal(items), [items]);
  const itemCount = useMemo(() => items.reduce((count, item) => count + item.quantity, 0), [items]);

  return {
    items,
    subtotal,
    itemCount,
    addItem: (product: Product, selectedSize?: string) =>
      writeCartStorage(window.localStorage, addCartItem(getCartSnapshot(), product, 1, selectedSize)),
    removeItem: (productId: string, selectedSize?: string) =>
      writeCartStorage(window.localStorage, removeCartItem(getCartSnapshot(), productId, selectedSize)),
    updateQuantity: (productId: string, quantity: number, selectedSize?: string) =>
      writeCartStorage(window.localStorage, updateCartItemQuantity(getCartSnapshot(), productId, quantity, selectedSize)),
    clearCart: () => writeCartStorage(window.localStorage, []),
  };
}
