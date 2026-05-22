"use client";

import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/format";
import { processCheckout } from "./actions";
import Image from "next/image";
import { ProductArtwork } from "@/components/ProductArtwork";

interface CheckoutClientProps {
  userProfile: any;
  email: string;
}

export function CheckoutClient({ userProfile, email }: CheckoutClientProps) {
  const { items, subtotal, clearCart } = useCart();
  const shippingFee = subtotal > 500 ? 0 : 29.90; // Frete grátis acima de R$500
  const total = subtotal + shippingFee;

  // Endereço
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // Pagamento
  const [paymentMethod, setPaymentMethod] = useState<"credit_card" | "pix">("credit_card");
  const [cardNumber, setCardNumber] = useState("");
  
  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-soft">
        <h2 className="text-2xl font-black text-ink">Seu carrinho está vazio.</h2>
        <a href="/" className="mt-6 inline-block rounded-full bg-clay px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white">Voltar para a Loja</a>
      </div>
    );
  }

  async function handleCepBlur() {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setStreet(data.logradouro);
          setNeighborhood(data.bairro);
          setCity(data.localidade);
          setState(data.uf);
          setError(null);
        } else {
          setError("CEP não encontrado.");
        }
      } catch (err) {
        setError("Erro ao buscar CEP.");
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Mock Anti-Fraude
    if (paymentMethod === 'credit_card' && cardNumber.replace(/\D/g, '') === '0000000000000000') {
      setError("Pagamento recusado pelo sistema Anti-Fraude (Cartão bloqueado). Tente outro cartão.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await processCheckout({
        items,
        shippingAddress: {
          street, number, complement, neighborhood, city, state, zipcode: cep
        },
        shippingFee
      });

      if (result.success) {
        clearCart();
        window.location.href = '/minha-conta?success=true';
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao processar o pedido.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Lado Esquerdo: Formulários */}
      <div className="space-y-8 lg:col-span-7">
        
        {/* Identificação */}
        <section className="rounded-3xl bg-white p-6 shadow-soft md:p-8">
          <h2 className="mb-4 text-xl font-black text-ink">1. Identificação</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-bold text-neutral-500">Nome</label>
              <p className="font-semibold text-ink">{userProfile?.full_name}</p>
            </div>
            <div>
              <label className="text-sm font-bold text-neutral-500">CPF</label>
              <p className="font-semibold text-ink">{userProfile?.cpf}</p>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-bold text-neutral-500">E-mail</label>
              <p className="font-semibold text-ink">{email}</p>
            </div>
          </div>
        </section>

        {/* Endereço de Entrega */}
        <section className="rounded-3xl bg-white p-6 shadow-soft md:p-8">
          <h2 className="mb-4 text-xl font-black text-ink">2. Endereço de Entrega</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-ink" htmlFor="cep">CEP</label>
              <input id="cep" required maxLength={9} value={cep} onChange={e => setCep(e.target.value)} onBlur={handleCepBlur} className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20" placeholder="00000-000" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-ink" htmlFor="street">Rua</label>
              <input id="street" required value={street} onChange={e => setStreet(e.target.value)} className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ink" htmlFor="number">Número</label>
              <input id="number" required value={number} onChange={e => setNumber(e.target.value)} className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ink" htmlFor="complement">Complemento</label>
              <input id="complement" value={complement} onChange={e => setComplement(e.target.value)} className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20" placeholder="Opcional" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-ink" htmlFor="neighborhood">Bairro</label>
              <input id="neighborhood" required value={neighborhood} onChange={e => setNeighborhood(e.target.value)} className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ink" htmlFor="city">Cidade</label>
              <input id="city" required value={city} onChange={e => setCity(e.target.value)} className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ink" htmlFor="state">Estado (UF)</label>
              <input id="state" required maxLength={2} value={state} onChange={e => setState(e.target.value)} className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20" />
            </div>
          </div>
        </section>

        {/* Pagamento */}
        <section className="rounded-3xl bg-white p-6 shadow-soft md:p-8">
          <h2 className="mb-4 text-xl font-black text-ink">3. Pagamento</h2>
          <div className="mb-6 flex gap-4">
            <button type="button" onClick={() => setPaymentMethod('credit_card')} className={`flex-1 rounded-xl border-2 py-3 text-sm font-bold transition ${paymentMethod === 'credit_card' ? 'border-clay text-clay bg-clay/5' : 'border-neutral-200 text-neutral-500 hover:border-neutral-300'}`}>Cartão de Crédito</button>
            <button type="button" onClick={() => setPaymentMethod('pix')} className={`flex-1 rounded-xl border-2 py-3 text-sm font-bold transition ${paymentMethod === 'pix' ? 'border-clay text-clay bg-clay/5' : 'border-neutral-200 text-neutral-500 hover:border-neutral-300'}`}>PIX</button>
          </div>

          {paymentMethod === 'credit_card' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-ink" htmlFor="cardNumber">Número do Cartão <span className="text-xs font-normal text-neutral-500">(Dica Anti-Fraude: tente usar 0000 0000 0000 0000)</span></label>
                <input id="cardNumber" required value={cardNumber} onChange={e => setCardNumber(e.target.value)} className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm tracking-widest outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-ink">Nome impresso no Cartão</label>
                <input required className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm uppercase outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20" placeholder="JOAO S SILVA" />
              </div>
              <div>
                <label className="block text-sm font-bold text-ink">Validade</label>
                <input required className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20" placeholder="MM/AA" />
              </div>
              <div>
                <label className="block text-sm font-bold text-ink">CVV</label>
                <input required type="password" maxLength={4} className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm tracking-widest outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20" placeholder="***" />
              </div>
            </div>
          )}

          {paymentMethod === 'pix' && (
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 text-center">
              <p className="text-sm text-neutral-600">Ao finalizar a compra, um QR Code será gerado para o pagamento via PIX. A aprovação é imediata.</p>
            </div>
          )}
        </section>

      </div>

      {/* Lado Direito: Resumo */}
      <div className="lg:col-span-5">
        <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-soft md:p-8">
          <h2 className="mb-6 text-xl font-black text-ink">Resumo do Pedido</h2>
          
          <div className="mb-6 flex max-h-[300px] flex-col gap-4 overflow-y-auto">
            {items.map(item => (
              <div key={`${item.productId}-${item.selectedSize}`} className="flex gap-4 border-b border-neutral-100 pb-4">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-200">
                  {!item.product.image.startsWith("gradient://") ? (
                    <Image src={item.product.image} alt={item.product.imageAlt} fill className="object-cover" />
                  ) : (
                    <ProductArtwork product={item.product} className="h-full w-full" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-ink line-clamp-1">{item.product.name}</p>
                  <p className="text-xs text-neutral-500">Tam: {item.selectedSize || 'Único'} | Qtd: {item.quantity}</p>
                  <p className="mt-1 text-sm font-bold text-clay">{formatCurrency(item.product.price)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t border-neutral-100 pt-6">
            <div className="flex justify-between text-sm text-neutral-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-neutral-600">
              <span>Frete</span>
              <span>{shippingFee === 0 ? 'Grátis' : formatCurrency(shippingFee)}</span>
            </div>
            <div className="flex justify-between border-t border-neutral-100 pt-3 text-xl font-black text-ink">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="mt-8 block w-full rounded-full bg-clay px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-clay disabled:opacity-50"
          >
            {isSubmitting ? 'Processando...' : 'Finalizar Compra'}
          </button>
        </div>
      </div>
    </form>
  );
}
