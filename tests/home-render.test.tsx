import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("home page", () => {
  it("renders core commerce sections", () => {
    render(<Home />);
    expect(screen.getAllByLabelText("ModaHub página inicial").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /abrir menu de categorias/i })).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("heading", { name: /Nova coleção streetwear premium/i })).toBeInTheDocument();
    expect(screen.getByText("Comece pelo que mais converte")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Mais vendidos" })).toBeInTheDocument();
    expect(screen.getByText("Lançamentos streetwear premium")).toBeInTheDocument();
    expect(screen.getByText("Encontre sua próxima peça")).toBeInTheDocument();
    expect(screen.getByText("Looks reais, inspiração diária")).toBeInTheDocument();
    expect(screen.getByText("Promoções até 50% off")).toBeInTheDocument();
    expect(screen.getByText("Kits e conjuntos")).toBeInTheDocument();
    expect(screen.getByText("Newsletter ModaHub")).toBeInTheDocument();
    expect(screen.getByText(/© 2026 ModaHub. Loja fictícia para demonstração./i)).toBeInTheDocument();
  });
});
