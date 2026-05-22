import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col bg-sand">
      <Header query="" cartCount={0} wishlistCount={0} />
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <Suspense fallback={<div className="h-96 w-full max-w-md rounded-3xl bg-white shadow-soft" />}>
          <LoginForm />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
