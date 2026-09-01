import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { useToast } from '../components/ui.jsx'

export default function PasswordReset() {
  const { setNewPassword, t } = useApp()
  const toast = useToast()
  const navigate = useNavigate()
  const [pw, setPw] = useState('')
  const [con, setCon] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (pw.length < 6) { setError(t('pwreset.tooShort')); return }
    if (pw !== con) { setError(t('pwreset.mismatch')); return }
    setBusy(true)
    const res = await setNewPassword(pw)
    setBusy(false)
    if (res.error) { setError(res.error) }
    else {
      toast(t('pwreset.done'), 'success')
      navigate('/auth')
    }
  }

  return (
    <div className="container auth-wrap fade-in">
      <div className="card">
        <div className="center mb" style={{ fontSize: 40 }}>🔑</div>
        <h2 style={{ textAlign: 'center', marginBottom: 6 }}>{t('pwreset.title')}</h2>
        <p className="muted center" style={{ fontSize: 13, marginBottom: 20 }}>
          {t('pwreset.sub')}
        </p>
        <form onSubmit={submit}>
          {error && <div className="alert error">{error}</div>}
          <div className="field">
            <label>{t('pwreset.pwNew')}</label>
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" />
          </div>
          <div className="field">
            <label>{t('pwreset.confirm')}</label>
            <input type="password" value={con} onChange={(e) => setCon(e.target.value)} placeholder="••••••••" />
          </div>
          <button className="btn primary block" type="submit" disabled={busy}>
            {busy ? t('pwreset.saving') : t('pwreset.save')}
          </button>
        </form>
        <Link to="/auth" className="muted center" style={{ display: 'block', marginTop: 14, fontSize: 13 }}>{t('pwreset.backLogin')}</Link>
      </div>
    </div>
  )
}
