import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { auth } from '../lib/db.js'
import { useToast } from '../components/ui.jsx'

export default function AccessPage() {
  const { user, refresh, t } = useApp()
  const toast = useToast()
  const [justRequested, setJustRequested] = useState(false)

  if (!user) return <Navigate to="/auth" replace />

  const status = user.accessStatus
  const busy = justRequested || status === 'pending'

  const expiredDate = user.accessExpires
    ? new Date(user.accessExpires).toLocaleDateString('fr-FR')
    : ''

  const doRequest = () => {
    const res = auth.requestRenewal()
    if (res.user) {
      setJustRequested(true)
      refresh()
      toast(t('access.requestSent'), 'success')
    }
  }

  return (
    <div className="container auth-wrap fade-in">
      <div className="card center" style={{ maxWidth: 480, textAlign: 'center', margin: '48px auto' }}>
        {status === 'blocked' && (
          <>
            <div style={{ fontSize: 56 }}>🚫</div>
            <h2>{t('access.blocked')}</h2>
            <p className="muted">{t('access.blockedMsg')}</p>
          </>
        )}

        {status === 'expired' && (
          <>
            <div style={{ fontSize: 56 }}>⏳</div>
            <h2>{t('access.expired')}</h2>
            <p className="muted">
              {expiredDate && <>{t('access.expiredMsg1')} <strong>{expiredDate}</strong>.</>}{' '}
              {t('access.expiredMsg2')}
            </p>
            {!busy ? (
              <button className="btn primary block mt" onClick={doRequest}>
                🔄 {t('access.request')}
              </button>
            ) : (
              <div className="alert info mt">📨 {t('access.pendingInfo')}</div>
            )}
          </>
        )}

        {status === 'pending' && (
          <>
            <div style={{ fontSize: 56 }}>📨</div>
            <h2>{t('access.pending')}</h2>
            <p className="muted">
              {t('access.pendingMsg')}
            </p>
            <div className="alert info mt">🕒 {t('access.pendingStatus')}</div>
          </>
        )}

        {status === 'active' && (
          <>
            <div style={{ fontSize: 56 }}>✅</div>
            <h2>{t('access.active')}</h2>
            <p className="muted">{t('access.activeMsg')}{expiredDate && <> {t('access.until')} <strong>{expiredDate}</strong></>}.</p>
            <Link to="/" className="btn primary block mt">{t('access.home')}</Link>
          </>
        )}
      </div>
    </div>
  )
}