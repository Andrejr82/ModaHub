"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ProductArtwork } from "@/components/ProductArtwork";
import { calculateInstallmentValue, formatCurrency, getFreeShippingProgress } from "@/lib/format";
import type { CartItem } from "@/types/product";

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  subtotal: number;
  onClose: () => void;
  onRemove: (productId: string, selectedSize?: string) => void;
  onUpdateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
}

export function CartDrawer({ isOpen, items, subtotal, onClose, onRemove, onUpdateQuantity }: CartDrawerProps) {
  const [coupon, setCoupon] = useState("");
  const [zipCode, setZipCode] = useState("");
  const couponApplied = coupon.trim().toUpperCase() === "MODAHUB10";
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const progress = useMemo(() => getFreeShippingProgress(subtotal), [subtotal]);
  const shipping = progress.hasFreeShipping || subtotal === 0 ? 0 : 19.9;
  const total = Math.max(subtotal - discount + shipping, 0);
  const installment = calculateInstallmentValue(total, 3);

  const [isCheckingOut, setIsCheckingOut] = useState<"stripe" | "mercadopago" | null>(null);

  async function handleCheckout(gateway: "stripe" | "mercadopago") {
    setIsCheckingOut(gateway);
    try {
      const response = await fetch(`/api/checkout/${gateway}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(i => ({ ...i.product, quantity: i.quantity, selectedSize: i.selectedSize })),
          email: "cliente@demo.com", // Mock email for sandbox
        })
      });
      const data = await response.json();
      if (data.url) {
        // Esvazia o carrinho no lado do cliente ANTES de redirecionar
        const { writeCartStorage } = await import("@/lib/storage");
        writeCartStorage(window.localStorage, []);
        
        window.location.href = data.url;
      } else {
        alert("Erro ao iniciar checkout: " + (data.error || "Desconhecido"));
        setIsCheckingOut(null);
      }
    } catch (error) {
      alert("Erro ao conectar com o gateway.");
      setIsCheckingOut(null);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <button type="button" className="absolute inset-0 bg-ink/45" aria-label="Fechar carrinho" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-neutral-200 p-5">
          <div>
            <h2 id="cart-title" className="text-2xl font-black text-ink">Seu carrinho</h2>
            <p className="text-sm text-neutral-600">Compra demonstrativa, sem pagamento real.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-neutral-300 px-3 py-2 font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-clay" aria-label="Fechar drawer do carrinho">×</button>
        </div>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <p className="text-5xl" aria-hidden>🛍️</p>
            <h3 className="mt-4 text-xl font-bold text-ink">Seu carrinho está vazio</h3>
            <p className="mt-2 text-neutral-600">Adicione lançamentos, promoções ou kits para ver subtotal, cupom e frete.</p>
            <button type="button" onClick={onClose} className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white">Continuar comprando</button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {items.map((item) => (
                <article key={`${item.productId}-${item.selectedSize ?? "default"}`} className="rounded-2xl border border-neutral-200 p-4">
                  <div className="grid grid-cols-[72px_1fr_auto] gap-3">
                    <div aria-label={item.product.imageAlt} role="img" className="relative h-20 w-20 overflow-hidden rounded-2xl border border-neutral-200">
                      {!item.product.image.startsWith("gradient://") ? (
                        <Image src={item.product.image} alt={item.product.imageAlt} fill className="object-cover" />
                      ) : (
                        <ProductArtwork product={item.product} className="h-full w-full" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-clay">{item.product.brand}</p>
                      <h3 className="font-black leading-tight text-ink">{item.product.name}</h3>
                      <p className="mt-1 text-sm text-neutral-600">Tamanho: {item.selectedSize ?? item.product.sizes[0] ?? "Único"}</p>
                      <p className="text-sm font-bold text-ink">{formatCurrency(item.product.price)}</p>
                    </div>
                    <button type="button" onClick={() => onRemove(item.productId, item.selectedSize)} className="h-fit text-sm font-semibold text-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay" aria-label={`Remover ${item.product.name}`}>Remover</button>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <label className="text-sm font-semibold text-ink">Quantidade
                      <input type="number" min={1} max={item.product.stock} value={item.quantity} onChange={(event) => onUpdateQuantity(item.productId, Number(event.target.value), item.selectedSize)} className="ml-3 w-20 rounded-xl border border-neutral-300 px-3 py-2" />
                    </label>
                    <p className="text-sm font-black text-ink">{formatCurrency(item.product.price * item.quantity)}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="space-y-4 border-t border-neutral-200 p-5">
              <div className="rounded-2xl bg-sand p-4">
                <div className="h-3 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-emerald-600" style={{ width: `${progress.percentage}%` }} />
                </div>
                <p className="mt-2 text-sm font-bold text-ink">{progress.message}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-sm font-semibold text-ink">Cupom
                  <input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="MODAHUB10" className="mt-2 w-full rounded-2xl border border-neutral-300 px-3 py-3 font-normal" />
                </label>
                <label className="text-sm font-semibold text-ink">CEP
                  <input value={zipCode} onChange={(event) => setZipCode(event.target.value)} placeholder="00000-000" className="mt-2 w-full rounded-2xl border border-neutral-300 px-3 py-3 font-normal" />
                </label>
              </div>
              {zipCode ? <p className="text-sm text-neutral-600">Frete simulado para {zipCode}: {shipping === 0 ? "grátis" : formatCurrency(shipping)}</p> : null}
              <div className="space-y-2 text-sm text-neutral-700">
                <div className="flex justify-between"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
                <div className="flex justify-between"><span>Desconto</span><strong>- {formatCurrency(discount)}</strong></div>
                <div className="flex justify-between"><span>Frete</span><strong>{shipping === 0 ? "Grátis" : formatCurrency(shipping)}</strong></div>
                <div className="flex justify-between text-xl font-black text-ink"><span>Total</span><span>{formatCurrency(total)}</span></div>
                <p className="font-semibold text-neutral-700">Estimativa: 3x de {formatCurrency(installment)} sem juros</p>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => handleCheckout("stripe")} 
                  disabled={isCheckingOut !== null}
                  className="w-full rounded-full bg-ink px-6 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-clay disabled:opacity-50"
                >
                  {isCheckingOut === "stripe" ? "Processando..." : "💳 Pagar com Cartão (Stripe)"}
                </button>
                <button 
                  type="button" 
                  onClick={() => handleCheckout("mercadopago")} 
                  disabled={isCheckingOut !== null}
                  className="w-full rounded-full bg-[#009EE3] px-6 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:brightness-110 disabled:opacity-50"
                >
                  {isCheckingOut === "mercadopago" ? "Processando..." : "💠 Pagar com Pix (Mercado Pago)"}
                </button>
              </div>
              <button type="button" onClick={onClose} disabled={isCheckingOut !== null} className="w-full rounded-full border border-ink px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-clay">Continuar comprando</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
