import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { resetPassword } from "@/app/login/actions";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; error?: string }>;
}) {
  const { message, error } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col bg-sand">
      <Header query="" cartCount={0} wishlistCount={0} />
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-8 shadow-soft">
          <h2 className="text-center text-3xl font-black text-ink">Recuperar Senha</h2>
          <p className="mt-2 text-center text-sm text-neutral-600">
            Digite seu e-mail e enviaremos um link para você cadastrar uma nova senha.
          </p>

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm font-bold text-emerald-600">
              {message}
            </div>
          )}

          <form action={resetPassword} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-bold text-ink" htmlFor="email">
                E-mail cadastrado
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20"
                placeholder="voce@email.com"
              />
            </div>
            
            <button
              type="submit"
              className="w-full rounded-full bg-ink py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
            >
              Enviar link de recuperação
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/login" className="text-sm font-bold text-clay hover:underline">
              Voltar para o Login
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
