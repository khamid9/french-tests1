import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { tests, categories } from '../lib/db.js'
import { LevelBadge } from '../components/ui.jsx'

export default function Home() {
  const { user, rank, level, t } = useApp()
  const navigate = useNavigate()
  const all = tests.list()
  const cats = categories.list()
  const levelsPresent = ['A1', 'A2', 'B1', 'B2', 'C1'].filter((l) => all.some((t) => t.level === l))

  const [q, setQ] = useState('')

  const goSearch = (e) => {
    e.preventDefault()
    navigate(q ? `/tests?q=${encodeURIComponent(q)}` : '/tests')
  }

  return (
    <div className="container fade-in">
      <section className="hero">
        <h1>{t('home.heroTitle')} 🇫🇷</h1>
        <p>{t('home.heroSub')}</p>
      </section>

      {user && (
        <section className="card" style={{ marginBottom: 8 }}>
          <div className="row wrap between">
            <div className="row">
              <span style={{ fontSize: 40 }}>{user.avatar}</span>
              <div>
                <div style={{ fontWeight: 800 }}>{t('home.hello')}, {user.name} !</div>
                <div className="row wrap">
                  <span className="chip">{t('home.level')} {level.level}</span>
                  <span className="chip">{user.xp} XP</span>
                  <span className="chip">{rank ? `#${rank}` : '—'} {t('nav.classement').toLowerCase()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt">
            <div className="row between muted" style={{ fontSize: 12, fontWeight: 700 }}>
              <span>{level.into} / {level.need} XP</span>
              <span>{level.need - level.into} XP {t('home.untilNextLevel')}</span>
            </div>
            <div className="progress mt" style={{ marginTop: 6 }}>
              <div style={{ width: `${level.pct}%` }}></div>
            </div>
          </div>
        </section>
      )}

      {/* Search */}
      <form onSubmit={goSearch} className="searchbar mt mb">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('home.searchPlaceholder')} />
        <button className="btn sm" type="submit">{t('home.search')}</button>
      </form>

      {/* Stats */}
      <div className="grid grid-stats mb">
        <div className="stat-tile"><span className="icon">📚</span><span className="value">{all.length}</span><span className="label">{t('home.testsDispo')}</span></div>
        <div className="stat-tile"><span className="icon">🏷️</span><span className="value">{cats.length}</span><span className="label">{t('home.categories')}</span></div>
        {user ? (
          <>
            <div className="stat-tile"><span className="icon">✔️</span><span className="value">{user.stats.correctAnswers}</span><span className="label">{t('home.bonnes')}</span></div>
            <div className="stat-tile"><span className="icon">⭐</span><span className="value">{user.xp}</span><span className="label">{t('home.xpTotal')}</span></div>
          </>
        ) : (
          <div className="stat-tile"><span className="icon">💡</span><span className="value">{levelsPresent.length}</span><span className="label">{t('home.umiNiveaux')}</span></div>
        )}
      </div>

      {/* Levels */}
      <div className="section-title"><h2>{t('home.levelsTitle')}</h2></div>
      <div className="grid grid-cats mb">
        {levelsPresent.map((lvl) => (
          <Link key={lvl} to={`/tests?level=${lvl}`} className="cat-card">
            <LevelBadge level={lvl} />
            <div className="cat-name">{t('home.level')} {lvl}</div>
            <div className="muted" style={{ fontSize: 12 }}>{all.filter((x) => x.level === lvl).length} {t('home.tests')}</div>
          </Link>
        ))}
      </div>

      {/* Categories */}
      <div className="section-title"><h2>{t('home.catsTitle')}</h2></div>
      <div className="grid grid-cats mb">
        {cats.map((c) => (
          <Link key={c.id} to={`/tests?cat=${c.id}`} className="cat-card" style={{ borderColor: c.color + '44' }}>
            <span className="cat-icon">{c.icon}</span>
            <div className="cat-name">{c.name}</div>
            <div className="muted" style={{ fontSize: 12 }}>{all.filter((x) => x.categoryId === c.id).length} {t('home.tests')}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function TestCard({ t, onFav }) {
  const { user, t: _t } = useApp()
  const fav = user?.favorites?.includes(t.id)
  const tr = _t
  return (
    <Link to={`/tests/${t.id}`} className="card test-card">
      <div className="test-head">
        <div className="test-name">{t.name}</div>
        <div className="row" style={{ gap: 6 }}>
          <LevelBadge level={t.level} />
          <button className="icon-btn" style={{ width: 30, height: 30, fontSize: 15 }}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onFav && onFav(t.id) }}
            title={tr('card.fav')}> {fav ? '❤️' : '🤍'} </button>
        </div>
      </div>
      <p className="muted" style={{ fontSize: 13 }}>{t.description}</p>
      <div className="test-meta">
        <span className="chip" style={{ borderColor: (t.category.color || '#999') + '55', color: t.category.color }}>{t.category.icon} {t.category.name}</span>
        <span className="chip">📝 {t.numQuestions} {tr('home.questions')}</span>
        {true && <span className="chip">🛡️ {tr('home.strict')}</span>}
      </div>
      <div className="test-stats">
        <span>👥 {t.plays}</span>
        {t.best ? <span>🏅 {t.best.pct}%</span> : <span>⏳ {tr('home.new')}</span>}
      </div>
    </Link>
  )
}
