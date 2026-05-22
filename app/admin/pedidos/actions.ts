'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateOrderStatus(orderId: string, newStatus: string) {
  const supabase = await createClient()

  // O RLS já garante que apenas Admins podem fazer UPDATE nesta tabela
  const { error } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId)

  if (error) {
    throw new Error('Erro ao atualizar status: ' + error.message)
  }

  // Revalida a página de pedidos para mostrar os dados novos
  revalidatePath('/admin/pedidos')
  
  return { success: true }
}
