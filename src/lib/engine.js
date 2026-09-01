// Game engine — ALL scoring, XP, levels, achievements and ranking logic lives here.
// This module IS the "server-side" authority. Even when a live backend is connected,
// the same rules must be enforced server-side (see supabase/functions + schema).

// --- XP / Levels ---
export const XP_PER_CORRECT = 10
export const XP_BONUS_TEST = 25
export const XP_BONUS_PERFECT = 50
const XP_PER_LEVEL = 300

export function xpToNextLevel(level) {
  return level * XP_PER_LEVEL
}

export function levelFromXp(xp) {
  // level 1 needs 0..300, level 2 300..600, etc.
  return Math.floor(xp / XP_PER_LEVEL) + 1
}

export function levelProgress(xp) {
  const level = levelFromXp(xp)
  const base = (level - 1) * XP_PER_LEVEL
  const into = xp - base
  const need = XP_PER_LEVEL
  return { level, into, need, pct: Math.min(100, Math.round((into / need) * 100)) }
}

// --- Test scoring ---
export function computeResult(submission) {
  // submission: { questionId -> chosenIndex } validated against correct answers
  const total = submission.correct.length + submission.wrong.length
  const correct = submission.correct.length
  const wrong = submission.wrong.length
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100)
  const points = pct // 1 point per percent
  let xp = correct * XP_PER_CORRECT + XP_BONUS_TEST
  if (pct === 100) xp += XP_BONUS_PERFECT
  return { total, correct, wrong, pct, points, xp, perfect: pct === 100 }
}

// --- Achievements ---
export const ACHIEVEMENTS = [
  { id: 'premier', icon: '🏆', title: 'Premier test', desc: 'Termine ton premier test' },
  { id: 'cent', icon: '🎯', title: '100%', desc: 'Obtenu 100% à un test' },
  { id: 'dix', icon: '📚', title: '10 tests', desc: 'Termine 10 tests' },
  { id: 'serie', icon: '🔥', title: 'Série', desc: 'Réalise une série de 3 tests parfaits' },
  { id: 'top10', icon: '👑', title: 'Top 10', desc: 'Entre dans le top 10 du classement' },
  { id: 'cent-reponses', icon: '💯', title: '100 bonnes réponses', desc: 'Donne 100 bonnes réponses au total' }
]

export function evaluateAchievements(user, before = {}) {
  // Returns achievements newly unlocked
  const unlocked = new Set(user.achievements || [])
  const stats = user.stats || {}
  const gained = []
  const conditions = {
    premier: () => stats.testsCompleted >= 1,
    cent: () => stats.perfectTests >= 1,
    dix: () => stats.testsCompleted >= 10,
    serie: () => stats.bestStreak >= 3,
    top10: () => (stats.rank != null && stats.rank <= 10),
    'cent-reponses': () => stats.correctAnswers >= 100
  }
  for (const a of ACHIEVEMENTS) {
    if (!unlocked.has(a.id) && conditions[a.id]()) {
      unlocked.add(a.id)
      gained.push(a)
    }
  }
  return { unlocked, gained }
}

// --- Ranking computation helpers ---
export function buildRankings(users, timeframeDays) {
  const now = Date.now()
  const cutoff = timeframeDays ? now - timeframeDays * 86400000 : 0
  const rows = users
    .map((u) => {
      const hist = (u.history || []).filter((h) => new Date(h.date).getTime() >= cutoff)
      const testsCompleted = hist.length
      const correctAnswers = hist.reduce((s, h) => s + h.correct, 0)
      const totalAnswers = hist.reduce((s, h) => s + h.total, 0) || 1
      const avgPct = Math.round((hist.reduce((s, h) => s + h.pct, 0) / (testsCompleted || 1)))
      const points = hist.reduce((s, h) => s + h.points, 0)
      return {
        id: u.id,
        name: u.name,
        avatar: u.avatar,
        level: u.level,
        xp: u.xp,
        testsCompleted,
        correctAnswers,
        avgPct,
        points,
        achievements: u.achievements || []
      }
    })
    .sort((a, b) => b.xp - a.xp || b.points - a.points)
  return rows.map((r, i) => ({ ...r, rank: i + 1 }))
}
