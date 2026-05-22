import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { updatePassword } from "@/app/login/actions";

export default async function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col bg-sand">
      <Header query="" cartCount={0} wishlistCount={0} />
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-8 shadow-soft">
          <h2 className="text-center text-3xl font-black text-ink">Criar Nova Senha</h2>
          <p className="mt-2 text-center text-sm text-neutral-600">
            Digite sua nova senha abaixo.
          </p>

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600">
              {error}
            </div>
          )}

          <form action={updatePassword} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-bold text-ink" htmlFor="password">
                Nova senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm tracking-widest outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20"
                placeholder="••••••"
              />
            </div>
            
            <button
              type="submit"
              className="w-full rounded-full bg-ink py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
            >
              Atualizar Senha
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
