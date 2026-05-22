import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { CheckoutClient } from './CheckoutClient'

export const metadata = {
  title: "Checkout | ModaHub",
}

export default async function CheckoutPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <main className="min-h-screen bg-neutral-50 pb-20 pt-10">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-black text-ink">Finalizar Compra</h1>
          <a href="/" className="text-sm font-bold uppercase tracking-widest text-neutral-500 transition hover:text-ink">
            ← Voltar para a loja
          </a>
        </div>
        <CheckoutClient 
          userProfile={profile} 
          email={user.email || ""} 
        />
      </div>
    </main>
  )
}
