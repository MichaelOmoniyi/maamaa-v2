-- MaaMaa's initial schema reconstructed from the tracked frontend queries and
-- the previous setup SQL in DEPLOYMENT.md / CONTRIBUTIONS.md. No old database
-- or user data is available to recover.

create table public.chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid not null references public.chats (id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  type text not null default 'text',
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  description text not null default '',
  category text not null,
  quantity numeric not null check (quantity >= 0),
  unit text not null,
  min_quantity numeric not null default 0 check (min_quantity >= 0),
  status text not null check (status in ('in-stock', 'low-stock', 'out-of-stock')),
  barcode text,
  -- For uploaded images, this stores a private Storage object path, not a URL.
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint inventory_items_user_barcode_key unique (user_id, barcode)
);

create index chat_messages_chat_id_created_at_idx
  on public.chat_messages (chat_id, created_at);
create index chats_user_id_updated_at_idx
  on public.chats (user_id, updated_at desc);
create index inventory_items_user_id_updated_at_idx
  on public.inventory_items (user_id, updated_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger chats_set_updated_at
  before update on public.chats
  for each row execute function public.set_updated_at();
create trigger inventory_items_set_updated_at
  before update on public.inventory_items
  for each row execute function public.set_updated_at();

alter table public.chats enable row level security;
alter table public.chat_messages enable row level security;
alter table public.inventory_items enable row level security;

revoke all on public.chats, public.chat_messages, public.inventory_items from anon;
grant select, insert, update on public.chats to authenticated;
grant select, insert on public.chat_messages to authenticated;
grant select, insert, update, delete on public.inventory_items to authenticated;

create policy chats_select_own
  on public.chats for select to authenticated
  using ((select auth.uid()) = user_id);
create policy chats_insert_own
  on public.chats for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy chats_update_own
  on public.chats for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy chat_messages_select_own
  on public.chat_messages for select to authenticated
  using (exists (
    select 1 from public.chats
    where chats.id = chat_messages.chat_id
      and chats.user_id = (select auth.uid())
  ));
create policy chat_messages_insert_own
  on public.chat_messages for insert to authenticated
  with check (exists (
    select 1 from public.chats
    where chats.id = chat_messages.chat_id
      and chats.user_id = (select auth.uid())
  ));

create policy inventory_items_select_own
  on public.inventory_items for select to authenticated
  using ((select auth.uid()) = user_id);
create policy inventory_items_insert_own
  on public.inventory_items for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy inventory_items_update_own
  on public.inventory_items for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy inventory_items_delete_own
  on public.inventory_items for delete to authenticated
  using ((select auth.uid()) = user_id);

-- The client uses this function for its account data export. The explicit
-- auth.uid() filters keep the function scoped to the caller.
create or replace function public.export_user_data()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  result jsonb;
begin
  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  select jsonb_build_object(
    'chats', coalesce((
      select jsonb_agg(to_jsonb(c) order by c.created_at)
      from public.chats c where c.user_id = current_user_id
    ), '[]'::jsonb),
    'chat_messages', coalesce((
      select jsonb_agg(to_jsonb(m) order by m.created_at)
      from public.chat_messages m
      join public.chats c on c.id = m.chat_id
      where c.user_id = current_user_id
    ), '[]'::jsonb),
    'inventory_items', coalesce((
      select jsonb_agg(to_jsonb(i) order by i.created_at)
      from public.inventory_items i where i.user_id = current_user_id
    ), '[]'::jsonb)
  ) into result;

  return result;
end;
$$;

-- Returns private image paths for removal through the Storage API, then
-- deletes the caller's database rows. Storage objects must not be deleted
-- by issuing SQL against storage.objects.
create or replace function public.delete_user_data()
returns text[]
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  image_paths text[];
begin
  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  select coalesce(array_agg(i.image_url) filter (where i.image_url is not null), array[]::text[])
    into image_paths
    from public.inventory_items i
    where i.user_id = current_user_id
      and i.image_url like current_user_id::text || '/%';

  delete from public.inventory_items where user_id = current_user_id;
  delete from public.chats where user_id = current_user_id;

  return image_paths;
end;
$$;

revoke all on function public.set_updated_at() from public, anon, authenticated;
revoke all on function public.export_user_data() from public, anon;
revoke all on function public.delete_user_data() from public, anon;
grant execute on function public.export_user_data() to authenticated;
grant execute on function public.delete_user_data() to authenticated;

-- Private bucket. The frontend stores objects at <auth.uid()>/<uuid>.jpg.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('inventory_images', 'inventory_images', false, 5242880, array['image/jpeg']);

create policy inventory_images_read_own
  on storage.objects for select to authenticated
  using (
    bucket_id = 'inventory_images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
create policy inventory_images_upload_own
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'inventory_images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
create policy inventory_images_update_own
  on storage.objects for update to authenticated
  using (
    bucket_id = 'inventory_images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'inventory_images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
create policy inventory_images_delete_own
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'inventory_images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
