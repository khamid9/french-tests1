import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { rankings, tests } from '../lib/db.js'
import { ACHIEVEMENTS, levelProgress } from '../lib/engine.js'
import { fetchLeaderboard } from '../lib/supabase.js'
import Avatar from '../components/Avatar.jsx'

export default function Jeu() {
  const loc = useLocation()
  const { t } = useApp()
  const [tab, setTab] = useState(loc.pathname.includes('classement') ? 'classement' : 'level')
  const [period, setPeriod] = useState(0)

  const tabs = [
    { id: 'level', label: t('jeu.levelXp') },
    { id: 'classement', label: t('jeu.classement') },
    { id: 'records', label: t('jeu.records') },
    { id: 'parTest', label: t('jeu.parTest') },
    { id: 'succes', label: t('jeu.succes') }
  ]

  return (
    <div className="container fade-in">
      <div style={{ height: 24 }} />
      <h1>{t('jeu.title')}</h1>
      <p className="muted">{t('jeu.sub')}</p>

      <div className="tabs">
        {tabs.map((x) => (
          <button key={x.id} className={`tab ${tab === x.id ? 'active' : ''}`} onClick={() => setTab(x.id)}>{x.label}</button>
        ))}
      </div>

      <div className="mb">
        {tab === 'level' && <LevelBlock />}
        {tab === 'classement' && <Classement period={period} setPeriod={setPeriod} />}
        {tab === 'records' && <Records />}
        {tab === 'parTest' && <ParTest />}
        {tab === 'succes' && <Succes />}
      </div>
    </div>
  )
}

function LevelBlock() {
  const { user, level, t } = useApp()
  return (
    <div className="card">
      <div className="row wrap between">
        <div>
          <h2>{t('jeu.level')} {level.level}</h2>
          <p className="muted">{user.xp} {t('jeu.totalXp')}</p>
        </div>
        <Avatar user={user} className="avatar" />
      </div>
      <div className="mt">
        <div className="row between" style={{ marginBottom: 6 }}>
          <span className="muted" style={{ fontWeight: 700 }}>{level.into} / {level.need} XP</span>
          <span className="muted" style={{ fontWeight: 700 }}>{level.pct}%</span>
        </div>
        <div className="progress thick">
          <div style={{ width: `${level.pct}%` }}></div>
        </div>
        <p className="center muted mt" style={{ fontWeight: 700 }}>{level.need - level.into} XP {t('jeu.toNext')}</p>
      </div>
      <div className="divider" />
      <p className="muted" style={{ fontSize: 14 }}>
        <strong>{t('jeu.howXp')}</strong><br />
        ✔️ +10 XP {t('jeu.xpCorrect')}<br />
        ✔️ +25 XP {t('jeu.xpFinish')}<br />
        ✔️ +50 XP {t('jeu.xpPerfect')}<br />
        ✔️ {t('jeu.xpSucces')}
      </p>
    </div>
  )
}

function Classement({ period, setPeriod }) {
  const { user, t } = useApp()
  const [serverRows, setServerRows] = useState(null)
  const periods = [
    { v: 0, label: t('jeu.alltime') },
    { v: 7, label: t('jeu.week') },
    { v: 30, label: t('jeu.month') }
  ]
  useEffect(() => {
    let on = true
    if (user) {
      fetchLeaderboard(period).then((rows) => { if (on) setServerRows(rows && rows.length ? rows : null) })
    } else {
      setServerRows(null)
    }
    return () => { on = false }
  }, [user, period])

  // When a Supabase session exists and the shared leaderboard is reachable, show ALL
  // students (so everyone sees the same ranking + others' achievements). Otherwise fall
  // back to the local per-device data so the page still works offline / logged out.
  const remote = serverRows && serverRows.length > 0
  const rows = remote ? serverRows : rankings.all(period)

  return (
    <div className="card">
      {remote && <div className="muted" style={{ fontSize: 13, marginBottom: 10 }}>🌐 {t('jeu.liveRank')}</div>}
      <div className="tabs" style={{ marginBottom: 14 }}>
        {periods.map((p) => (
          <button key={p.v} className={`tab ${period === p.v ? 'active' : ''}`} onClick={() => setPeriod(p.v)}>{p.label}</button>
        ))}
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th><th>{t('jeu.thPlayer')}</th><th>{t('jeu.thLvl')}</th><th>{t('jeu.thXp')}</th><th>{t('jeu.thTests')}</th><th>{t('jeu.thCorrect')}</th><th>{t('jeu.thAvg')}</th><th>{t('jeu.thPoints')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className={user && r.id === user.id ? 'rank-me' : ''}>
                <td><span className="rank-medal">{medal(r.rank)}</span></td>
                <td><Link to={`/user/${r.id}`} className="user-cell"><Avatar user={r} className="avatar" />{r.name}</Link></td>
                <td><span className="chip">{r.level}</span></td>
                <td style={{ fontWeight: 700 }}>{r.xp}</td>
                <td>{r.testsCompleted}</td>
                <td>{r.correctAnswers}</td>
                <td>{r.avgPct}%</td>
                <td style={{ fontWeight: 700 }}>{r.points}</td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan="8" className="center muted">{t('jeu.noPeriod')}</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="divider" style={{ margin: '18px 0' }} />
      <h3 style={{ fontWeight: 800 }} className="mb">🏅 {t('jeu.achievOthers')}</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th><th>{t('jeu.thPlayer')}</th><th style={{ textAlign: 'right' }}>{t('jeu.succes')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const got = (r.achievements || []).filter((id) => ACHIEVEMENTS.some((a) => a.id === id))
              return (
                <tr key={r.id} className={user && r.id === user.id ? 'rank-me' : ''}>
                  <td><span className="rank-medal">{medal(r.rank)}</span></td>
                  <td><Link to={`/user/${r.id}`} className="user-cell"><Avatar user={r} className="avatar" />{r.name}</Link></td>
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {got.length === 0 ? (
                      <span className="muted">—</span>
                    ) : (
                      got.map((id) => {
                        const a = ACHIEVEMENTS.find((x) => x.id === id)
                        return <span key={id} title={a ? a.title : id} style={{ fontSize: 18, marginLeft: 4 }}>{a ? a.icon : '🏅'}</span>
                      })
                    )}
                  </td>
                </tr>
              )
            })}
            {rows.length === 0 && <tr><td colSpan="3" className="center muted">{t('jeu.noPeriod')}</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Records() {
  const { t } = useApp()
  const rec = rankings.records()
  if (!rec) return null
  const items = [
    { label: t('jeu.recMostTests'), icon: '📚', v: rec.mostTests },
    { label: t('jeu.recMostCorrect'), icon: '✅', v: rec.mostCorrect },
    { label: t('jeu.recMostPoints'), icon: '🏆', v: rec.mostPoints },
    { label: t('jeu.recHighestLevel'), icon: '🎖️', v: rec.highestLevel },
    { label: t('jeu.recMostXp'), icon: '⭐', v: rec.mostXp },
    { label: t('jeu.recMostPerfect'), icon: '🎯', v: rec.mostPerfect },
    { label: t('jeu.recBestAvg'), icon: '📊', v: rec.bestAvg }
  ]
  return (
    <div className="grid grid-stats">
      {items.map((it) => (
        <div className="card" key={it.label}>
          <div style={{ fontSize: 30 }}>{it.icon}</div>
          <div className="test-name mt">{it.v ? it.v.value : '—'}</div>
          {it.v && (
            <Link to={`/user/${it.v.user.id}`} className="row" style={{ marginTop: 8 }}>
              <Avatar user={it.v.user} className="avatar" style={{ width: 26, height: 26, fontSize: 14, borderRadius: '50%', background: 'var(--primary-soft)', display: 'grid', placeItems: 'center' }} />
              <span className="muted" style={{ fontWeight: 600, fontSize: 13 }}>{it.v.user.name}</span>
            </Link>
          )}
          <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>{it.label}</div>
        </div>
      ))}
    </div>
  )
}

function ParTest() {
  const { t: tFn } = useApp()
  const all = tests.list()
  return (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))' }}>
      {all.map((test) => {
        const rows = rankings.byTest(test.id)
        return (
          <div className="card" key={test.id}>
            <div className="test-name mb">{test.name}</div>
            {rows.length === 0 ? (
              <div className="muted" style={{ fontSize: 14 }}>{tFn('jeu.noRes')}</div>
            ) : (
              rows.slice(0, 3).map((r) => (
                <div className="row" key={r.id} style={{ padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 16 }}>{medal(r.rank)}</span>
                  <Link to={`/user/${r.id}`} className="row" style={{ flex: 1 }}>
                    <Avatar user={r} className="avatar" style={{ width: 26, height: 26, fontSize: 14, borderRadius: '50%', background: 'var(--primary-soft)', display: 'grid', placeItems: 'center' }} />
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                  </Link>
                  <span style={{ fontWeight: 800 }}>{r.best}%</span>
                </div>
              ))
            )}
            {rows.length > 3 && <Link to={`/tests/${test.id}`} className="chip mt">{tFn('seeAll')}</Link>}
          </div>
        )
      })}
    </div>
  )
}

function Succes() {
  const { user } = useApp()
  const unlocked = new Set(user.achievements || [])
  return (
    <div className="ach-grid">
      {ACHIEVEMENTS.map((a) => {
        const has = unlocked.has(a.id)
        return (
          <div key={a.id} className={`ach-item ${has ? '' : 'locked'}`} title={a.desc}>
            <div className="a-icon">{a.icon}</div>
            <div className="a-title">{a.title}</div>
            <div className="muted" style={{ fontSize: 12 }}>{a.desc}</div>
          </div>
        )
      })}
    </div>
  )
}

function medal(rank) {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  return `#${rank}`
}

