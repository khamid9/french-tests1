import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { tests, categories } from '../lib/db.js'
import { LevelBadge } from '../components/ui.jsx'
import { useToast } from '../components/ui.jsx'
import { useApp } from '../context/AppContext.jsx'
import { profile } from '../lib/db.js'
import { TestCard } from './Home.jsx'

export default function TestsPage() {
  const { user, refresh, t } = useApp()
  const toast = useToast()
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  const [cat, setCat] = useState(params.get('cat') || '')
  const [level, setLevel] = useState(params.get('level') || '')

  const all = tests.list()
  const cats = categories.list()
  const levelsPresent = ['A1', 'A2', 'B1', 'B2', 'C1'].filter((l) => all.some((t) => t.level === l))

  const filtered = useMemo(() => {
    return all.filter((t) => {
      if (q && !t.name.toLowerCase().includes(q.toLowerCase())) return false
      if (cat && t.categoryId !== cat) return false
      if (level && t.level !== level) return false
      return true
    })
  }, [all, q, cat, level])

  const setQ2 = (v) => {
    setQ(v)
    const p = new URLSearchParams(params)
    v ? p.set('q', v) : p.delete('q')
    setParams(p, { replace: true })
  }
  const setCat2 = (v) => {
    setCat(v)
    const p = new URLSearchParams(params)
    v ? p.set('cat', v) : p.delete('cat')
    setParams(p, { replace: true })
  }
  const setLevel2 = (v) => {
    setLevel(v)
    const p = new URLSearchParams(params)
    v ? p.set('level', v) : p.delete('level')
    setParams(p, { replace: true })
  }

  const toggleFav = (id) => {
    if (!user) { toast(t('fav.needLogin'), 'error'); return }
    const wasFav = user?.favorites?.includes(id)
    profile.toggleFavorite(id)
    refresh()
    toast(wasFav ? t('fav.remove') : t('fav.add'), 'info')
  }

  return (
    <div className="container fade-in">
      <div style={{ height: 28 }} />
      <h1>{t('tests.title')}</h1>
      <p className="muted">{t('tests.sub')}</p>

      <form className="searchbar mt" onSubmit={(e) => e.preventDefault()}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input value={q} onChange={(e) => setQ2(e.target.value)} placeholder={t('home.searchPlaceholder')} />
      </form>

      {/* Category filter */}
      <div className="filter-row">
        <button className={`filter-pill ${!cat ? 'active' : ''}`} onClick={() => setCat2('')}>{t('tests.allCats')}</button>
        {cats.map((c) => (
          <button key={c.id} className={`filter-pill ${cat === c.id ? 'active' : ''}`} onClick={() => setCat2(cat === c.id ? '' : c.id)}>
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      {/* Level filter */}
      <div className="filter-row">
        <button className={`filter-pill ${!level ? 'active' : ''}`} onClick={() => setLevel2('')}>{t('tests.allLevels')}</button>
        {levelsPresent.map((lvl) => (
          <button key={lvl} className={`filter-pill ${level === lvl ? 'active' : ''}`} onClick={() => setLevel2(level === lvl ? '' : lvl)}>
            <LevelBadge level={lvl} /> {lvl}
          </button>
        ))}
      </div>

      <div className="grid grid-tests mt mb">
        {filtered.map((t) => <TestCard key={t.id} t={t} onFav={toggleFav} />)}
      </div>

      {filtered.length === 0 && (
        <div className="empty"><div className="big">🔍</div><p>{t('tests.empty')}</p></div>
      )}
    </div>
  )
}
