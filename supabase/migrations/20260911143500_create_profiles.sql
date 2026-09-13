-- The Guest Registry itself
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique,
  created_at timestamptz not null default now()
);

-- Lock the notebook: RLS on
alter table public.profiles enable row level security;

-- House rule 1: anyone signed in can read profiles (needed for rider presence)
create policy "Profiles are viewable by authenticated users"
on public.profiles for select
to authenticated
using (true);

-- House rule 2: you can only ever insert/update your own row
create policy "Users can insert their own profile"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id);

-- The auto-fill: runs the moment someone checks in at the Front Desk
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data ->> 'username');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
