import { describe, expect, it } from "vitest";
import { readWishlistStorage, WISHLIST_STORAGE_KEY, writeWishlistStorage } from "@/lib/storage";

describe("wishlist storage", () => {
  it("persists and reads wishlist product ids", () => {
    window.localStorage.clear();
    writeWishlistStorage(window.localStorage, ["p1", "p2"]);
    expect(window.localStorage.getItem(WISHLIST_STORAGE_KEY)).toContain("p1");
    expect(readWishlistStorage(window.localStorage)).toEqual(["p1", "p2"]);
  });

  it("returns empty state when storage is empty", () => {
    window.localStorage.clear();
    expect(readWishlistStorage(window.localStorage)).toEqual([]);
  });
});
