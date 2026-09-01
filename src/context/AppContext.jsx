import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { auth, profile, settings, rankings, initData } from '../lib/db.js'
import { levelProgress } from '../lib/engine.js'
import { signInWithGoogle, isGoogleEnabled, resetPassword, updatePassword, signUpWithEmail, signInWithEmail, ensureProfile } from '../lib/supabase.js'
import { t } from '../lib/i18n.js'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [theme, setThemeState] = useState(() => settings.get().theme)
  const [lang, setLangState] = useState(() => settings.get().lang)
  const [notifications, setNotificationsState] = useState(() => settings.get().notifications)
  const [rank, setRank] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Prefer the live Google (Supabase) identity when configured: a returning visitor
    // who already granted Google access gets an active session without a new popup.
    let unsubGoogle = () => {}
    let cancelled = false

    const hydrate = (g) => {
      if (!g) {
        setUser(auth.currentUser())
        return
      }
      const res = auth.googleUser(g)
      if (res && res.user) setUser(res.user)
      else setUser(auth.currentUser())
      ensureProfile({ name: g.name || '' })
    }

    if (isGoogleEnabled()) {
      // The code→session exchange in supabase-js is asynchronous: at the first render it
      // may not have finished yet. Await the current session so a returning visitor is
      // re-hydrated reliably on refresh (not only via the event subscription).
      auth.currentGoogleIdentity().then(async (g) => {
        if (cancelled) return
        await initData()
        if (cancelled) return
        hydrate(g)
        setLoaded(true)
      })

      unsubGoogle = auth.onGoogleAuth((g2, event) => {
        // Only clear user on explicit sign-out, not on initial session check.
        if (event === 'SIGNED_OUT') {
          if (cancelled) return
          setUser(null)
          setRank(null)
          return
        }
        if (g2) {
          const res = auth.googleUser(g2)
          if (res && res.user) setUser(res.user)
          refresh()
        }
      })

      // Poll as a fallback: if `onAuthStateChange` was attached after supabase already
      // emitted its initial (buffered) session event, the subscription alone can miss it.
      // Polling re-checks the persisted session a few times shortly after mount.
      let tries = 0
      const poll = setInterval(() => {
        tries++
        auth.currentGoogleIdentity().then((g) => {
          if (cancelled) return
          if (g) {
            clearInterval(poll)
            hydrate(g)
            refresh()
          }
        })
        if (tries >= 8) clearInterval(poll)
      }, 400)
    } else {
      initData().then(() => {
        if (cancelled) return
        setUser(auth.currentUser())
        setLoaded(true)
      })
    }
    return () => {
      cancelled = true
      unsubGoogle()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const refresh = useCallback(() => {
    const u = auth.currentUser()
    setUser(u)
    if (u) {
      const rows = rankings.all(0)
      const r = rows.find((x) => x.id === u.id)
      setRank(r ? r.rank : null)
    }
  }, [])

  const login = async ({ email, password }) => {
    const res = await signInWithEmail({ email, password })
    if (res.error) return { error: res.error }
    // Map the verified Supabase identity to a local profile (keeps progress/XP) by email.
    const g = {
      id: res.user.id,
      email: (res.user.email || '').toLowerCase(),
      name: (res.user.user_metadata && (res.user.user_metadata.full_name || res.user.user_metadata.name)) || ''
    }
    const mapped = auth.googleUser(g)
    if (mapped && mapped.user) refresh()
    // Make sure this user has a row in the shared leaderboard (fire-and-forget).
    ensureProfile({ name: g.name })
    return { user: mapped ? mapped.user : null }
  }

  const register = async ({ name, email, password }) => {
    const res = await signUpWithEmail({ email, password, name })
    if (res.error) return { error: res.error }
    // Enforce "one email = one account": Supabase silently returns the existing user
    // (with no session) instead of an error when the email is already registered. To
    // reject re-registration with a different password, verify the supplied credentials
    // against the server. A genuine new account (email confirmation off) signs in fine.
    const verify = await signInWithEmail({ email, password })
    if (verify.error) {
      const m = verify.error || ''
      if (/confirm|verify|not (yet )?verified|not confirmed/i.test(m)) {
        return { error: t(lang, 'auth.checkEmail') }
      }
      return { error: t(lang, 'auth.emailUsed') }
    }
    const g = {
      id: verify.user.id,
      email: (verify.user.email || '').toLowerCase(),
      name: name || ''
    }
    const u = auth.googleUser(g)
    if (u && u.user) refresh()
    ensureProfile({ name: name || '' })
    return u || { error: 'OK' }
  }

  const googleLogin = async () => {
    const res = await signInWithGoogle()
    if (res.error) return res
    // Full-page redirect to Google; on return onGoogleAuth() above hydrates the session.
    return res
  }

  const logout = () => {
    auth.googleLogout()
    setUser(null)
    setRank(null)
  }

  const resetPasswordFn = async (email) => {
    return await resetPassword(email)
  }

  const setNewPassword = async (pw) => {
    const res = await updatePassword(pw)
    if (res.error) return res
    // For Google-only users there is no local session — skip the local password set.
    const local = profile.setLocalPassword(pw)
    if (local.error && !local.error.includes('Non connecté')) return local
    return { ok: true }
  }

  const setTheme = (v) => { setThemeState(v); settings.save({ theme: v }) }
  const setLang = (v) => { setLangState(v); settings.save({ lang: v }) }
  const setNotifications = (v) => { setNotificationsState(v); settings.save({ notifications: v }) }

  const applyUser = (u) => setUser(u)

  const setAvatarUrl = (dataUrl) => {
    const res = profile.setAvatarUrl(dataUrl)
    if (res && res.user) setUser(res.user)
    return res
  }

  const value = {
    user,
    rank,
    refresh,
    login,
    register,
    logout,
    resetPassword: resetPasswordFn,
    setNewPassword,
    googleLogin,
    googleEnabled: isGoogleEnabled(),
    applyUser,
    setAvatarUrl,
    theme,
    setTheme,
    lang,
    setLang,
    notifications,
    setNotifications,
    level: user ? levelProgress(user.xp) : levelProgress(0),
    t: (key) => t(lang, key)
  }

  return (
    <AppContext.Provider value={value}>
      {loaded ? children : (
        <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
          <div className="spinner"></div>
        </div>
      )}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
