-- Criação da Tabela de Produtos
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  old_price NUMERIC(10, 2),
  image TEXT NOT NULL,
  image_alt TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  brand TEXT NOT NULL,
  description TEXT NOT NULL,
  sizes TEXT[] NOT NULL DEFAULT '{}',
  colors TEXT[] NOT NULL DEFAULT '{}',
  stock INTEGER NOT NULL DEFAULT 0,
  rating NUMERIC(3, 2) NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  installments INTEGER NOT NULL DEFAULT 1,
  is_new BOOLEAN NOT NULL DEFAULT false,
  is_launch BOOLEAN NOT NULL DEFAULT false,
  free_shipping BOOLEAN NOT NULL DEFAULT false,
  collection TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar a segurança de nível de linha (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Permitir que qualquer pessoa leia os produtos (Necessário para a vitrine pública)
CREATE POLICY "Public Read Access on products" 
  ON products FOR SELECT 
  USING (true);
