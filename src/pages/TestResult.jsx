import { Link, useParams } from 'react-router-dom'
import { getAttemptById } from '../lib/attempt.js'
import { useApp } from '../context/AppContext.jsx'
import { LevelBadge } from '../components/ui.jsx'

export default function TestResult() {
  const { attemptId } = useParams()
  const { user, t } = useApp()
  const attempt = getAttemptById(attemptId)

  if (!attempt || !attempt.result) {
    return (
      <div className="container" style={{ maxWidth: 600 }}>
        <div className="empty"><div className="big">🤔</div><p>{t('result.notFound')}</p><Link to="/tests" className="btn primary">{t('result.backTests')}</Link></div>
      </div>
    )
  }

  const { result, gained } = attempt
  const pctColor = result.pct >= 80 ? 'var(--green)' : result.pct >= 50 ? 'var(--accent)' : 'var(--red)'

  const levelBefore = Math.floor((Math.max(0, user.xp) - result.xp) / 300) + 1
  const levelAfter = user.level

  return (
    <div className="container fade-in" style={{ maxWidth: 640 }}>
      <div style={{ height: 24 }} />
      <div className="card result-hero">
        {gained && gained.length > 0 && <div className="toast" style={{ position: 'static', marginBottom: 12 }}>🎉 {t('result.newSucces')} : {gained.map((g) => g.title).join(', ')}</div>}
        <div className="row center" style={{ justifyContent: 'center', gap: 8 }}>
          <h1 style={{ marginBottom: 4 }}>{t('result.done')} {attempt.aborted ? '⚠️' : '🎉'}</h1>
        </div>
        {attempt.aborted && <p className="muted">{t('result.aborted')}</p>}

        <div className="result-score" style={{ color: pctColor }}>{result.correct} / {result.total}</div>
        <div className="result-pct">{result.pct}%</div>

        <div className="result-rows">
          <div className="stat-tile"><span className="value" style={{ color: 'var(--green)', fontSize: '1.4rem' }}>✅ {result.correct}</span><span className="label">{t('result.correctLabel')}</span></div>
          <div className="stat-tile"><span className="value" style={{ color: 'var(--red)', fontSize: '1.4rem' }}>❌ {result.wrong}</span><span className="label">{t('result.wrongLabel')}</span></div>
          <div className="stat-tile"><span className="value" style={{ color: 'var(--accent)', fontSize: '1.4rem' }}>⭐ +{result.xp}</span><span className="label">{t('result.xpGained')}</span></div>
          <div className="stat-tile"><span className="value" style={{ color: 'var(--primary)', fontSize: '1.4rem' }}>🏆 +{result.points}</span><span className="label">{t('result.pointsWon')}</span></div>
        </div>

        {levelAfter > levelBefore && (
          <div className="alert success center" style={{ textAlign: 'center' }}>🎊 {t('result.levelUp')} {levelAfter}.</div>
        )}

        <div className="divider" />
        <div className="row center wrap" style={{ justifyContent: 'center', gap: 10 }}>
          <Link to={`/review/${attemptId}`} className="btn ghost">{t('result.seeAnswers')}</Link>
          <Link to={`/run/${attempt.testId}`} className="btn primary">{t('result.restart')}</Link>
          <Link to="/tests" className="btn ghost">{t('result.backTests')}</Link>
        </div>
        <div className="muted mt center" style={{ fontSize: 13 }}>{attempt.testName} · <LevelBadge level={attempt.level} /></div>
      </div>
    </div>
  )
}
