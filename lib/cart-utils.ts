import type { CartItem, Product } from "@/types/product";

function getCartItemMatcher(productId: string, selectedSize?: string) {
  return (item: CartItem) => item.productId === productId && (item.selectedSize ?? "") === (selectedSize ?? "");
}

export function addCartItem(items: CartItem[], product: Product, quantity = 1, selectedSize?: string): CartItem[] {
  const existing = items.find(getCartItemMatcher(product.id, selectedSize));
  if (existing) {
    return items.map((item) =>
      getCartItemMatcher(product.id, selectedSize)(item)
        ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
        : item,
    );
  }
  return [...items, { productId: product.id, product, quantity: Math.min(quantity, product.stock), selectedSize }];
}

export function updateCartItemQuantity(items: CartItem[], productId: string, quantity: number, selectedSize?: string): CartItem[] {
  if (quantity <= 0) return removeCartItem(items, productId, selectedSize);
  return items.map((item) =>
    getCartItemMatcher(productId, selectedSize)(item) ? { ...item, quantity: Math.min(quantity, item.product.stock) } : item,
  );
}

export function removeCartItem(items: CartItem[], productId: string, selectedSize?: string): CartItem[] {
  return items.filter((item) => !getCartItemMatcher(productId, selectedSize)(item));
}

export function calculateCartSubtotal(items: CartItem[]): number {
  return items.reduce((subtotal, item) => subtotal + item.product.price * item.quantity, 0);
}
