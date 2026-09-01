-- French Tests — Supabase schema
-- Run this in the Supabase SQL editor to create the production database.
-- RLS (Row Level Security) ensures users can only read/write their own data.
-- All scoring happens server-side in RPCs / Edge Functions (see below).

create extension if not exists "pgcrypto";

-- ================= CATEGORIES =================
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color text default '#6366f1',
  icon text default '🗂️',
  created_at timestamptz default now()
);
alter table public.categories enable row level security;
create policy "Categories are readable by all" on public.categories
  for select using (true);

-- ================= TESTS =================
create table if not exists public.tests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text default '',
  category_id uuid references public.categories(id) on delete set null,
  level text not null check (level in ('A1','A2','B1','B2','C1')),
  strict_mode boolean default false,
  timer boolean default false,
  shuffle boolean default true,
  created_at timestamptz default now(),
  plays integer default 0
);
alter table public.tests enable row level security;
create policy "Tests are readable by all" on public.tests for select using (true);

-- ================= QUESTIONS =================
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  test_id uuid references public.tests(id) on delete cascade,
  text text not null,
  -- options stored as JSON array of strings
  options jsonb not null,
  correct_index integer not null,
  explanation text default ''
);
alter table public.questions enable row level security;
create policy "Questions readable by all" on public.questions for select using (true);

-- ================= PROFILES =================
-- Linked to Supabase Auth users (auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default 'Utilisateur',
  avatar text default '🙂',
  xp integer not null default 0,
  role text not null default 'user' check (role in ('user','admin')),
  achievements text[] default '{}',
  favorites uuid[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Profiles are readable by all" on public.profiles for select using (true);
create policy "Users update own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- ================= ATTEMPTS (history) =================
create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  test_id uuid references public.tests(id) on delete cascade,
  correct integer not null,
  total integer not null,
  pct integer not null,
  xp integer not null,
  points integer not null,
  created_at timestamptz default now()
);
alter table public.attempts enable row level security;
create policy "Attempts are readable by all (public leaderboard)" on public.attempts
  for select using (true);
create policy "Users insert own attempts (verified server-side)" on public.attempts
  for insert with check (auth.uid() = user_id);

-- ================= XP SYNC TRIGGER =================
-- Recomputes profiles.xp as the SUM of xp earned across all attempts.
-- Recommended: keeps the leaderboard in sync without trusting the client.
-- Note: if you prefer the client (edge function) to write xp directly, you can
-- skip this trigger — the leaderboard still works because fetchLeaderboard reads
-- profiles.xp for the "all time" period. Only run this AFTER attempts data exists
-- or it will simply recompute from whatever rows are present.
create or replace function public.sync_profile_xp()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
    set xp = coalesce((select sum(a.xp) from public.attempts a where a.user_id = new.user_id), 0),
        updated_at = now()
  where id = new.user_id;
  return new;
end;
$$;

create trigger trg_sync_profile_xp
after insert on public.attempts
for each row execute function public.sync_profile_xp();

-- ================= MES ERREURS =================
create table if not exists public.errors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  question_id uuid references public.questions(id) on delete cascade,
  chosen integer,
  created_at timestamptz default now()
);
alter table public.errors enable row level security;
create policy "Users manage own errors" on public.errors
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ================= SERVER-SIDE VERIFICATION =================
-- All results are computed in an Edge Function (supabase/functions/submit/index.ts).
-- The client sends only the user's chosen answers; the server joins questions,
-- computes correctness/XP/level/achievements, and writes atomically.
-- Clients can never set xp, pct, points, achievements or rank themselves because
-- those columns are not writable through RLS and are only mutated by the function
-- running with the service_role key.
