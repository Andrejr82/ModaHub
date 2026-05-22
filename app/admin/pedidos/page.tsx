import { createClient } from "@/utils/supabase/server";
import { OrderListClient } from "./OrderListClient";

export const metadata = {
  title: "Pedidos | Admin",
};

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  // Buscar pedidos com detalhes do usuário e itens
  const { data: orders } = await supabase
    .from("orders")
    .select(`
      *,
      profiles(full_name, cpf),
      addresses(street, city, state),
      order_items(*)
    `)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-ink">Gestão de Pedidos</h1>
        <p className="mt-1 text-sm text-neutral-600">Acompanhe e atualize o status de todos os pedidos da loja.</p>
      </div>

      <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
        <OrderListClient initialOrders={orders || []} />
      </div>
    </div>
  );
}
