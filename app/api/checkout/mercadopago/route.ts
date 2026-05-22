import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { items, email } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Carrinho vazio" }, { status: 400 });
    }

    // Simulador local se não tiver token configurado
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      console.warn("MERCADOPAGO_ACCESS_TOKEN não encontrado. Usando modo simulador.");

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
        url: `/checkout/success?session_id=simulated_mp_${Date.now()}` 
      });
    }

    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
    const preference = new Preference(client);

    const mpItems = items.map((item: any) => ({
      id: item.id,
      title: item.name,
      quantity: item.quantity,
      unit_price: Number(item.price),
      currency_id: "BRL",
      description: `Tamanho: ${item.selectedSize || 'Único'}`,
      picture_url: item.image.startsWith("http") ? item.image : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${item.image}`
    }));

    const response = await preference.create({
      body: {
        items: mpItems,
        payer: {
          email: email
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/`
        },
        auto_return: "approved",
      }
    });

    // url de redirecionamento para o pagamento do MP (init_point = producao, sandbox_init_point = testes)
    return NextResponse.json({ url: response.init_point });
  } catch (error: any) {
    console.error("Erro no Mercado Pago:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
