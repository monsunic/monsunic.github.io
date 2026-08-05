-- Run once in Supabase Dashboard → SQL Editor → New query → Run

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  company text not null,
  service text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

comment on table public.contact_messages is
  'Inbound contact form messages from monsun.io';
