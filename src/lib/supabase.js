// Supabase integration for Google Sign-In.
//
// The app runs on a local demo provider by default so it works without any account.
// When the two env vars below are present, Google authentication becomes LIVE and the
// Supabase auth session is treated as the identity source for signing in.
//
// To enable Google auth:
//   1. Create a project at https://supabase.com and run supabase/schema.sql.
//   2. In Supabase → Authentication → Providers, enable "Google":
//        - copy the Redirect URL shown there (e.g. https://xxxx.supabase.co/auth/v1/callback)
//        - paste it into your Google Cloud OAuth client's Authorized redirect URIs
//        - copy the client id + secret back into Supabase.
//   3. Supabase → Authentication → URL Configuration → "Redirect URLs" must contain
//        EVERY origin the app runs on (http://localhost:5173 for local dev AND your
//        production domain, e.g. https://mon-app.vercel.app). Google returns there.
//   4. Create a .env file in the project root:
//        VITE_SUPABASE_URL=https://xxxx.supabase.co
//        VITE_SUPABASE_ANON_KEY=eyJ...
//
// Sign-in uses a full-page PKCE redirect (no popup): the button navigates to the
// authorize URL, Google returns to the origin, and detectSessionInUrl + onAuthStateChange
// hydrate the session. While the keys are absent, IS_SUPABASE stays false and Google
// login is disabled gracefully (the button simply shows a message).

import { createClient } from '@supabase/supabase-js'

const url = (import.meta.env && import.meta.env.VITE_SUPABASE_URL) || ''
// Accept either the classic anon key or the newer publishable key.
const anonKey =
  (import.meta.env && (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)) || ''

// Both must be set for the live backend to activate.
export const IS_SUPABASE = !!(url && anonKey)

let _client = null
export function client() {
  if (!IS_SUPABASE) return null
  if (!_client) {
    _client = createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    })
  }
  return _client
}
// Initialize eagerly so supabase-js starts handling the PKCE code in the URL
// immediately on load — before the first render — guaranteeing the auto exchange
// (detectSessionInUrl) doesn't miss the code because of lazy client creation.
if (IS_SUPABASE && typeof window !== 'undefined') {
  const c = client()
  c.auth.initialize()
}

// The single source of truth for "is Google auth configured".
export function isGoogleEnabled() {
  return IS_SUPABASE
}

async function currentToken() {
  const { data: { session } } = await client().auth.getSession()
  return session?.access_token || null
}

// Builds the Google OAuth authorize URL (full-page redirect + PKCE, no popup so it is
// not blocked and works reliably on localhost / Vercel / Netlify). The caller redirects
// the tab to `url`; on return detectSessionInUrl + onAuthStateChange hydrate the session.
export async function signInWithGoogle() {
  if (!isGoogleEnabled()) {
    return { error: 'Connexion Google non configurée. Ajoute VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.' }
  }
  try {
    const { data, error } = await client().auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        flowType: 'pkce',
        skipBrowserRedirect: true
      }
    })
    if (error) return { error: error.message }
    if (!data || !data.url) return { error: "Impossible de démarrer la connexion Google." }
    return { ok: true, url: data.url }
  } catch (e) {
    return { error: e.message || 'Erreur lors de la connexion Google.' }
  }
}

// Starts a password reset email flow. Returns { ok: true } or { error }.
export async function resetPassword(email) {
  if (!isGoogleEnabled()) {
    return { error: 'Réinitialisation non configurée. Ajoute VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.' }
  }
  try {
    const { error } = await client().auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/password-reset' })
    if (error) return { error: error.message }
    return { ok: true }
  } catch (e) {
    return { error: e.message || 'Erreur lors de la réinitialisation du mot de passe.' }
  }
}

// Applies a new password using the current (recovery) Supabase session.
// Called from the /password-reset page after opening the email link.
export async function updatePassword(newPassword) {
  if (!isGoogleEnabled()) {
    return { error: 'Réinitialisation non configurée.' }
  }
  try {
    const { error } = await client().auth.updateUser({ password: newPassword })
    if (error) return { error: error.message }
    return { ok: true }
  } catch (e) {
    return { error: e.message || 'Erreur lors de la mise à jour du mot de passe.' }
  }
}

// Returns the current Supabase user (the OAuth identity), or null.
export async function currentGoogleUser() {
  if (!isGoogleEnabled()) return null
  const { data } = await client().auth.getSession()
  const u = (data && data.session && data.session.user) || null
  return u
    ? {
        id: u.id,
        email: (u.email || '').toLowerCase(),
        name: (u.user_metadata && (u.user_metadata.full_name || u.user_metadata.name)) || '',
        avatarUrl: (u.user_metadata && u.user_metadata.avatar_url) || null
      }
    : null
}

// Signs out of Supabase (clears the live OAuth session).
export async function signOutGoogle() {
  if (!isGoogleEnabled()) return
  try { await client().auth.signOut() } catch { /* ignore */ }
}

// Registers a new user in Supabase Auth (server-side). Returns the created identity.
export async function signUpWithEmail({ email, password, name }) {
  if (!isGoogleEnabled()) {
    return { error: 'Connexion non configurée. Ajoute VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.' }
  }
  try {
    const { data, error } = await client().auth.signUp({
      email,
      password,
      options: { data: { full_name: name || '' } }
    })
    if (error) {
      const msg = (error.message || '').toLowerCase()
      if (msg.includes('rate limit') || msg.includes('rate_limit') || msg.includes('too many')) {
        return { error: 'rate_limit' }
      }
      if (msg.includes('already registered') || msg.includes('already been registered') || msg.includes('User already registered')) {
        return { error: 'duplicate' }
      }
      return { error: error.message }
    }
    return { ok: true, user: data.user }
  } catch (e) {
    return { error: e.message || 'Erreur lors de l\u2019inscription.' }
  }
}

// Signs a user in with email + password through Supabase Auth.
export async function signInWithEmail({ email, password }) {
  if (!isGoogleEnabled()) {
    return { error: 'Connexion non configurée. Ajoute VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.' }
  }
  try {
    const { data, error } = await client().auth.signInWithPassword({ email, password })
    if (error) {
      const msg = (error.message || '').toLowerCase()
      if (msg.includes('rate limit') || msg.includes('rate_limit') || msg.includes('too many')) {
        return { error: 'rate_limit' }
      }
      return { error: error.message }
    }
    return { ok: true, user: data.user, session: data.session }
  } catch (e) {
    return { error: e.message || 'Erreur lors de la connexion.' }
  }
}

// Sends a completed test to the secure edge function for server-side verification.
// The edge function runs with service_role privileges and writes results directly.
// result comes from the local, authoritative scorer (see submissions.submit in db.js):
// { correct, total, pct, points, xp }.
export async function submitResult({ testId, result }) {
  if (!isGoogleEnabled()) return { error: 'not-configured' }
  try {
    const token = await currentToken()
    if (!token) return { error: 'not-authenticated' }
    const { data, error } = await client().functions.invoke('submit', {
      body: { testId, result },
      headers: { Authorization: `Bearer ${token}` }
    })
    if (error) return { error: error.message || 'submit-failed' }
    return { ok: true, data }
  } catch (e) {
    return { error: e.message || 'submit-failed' }
  }
}

// Fetches the shared leaderboard. Returns an array of rows with a unified shape,
// or [] on failure.
//
// period: 0 = all time (reads profiles directly, SELECT is public),
// 7 = last week (leaderboard_weekly view), 30 = last month (leaderboard_monthly view).
export async function fetchLeaderboard(period = 0) {
  if (!isGoogleEnabled()) return []
  try {
    let rows
    if (period === 0) {
      const { data, error } = await client()
        .from('profiles').select('id, name, avatar, xp, achievements')
        .order('xp', { ascending: false }).limit(50)
      if (error || !data) return []
      rows = data.map((r, i) => ({
        id: r.id,
        name: r.name || 'Utilisateur',
        avatar: r.avatar || '🙂',
        xp: r.xp || 0,
        achievements: r.achievements || [],
        testsCompleted: 0,
        correctAnswers: 0,
        avgPct: 0,
        points: 0,
        rank: i + 1,
        level: Math.floor(Math.max(r.xp || 0, 0) / 300) + 1
      }))
    } else {
      const view = period === 7 ? 'leaderboard_weekly' : 'leaderboard_monthly'
      const { data, error } = await client()
        .from(view).select('user_id, name, avatar, xp_period')
        .order('xp_period', { ascending: false }).limit(50)
      if (error || !data) return []
      rows = data.map((r, i) => ({
        id: r.user_id,
        name: r.name || 'Utilisateur',
        avatar: r.avatar || '🙂',
        xp: r.xp_period || 0,
        achievements: [],
        testsCompleted: 0,
        correctAnswers: 0,
        avgPct: 0,
        points: 0,
        rank: i + 1,
        level: Math.floor(Math.max(r.xp_period || 0, 0) / 300) + 1
      }))
    }
    return rows
  } catch (e) {
    return []
  }
}

// Ensures the current Supabase user has a row in the shared `profiles` table, so they
// appear in the leaderboard and can start accumulating XP. No-op when not configured /
// not authenticated. Fire-and-forget safe.
export async function ensureProfile({ name = '', avatar = '🙂' } = {}) {
  if (!isGoogleEnabled()) return
  try {
    const { data: { user } } = await client().auth.getSession()
    if (!user) return
    const { data: existing } = await client()
      .from('profiles').select('id').eq('id', user.id).maybeSingle()
    if (existing) return { ok: true }
    const display = name || (user.email || '').split('@')[0] || 'Utilisateur'
    const { error } = await client()
      .from('profiles').insert({ id: user.id, name: display, avatar })
    return error ? { error: error.message } : { ok: true }
  } catch (e) {
    return { error: e.message }
  }
}

// Registers a callback fired whenever the Supabase auth state changes
// (initial load, sign-in, sign-out, token refresh). Returns an unsubscribe fn.
export function onGoogleAuthChange(cb) {
  if (!isGoogleEnabled()) return () => {}
  const { data } = client().auth.onAuthStateChange((event, session) => {
    const u = session && session.user
    cb(
      u
        ? {
            id: u.id,
            email: (u.email || '').toLowerCase(),
            name: (u.user_metadata && (u.user_metadata.full_name || u.user_metadata.name)) || '',
            avatarUrl: (u.user_metadata && u.user_metadata.avatar_url) || null
          }
        : null,
      event
    )
  })
  return () => data.subscription.unsubscribe()
}
