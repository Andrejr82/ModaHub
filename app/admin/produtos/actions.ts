'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProduct(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const price = Number(formData.get('price'));
  const stock = Number(formData.get('stock'));
  const category = formData.get('category') as string;
  const inStock = stock > 0;

  const { error } = await supabase
    .from('products')
    .update({ 
      name, 
      price, 
      stock, 
      in_stock: inStock,
      category
    })
    .eq('id', id);

  if (!error) {
    revalidatePath('/admin/produtos');
    revalidatePath('/'); // Atualiza a vitrine
  }
  
  return { success: !error, error: error?.message };
}

export async function deleteProduct(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;

  const { error } = await supabase.from('products').delete().eq('id', id);

  if (!error) {
    revalidatePath('/admin/produtos');
    revalidatePath('/');
  }
  
  return { success: !error, error: error?.message };
}
