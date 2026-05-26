create table if not exists public.app_state (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_app_state_updated_at on public.app_state;

create trigger set_app_state_updated_at
before update on public.app_state
for each row
execute function public.set_updated_at();

alter table public.app_state enable row level security;

drop policy if exists "Authenticated users can read app state" on public.app_state;
create policy "Authenticated users can read app state"
on public.app_state
for select
to authenticated
using (true);

drop policy if exists "Authenticated users can insert app state" on public.app_state;
create policy "Authenticated users can insert app state"
on public.app_state
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update app state" on public.app_state;
create policy "Authenticated users can update app state"
on public.app_state
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can delete app state" on public.app_state;
create policy "Authenticated users can delete app state"
on public.app_state
for delete
to authenticated
using (true);

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'app_state'
  ) then
    alter publication supabase_realtime add table public.app_state;
  end if;
end;
$$;
