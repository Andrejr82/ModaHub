import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { CART_STORAGE_KEY, WISHLIST_STORAGE_KEY } from "@/lib/storage";

describe("home commerce interactions", () => {
  it("adds a product to the cart, persists it and supports quantity/removal in the drawer", async () => {
    window.localStorage.clear();
    render(<Home />);

    expect(screen.getAllByRole("button", { name: /escolha o tamanho/i })[0]).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: /selecionar tamanho xg para camisa oversized essential/i }));
    fireEvent.click(screen.getAllByRole("button", { name: /comprar/i })[0]);

    await waitFor(() => {
      expect(window.localStorage.getItem(CART_STORAGE_KEY)).toContain("p1");
      expect(window.localStorage.getItem(CART_STORAGE_KEY)).toContain('"selectedSize":"XG"');
    });

    expect(screen.getByText("Adicionado ao carrinho")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /ver carrinho/i }));
    const cartDialog = screen.getByRole("dialog", { name: /seu carrinho/i });
    expect(cartDialog).toBeInTheDocument();
    expect(within(cartDialog).getByText("Camisa Oversized Essential")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/quantidade/i), { target: { value: "2" } });
    await waitFor(() => {
      expect(window.localStorage.getItem(CART_STORAGE_KEY)).toContain('"quantity":2');
    });

    fireEvent.click(screen.getByRole("button", { name: /remover camisa oversized essential/i }));
    await waitFor(() => {
      expect(screen.getByText("Seu carrinho está vazio")).toBeInTheDocument();
      expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBe("[]");
    });
  }, 10000);

  it("toggles wishlist visual state and persists add/remove actions", async () => {
    window.localStorage.clear();
    render(<Home />);

    const addButton = screen.getAllByRole("button", { name: /adicionar camisa oversized essential à wishlist/i })[0];
    expect(addButton).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(addButton);

    const removeButton = await screen.findAllByRole("button", { name: /remover camisa oversized essential da wishlist/i });
    expect(removeButton[0]).toHaveAttribute("aria-pressed", "true");
    await waitFor(() => {
      expect(window.localStorage.getItem(WISHLIST_STORAGE_KEY)).toContain("p1");
    });

    fireEvent.click(removeButton[0]);

    await waitFor(() => {
      expect(screen.getAllByRole("button", { name: /adicionar camisa oversized essential à wishlist/i })[0]).toHaveAttribute("aria-pressed", "false");
      expect(window.localStorage.getItem(WISHLIST_STORAGE_KEY)).toBe("[]");
    });
  });
});
