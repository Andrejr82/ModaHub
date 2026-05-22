-- Create a table for public profiles
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  primary key (id)
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( (select auth.uid()) = id );

create policy "Users can update own profile."
  on profiles for update
  using ( (select auth.uid()) = id );

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create Wishlist table
create table public.wishlist_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null references public.products(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  unique(user_id, product_id)
);

alter table public.wishlist_items enable row level security;

create policy "Users can view their own wishlist."
  on wishlist_items for select
  using ( (select auth.uid()) = user_id );

create policy "Users can insert into their own wishlist."
  on wishlist_items for insert
  with check ( (select auth.uid()) = user_id );

create policy "Users can delete from their own wishlist."
  on wishlist_items for delete
  using ( (select auth.uid()) = user_id );
