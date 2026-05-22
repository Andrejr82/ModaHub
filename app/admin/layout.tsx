import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";

export const metadata = {
  title: "Admin | ModaHub",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Verificar se o usuário é admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    // Se não for admin, joga de volta pra loja
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col bg-sand">
      {/* Header Simplificado para Admin */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-ink">MODAHUB</span>
            <span className="rounded-md bg-clay px-2 py-0.5 text-xs font-bold uppercase text-white">Admin</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/admin" className="text-sm font-bold text-neutral-600 transition hover:text-ink">
              Dashboard
            </Link>
            <Link href="/admin/pedidos" className="text-sm font-bold text-neutral-600 transition hover:text-ink">
              Pedidos
            </Link>
            <Link href="/admin/produtos" className="text-sm font-bold text-neutral-600 transition hover:text-ink">
              Catálogo
            </Link>
            <Link href="/admin/simulador" className="text-sm font-bold text-neutral-600 transition hover:text-ink">
              Simulador
            </Link>
            <a href="/" target="_blank" className="text-sm font-bold text-clay hover:underline">
              Ver Loja ↗
            </a>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
