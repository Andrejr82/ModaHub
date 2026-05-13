import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { CART_STORAGE_KEY, WISHLIST_STORAGE_KEY } from "@/lib/storage";

describe("home commerce interactions", () => {
  it("adds a product to the cart, persists it and supports quantity/removal in the drawer", async () => {
    window.localStorage.clear();
    render(<Home />);

    fireEvent.click(screen.getAllByRole("button", { name: /adicionar ao carrinho/i })[0]);

    await waitFor(() => {
      expect(window.localStorage.getItem(CART_STORAGE_KEY)).toContain("p1");
    });

    fireEvent.click(await screen.findByRole("button", { name: /abrir carrinho com 1 itens/i }));
    const cartDialog = screen.getByRole("dialog", { name: /seu carrinho/i });
    expect(cartDialog).toBeInTheDocument();
    expect(within(cartDialog).getByText("Blazer Linho Estruturado")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/quantidade/i), { target: { value: "2" } });
    await waitFor(() => {
      expect(window.localStorage.getItem(CART_STORAGE_KEY)).toContain('"quantity":2');
    });

    fireEvent.click(screen.getByRole("button", { name: /remover blazer linho estruturado/i }));
    await waitFor(() => {
      expect(screen.getByText("Seu carrinho está vazio")).toBeInTheDocument();
      expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBe("[]");
    });
  });

  it("toggles wishlist visual state and persists add/remove actions", async () => {
    window.localStorage.clear();
    render(<Home />);

    const addButton = screen.getAllByRole("button", { name: /adicionar blazer linho estruturado à wishlist/i })[0];
    expect(addButton).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(addButton);

    const removeButton = await screen.findAllByRole("button", { name: /remover blazer linho estruturado da wishlist/i });
    expect(removeButton[0]).toHaveAttribute("aria-pressed", "true");
    await waitFor(() => {
      expect(window.localStorage.getItem(WISHLIST_STORAGE_KEY)).toContain("p1");
    });

    fireEvent.click(removeButton[0]);

    await waitFor(() => {
      expect(screen.getAllByRole("button", { name: /adicionar blazer linho estruturado à wishlist/i })[0]).toHaveAttribute("aria-pressed", "false");
      expect(window.localStorage.getItem(WISHLIST_STORAGE_KEY)).toBe("[]");
    });
  });
});
