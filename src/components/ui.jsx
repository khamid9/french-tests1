import { createContext, useCallback, useContext, useState } from 'react'

const ToastCtx = createContext(() => {})

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const push = useCallback((msg, type = 'info') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, msg, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toasts">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>{t.msg}</div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

export function useToast() {
  return useContext(ToastCtx)
}

export function Loading({ text }) {
  return (
    <div className="loading">
      <div className="spinner"></div>
      {text}
    </div>
  )
}

export function Empty({ icon = '📭', text }) {
  return (
    <div className="empty">
      <div className="big">{icon}</div>
      <p>{text}</p>
    </div>
  )
}

export function LevelBadge({ level }) {
  const colors = { A1: '#22d3ee', A2: '#34d399', B1: '#fbbf24', B2: '#fb923c', C1: '#ef4444' }
  return <span className="badge" style={{ background: colors[level] || '#999' }}>{level}</span>
}

// Triggers a browser download of `content` as a text file.
export function downloadTextFile(filename, content, mime = 'text/plain') {
  const blob = new Blob([content], { type: mime + ';charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
