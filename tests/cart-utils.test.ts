import { describe, expect, it } from "vitest";
import { products } from "@/data/products";
import { addCartItem, calculateCartSubtotal, removeCartItem, updateCartItemQuantity } from "@/lib/cart-utils";
import { CART_STORAGE_KEY, readCartStorage, writeCartStorage } from "@/lib/storage";

describe("cart utils", () => {
  it("adds, updates, removes and calculates subtotal", () => {
    const first = products[0];
    const second = products[1];
    let cart = addCartItem([], first, 1, "P");
    cart = addCartItem(cart, first, 1, "P");
    cart = addCartItem(cart, second);

    expect(cart).toHaveLength(2);
    expect(cart.find((item) => item.productId === first.id && item.selectedSize === "P")?.quantity).toBe(2);
    expect(calculateCartSubtotal(cart)).toBeCloseTo(first.price * 2 + second.price);

    cart = updateCartItemQuantity(cart, first.id, 3, "P");
    expect(cart.find((item) => item.productId === first.id && item.selectedSize === "P")?.quantity).toBe(3);

    cart = removeCartItem(cart, second.id);
    expect(cart).toHaveLength(1);
    expect(calculateCartSubtotal(cart)).toBeCloseTo(first.price * 3);
  });

  it("removes item when quantity becomes zero", () => {
    const cart = addCartItem([], products[0], 1, "P");
    expect(updateCartItemQuantity(cart, products[0].id, 0, "P")).toEqual([]);
  });

  it("keeps the same product in separate cart lines when sizes differ", () => {
    const item = products[0];
    const cart = addCartItem(addCartItem([], item, 1, "P"), item, 1, "M");

    expect(cart).toHaveLength(2);
    expect(cart.map((entry) => entry.selectedSize)).toEqual(["P", "M"]);
  });

  it("persists and reads cart state from localStorage", () => {
    window.localStorage.clear();
    const cart = addCartItem([], products[0]);

    writeCartStorage(window.localStorage, cart);

    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toContain(products[0].id);
    expect(readCartStorage(window.localStorage)).toEqual(cart);
  });
});
