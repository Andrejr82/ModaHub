"use client";

import { useEffect, useMemo, useState } from "react";
import { addCartItem, calculateCartSubtotal, removeCartItem, updateCartItemQuantity } from "@/lib/cart-utils";
import { readCartStorage, writeCartStorage } from "@/lib/storage";
import type { CartItem, Product } from "@/types/product";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setItems(readCartStorage(window.localStorage));
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) writeCartStorage(window.localStorage, items);
  }, [isHydrated, items]);

  const subtotal = useMemo(() => calculateCartSubtotal(items), [items]);
  const itemCount = useMemo(() => items.reduce((count, item) => count + item.quantity, 0), [items]);

  return {
    items,
    subtotal,
    itemCount,
    addItem: (product: Product) => setItems((current) => addCartItem(current, product)),
    removeItem: (productId: string) => setItems((current) => removeCartItem(current, productId)),
    updateQuantity: (productId: string, quantity: number) =>
      setItems((current) => updateCartItemQuantity(current, productId, quantity)),
    clearCart: () => setItems([]),
  };
}
