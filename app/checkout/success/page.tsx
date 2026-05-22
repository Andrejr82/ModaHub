"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useCart } from "@/hooks/use-cart";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || "";
  const { clearCart } = useCart();

  // Limpa o carrinho ao montar a página de sucesso
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const isStripe = sessionId.includes("simulated_stripe");
  const isMP = sessionId.includes("simulated_mp");
  
  let gateway = "Real";
  if (isStripe) gateway = "Stripe (Sandbox)";
  if (isMP) gateway = "Mercado Pago (Sandbox)";

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-soft">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl text-emerald-600">
          ✓
        </div>
        <h1 className="mt-6 text-3xl font-black text-ink">Pedido Confirmado!</h1>
        <p className="mt-4 text-neutral-600">
          Esta é uma tela de demonstração. O pagamento foi processado com sucesso usando o gateway <strong>{gateway}</strong>.
        </p>
        <div className="mt-8">
          <Link 
            href="/" 
            className="inline-block rounded-full bg-ink px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-clay"
          >
            Voltar para a Loja
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <main className="flex min-h-screen flex-col bg-sand">
      <Header query="" cartCount={0} wishlistCount={0} />
      <Suspense fallback={<div className="flex flex-1 items-center justify-center">Carregando...</div>}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </main>
  );
}
