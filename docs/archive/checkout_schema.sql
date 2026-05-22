-- Tabela de Endereços
create table public.addresses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  street text not null,
  number text not null,
  complement text,
  neighborhood text not null,
  city text not null,
  state text not null,
  zipcode text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de Pedidos
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  address_id uuid references public.addresses(id) on delete restrict not null,
  status text not null check (status in ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  subtotal numeric(10,2) not null,
  shipping_fee numeric(10,2) not null,
  total numeric(10,2) not null,
  tracking_code text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de Itens do Pedido
create table public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id text not null,
  quantity integer not null check (quantity > 0),
  price numeric(10,2) not null,
  size text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ativar RLS (Segurança a Nível de Linha)
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Políticas para Addresses (O usuário só vê e insere o próprio endereço)
create policy "Users can view their own addresses" on public.addresses for select using (auth.uid() = user_id);
create policy "Users can insert their own addresses" on public.addresses for insert with check (auth.uid() = user_id);

-- Políticas para Orders
create policy "Users can view their own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users can insert their own orders" on public.orders for insert with check (auth.uid() = user_id);

-- Políticas para Order Items
create policy "Users can view their own order items" on public.order_items for select using (
  exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);
create policy "Users can insert their own order items" on public.order_items for insert with check (
  exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);
