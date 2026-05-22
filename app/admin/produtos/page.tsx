import { getProducts } from "@/lib/supabase-queries";
import { ProductListClient } from "./ProductListClient";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/auth/login');
  }

  // Verifica RBAC via banco
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', session.user.id)
    .single();

  if (!profile?.is_admin) {
    redirect('/'); // Expulsa não-administradores
  }

  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-ink tracking-tight">Catálogo de Produtos</h1>
          <p className="mt-1 text-sm text-neutral-500">Gerencie preços, estoques e categorias do seu e-commerce.</p>
        </div>
        <button disabled className="px-5 py-2.5 bg-clay text-white font-bold rounded-xl opacity-50 cursor-not-allowed text-sm">
          + Novo Produto (Em Breve)
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
        <ProductListClient products={products} />
      </div>
    </div>
  );
}
