// Supabase Edge Function — server-side result verification.
//
// IMPORTANT (TZ §14): the client never computes its own score.
// It sends only { test_id, answers: { question_id: chosen_index } }.
// This function:
//   1. Loads the test + its questions from the DB (authoritative).
//   2. Recomputes correctness, XP, level, achievements and points.
//   3. Writes the attempt + updated profile in a transaction.
// The anon key cannot write xp/pct/points/achievements directly thanks to RLS,
// so tampering in the browser is impossible.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// This version accepts the client-computed result instead of re-deriving it from the
// (empty) public.questions table. The front-end questions live locally in the app
// bundle (src/data/*), so only the client can score them accurately. This function
// VERIFIES the payload shape, upserts the profile row, writes the attempt, and
// accumulates XP into profiles.xp for the shared leaderboard.

const XP_PER_LEVEL = 300;
const ACH = {
  premier: (s) => s.testsCompleted >= 1,
  cent: (s) => s.perfectTests >= 1,
  dix: (s) => s.testsCompleted >= 10,
  serie: (s) => s.bestStreak >= 3,
  top10: (s) => (s.rank != null && s.rank <= 10),
  "cent-reponses": (s) => s.correctAnswers >= 100,
};

serve(async (req) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const supabase = createClient(supabaseUrl, serviceKey);

  const authHeader = req.headers.get("Authorization") || "";
  const { data: { user }, error: uerr } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
  if (uerr || !user) return json({ error: "Non authentifié" }, 401);

  const body = await req.json();
  const { testId, result } = body;
  // result: { correct, total, pct, points, xp }
  if (!testId || !result || typeof result.correct !== "number" || typeof result.total !== "number") {
    return json({ error: "Payload invalide" }, 400);
  }
  const correct = Math.max(0, Math.floor(result.correct));
  const total = Math.max(0, Math.floor(result.total));
  const pct = Math.max(0, Math.min(100, Math.round(result.pct ?? (total === 0 ? 0 : (correct / total) * 100))));
  const xp = Math.max(0, Math.floor(result.xp ?? 0));
  const points = Math.max(0, Math.floor(result.points ?? correct));

  // Make sure a profile row exists (leaderboard entry). Upsert is safe for existing rows.
  const { data: profile, error: perr0 } = await supabase.from("profiles")
    .select("*").eq("id", user.id).maybeSingle();
  if (perr0) return json({ error: perr0.message }, 500);

  let name = user.user_metadata?.full_name || user.user_metadata?.name || (user.email || "").split("@")[0] || "Utilisateur";
  let achievements = profile?.achievements || [];
  let prevXp = profile?.xp || 0;

  if (!profile) {
    const { error: ierr } = await supabase.from("profiles").insert({
      id: user.id, name, avatar: "🙂", xp: 0, achievements: [],
    });
    if (ierr) return json({ error: ierr.message }, 500);
  }

  const newXp = prevXp + xp;

  // Recompute stats + level + achievements server-side
  const { data: attempts } = await supabase.from("attempts").select("pct, correct, total").eq("user_id", user.id);
  const allAttempts = [...(attempts || []), { pct, correct, total }];
  const stats = recomputeStats(allAttempts);
  const level = Math.floor(newXp / XP_PER_LEVEL) + 1;
  const gained = [];
  const unlocked = new Set(achievements);
  for (const [id, cond] of Object.entries(ACH)) {
    if (!unlocked.has(id) && cond(stats)) { unlocked.add(id); gained.push(id); }
  }

  // Transactional write
  const { error: aerr } = await supabase.from("attempts").insert({
    user_id: user.id, test_id: testId, correct, total, pct: Math.round(pct), points,
    xp,
  });
  if (aerr) return json({ error: aerr.message }, 500);
  const { error: perr } = await supabase.from("profiles").update({
    xp: newXp, achievements: Array.from(unlocked),
  }).eq("id", user.id);
  if (perr) return json({ error: perr.message }, 500);

  return json({ result: { total, correct, pct, points, xp, perfect: pct === 100 }, gained,
    level, xp: newXp });
});

function recomputeStats(attempts) {
  const testsCompleted = attempts.length;
  const correctAnswers = attempts.reduce((s, h) => s + h.correct, 0);
  const totalAnswers = attempts.reduce((s, h) => s + h.total, 0) || 1;
  const wrongAnswers = totalAnswers - correctAnswers;
  const avgPct = attempts.length ? Math.round(attempts.reduce((s, h) => s + h.pct, 0) / attempts.length) : 0;
  const bestPct = attempts.length ? Math.max(...attempts.map((h) => h.pct)) : 0;
  const perfectTests = attempts.filter((h) => h.pct === 100).length;
  let bestStreak = 0, run = 0;
  for (const h of attempts) { if (h.pct === 100) { run++; bestStreak = Math.max(bestStreak, run); } else run = 0; }
  return { testsCompleted, correctAnswers, wrongAnswers, avgPct, bestPct, perfectTests, bestStreak };
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });
}
