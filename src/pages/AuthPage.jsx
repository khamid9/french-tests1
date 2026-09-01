import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { useToast } from '../components/ui.jsx'

export default function AuthPage() {
  const { login, register, resetPassword, t } = useApp()
  const toast = useToast()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (mode === 'reset') return
    if (!email || !password) { setError(t('auth.fillAll')); return }
    if (mode === 'register' && (!name || password.length < 6)) {
      setError(t('auth.nameRequired')); return
    }
    setBusy(true)
    const res = mode === 'login' ? await login({ email, password }) : await register({ name, email, password })
    setBusy(false)
    if (res && res.error) {
      if (res.error === 'rate_limit') setError(t('auth.rateLimit'))
      else if (res.error === 'duplicate') setError(t('auth.duplicate'))
      else setError(res.error)
    }
    else if (res && res.user) {
      toast(mode === 'login' ? t('auth.welcomeBack') : t('auth.welcome'), 'success')
      navigate('/')
    }
  }

  const reset = async (e) => {
    e.preventDefault()
    setError('')
    if (!email) { setError('Entre ton email.'); return }
    const res = await resetPassword(email)
    if (res && res.error) {
      setError(res.error)
    } else {
      setResetSent(true)
    }
  }

  return (
    <div className="container auth-wrap fade-in">
      <div className="card">
        <div className="tabs" style={{ marginBottom: 20 }}>
          <button className={`tab ${mode === 'login' ? 'active' : ''}`} onClick={() => { setMode('login'); setError('') }}>{t('auth.login')}</button>
          <button className={`tab ${mode === 'register' ? 'active' : ''}`} onClick={() => { setMode('register'); setError('') }}>{t('auth.register')}</button>
        </div>

        <div className="center mb" style={{ fontSize: 40 }}>🇫🇷</div>

        {resetSent ? (
          <div className="center">
            <div className="alert success">📧 {t('auth.resetSent')} <strong>{email}</strong>.</div>
            <button className="btn ghost" onClick={() => setResetSent(false)}>{t('auth.back')}</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            {error && <div className="alert error">{error}</div>}

            {mode === 'register' && (
              <div className="field">
                <label>{t('auth.name')}</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Marie Dupont" />
              </div>
            )}

            <div className="field">
              <label>{t('auth.email')}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="marie@mail.fr" />
            </div>

            <div className="field">
              <label>{t('auth.password')}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>

            <button className="btn primary block" type="submit" disabled={busy}>
              {busy ? t('auth.submitting') : (mode === 'login' ? t('auth.submitLogin') : t('auth.submitRegister'))}
            </button>
          </form>
        )}

        {!resetSent && (
          <div className="center mt">
            <button className="muted" style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: 13 }}
              onClick={() => setMode('reset')}>
              {t('auth.forgot')}
            </button>
          </div>
        )}
      </div>

      {mode === 'reset' && !resetSent && (
        <div className="card mt">
          <h3>{t('auth.resetTitle')}</h3>
          <form onSubmit={reset}>
            <div className="field">
              <label>{t('auth.resetEmailLabel')}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="marie@mail.fr" />
            </div>
            <button className="btn primary block" type="submit">{t('auth.sendLink')}</button>
          </form>
        </div>
      )}

      <div className="card mt">
        <p className="muted center" style={{ fontSize: 13 }}>
          {t('auth.90day')}
        </p>
        <Link to="/" className="muted center" style={{ display: 'block', marginTop: 8, fontSize: 13 }}>{t('backHome')}</Link>
      </div>
    </div>
  )
}
