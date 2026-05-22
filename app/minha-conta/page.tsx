import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { createClient } from "@/utils/supabase/server";
import { logout } from "@/app/login/actions";
import { formatCurrency } from "@/lib/format";

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Buscar o perfil (nome completo e status de admin)
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, is_admin")
    .eq("id", user.id)
    .single();

  const fullName = profile?.full_name || "Cliente";
  const isAdmin = profile?.is_admin || false;

  // Buscar pedidos do usuário
  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="flex min-h-screen flex-col bg-sand">
      <Header query="" cartCount={0} wishlistCount={0} />
      <div className="flex-1 px-4 py-12">
        <div className="mx-auto w-full max-w-4xl">
          <div className="rounded-3xl bg-white p-8 shadow-soft md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-clay">Área do Cliente</p>
                <h1 className="mt-2 text-3xl font-black text-ink md:text-5xl">Olá, {fullName}</h1>
                <p className="mt-2 text-neutral-600">{user.email}</p>
              </div>
              <div className="flex gap-4">
                {isAdmin && (
                  <a href="/admin" className="rounded-full bg-clay px-6 py-3 text-sm font-bold tracking-[0.16em] text-white transition hover:bg-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-clay flex items-center justify-center">
                    PAINEL ADMIN
                  </a>
                )}
                <form action={logout}>
                  <button
                    type="submit"
                    className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-bold tracking-[0.16em] text-ink transition hover:border-ink hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay h-full"
                  >
                    SAIR
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6">
                <h2 className="text-lg font-black text-ink">Meus Pedidos</h2>
                {orders && orders.length > 0 ? (
                  <div className="mt-4 flex max-h-[300px] flex-col gap-4 overflow-y-auto pr-2">
                    {orders.map((order: any) => (
                      <div key={order.id} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-500">ID: {order.id.split('-')[0].toUpperCase()}</span>
                          <span className={`rounded-full px-2 py-1 text-xs font-bold uppercase tracking-wider ${
                            order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-neutral-200 text-neutral-700'
                          }`}>
                            {order.status === 'paid' ? 'Pago' : order.status}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600">{new Date(order.created_at).toLocaleDateString('pt-BR')} - {order.order_items?.length} itens</p>
                        <p className="mt-1 font-black text-clay">{formatCurrency(order.total)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="mt-2 text-sm text-neutral-600">
                      Você ainda não possui nenhum pedido. Quando realizar uma compra, o status aparecerá aqui.
                    </p>
                    <a href="/catalogo" className="mt-4 inline-block text-sm font-bold text-clay hover:underline">
                      Ver produtos
                    </a>
                  </>
                )}
              </div>
              <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6">
                <h2 className="text-lg font-black text-ink">Meus Favoritos</h2>
                <p className="mt-2 text-sm text-neutral-600">
                  Sua lista de desejos sincronizada na nuvem será exibida aqui em breve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
