-- 1. Criar a Tabela de Produtos
CREATE TABLE IF NOT EXISTS public.products (
  id text PRIMARY KEY,
  name text NOT NULL,
  brand text,
  category text NOT NULL,
  price numeric(10,2) NOT NULL,
  old_price numeric(10,2),
  image text NOT NULL,
  image_alt text,
  in_stock boolean DEFAULT true,
  free_shipping boolean DEFAULT false,
  is_new boolean DEFAULT false,
  sizes text[] DEFAULT '{}',
  colors text[] DEFAULT '{}',
  features text[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Habilitar RLS (Row Level Security) na tabela
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de Segurança (RLS)
-- Todo mundo (visitantes e clientes) pode LER a vitrine de produtos
CREATE POLICY "Produtos são públicos para leitura"
ON public.products FOR SELECT
USING (true);

-- Apenas Administradores podem INSERIR, ATUALIZAR ou DELETAR produtos
CREATE POLICY "Admins podem inserir produtos"
ON public.products FOR INSERT
WITH CHECK ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true);

CREATE POLICY "Admins podem atualizar produtos"
ON public.products FOR UPDATE
USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true);

CREATE POLICY "Admins podem deletar produtos"
ON public.products FOR DELETE
USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true);

-- 4. Criar o Bucket (Armazém de Arquivos) para uploads futuros
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Segurança do Bucket (Apenas Admins podem subir fotos)
CREATE POLICY "Qualquer pessoa pode ver as fotos"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Apenas admins podem subir fotos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' 
  AND (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
);

CREATE POLICY "Apenas admins podem apagar fotos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images' 
  AND (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
);
