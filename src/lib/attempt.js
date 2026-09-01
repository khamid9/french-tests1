// attemptId helpers — store full attempt data so result + review can render.
const LS_ATT = 'ft_current_attempt'

export function saveAttempt(data) {
  localStorage.setItem(LS_ATT, JSON.stringify(data))
}
export function getAttempt() {
  try { return JSON.parse(localStorage.getItem(LS_ATT)) } catch { return null }
}
export function clearAttempt() {
  localStorage.removeItem(LS_ATT)
}
export function getAttemptById(id) {
  const a = getAttempt()
  return a && a.attemptId === id ? a : null
}
