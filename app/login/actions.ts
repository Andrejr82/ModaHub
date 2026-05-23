'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { cleanCPF, isValidCPF } from '@/utils/cpf'
import {
  buildPasswordResetRedirectTo,
  buildQueryRedirect,
  getRequestOrigin,
} from '@/lib/auth-urls'

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
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const supabase = await createClient()

  if (!email) {
    redirect(buildQueryRedirect('/esqueci-senha', 'error', 'Informe o e-mail cadastrado'))
  }

  const origin = getRequestOrigin(await headers())

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: buildPasswordResetRedirectTo(origin),
  })

  if (error) {
    redirect(
      buildQueryRedirect(
        '/esqueci-senha',
        'error',
        `Erro ao enviar e-mail: ${error.message}`,
      ),
    )
  }

  redirect(
    buildQueryRedirect(
      '/esqueci-senha',
      'message',
      'Se o e-mail estiver cadastrado, enviaremos um link de recuperação em alguns minutos.',
    ),
  )
}

export async function updatePassword(formData: FormData) {
  const password = formData.get('password') as string
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    redirect(
      buildQueryRedirect(
        '/atualizar-senha',
        'error',
        `Erro ao atualizar senha: ${error.message}`,
      ),
    )
  }

  redirect('/minha-conta')
}
