'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cleanCPF, isValidCPF } from '@/utils/cpf'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect(`/login?error=E-mail ou senha incorretos`)
  }

  revalidatePath('/', 'layout')
  redirect('/minha-conta')
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const cpf = formData.get('cpf') as string
  const supabase = await createClient()

  if (!isValidCPF(cpf)) {
    redirect('/login?error=CPF inválido, por favor revise os números')
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        cpf: cleanCPF(cpf)
      }
    }
  })

  if (error) {
    redirect(`/login?error=${error.message}`)
  }

  revalidatePath('/', 'layout')
  redirect('/minha-conta')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function resetPassword(formData: FormData) {
  const email = formData.get('email') as string
  const supabase = await createClient()

  // Precisamos do request origin para construir o redirectTo
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/atualizar-senha`,
  })

  if (error) {
    redirect(`/esqueci-senha?error=Erro ao enviar e-mail: ${error.message}`)
  }

  redirect('/esqueci-senha?message=Um e-mail de recuperação foi enviado para você.')
}

export async function updatePassword(formData: FormData) {
  const password = formData.get('password') as string
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    redirect(`/atualizar-senha?error=Erro ao atualizar senha: ${error.message}`)
  }

  redirect('/minha-conta')
}
