import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("home page", () => {
  it("renders core commerce sections", () => {
    render(<Home />);
    expect(screen.getAllByLabelText("ModaHub página inicial").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /abrir menu de categorias/i })).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("heading", { name: /Nova coleção streetwear premium/i })).toBeInTheDocument();
    expect(screen.getByText("Encontre o que quer comprar")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Escolha como quer navegar/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Lançamentos/i })[0]).toHaveAttribute("href", "/catalogo?mode=launches");
    expect(screen.getAllByRole("link", { name: /Guia de medidas/i })[0]).toHaveAttribute("href", "/guia-de-medidas");
    expect(screen.getByText("Peças em destaque agora")).toBeInTheDocument();
    expect(screen.getByText("Confiança sem excesso de conteúdo")).toBeInTheDocument();
    expect(screen.getByText(/© 2026 ModaHub. Loja fictícia para demonstração./i)).toBeInTheDocument();
  });
});
