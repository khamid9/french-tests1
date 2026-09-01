import { useApp } from '../context/AppContext.jsx'
import { profile } from '../lib/db.js'
import { Empty, useToast } from '../components/ui.jsx'
import { Link } from 'react-router-dom'

export default function ErrorsPage() {
  const { user, t, refresh } = useApp()
  const toast = useToast()
  const errors = user ? profile.errors() : []

  if (errors.length === 0) {
    return (
      <div className="container fade-in">
        <div style={{ height: 28 }} />
        <h1>{t('errors.title')}</h1>
        <p className="muted">{t('errors.sub')}</p>
        <Empty icon="🎉" text={t('errors.empty')} />
      </div>
    )
  }

  const remove = (id) => {
    profile.removeError(id)
    refresh()
    toast(t('errors.removed'), 'info')
  }

  return (
    <div className="container fade-in">
      <div style={{ height: 28 }} />
      <h1>{t('errors.title')}</h1>
      <p className="muted">{errors.length} {t('errors.toReview')}</p>

      <div className="mt mb">
        {errors.map((e) => {
          const q = e.question
          const right = q.options[q.correctIndex]
          return (
            <div className="card review-item mb" key={e.id}>
              <div className="review-q"><span>❌</span><span>{q.text}</span></div>
              <div className="answer-box wrong"><strong>{t('errors.yourAnswer')} :</strong> {e.chosen !== null ? q.options[e.chosen] : t('review.notAnswered')}</div>
              <div className="answer-box right"><strong>{t('errors.goodAnswer')} :</strong> {right}</div>
              {q.explanation && <div className="explanation"><strong>{t('errors.why')}</strong><br />{q.explanation}</div>}
              <div className="row mt wrap">
                <button className="btn ghost sm" onClick={() => remove(e.id)}>✔ {t('errors.mastered')}</button>
                <Link className="chip" to={`/tests/${e.testId}`}>{t('errors.redo')} →</Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
