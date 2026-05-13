import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CartDrawer } from "@/components/CartDrawer";
import { products } from "@/data/products";
import { addCartItem, calculateCartSubtotal } from "@/lib/cart-utils";

describe("CartDrawer", () => {
  it("renders empty cart state and lets the user continue shopping", () => {
    const onClose = vi.fn();

    render(
      <CartDrawer
        isOpen
        items={[]}
        subtotal={0}
        onClose={onClose}
        onRemove={vi.fn()}
        onUpdateQuantity={vi.fn()}
      />,
    );

    expect(screen.getByRole("dialog", { name: /seu carrinho/i })).toBeInTheDocument();
    expect(screen.getByText("Seu carrinho está vazio")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /continuar comprando/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders cart items, quantity controls, subtotal and removal action", () => {
    const item = products[0];
    const items = addCartItem([], item);
    const onRemove = vi.fn();
    const onUpdateQuantity = vi.fn();

    render(
      <CartDrawer
        isOpen
        items={items}
        subtotal={calculateCartSubtotal(items)}
        onClose={vi.fn()}
        onRemove={onRemove}
        onUpdateQuantity={onUpdateQuantity}
      />,
    );

    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText("Subtotal")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/quantidade/i), { target: { value: "2" } });
    expect(onUpdateQuantity).toHaveBeenCalledWith(item.id, 2);

    fireEvent.click(screen.getByRole("button", { name: `Remover ${item.name}` }));
    expect(onRemove).toHaveBeenCalledWith(item.id);
  });
});
