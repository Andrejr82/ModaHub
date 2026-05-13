import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("home page", () => {
  it("renders core commerce sections", () => {
    render(<Home />);
    expect(screen.getByLabelText("ModaHub página inicial")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Moda premium para todos os seus momentos/i })).toBeInTheDocument();
    expect(screen.getByText("Categorias em destaque")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Mais vendidos" })).toBeInTheDocument();
    expect(screen.getByText("Novidades da semana")).toBeInTheDocument();
    expect(screen.getByText("Encontre sua próxima peça")).toBeInTheDocument();
    expect(screen.getByText("Escolha por ocasião")).toBeInTheDocument();
    expect(screen.getByText("Editorial da temporada")).toBeInTheDocument();
    expect(screen.getByText("Marcas em destaque")).toBeInTheDocument();
    expect(screen.getByText("Newsletter ModaHub")).toBeInTheDocument();
    expect(screen.getByText(/© 2026 ModaHub Multimarcas/i)).toBeInTheDocument();
  });
});
