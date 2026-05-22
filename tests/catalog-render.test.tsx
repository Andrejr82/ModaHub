import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CatalogPageClient } from "@/components/CatalogPageClient";
import { products } from "@/data/products";

describe("catalog page", () => {
  it("renders full catalog filters outside the shortened home", () => {
    window.localStorage.clear();
    render(<CatalogPageClient products={products} />);

    expect(screen.getByRole("heading", { name: /Encontre as peças do seu estilo/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Filtros do catálogo")).toBeInTheDocument();
    expect(screen.getByText("Filtrar curadoria")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Camisas" })).toBeInTheDocument();
    expect(screen.getByText("Camisa Oversized Essential")).toBeInTheDocument();
  });
});
