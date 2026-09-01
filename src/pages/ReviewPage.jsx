import { Link, useParams } from 'react-router-dom'
import { getAttemptById } from '../lib/attempt.js'
import { useApp } from '../context/AppContext.jsx'
import { LevelBadge } from '../components/ui.jsx'

export default function ReviewPage() {
  const { attemptId } = useParams()
  const { t } = useApp()
  const attempt = getAttemptById(attemptId)

  if (!attempt) {
    return <div className="container"><div className="empty"><div className="big">🤔</div><p>{t('review.notFound')}</p><Link to="/tests" className="btn primary">{t('back')}</Link></div></div>
  }

  const questions = attempt.questions
  const chosen = attempt.chosen || {}

  return (
    <div className="container fade-in" style={{ maxWidth: 720 }}>
      <div style={{ height: 24 }} />
      <div className="row wrap between">
        <h1>{t('review.title')}</h1>
        <Link to={`/result/${attemptId}`} className="chip">{t('review.backResult')}</Link>
      </div>
      <p className="muted">{attempt.testName} · {attempt.result.correct}/{attempt.result.total} · <LevelBadge level={attempt.level} /></p>
      <div className="mt mb">
        <div className="alert info">{t('review.info')}</div>
      </div>

      {questions.map((q, i) => {
        const userChoice = chosen[q.id] !== undefined ? chosen[q.id] : null
        const correct = userChoice === q.correctIndex
        const opted = q.options.find((o) => o.orig === userChoice)
        const rightOpt = q.options.find((o) => o.orig === q.correctIndex)
        return (
          <div className="card review-item mb" key={i}>
            <div className="review-q"><span>{correct ? '✅' : '❌'}</span><span>{q.text}</span></div>
            {userChoice === null ? (
              <div className="answer-box wrong">{t('review.notAnswered')}</div>
            ) : (
              <div className="answer-box wrong">
                <strong>{t('review.yourAnswer')} :</strong> {opted ? opted.text : '—'}
              </div>
            )}
            {!correct && (
              <div className="answer-box right">
                <strong>{t('review.goodAnswer')} :</strong> {rightOpt ? rightOpt.text : '—'}
              </div>
            )}
            {q.explanation && (
              <div className="explanation">
                <strong>{t('review.why')}</strong><br />{q.explanation}
              </div>
            )}
          </div>
        )
      })}

      <div className="row center" style={{ justifyContent: 'center', gap: 10, margin: '24px 0' }}>
        <Link to={`/result/${attemptId}`} className="btn ghost">{t('review.backResult2')}</Link>
        <Link to="/tests" className="btn primary">{t('result.backTests')}</Link>
      </div>
    </div>
  )
}
