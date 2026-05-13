import { describe, expect, it } from "vitest";
import { products } from "@/data/products";
import { defaultFilterState, filterProducts, getVisibleProducts, searchProducts, sortProducts } from "@/lib/filter-products";

const requiredProductKeys = [
  "id", "name", "brand", "category", "subcategory", "description", "price", "rating", "reviewCount", "sizes", "colors", "tags", "image", "isNew", "isBestSeller", "hasDiscount", "stock", "releaseDate", "salesCount",
];

describe("mock product data", () => {
  it("contains at least 16 complete products and commerce flags", () => {
    expect(products).toHaveLength(16);
    for (const product of products) {
      for (const key of requiredProductKeys) {
        expect(product).toHaveProperty(key);
      }
      expect(product.hasDiscount ? product.oldPrice : true).toBeTruthy();
    }
    expect(products.some((product) => product.isBestSeller)).toBe(true);
    expect(products.some((product) => product.isNew)).toBe(true);
    expect(products.some((product) => product.hasDiscount)).toBe(true);
  });
});

describe("search, filters and sorting", () => {
  it("searches by name, brand, category and tag", () => {
    expect(searchProducts(products, "Blazer").map((product) => product.id)).toContain("p1");
    expect(searchProducts(products, "Aurora Studio").every((product) => product.brand === "Aurora Studio")).toBe(true);
    expect(searchProducts(products, "Calçados").every((product) => product.category === "Calçados")).toBe(true);
    expect(searchProducts(products, "viagem").length).toBeGreaterThan(0);
  });

  it("returns empty results for missing searches", () => {
    expect(searchProducts(products, "produto inexistente xyz")).toEqual([]);
  });

  it("filters by category, brand, price, size and combined flags", () => {
    expect(filterProducts(products, { ...defaultFilterState, categories: ["Bolsas"] }).every((product) => product.category === "Bolsas")).toBe(true);
    expect(filterProducts(products, { ...defaultFilterState, brands: ["Vela & Co."] }).every((product) => product.brand === "Vela & Co.")).toBe(true);
    expect(filterProducts(products, { ...defaultFilterState, priceRange: [0, 150] }).every((product) => product.price <= 150)).toBe(true);
    expect(filterProducts(products, { ...defaultFilterState, sizes: ["Único"] }).every((product) => product.sizes.includes("Único"))).toBe(true);

    const combined = filterProducts(products, { ...defaultFilterState, categories: ["Acessórios"], discountOnly: true, minRating: 4.5 });
    expect(combined.every((product) => product.category === "Acessórios" && product.hasDiscount && product.rating >= 4.5)).toBe(true);
  });

  it("sorts by all required commerce strategies", () => {
    const asc = sortProducts(products, "price-asc");
    expect(asc[0].price).toBeLessThanOrEqual(asc[1].price);
    const desc = sortProducts(products, "price-desc");
    expect(desc[0].price).toBeGreaterThanOrEqual(desc[1].price);
    const best = sortProducts(products, "best-sellers");
    expect(best[0].salesCount).toBeGreaterThanOrEqual(best[1].salesCount);
    const newest = sortProducts(products, "newest");
    expect(new Date(newest[0].releaseDate).getTime()).toBeGreaterThanOrEqual(new Date(newest[1].releaseDate).getTime());
    const rating = sortProducts(products, "rating");
    expect(rating[0].rating).toBeGreaterThanOrEqual(rating[1].rating);
  });

  it("combines search, filters and sorting", () => {
    const result = getVisibleProducts(products, { ...defaultFilterState, query: "casual", priceRange: [0, 350], bestSellerOnly: true }, "price-asc");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((product) => product.price <= 350 && product.isBestSeller)).toBe(true);
  });
});
