-- Public profile row for every auth.users row, keyed 1:1 by id.
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text not null unique,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  constraint username_length check (char_length(username) between 4 and 12),
  constraint username_format check (username ~ '^[a-zA-Z0-9_]+$')
);

alter table public.profiles enable row level security;

create policy "profiles are viewable by authenticated users" on public.profiles
  for select to authenticated
  using (true);

create policy "users can insert their own profile" on public.profiles
  for insert to authenticated
  with check ((select auth.uid()) = id);

create policy "users can update their own profile" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Auto-create the profile row on signup. SECURITY DEFINER is required here:
-- this insert runs before the new user has a session, so RLS's
-- `auth.uid() = id` check would otherwise reject it.
-- per https://supabase.com/docs/guides/auth/managing-user-data#using-triggers
create function public.handle_new_user()
returns trigger
set search_path = ''
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'username'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Live username-availability check, callable before the user has a
-- session (signup form, `anon` role). SECURITY DEFINER + public schema is
-- safe here: it returns only a boolean, never row data, and takes no
-- caller identity as input — there's nothing an auth.uid() check would
-- protect.
create function public.is_username_available(check_username text)
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select not exists (
    select 1 from public.profiles where username = check_username
  );
$$;

grant execute on function public.is_username_available(text) to anon, authenticated;

-- handle_new_user is only ever invoked by the on_auth_user_created trigger,
-- never called directly. Supabase's default privileges grant EXECUTE on new
-- public-schema functions to anon/authenticated; revoke that so it isn't a
-- callable RPC endpoint (flagged by advisors: anon/authenticated_security_
-- definer_function_executable).
revoke execute on function public.handle_new_user() from anon, authenticated;
