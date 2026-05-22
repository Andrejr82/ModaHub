-- 1. Adicionar coluna is_admin à tabela profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;

-- 2. Atualizar o perfil do desenvolvedor para ser admin
UPDATE public.profiles SET is_admin = true WHERE email = 'devmauriciojr@gmail.com';

-- 3. Criar uma política RLS para permitir que admins leiam TODOS os pedidos (Orders)
-- Primeiro, vamos descartar a política antiga se existir
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

-- Agora criamos a nova política que diz: "Ou o pedido é seu, ou você é admin"
CREATE POLICY "Users can view their own orders or admins can view all" 
ON public.orders FOR SELECT 
USING (
  auth.uid() = user_id OR 
  (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
);

-- 4. O mesmo para Order Items
DROP POLICY IF EXISTS "Users can view their own order items" ON public.order_items;

CREATE POLICY "Users can view their own order items or admins can view all" 
ON public.order_items FOR SELECT 
USING (
  exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid()) OR
  (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
);

-- 5. Permitir que admins atualizem os pedidos (mudar status)
CREATE POLICY "Admins can update orders"
ON public.orders FOR UPDATE
USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true);
