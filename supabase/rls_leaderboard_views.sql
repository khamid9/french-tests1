-- French Tests — close the two doors + safe leaderboard views
-- Run in Supabase SQL Editor. `submit` edge function writes via service_role
-- (bypasses RLS), so closing these doors does NOT affect result submission.

-- 1) Profiles: drop ANY existing select/update/insert policy (whatever their name),
--    then create policies that allow reading ONLY your own profile.
drop policy if exists "Profiles are readable by all" on public.profiles;
drop policy if exists "Profiles readable by owner" on public.profiles;
drop policy if exists "Users update own profile" on public.profiles;
drop policy if exists "Users update own safe profile fields" on public.profiles;
drop policy if exists "Users insert own profile" on public.profiles;

create policy "Profiles readable by owner" on public.profiles
  for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- 2) Attempts: drop ANY existing select/insert policy, then allow reading ONLY
--    your own attempts.
drop policy if exists "Attempts are readable by all (public leaderboard)" on public.attempts;
drop policy if exists "Attempts readable by owner" on public.attempts;
drop policy if exists "Users insert own attempts (verified server-side)" on public.attempts;

create policy "Attempts readable by owner" on public.attempts
  for select using (auth.uid() = user_id);
create policy "Users insert own attempts (verified server-side)" on public.attempts
  for insert with check (auth.uid() = user_id);

-- ================= SAFE LEADERBOARD VIEWS =================
-- SECURITY DEFINER so the anonymous/authed client can read aggregates even though
-- the underlying tables are now locked. Exposes ONLY leaderboard-safe columns
-- (no other player's attempt details). Realtime for these views is not required.

-- All time: sorted by total XP.
create or replace view public.leaderboard_all
with (security_invoker = false) as
  select
    p.id,
    p.name,
    p.avatar,
    p.xp,
    (floor(p.xp / 300) + 1) as level,
    (select count(*) from public.attempts a where a.user_id = p.id) as tests_completed,
    (select count(*) from public.attempts a where a.user_id = p.id and a.correct = a.total) as perfect_tests,
    p.achievements
  from public.profiles p
  order by p.xp desc
  limit 50;

-- Last 7 days: XP earned within the window.
create or replace view public.leaderboard_weekly
with (security_invoker = false) as
  select
    a.user_id as id,
    p.name,
    p.avatar,
    coalesce(sum(a.xp), 0) as xp,
    (floor(coalesce(sum(a.xp), 0) / 300) + 1) as level,
    count(*) as tests_completed,
    count(*) filter (where a.correct = a.total) as perfect_tests,
    p.achievements
  from public.attempts a
  join public.profiles p on p.id = a.user_id
  where a.created_at >= now() - interval '7 days'
  group by a.user_id, p.name, p.avatar, p.achievements
  order by xp desc
  limit 50;

-- Last 30 days: XP earned within the window.
create or replace view public.leaderboard_monthly
with (security_invoker = false) as
  select
    a.user_id as id,
    p.name,
    p.avatar,
    coalesce(sum(a.xp), 0) as xp,
    (floor(coalesce(sum(a.xp), 0) / 300) + 1) as level,
    count(*) as tests_completed,
    count(*) filter (where a.correct = a.total) as perfect_tests,
    p.achievements
  from public.attempts a
  join public.profiles p on p.id = a.user_id
  where a.created_at >= now() - interval '30 days'
  group by a.user_id, p.name, p.avatar, p.achievements
  order by xp desc
  limit 50;

-- Allow anon + authenticated roles to select from these safe views.
grant select on public.leaderboard_all, public.leaderboard_weekly, public.leaderboard_monthly
  to anon, authenticated;
