"use client";

import { useState } from "react";
import { login, signup } from "@/app/login/actions";
import { useSearchParams } from "next/navigation";

export function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-8 shadow-soft">
      <h2 className="text-center text-3xl font-black text-ink">
        {isLogin ? "Bem-vindo de volta" : "Criar uma conta"}
      </h2>
      <p className="mt-2 text-center text-sm text-neutral-600">
        {isLogin
          ? "Acesse sua conta para ver pedidos e favoritos."
          : "Junte-se à ModaHub para uma experiência completa."}
      </p>

      {errorMessage && (
        <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600">
          {errorMessage}
        </div>
      )}

      <form action={isLogin ? login : signup} className="mt-8 space-y-5">
        {!isLogin && (
          <>
            <div>
              <label className="block text-sm font-bold text-ink" htmlFor="fullName">
                Nome completo
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-ink" htmlFor="cpf">
                CPF
              </label>
              <input
                id="cpf"
                name="cpf"
                type="text"
                required
                maxLength={14}
                className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20"
                placeholder="000.000.000-00"
              />
            </div>
          </>
        )}
        <div>
          <label className="block text-sm font-bold text-ink" htmlFor="email">
            E-mail
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
          <div className="flex justify-between items-center mt-2">
            <label className="block text-sm font-bold text-ink" htmlFor="password">
              Senha
            </label>
            {isLogin && (
              <a href="/esqueci-senha" className="text-xs font-bold text-clay hover:underline">
                Esqueci minha senha
              </a>
            )}
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm tracking-widest outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20"
            placeholder="••••••"
          />
        <button
          type="submit"
          className="w-full rounded-full bg-ink py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
        >
          {isLogin ? "Entrar" : "Criar conta"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm font-bold text-neutral-600 transition hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
        >
          {isLogin ? "Ainda não tem conta? Cadastre-se" : "Já tem conta? Faça login"}
        </button>
      </div>
    </div>
  );
}
