import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { items, email } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Carrinho vazio" }, { status: 400 });
    }

    // Se a chave não existir no .env.local, o sistema age como um simulador local (Mock)
    if (!process.env.STRIPE_SECRET_KEY) {
      console.warn("STRIPE_SECRET_KEY não encontrada. Usando modo simulador Sandbox.");
      
      // Criação de Pedido Simulado para aparecer no Dashboard
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const total = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
        
        // Buscar ou criar um endereço dummy para o usuário
        let { data: address } = await supabase.from('addresses').select('id').eq('user_id', user.id).limit(1).single();
        
        if (!address) {
          const { data: newAddress } = await supabase.from('addresses').insert({
            user_id: user.id,
            street: 'Rua Simulação',
            number: '123',
            neighborhood: 'Centro',
            city: 'São Paulo',
            state: 'SP',
            zipcode: '01000-000'
          }).select().single();
          address = newAddress;
        }

        if (address) {
          const { data: order, error: orderError } = await supabase.from('orders').insert({
            user_id: user.id,
            address_id: address.id,
            status: 'paid',
            subtotal: total,
            shipping_fee: 0,
            total: total
          }).select().single();

          if (orderError) {
            console.error("Erro ao inserir pedido falso:", orderError);
          }

          if (order) {
            const orderItems = items.map((item: any) => ({
              order_id: order.id,
              product_id: item.id,
              quantity: item.quantity,
              price: item.price
            }));
            const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
            if (itemsError) console.error("Erro itens:", itemsError);
          }
        }
      }

      return NextResponse.json({ 
        url: `/checkout/success?session_id=simulated_stripe_${Date.now()}` 
      });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia" as any,
    });

    // Converter itens do carrinho para o formato do Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.name,
          images: [item.image.startsWith("http") ? item.image : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${item.image}`],
          metadata: {
            productId: item.id,
            size: item.selectedSize || 'Único'
          }
        },
        unit_amount: Math.round(item.price * 100), // Stripe usa centavos
      },
      quantity: item.quantity,
    }));

    // Criar a sessão de Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Erro no Stripe Checkout:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
