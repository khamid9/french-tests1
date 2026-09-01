import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ACHIEVEMENTS, levelProgress } from '../lib/engine.js'
import Avatar from '../components/Avatar.jsx'

export default function Profile() {
  const { user, rank, level, t, setAvatarUrl } = useApp()
  const s = user.stats
  const fileRef = useRef(null)

  const pickAvatar = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setAvatarUrl(reader.result)
    reader.readAsDataURL(file)
  }

  const tiles = [
    { icon: '📚', label: t('profile.tests'), v: s.testsCompleted },
    { icon: '❓', label: t('profile.questions'), v: s.questionsAnswered },
    { icon: '✅', label: t('profile.correct'), v: s.correctAnswers },
    { icon: '❌', label: t('profile.wrong'), v: s.wrongAnswers },
    { icon: '📊', label: t('profile.avg'), v: `${s.avgPct}%` },
    { icon: '🏅', label: t('profile.best'), v: `${s.bestPct}%` },
    { icon: '🎯', label: t('profile.perfect'), v: s.perfectTests },
    { icon: '🔥', label: t('profile.streak'), v: s.bestStreak }
  ]

  return (
    <div className="container fade-in">
      <div style={{ height: 24 }} />

      <div className="profile-hero">
        <div className="avatar-wrap" onClick={() => fileRef.current && fileRef.current.click()}>
          <Avatar user={user} className="big-avatar" />
          <input ref={fileRef} type="file" accept="image/*" onChange={pickAvatar} style={{ display: 'none' }} />
        </div>
        <div className="profile-info">
          <h1>{user.name}</h1>
          <div className="row wrap chips-row">
            <span className="chip">{t('profile.level')} {user.level}</span>
            <span className="chip">⭐ {user.xp} XP</span>
            <span className="chip rank-chip">{rank ? `#${rank}` : '—'} {t('public.rank')}</span>
          </div>
          <div className="mt">
            <div className="row between muted" style={{ fontSize: 12, fontWeight: 700 }}>
              <span>{level.into}/{level.need} {t('profile.xpTo')} {user.level + 1}</span>
              <span className="xp-right">{level.need - level.into} {t('profile.restants')}</span>
            </div>
            <div className="progress mt" style={{ marginTop: 6 }}><div style={{ width: `${level.pct}%` }}></div></div>
          </div>
        </div>
        <Link to="/parametres" className="btn ghost sm profile-settings">{t('profile.settings')}</Link>
      </div>

      {/* Stats */}
      <div className="grid grid-stats mb">
        {tiles.map((x) => (
          <div className="stat-tile" key={x.label}>
            <span className="icon">{x.icon}</span>
            <span className="value">{x.v}</span>
            <span className="label">{x.label}</span>
          </div>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 18 }}>
        {/* Achievements */}
        <div>
          <div className="section-title"><h2>{t('profile.mySucces')}</h2><Link to="/jeu" className="muted" style={{ fontSize: 14, fontWeight: 700 }}>{t('seeAll')}</Link></div>
          <div className="ach-grid">
            {ACHIEVEMENTS.map((a) => {
              const has = (user.achievements || []).includes(a.id)
              return (
                <div key={a.id} className={`ach-item ${has ? '' : 'locked'}`}>
                  <div className="a-icon">{a.icon}</div>
                  <div className="a-title">{a.title}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* History */}
        <div>
          <div className="section-title"><h2>{t('profile.history')}</h2></div>
          <div className="card">
            {user.history.length === 0 ? (
              <div className="empty"><div className="big">🗒️</div><p>{t('profile.noHistory')}</p><Link to="/tests" className="btn primary sm">{t('profile.doTest')}</Link></div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead><tr><th>{t('profile.thTest')}</th><th>{t('profile.thDate')}</th><th>{t('profile.thResult')}</th><th>{t('profile.thCorrect')}</th><th>{t('profile.thXp')}</th><th>{t('profile.thPoints')}</th></tr></thead>
                  <tbody>
                    {[...user.history].reverse().map((h) => (
                      <tr key={h.id}>
                        <td style={{ fontWeight: 700 }}>{h.name}</td>
                        <td className="muted">{fmtDate(h.date)}</td>
                        <td style={{ fontWeight: 800 }}>{h.pct}%</td>
                        <td>{h.correct}/{h.total}</td>
                        <td>+{h.xp}</td>
                        <td>+{h.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch { return iso }
}
