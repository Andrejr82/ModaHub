import { formatCurrency } from "@/lib/format";
import type { CartItem } from "@/types/product";

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  subtotal: number;
  onClose: () => void;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export function CartDrawer({ isOpen, items, subtotal, onClose, onRemove, onUpdateQuantity }: CartDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <button type="button" className="absolute inset-0 bg-ink/45" aria-label="Fechar carrinho" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-neutral-200 p-5">
          <div>
            <h2 id="cart-title" className="text-2xl font-black text-ink">Seu carrinho</h2>
            <p className="text-sm text-neutral-600">Checkout fictício para demonstração.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-neutral-300 px-3 py-2 font-bold" aria-label="Fechar drawer do carrinho">×</button>
        </div>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <p className="text-5xl" aria-hidden>🛍️</p>
            <h3 className="mt-4 text-xl font-bold text-ink">Seu carrinho está vazio</h3>
            <p className="mt-2 text-neutral-600">Adicione seus favoritos da curadoria ModaHub para ver o subtotal.</p>
            <button type="button" onClick={onClose} className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white">Continuar comprando</button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {items.map((item) => (
                <article key={item.productId} className="rounded-2xl border border-neutral-200 p-4">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-clay">{item.product.brand}</p>
                      <h3 className="font-bold text-ink">{item.product.name}</h3>
                      <p className="mt-1 text-sm text-neutral-600">{formatCurrency(item.product.price)}</p>
                    </div>
                    <button type="button" onClick={() => onRemove(item.productId)} className="text-sm font-semibold text-clay" aria-label={`Remover ${item.product.name}`}>Remover</button>
                  </div>
                  <label className="mt-4 block text-sm font-semibold text-ink">Quantidade
                    <input type="number" min={1} max={item.product.stock} value={item.quantity} onChange={(event) => onUpdateQuantity(item.productId, Number(event.target.value))} className="mt-2 w-24 rounded-xl border border-neutral-300 px-3 py-2" />
                  </label>
                </article>
              ))}
            </div>
            <div className="border-t border-neutral-200 p-5">
              <div className="flex items-center justify-between text-lg font-black text-ink">
                <span>Subtotal</span><span>{formatCurrency(subtotal)}</span>
              </div>
              <p className="mt-2 text-sm text-neutral-600">Frete e descontos finais seriam calculados no checkout real.</p>
              <button type="button" className="mt-4 w-full rounded-full bg-clay px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white">Ir para checkout</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
