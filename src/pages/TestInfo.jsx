import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { tests, rankings, profile } from '../lib/db.js'
import { buildTopic } from '../lib/topics.js'
import { useApp } from '../context/AppContext.jsx'
import { LevelBadge, downloadTextFile } from '../components/ui.jsx'
import { useToast } from '../components/ui.jsx'

export default function TestInfo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, refresh, t, lang } = useApp()
  const toast = useToast()
  const test = tests.byId(id)
  const testRank = rankings.byTest(id)
  const [showTopic, setShowTopic] = useState(false)

  if (!test) {
    return <div className="container"><div className="empty"><div className="big">🤷</div><p>{t('testinfo.notFound')}</p><Link to="/tests" className="btn primary sm">{t('testinfo.backTests')}</Link></div></div>
  }

  const topic = buildTopic(test, lang)
  const fav = user?.favorites?.includes(id)
  const cat = test.category

  const start = () => {
    if (!user) { navigate('/auth'); return }
    if (test.numQuestions === 0) { toast(t('testinfo.noQuestions'), 'error'); return }
    setShowTopic(false)
    navigate(`/run/${id}`)
  }

  const openModal = () => {
    if (!user) { navigate('/auth'); return }
    if (test.numQuestions === 0) { toast(t('testinfo.noQuestions'), 'error'); return }
    setShowTopic(true)
  }

  const download = () => {
    const text = tests.exportText(id)
    if (!text) { toast(t('testinfo.noQuestions'), 'error'); return }
    downloadTextFile(`${test.name.replace(/[^\p{L}\p{N}_-]+/gu, '_')}.txt`, text)
    toast(t('testinfo.downloaded'), 'success')
  }

  const toggleFav = () => {
    if (!user) { toast(t('fav.needLogin'), 'error'); return }
    profile.toggleFavorite(id)
    refresh()
    toast(fav ? t('fav.remove') : t('fav.add'), 'info')
  }

  return (
    <div className="container fade-in" style={{ maxWidth: 800 }}>
      <div style={{ height: 28 }} />
      <div className="row wrap">
        <Link to="/tests" className="chip">{t('testinfo.back')}</Link>
        <button className="chip" onClick={toggleFav}>{fav ? `❤️ ${t('testinfo.favRemove')}` : `🤍 ${t('testinfo.favAdd')}`}</button>
        <button className="chip" onClick={download}>⬇️ {t('testinfo.download')}</button>
      </div>

      <div className="card mt">
        <div className="row wrap between">
          <div>
            <div className="row wrap" style={{ gap: 8, marginBottom: 8 }}>
              <LevelBadge level={test.level} />
              <span className="chip" style={{ borderColor: (cat.color || '#999') + '55', color: cat.color }}>{cat.icon} {cat.name}</span>
            </div>
            <h1>{test.name}</h1>
            <p className="muted">{test.description}</p>
          </div>
        </div>

        <div className="divider" />
        <div className="grid grid-stats mb">
          <div className="stat-tile"><span className="value">{test.numQuestions}</span><span className="label">{t('testinfo.questionsLabel')}</span></div>
          <div className="stat-tile"><span className="value">👥 {test.plays}</span><span className="label">{t('testinfo.plays')}</span></div>
          <div className="stat-tile"><span className="value">{test.best ? `${test.best.pct}%` : '—'}</span><span className="label">{t('testinfo.yourBest')}</span></div>
          <div className="stat-tile"><span className="value">🛡️</span><span className="label">{t('testinfo.strict')}</span></div>
        </div>

        <button className="btn primary block" style={{ fontSize: 16, padding: 14 }} onClick={openModal}>{t('testinfo.start')}</button>
        {!user && <p className="center muted" style={{ fontSize: 13, marginTop: 10 }}>{t('testinfo.loginToSave')}</p>}
      </div>

      {/* Classement par test */}
      <div className="section-title"><h2>{t('testinfo.rankTitle')}</h2></div>
      <div className="card">
        {testRank.length === 0 ? (
          <div className="empty"><div className="big">🏅</div><p>{t('testinfo.noResults')}</p></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>{t('testinfo.thRank')}</th><th>{t('testinfo.thPlayer')}</th><th style={{ textAlign: 'right' }}>{t('testinfo.thBest')}</th></tr></thead>
              <tbody>
                {testRank.map((r) => (
                  <tr key={r.id} className={user && r.id === user.id ? 'rank-me' : ''}>
                    <td><span className="rank-medal">{medal(r.rank)}</span></td>
                    <td><Link to={`/user/${r.id}`} className="user-cell"><span className="avatar">{r.avatar}</span>{r.name}</Link></td>
                    <td style={{ textAlign: 'right', fontWeight: 800 }}>{r.best}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showTopic && topic && (
        <div className="modal-overlay" onClick={() => setShowTopic(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <div className="modal-title">{topic.title}</div>
                <div className="muted">{topic.intro}</div>
              </div>
              <button className="chip" style={{ alignSelf: 'flex-start' }} onClick={() => setShowTopic(false)}>✕</button>
            </div>
            <div className="modal-body">
              {topic.rules.length > 0 && (
                <div className="topic-block">
                  <h4>📏 {t('testinfo.explainRules')}</h4>
                  <ul>{topic.rules.map((r, i) => <li key={i}>{r}</li>)}</ul>
                </div>
              )}
              {topic.whenToUse.length > 0 && (
                <div className="topic-block">
                  <h4>🕐 {t('testinfo.explainWhen')}</h4>
                  <ul>{topic.whenToUse.map((w, i) => <li key={i}>{w}</li>)}</ul>
                </div>
              )}
              {topic.examples.length > 0 && (
                <div className="topic-block">
                  <h4>✏️ {t('testinfo.explainExamples')}</h4>
                  {topic.examples.map((ex, i) => (
                    <div className="topic-example" key={i}>
                      <div>{ex.question}</div>
                      <div className="topic-answer">✔ {ex.answer}</div>
                      {ex.explanation && <div className="muted" style={{ fontSize: 13 }}>{ex.explanation}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="btn primary block" style={{ fontSize: 15, padding: 13 }} onClick={start}>{t('testinfo.explainStart')}</button>
          </div>
        </div>
      )}
    </div>
  )
}

function medal(rank) {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  return `#${rank}`
}
