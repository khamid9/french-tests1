import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { tests, submissions } from '../lib/db.js'
import { useApp } from '../context/AppContext.jsx'
import { saveAttempt } from '../lib/attempt.js'
import { useToast } from '../components/ui.jsx'
import { submitResult } from '../lib/supabase.js'

export default function TestRun() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, refresh, t } = useApp()
  const toast = useToast()
  const test = tests.byId(id)

  const [questions, setQuestions] = useState(null)
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  // Instant feedback: maps q.id -> { picked, correct } once the question is answered.
  const [resolved, setResolved] = useState({})
  const [finished, setFinished] = useState(false)
  const [aborted, setAborted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null)
  const [timedOut, setTimedOut] = useState(false)
  const answersRef = useRef(answers)
  answersRef.current = answers
  const sentRef = useRef(false)

  // Prepare shuffled questions + shuffled options once.
  // NOTE: `test` is recreated by tests.byId() on every render, so it must NOT be a dependency —
  // depending on it would cause an infinite re-render loop. We depend on the stable `id` only.
  useEffect(() => {
    const t = tests.byId(id)
    if (!t) return
    const qs = tests.questions(id).map((q) => {
      const indexed = q.options.map((opt, i) => ({ i, opt }))
      // shuffle options
      const shuf = shuffle([...indexed])
      return {
        ...q,
        options: shuf.map((x) => ({ text: x.opt, orig: x.i, key: x.i }))
      }
    })
    const processed = t.shuffle ? shuffle(qs) : qs
    setQuestions(processed)
  }, [id])

  // Countdown timer when the test has timer=true (60s per question).
  // Same rule: depend on stable values (id, questions, finished), not the fresh test object.
  useEffect(() => {
    const t = tests.byId(id)
    if (!t || !t.timer || !questions || questions.length === 0 || finished) return
    const totalSec = questions.length * 60
    setTimeLeft(totalSec)
    const int = setInterval(() => {
      setTimeLeft((cur) => {
        if (cur === null) return null
        if (cur <= 1) {
          clearInterval(int)
          if (!sentRef.current) {
            sentRef.current = true
            setFinished(true)
            setTimedOut(true)
            submit(answersRef.current, true)
          }
          return 0
        }
        return cur - 1
      })
    }, 1000)
    return () => clearInterval(int)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, questions, finished])

  async function submit(answersMap, force = false) {
    // Server-side verification
    const res = submissions.submit({ testId: id, answers: answersMap })
    if (!res) {
      toast(t('run.submitError'), 'error')
      return
    }
    if (res.error) {
      toast(res.error, 'error')
      return
    }
    const attemptId = 'a-' + Date.now()
    saveAttempt({
      attemptId,
      testId: id,
      testName: test?.name,
      level: test?.level,
      category: test?.category,
      result: res.result,
      gained: res.gained,
      questions: questions.map((q) => ({
        id: q.id,
        text: q.text,
        options: q.options,
        explanation: q.explanation,
        correctIndex: q.correctIndex
      })),
      chosen: answersMap
    })
    // Sync to the shared leaderboard when a Supabase session exists (no-op otherwise).
    ;(async () => {
      const r = await submitResult({ testId: id, result: res.result })
      console.log('[submitResult]', r)
      if (r && r.error && r.error !== 'not-configured') toast(`[sb] ${r.error}`, 'error')
    })()
    refresh()
    navigate(`/result/${attemptId}`, { state: { justSubmitted: !force } })
  }

  useEffect(() => {
    if (finished) return

    // ===== Anti-cheat protection =====
    // Applied to EVERY test so the same protection works everywhere.
    if (!test || !questions || questions.length === 0) return

    function abortStrict() {
      if (finished || sentRef.current) return
      sentRef.current = true
      setFinished(true)
      setAborted(true)
      // If no answers yet -> nothing to save; else save what was done as aborted
      const had = Object.keys(answersRef.current).length
      if (had > 0) {
        saveAttemptStrict(answersRef.current)
      }
    }

    function saveAttemptStrict(map) {
      if (!questions || questions.length === 0) return
      const res = submissions.submit({ testId: id, answers: map })
      if (res && !res.error) {
        const attemptId = 'a-' + Date.now()
        saveAttempt({
          attemptId, testId: id, testName: test?.name, level: test?.level, category: test?.category,
          result: res.result, gained: res.gained, aborted: true,
          questions: questions.map((q) => ({ id: q.id, text: q.text, options: q.options, explanation: q.explanation, correctIndex: q.correctIndex })),
          chosen: map
        })
        ;(async () => {
          const r = await submitResult({ testId: id, result: res.result })
          console.log('[submitResult-abort]', r)
          if (r && r.error && r.error !== 'not-configured') toast(`[sb] ${r.error}`, 'error')
        })()
        refresh()
      }
    }

    // Only flag visibility loss and real navigation away. Small threshold to avoid false positives.
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') abortStrict()
    }
    document.addEventListener('visibilitychange', onVisibility)
    const onBeforeUnload = (e) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', onBeforeUnload)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [id, finished, questions, refresh])

  if (!test) return <div className="container"><div className="empty"><p>{t('run.notFound')}</p><Link to="/tests" className="btn primary sm">{t('back')}</Link></div></div>
  if (!questions) return <div className="container"><div className="empty"><div className="spinner"></div><p>{t('run.preparing')}</p></div></div>
  if (questions.length === 0) return <div className="container"><div className="empty"><div className="big">📝</div><p>{t('testinfo.noQuestions')}</p><Link to="/tests" className="btn primary sm">{t('testinfo.backTests')}</Link></div></div>

  const total = questions.length
  const q = questions[idx]

  function choose(key, orig) {
    // key = display option index, orig = original index.
    // Once a question is resolved (answered), its answer is locked — no re-picking.
    if (resolved[q.id]) return
    const correct = orig === q.correctIndex
    setAnswers((a) => ({ ...a, [q.id]: orig }))
    setResolved((r) => ({ ...r, [q.id]: { picked: orig, correct } }))
  }

  const answered = Object.keys(answers).length
  const allAnswered = answered === total

  function next() {
    if (idx < total - 1) setIdx(idx + 1)
    else finishFlow()
  }
  function prev() {
    if (idx > 0) setIdx(idx - 1)
  }

  const curResolved = resolved[q.id]

  function finishFlow() {
    if (sentRef.current) return
    sentRef.current = true
    setFinished(true)
    submit(answersRef.current)
  }

  if (aborted) {
    const had = Object.keys(answersRef.current).length
    return (
      <div className="run-wrap fade-in">
        <div className="card center">
          <div style={{ fontSize: 48 }}>🛡️</div>
          <h1>{t('run.abortedTitle')}</h1>
          <p className="muted">{t('run.abortedMsg')}</p>
          {had > 0 && <p className="mt">✔ {t('run.saved')}</p>}
          <div className="row center" style={{ justifyContent: 'center', marginTop: 16 }}>
            <Link to="/tests" className="btn primary">{t('testinfo.backTests')}</Link>
          </div>
        </div>
      </div>
    )
  }

  if (timedOut) {
    const had = Object.keys(answersRef.current).length
    return (
      <div className="run-wrap fade-in">
        <div className="card center">
          <div style={{ fontSize: 48 }}>⏱️</div>
          <h1>{t('run.timeoutTitle')}</h1>
          <p className="muted">{t('run.timeoutMsg')}</p>
          {had > 0 && <p className="mt">✔ {t('run.saved')}</p>}
          <div className="row center" style={{ justifyContent: 'center', marginTop: 16 }}>
            <Link to="/tests" className="btn primary">{t('testinfo.backTests')}</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="run-wrap fade-in">
      {/* Progress */}
      <div className="progress-qa">
        <button className="icon-btn" onClick={() => navigate('/tests')} title={t('run.quit')}>✕</button>
        <div className="progress"><div style={{ width: `${((idx + 1) / total) * 100}%` }}></div></div>
        <span className="count">{idx + 1}/{total}</span>
        {test.timer && timeLeft !== null && (
          <span className={`count timer ${timeLeft <= 30 ? 'timer-low' : ''}`}>⏱ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
        )}
      </div>

      <div className="card run-card">
        <div className="muted mb" style={{ fontSize: 13, fontWeight: 700 }}>{test.name}</div>
        <h2 style={{ marginBottom: 20 }}>{q.text}</h2>

        {q.options.map((opt, i) => {
          const selected = answers[q.id] === opt.orig
          const locked = !!curResolved
          let cls = 'answer-opt'
          if (selected) cls += ' selected'
          if (locked) {
            cls += ' locked'
            if (opt.orig === q.correctIndex) cls += ' correct'
            else if (selected) cls += ' wrong'
          }
          return (
            <button key={i} className={cls}
              onClick={() => choose(i, opt.orig)}>
              <span className="answer-letter">{String.fromCharCode(65 + i)}</span>
              <span>{opt.text}</span>
              {locked && opt.orig === q.correctIndex && <span className="answer-tick">✔</span>}
            </button>
          )
        })}

        {curResolved && (
          <div className={`feedback ${curResolved.correct ? 'good' : 'bad'}`}>
            <strong>{curResolved.correct ? `✅ ${t('run.correct')}` : `❌ ${t('run.incorrect')}`}</strong>
            {!curResolved.correct && (
              <div>{t('run.yourAnswer')} : <strong>{q.options.find((o) => o.orig === curResolved.picked)?.text}</strong></div>
            )}
            <div>{t('run.goodAnswer')} : <strong>{q.options.find((o) => o.orig === q.correctIndex)?.text}</strong></div>
            {q.explanation && <div className="mt" style={{ marginTop: 8 }}>💡 {q.explanation}</div>}
          </div>
        )}
      </div>

      <div className="row between mt">
        <button className="btn ghost" disabled={idx === 0} onClick={prev}>{t('run.prev')}</button>
        <div className="muted" style={{ fontSize: 13 }}>{answered}/{total} {t('run.answered')}</div>
        {idx < total - 1 ? (
          <button className="btn" onClick={next}>{t('run.next')}</button>
        ) : (
          <button className={allAnswered ? 'btn green' : 'btn'} onClick={finishFlow}>{allAnswered ? `${t('run.finish')} ✔` : `${t('run.finish')} (${answered}/${total})`}</button>
        )}
      </div>
      {test && <p className="center muted mt" style={{ fontSize: 12 }}>🛡️ {t('run.strictMode')}</p>}
    </div>
  )
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
