-- Adiciona as colunas CPF e Phone na tabela profiles
alter table public.profiles
add column if not exists cpf text,
add column if not exists phone text;

-- Cria uma restrição para garantir que CPFs não sejam duplicados no banco
alter table public.profiles
add constraint profiles_cpf_key unique (cpf);

-- Atualiza o gatilho (Trigger) para também puxar o CPF e o Telefone durante o cadastro
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, cpf, phone)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'cpf',
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$ language plpgsql security definer;
