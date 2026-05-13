import type { CartItem, Product } from "@/types/product";

export function addCartItem(items: CartItem[], product: Product, quantity = 1): CartItem[] {
  const existing = items.find((item) => item.productId === product.id);
  if (existing) {
    return items.map((item) =>
      item.productId === product.id ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) } : item,
    );
  }
  return [...items, { productId: product.id, product, quantity: Math.min(quantity, product.stock) }];
}

export function updateCartItemQuantity(items: CartItem[], productId: string, quantity: number): CartItem[] {
  if (quantity <= 0) return removeCartItem(items, productId);
  return items.map((item) =>
    item.productId === productId ? { ...item, quantity: Math.min(quantity, item.product.stock) } : item,
  );
}

export function removeCartItem(items: CartItem[], productId: string): CartItem[] {
  return items.filter((item) => item.productId !== productId);
}

export function calculateCartSubtotal(items: CartItem[]): number {
  return items.reduce((subtotal, item) => subtotal + item.product.price * item.quantity, 0);
}
