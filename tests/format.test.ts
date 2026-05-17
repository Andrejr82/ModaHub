import { describe, expect, it } from "vitest";
import { calculateDiscountPercentage, calculateInstallmentValue, formatCurrency, getFreeShippingProgress, getStockLabel } from "@/lib/format";

describe("commerce format helpers", () => {
  it("formats currency and calculates commercial values", () => {
    expect(formatCurrency(199.9)).toContain("199,90");
    expect(calculateDiscountPercentage(199.9, 249.9)).toBe(20);
    expect(calculateInstallmentValue(199.8, 3)).toBeCloseTo(66.6);
  });

  it("returns stock labels and free shipping progress", () => {
    expect(getStockLabel(0)).toBe("Esgotado");
    expect(getStockLabel(3)).toBe("Últimas unidades");
    expect(getStockLabel(12)).toBe("12 em estoque");
    expect(getFreeShippingProgress(150).hasFreeShipping).toBe(false);
    expect(getFreeShippingProgress(399).message).toBe("Você ganhou frete grátis");
  });
});
