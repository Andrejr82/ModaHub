'use server'

import { createClient } from '@/utils/supabase/server'
import { products } from '@/data/products'
import type { CartItem } from '@/types/product'

interface CheckoutData {
  items: CartItem[];
  shippingAddress: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
  };
  shippingFee: number;
}

export async function processCheckout(data: CheckoutData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Não autorizado")

  // 1. Validação Nível Enterprise (Anti-Fraude de Preço)
  // Recalculamos tudo no servidor usando data/products.ts
  let calculatedSubtotal = 0;
  
  const validatedItems = data.items.map(cartItem => {
    const realProduct = products.find(p => p.id === cartItem.productId);
    if (!realProduct) throw new Error(`Produto ${cartItem.productId} não encontrado no catálogo.`);
    
    const itemTotal = realProduct.price * cartItem.quantity;
    calculatedSubtotal += itemTotal;
    
    return {
      product_id: realProduct.id,
      quantity: cartItem.quantity,
      price: realProduct.price, // Preço oficial do banco (nosso arquivo)
      size: cartItem.selectedSize
    }
  });

  const calculatedTotal = calculatedSubtotal + data.shippingFee;

  // 2. Inserir Endereço
  const { data: addressData, error: addressError } = await supabase
    .from('addresses')
    .insert([{
      user_id: user.id,
      ...data.shippingAddress
    }])
    .select('id')
    .single();

  if (addressError) throw new Error("Erro ao salvar endereço: " + addressError.message);

  // 3. Inserir Pedido (A Capa)
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([{
      user_id: user.id,
      address_id: addressData.id,
      status: 'paid', // Como é simulado, vamos assumir que o cartão passou
      subtotal: calculatedSubtotal,
      shipping_fee: data.shippingFee,
      total: calculatedTotal
    }])
    .select('id')
    .single();

  if (orderError) throw new Error("Erro ao criar pedido: " + orderError.message);

  // 4. Inserir Itens do Pedido
  const orderItemsToInsert = validatedItems.map(item => ({
    order_id: orderData.id,
    ...item
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItemsToInsert);

  if (itemsError) throw new Error("Erro ao salvar itens: " + itemsError.message);

  return { success: true, orderId: orderData.id };
}
