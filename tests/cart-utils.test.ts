import { describe, expect, it } from "vitest";
import { products } from "@/data/products";
import { addCartItem, calculateCartSubtotal, removeCartItem, updateCartItemQuantity } from "@/lib/cart-utils";
import { CART_STORAGE_KEY, readCartStorage, writeCartStorage } from "@/lib/storage";

describe("cart utils", () => {
  it("adds, updates, removes and calculates subtotal", () => {
    const first = products[0];
    const second = products[1];
    let cart = addCartItem([], first);
    cart = addCartItem(cart, first);
    cart = addCartItem(cart, second);

    expect(cart).toHaveLength(2);
    expect(cart.find((item) => item.productId === first.id)?.quantity).toBe(2);
    expect(calculateCartSubtotal(cart)).toBeCloseTo(first.price * 2 + second.price);

    cart = updateCartItemQuantity(cart, first.id, 3);
    expect(cart.find((item) => item.productId === first.id)?.quantity).toBe(3);

    cart = removeCartItem(cart, second.id);
    expect(cart).toHaveLength(1);
    expect(calculateCartSubtotal(cart)).toBeCloseTo(first.price * 3);
  });

  it("removes item when quantity becomes zero", () => {
    const cart = addCartItem([], products[0]);
    expect(updateCartItemQuantity(cart, products[0].id, 0)).toEqual([]);
  });

  it("persists and reads cart state from localStorage", () => {
    window.localStorage.clear();
    const cart = addCartItem([], products[0]);

    writeCartStorage(window.localStorage, cart);

    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toContain(products[0].id);
    expect(readCartStorage(window.localStorage)).toEqual(cart);
  });
});
