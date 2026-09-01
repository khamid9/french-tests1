// Data access layer — single point of contact for all data.
// By default runs on a local demo provider so the site works out of the box.
// To use a live Supabase backend, see src/lib/supabase.js and the README.

import { demoCategories } from '../data/demoData.js'
import { computeResult, evaluateAchievements, buildRankings, levelFromXp } from './engine.js'
import { isGoogleEnabled, currentGoogleUser, signOutGoogle, onGoogleAuthChange } from './supabase.js'

// Questions live in a separate, lazily-loaded chunk so the initial JS bundle stays light
// and the app opens fast even on slow connections. initData() is awaited once before the
// UI renders (see AppContext). `demoTests` is populated there; the rest of the module keeps
// using it synchronously because at render-time it is always already loaded.
let demoTests = []
export async function initData() {
  if (demoTests.length) return
  const m = await import('../data/tests.js')
  demoTests = m.demoTests || []
}

// --- Persistence (localStorage acting as the "database") ---
const LS_USERS = 'ft_users'
const LS_SESSION = 'ft_session'
const LS_SETTINGS = 'ft_settings'
const LS_SCHEMA = 'ft_schema'
const SCHEMA_VERSION = 2

// Fixed ids of the old demo/seed accounts — removed so nothing shows until real users register.
const SEED_IDS = ['u-alex', 'u-marie', 'u-lucas', 'u-sophie']

// Normalize an email for storage/lookup: trim whitespace + lowercase.
function normEmail(e) {
  return String(e || '').trim().toLowerCase()
}

function loadUsers() {
  try {
    const raw = JSON.parse(localStorage.getItem(LS_USERS)) || []
    return raw.map(normalizeUser).filter((u) => !SEED_IDS.includes(u.id))
  } catch { return [] }
}
function saveUsers(users) {
  localStorage.setItem(LS_USERS, JSON.stringify(users))
}

// --- Access control helpers ---
function addDays(days) {
  return new Date(Date.now() + days * 86400000).toISOString()
}
function isExpired(u) {
  return !!u.accessExpires && new Date(u.accessExpires).getTime() <= Date.now()
}
export function accessStatusFor(u) {
  if (!u) return 'active'
  if (u.role === 'admin') return 'active'
  if (u.blocked) return 'blocked'
  if (!u.accessExpires) return 'active' // unlimited
  if (!isExpired(u)) return 'active'
  if (u.renewalStatus === 'pending') return 'pending'
  return 'expired'
}
function normalizeUser(u) {
  if (u.accessExpires === undefined) u.accessExpires = u.role === 'admin' ? null : addDays(90)
  if (u.renewalStatus === undefined) u.renewalStatus = null
  if (u.renewalRequestedAt === undefined) u.renewalRequestedAt = null
  if (u.renewalDecisionAt === undefined) u.renewalDecisionAt = null
  return u
}
function getSession() {
  try { return localStorage.getItem(LS_SESSION) } catch { return null }
}
function setSession(id) {
  if (id) localStorage.setItem(LS_SESSION, id)
  else localStorage.removeItem(LS_SESSION)
}

// --- Seed admin + migrate old demo data on first run ---
function freshAdmin() {
  const now = new Date().toISOString()
  return {
    id: 'u-admin',
    name: 'Administrateur',
    avatar: '🛡️',
    email: 'admin@francais.test',
    password: 'admin123',
    role: 'admin',
    accessExpires: null,
    xp: 0,
    createdAt: now,
    achievements: [],
    stats: { testsCompleted: 0, questionsAnswered: 0, correctAnswers: 0, wrongAnswers: 0, avgPct: 0, bestPct: 0, perfectTests: 0, bestStreak: 0 },
    history: [],
    errors: []
  }
}
function seedIfNeeded() {
  const schema = localStorage.getItem(LS_SCHEMA)
  if (schema !== String(SCHEMA_VERSION)) {
    // Purge old seeded demo accounts (Alex, Marie, Lucas, Sophie) and any fake admin stats.
    const users = loadUsers().filter((u) => u.id !== 'u-admin' || u.role === 'admin')
    if (!users.some((u) => u.id === 'u-admin')) users.push(freshAdmin())
    const admin = users.find((u) => u.id === 'u-admin')
    if (admin) {
      // Real attempts always carry an id (h-...); seeded fake entries did not. Keep only real progress.
      admin.history = (admin.history || []).filter((h) => h.id)
      admin.errors = []
      admin.xp = Math.max(0, admin.history.reduce((s, h) => s + (h.xp || 0), 0))
      admin.stats = recomputeStats(admin.history)
      admin.achievements = []
    }
    saveUsers(users)
    localStorage.setItem(LS_SCHEMA, String(SCHEMA_VERSION))
  }
  if (!localStorage.getItem(LS_USERS)) {
    saveUsers([freshAdmin()])
    localStorage.setItem(LS_SCHEMA, String(SCHEMA_VERSION))
  }
}

// --- Auth ---
export const auth = {
  currentUser() {
    seedIfNeeded()
    const id = getSession()
    if (!id) return null
    const u = loadUsers().find((x) => x.id === id)
    return u ? publicUser(u) : null
  },
  // NOTE: Local email/password registration and login were removed. Identity is now
  // owned by Supabase Auth only (see src/lib/supabase.js + AppContext). The local store
  // below is only a progress/XP cache keyed by the server-verified Supabase user id.
  logout() {
    setSession(null)
  },
  // --- Google (Supabase) sign-in helpers ---
  // Resolves/creates the local user record for a live Google identity and opens a session.
  // Progress and 90-day access live in the local record, keyed by the Google email so the
  // same Google account always maps to the same profile.
  googleUser(google) {
    seedIfNeeded()
    if (!google || !google.email) return null
    const clean = normEmail(google.email)
    const users = loadUsers()
    let u = users.find((x) => x.email && normEmail(x.email) === clean)
    if (!u) {
      u = {
        id: 'g-' + google.id,
        name: google.name || (clean.split('@')[0] || 'Google'),
        avatar: '🙂',
        avatarUrl: google.avatarUrl || null,
        email: clean,
        password: null,
        role: 'user',
        accessExpires: addDays(90),
        renewalStatus: null,
        renewalRequestedAt: null,
        xp: 0,
        createdAt: new Date().toISOString(),
        achievements: [],
        stats: { testsCompleted: 0, questionsAnswered: 0, correctAnswers: 0, wrongAnswers: 0, avgPct: 0, bestPct: 0, perfectTests: 0, bestStreak: 0 },
        history: [],
        errors: []
      }
      users.push(u)
      saveUsers(users)
    } else {
      // Keep the display name/avatar fresh from an updated Google profile; never overwrite progress.
      if (google.name) u.name = google.name
      if (u.email !== clean) u.email = clean
      saveUsers(users)
    }
    setSession(u.id)
    return { user: publicUser(u) }
  },
  // Whether Google sign-in is configured (live backend present).
  googleEnabled() {
    return isGoogleEnabled()
  },
  googleLogout() {
    setSession(null)
    signOutGoogle()
  },
  // Convenience: returns the currently active absolute-identity (supabase user), or null.
  async currentGoogleIdentity() {
    return await currentGoogleUser()
  },
  // Registers a callback for Supabase auth-state changes (sign-in / sign-out / refresh).
  onGoogleAuth(cb) {
    return onGoogleAuthChange(cb)
  },
  accessStatus() {
    const u = loadUsers().find((x) => x.id === getSession())
    return accessStatusFor(u)
  },
  requestRenewal() {
    const users = loadUsers()
    const i = users.findIndex((u) => u.id === getSession())
    if (i === -1) return { error: 'Non connecté' }
    users[i].renewalStatus = 'pending'
    users[i].renewalRequestedAt = new Date().toISOString()
    users[i].renewalDecisionAt = null
    saveUsers(users)
    setSession(users[i].id)
    return { user: publicUser(users[i]) }
  }
}

// --- Categories / Tests ---
export const categories = {
  list() {
    return demoCategories
  },
  byId(id) {
    return demoCategories.find((c) => c.id === id)
  }
}

export const tests = {
  list() {
    return demoTests.map(toView)
  },
  byId(id) {
    const t = demoTests.find((x) => x.id === id)
    return t ? toView(t) : null
  },
  questions(testId) {
    const t = demoTests.find((x) => x.id === testId)
    return t ? t.questions : []
  },
  // Plain, human-readable text export of a test (all questions + options + answer).
  // Works for EVERY test: iterates the same source list as questions().
  exportText(testId) {
    const t = demoTests.find((x) => x.id === testId)
    if (!t) return null
    const lines = []
    lines.push(t.name || t.id)
    if (t.description) lines.push(t.description)
    lines.push(`Niveau : ${t.level || ''}`)
    lines.push(`Nombre de questions : ${t.questions.length}`)
    lines.push('')
    t.questions.forEach((q, index) => {
      lines.push(`${index + 1}. ${q.text}`)
      q.options.forEach((opt, i) => {
        lines.push(`   ${String.fromCharCode(65 + i)}) ${opt}`)
      })
      lines.push(`   → Réponse : ${String.fromCharCode(65 + (q.correctIndex >= 0 ? q.correctIndex : 0))}) ${q.options[q.correctIndex] ?? ''}`)
      if (q.explanation) lines.push(`   💡 ${q.explanation}`)
      lines.push('')
    })
    return lines.join('\n')
  }
}

function toView(t) {
  const user = auth.currentUser()
  const best = user ? bestFor(user, t.id) : null
  return {
    id: t.id,
    name: t.name,
    description: t.description,
    categoryId: t.categoryId,
    category: categories.byId(t.categoryId) || { name: 'Autre', color: '#999', icon: '🗂️' },
    level: t.level,
    numQuestions: t.questions.length,
    strictMode: t.strictMode,
    timer: t.timer,
    shuffle: t.shuffle,
    createdAt: t.createdAt,
    plays: t.plays,
    best: best
  }
}

function bestFor(user, testId) {
  if (!user) return null
  const mine = user.history.filter((h) => h.testId === testId)
  if (mine.length === 0) return null
  return { pct: Math.max(...mine.map((h) => h.pct)), count: mine.length }
}

// --- Submit / verify a test submission (server-side authority) ---
export const submissions = {
  submit({ testId, answers }) {
    // answers: { questionId: chosenIndex }
    const user = auth.currentUser()
    if (!user) return { error: 'Non connecté' }
    if (accessStatusFor(user) !== 'active') return { error: 'Accès expiré ou suspendu' }
    const qs = tests.questions(testId)
    if (!qs || qs.length === 0) return { error: 'Test introuvable' }

    // Server-side verification: recompute correctness from stored answers, never trust client.
    const correct = []
    const wrong = []
    for (const q of qs) {
      const chosen = answers[q.id]
      if (chosen === q.correctIndex) correct.push(q.id)
      else wrong.push({ question: q, chosen: chosen ?? null })
    }
    const result = computeResult({ correct, wrong })

    // Update users
    const users = loadUsers()
    const idx = users.findIndex((u) => u.id === user.id)
    if (idx === -1) return { error: 'Utilisateur introuvable' }

    const t = demoTests.find((x) => x.id === testId)
    if (t) t.plays = (t.plays || 0) + 1
    const entry = {
      id: 'h-' + Date.now(),
      testId,
      name: t ? t.name : 'Test',
      date: new Date().toISOString(),
      result: `${result.correct}/${result.total}`,
      correct: result.correct,
      total: result.total,
      pct: result.pct,
      xp: result.xp,
      points: result.points
    }

    const history = [...users[idx].history, entry]
    const newXp = Math.max(0, users[idx].xp) + result.xp
    const stats = recomputeStats(history)

    // Track errors for "Mes erreurs"
    let errors = users[idx].errors || []
    for (const w of wrong) {
      errors = errors.filter((e) => e.id !== w.question.id)
      errors.push({ id: w.question.id, testId, question: w.question, chosen: w.chosen, date: new Date().toISOString() })
    }

    const next = { ...users[idx], xp: newXp, level: levelFromXp(newXp), history, stats, errors }

    // Rank for the "Top 10" achievement (server-side, from real activity).
    const ranked = buildRankings(
      users.map((u) => (u.id === next.id ? next : u)),
      0
    )
    const me = ranked.find((r) => r.id === next.id)
    next.stats = { ...next.stats, rank: me ? me.rank : null }

    const { unlocked, gained } = evaluateAchievements(next, users[idx])
    next.achievements = Array.from(unlocked)
    users[idx] = next
    saveUsers(users)
    setSession(next.id) // refresh in-memory

    return { result, gained, user: publicUser(next) }
  }
}

function recomputeStats(history) {
  const testsCompleted = history.length
  const correctAnswers = history.reduce((s, h) => s + h.correct, 0)
  const totalAnswers = history.reduce((s, h) => s + h.total, 0)
  const wrongAnswers = totalAnswers - correctAnswers
  const avgPct = testsCompleted ? Math.round(history.reduce((s, h) => s + h.pct, 0) / testsCompleted) : 0
  const bestPct = testsCompleted ? Math.max(...history.map((h) => h.pct)) : 0
  const perfectTests = history.filter((h) => h.pct === 100).length

  // bestStreak: longest run of perfect tests in history order
  let bestStreak = 0
  let run = 0
  for (const h of history) {
    if (h.pct === 100) { run++; if (run > bestStreak) bestStreak = run }
    else run = 0
  }
  return {
    testsCompleted, questionsAnswered: totalAnswers, correctAnswers, wrongAnswers,
    avgPct, bestPct, perfectTests, bestStreak
  }
}

// --- Ranking ---
export const rankings = {
  all(timeframeDays = 0) {
    seedIfNeeded()
    const cutoff = timeframeDays ? Date.now() - timeframeDays * 86400000 : 0
    const users = loadUsers()
      .filter((u) => (u.history || []).some((h) => new Date(h.date).getTime() >= cutoff))
      .map((u) => ({
        ...u,
        level: levelFromXp(u.xp)
      }))
    const rows = buildRankings(users, timeframeDays)
    // set rank on users for achievements
    return rows
  },
  byTest(testId) {
    seedIfNeeded()
    const users = loadUsers()
    const rows = users
      .map((u) => {
        const mine = u.history.filter((h) => h.testId === testId)
        if (mine.length === 0) return null
        return { id: u.id, name: u.name, avatar: u.avatar, best: Math.max(...mine.map((h) => h.pct)) }
      })
      .filter(Boolean)
      .sort((a, b) => b.best - a.best)
    return rows.map((r, i) => ({ ...r, rank: i + 1 }))
  },
  records() {
    seedIfNeeded()
    const users = loadUsers()
      .filter((u) => (u.history || []).length > 0)
      .map((u) => ({ ...u, level: levelFromXp(u.xp) }))
    const pick = (fn) => {
      const best = [...users].sort((a, b) => fn(b) - fn(a))[0]
      if (!best || fn(best) <= 0) return null
      return { user: best, value: fn(best) }
    }
    return {
      mostTests: pick((u) => u.stats.testsCompleted),
      mostCorrect: pick((u) => u.stats.correctAnswers),
      mostPoints: pick((u) => u.history.reduce((s, h) => s + h.points, 0)),
      highestLevel: pick((u) => u.level),
      mostXp: pick((u) => u.xp),
      mostPerfect: pick((u) => u.stats.perfectTests),
      bestAvg: pick((u) => u.stats.avgPct)
    }
  }
}

// --- Profile / settings ---
export const profile = {
  get(id) {
    seedIfNeeded()
    const u = loadUsers().find((x) => x.id === id)
    if (!u) return null
    return publicUser(u)
  },
  updateName(name) {
    const users = loadUsers()
    const i = users.findIndex((u) => u.id === getSession())
    if (i === -1) return { error: 'Non connecté' }
    if (!name.trim()) return { error: 'Le nom ne peut pas être vide' }
    users[i].name = name.trim()
    saveUsers(users)
    setSession(users[i].id)
    return { user: publicUser(users[i]) }
  },
  updateAvatar(avatar) {
    const users = loadUsers()
    const i = users.findIndex((u) => u.id === getSession())
    if (i === -1) return { error: 'Non connecté' }
    users[i].avatar = avatar
    saveUsers(users)
    setSession(users[i].id)
    return { user: publicUser(users[i]) }
  },
  setAvatarUrl(dataUrl) {
    const users = loadUsers()
    const i = users.findIndex((u) => u.id === getSession())
    if (i === -1) return { error: 'Non connecté' }
    users[i].avatarUrl = dataUrl || null
    saveUsers(users)
    setSession(users[i].id)
    return { user: publicUser(users[i]) }
  },
  changePassword({ current, next }) {
    const users = loadUsers()
    const i = users.findIndex((u) => u.id === getSession())
    if (i === -1) return { error: 'Non connecté' }
    if (users[i].password !== current) return { error: 'Mot de passe actuel incorrect' }
    if (!next || next.length < 6) return { error: 'Le nouveau mot de passe doit avoir au moins 6 caractères' }
    users[i].password = next
    saveUsers(users)
    return { success: true }
  },
  // Set a password for the *current* user (used after Supabase password-recovery flow).
  setLocalPassword(next) {
    const users = loadUsers()
    const i = users.findIndex((u) => u.id === getSession())
    if (i === -1) return { error: 'Non connecté' }
    if (!next || next.length < 6) return { error: 'Le mot de passe doit avoir au moins 6 caractères' }
    users[i].password = next
    saveUsers(users)
    setSession(users[i].id)
    return { success: true }
  },
  toggleFavorite(testId) {
    const users = loadUsers()
    const i = users.findIndex((u) => u.id === getSession())
    if (i === -1) return { error: 'Non connecté' }
    const favs = users[i].favorites || []
    const has = favs.includes(testId)
    users[i].favorites = has ? favs.filter((f) => f !== testId) : [...favs, testId]
    saveUsers(users)
    setSession(users[i].id)
    return { favorites: users[i].favorites }
  },
  errors() {
    const user = auth.currentUser()
    return user ? user.errors || [] : []
  },
  removeError(questionId) {
    const users = loadUsers()
    const i = users.findIndex((u) => u.id === getSession())
    if (i === -1) return
    users[i].errors = (users[i].errors || []).filter((e) => e.id !== questionId)
    saveUsers(users)
    setSession(users[i].id)
  }
}

function publicUser(u) {
  return {
    id: u.id,
    name: u.name,
    avatar: u.avatar,
    avatarUrl: u.avatarUrl || null,
    role: u.role,
    xp: u.xp,
    level: levelFromXp(u.xp),
    createdAt: u.createdAt,
    achievements: u.achievements || [],
    stats: u.stats,
    history: u.history || [],
    favorites: u.favorites || [],
    errors: (u.errors || []).map((e) => ({ ...e, question: { ...e.question } })),
    accessExpires: u.accessExpires ?? null,
    renewalStatus: u.renewalStatus ?? null,
    renewalRequestedAt: u.renewalRequestedAt ?? null,
    accessStatus: accessStatusFor(u)
  }
}

// --- Settings (theme / language / notifications) persisted locally ---
const LS_SETTINGS_VERSION = 'v2'
export const settings = {
  get() {
    try {
      const s = JSON.parse(localStorage.getItem(LS_SETTINGS))
      if (!s) return defaultSettings()
      // One-time migration: default language became Russian (ru). Old stored
      // French (fr) from a previous version is reset to the new default so
      // existing visitors are switched to Russian too, until they choose again.
      if (s.version !== LS_SETTINGS_VERSION) {
        const migrated = { theme: 'light', notifications: true, ...s, version: LS_SETTINGS_VERSION, lang: 'ru' }
        localStorage.setItem(LS_SETTINGS, JSON.stringify(migrated))
        return migrated
      }
      return s
    } catch { return defaultSettings() }
  },
  save(patch) {
    const s = { ...settings.get(), ...patch, version: LS_SETTINGS_VERSION }
    localStorage.setItem(LS_SETTINGS, JSON.stringify(s))
    return s
  }
}
function defaultSettings() {
  return { theme: 'light', lang: 'ru', notifications: true, version: LS_SETTINGS_VERSION }
}

// --- Admin (mock CRUD on demo store) ---
export const admin = {
  users: () => loadUsers().map(publicUser),
  setBlocked(id, blocked) {
    const users = loadUsers()
    const i = users.findIndex((u) => u.id === id)
    if (i === -1) return
    users[i].blocked = blocked
    saveUsers(users)
  },
  isBlocked(id) {
    return !!loadUsers().find((u) => u.id === id)?.blocked
  },
  renewalRequests() {
    return loadUsers().filter((u) => u.renewalStatus === 'pending').map(publicUser)
  },
  grantAccess(id, months) {
    const users = loadUsers()
    const i = users.findIndex((u) => u.id === id)
    if (i === -1) return
    users[i].accessExpires = addDays((months || 3) * 30)
    users[i].renewalStatus = null
    users[i].renewalDecisionAt = new Date().toISOString()
    saveUsers(users)
  },
  denyRenewal(id) {
    const users = loadUsers()
    const i = users.findIndex((u) => u.id === id)
    if (i === -1) return
    users[i].renewalStatus = 'denied'
    users[i].renewalDecisionAt = new Date().toISOString()
    saveUsers(users)
  },
  setUnlimited(id) {
    const users = loadUsers()
    const i = users.findIndex((u) => u.id === id)
    if (i === -1) return
    users[i].accessExpires = null
    users[i].renewalStatus = null
    saveUsers(users)
  },
  suspendNow(id) {
    const users = loadUsers()
    const i = users.findIndex((u) => u.id === id)
    if (i === -1) return
    users[i].accessExpires = new Date(Date.now() - 1000).toISOString()
    users[i].renewalStatus = null
    saveUsers(users)
  },
  createCategory(name, color, icon) {
    const c = { id: 'cat-' + Date.now(), name, color: color || '#6366f1', icon: icon || '🗂️' }
    demoCategories.push(c)
    return c
  },
  updateCategory(id, patch) {
    const c = demoCategories.find((x) => x.id === id)
    if (c) Object.assign(c, patch)
  },
  deleteCategory(id) {
    const i = demoCategories.findIndex((x) => x.id === id)
    if (i !== -1) demoCategories.splice(i, 1)
  },
  createTest({ name, description, categoryId, level, strictMode, timer, shuffle }) {
    const t = {
      id: 'test-' + Date.now(),
      name,
      description: description || '',
      categoryId: categoryId || demoCategories[0]?.id,
      level,
      strictMode: !!strictMode,
      timer: !!timer,
      shuffle: shuffle !== false,
      createdAt: new Date().toISOString().slice(0, 10),
      plays: 0,
      questions: []
    }
    demoTests.push(t)
    return t
  },
  updateTest(id, patch) {
    const t = demoTests.find((x) => x.id === id)
    if (t) {
      for (const k of ['name', 'description', 'categoryId', 'level', 'strictMode', 'timer', 'shuffle']) {
        if (patch[k] !== undefined) t[k] = patch[k]
      }
    }
  },
  deleteTest(id) {
    const i = demoTests.findIndex((x) => x.id === id)
    if (i !== -1) demoTests.splice(i, 1)
  },
  addQuestion(testId, { text, options, correctIndex, explanation }) {
    const t = demoTests.find((x) => x.id === testId)
    if (!t) return
    const qid = testId + '-q' + Date.now()
    t.questions.push({ id: qid, testId, text, options, correctIndex, explanation: explanation || '' })
  },
  updateQuestion(testId, qid, patch) {
    const t = demoTests.find((x) => x.id === testId)
    if (!t) return
    const q = t.questions.find((x) => x.id === qid)
    if (q) {
      for (const k of ['text', 'options', 'correctIndex', 'explanation']) {
        if (patch[k] !== undefined) q[k] = patch[k]
      }
    }
  },
  deleteQuestion(testId, qid) {
    const t = demoTests.find((x) => x.id === testId)
    if (!t) return
    t.questions = t.questions.filter((q) => q.id !== qid)
  },
  stats() {
    const users = loadUsers()
    const allTests = demoTests
    const allQs = allTests.reduce((s, t) => s + t.questions.length, 0)
    const attempts = users.reduce((s, u) => s + u.history.length, 0)
    // avg results
    const avg = attempts ? Math.round(users.reduce((s, u) => s + u.history.reduce((x, h) => x + h.pct, 0), 0) / attempts) : 0
    return { users: users.length, tests: allTests.length, questions: allQs, attempts, avg }
  }
}

seedIfNeeded()
