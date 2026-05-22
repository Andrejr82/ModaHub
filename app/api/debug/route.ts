import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Usar o service_role_key para ignorar RLS e ler as políticas
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data, error } = await supabase.rpc('get_policies'); // Nao existe rpc customizado, vou fazer query crua se der
  
  const { data: q } = await supabase.from('orders').select('*');
  
  return NextResponse.json({ data: q, error });
}
