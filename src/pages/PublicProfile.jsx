import { useParams, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { profile, rankings } from '../lib/db.js'
import { ACHIEVEMENTS } from '../lib/engine.js'

export default function PublicProfile() {
  const { id } = useParams()
  const { t } = useApp()
  const u = profile.get(id)
  const rows = rankings.all(0)
  const rankInfo = u ? rows.find((r) => r.id === u.id) : null

  if (!u) {
    return <div className="container"><div className="empty"><div className="big">🔒</div><p>{t('public.notFound')}</p><Link to="/jeu" className="btn primary">{t('public.backRank')}</Link></div></div>
  }

  const s = u.stats
  return (
    <div className="container fade-in" style={{ maxWidth: 760 }}>
      <div style={{ height: 24 }} />

      <div className="profile-hero">
        <span className="big-avatar">{u.avatar}</span>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1>{u.name}</h1>
          <div className="row wrap">
            <span className="chip">{t('public.level')} {u.level}</span>
            <span className="chip">⭐ {u.xp} XP</span>
            {rankInfo && <span className="chip"># {rankInfo.rank} {t('public.rank')}</span>}
          </div>
        </div>
      </div>

      <div className="grid grid-stats mb">
        <div className="stat-tile"><span className="icon">📚</span><span className="value">{s.testsCompleted}</span><span className="label">{t('public.tests')}</span></div>
        <div className="stat-tile"><span className="icon">✅</span><span className="value">{s.correctAnswers}</span><span className="label">{t('public.correct')}</span></div>
        <div className="stat-tile"><span className="icon">📊</span><span className="value">{s.avgPct}%</span><span className="label">{t('public.avg')}</span></div>
        <div className="stat-tile"><span className="icon">🏅</span><span className="value">{s.bestPct}%</span><span className="label">{t('public.best')}</span></div>
      </div>

      <div className="section-title"><h2>{t('public.succes')}</h2></div>
      <div className="ach-grid mb">
        {ACHIEVEMENTS.map((a) => {
          const has = (u.achievements || []).includes(a.id)
          return (
            <div key={a.id} className={`ach-item ${has ? '' : 'locked'}`}>
              <div className="a-icon">{a.icon}</div>
              <div className="a-title">{a.title}</div>
            </div>
          )
        })}
      </div>

      <div className="section-title"><h2>{t('public.lastTests')}</h2></div>
      <div className="card mb">
        {u.history.length === 0 ? (
          <div className="empty"><div className="big">🗒️</div><p>{t('public.noTests')}</p></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>{t('public.thTest')}</th><th>{t('public.thDate')}</th><th>{t('public.thResult')}</th><th>{t('public.thXp')}</th></tr></thead>
              <tbody>
                {[...u.history].reverse().slice(0, 10).map((h) => (
                  <tr key={h.id}><td style={{ fontWeight: 700 }}>{h.name}</td><td className="muted">{fmt(h.date)}</td><td style={{ fontWeight: 800 }}>{h.pct}%</td><td>+{h.xp}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function fmt(iso) {
  try { return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) } catch { return iso }
}
