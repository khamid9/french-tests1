// Topic knowledge for the "theme explanation" modal shown before starting a test.
// Every test gets an explanation SPECIFIC to its own topic — derived from its real
// questions, answers and per-question explanations (never a universal boilerplate).
// The same source drives the download export, so explanations are consistent.

import { tests } from './db.js'
import { topicRu } from './topics_ru.js'

function clean(s) {
  return String(s || '').replace(/\s+/g, ' ').trim()
}

function firstSentence(s) {
  const t = clean(s)
  if (!t) return ''
  const m = t.match(/^(.+?[.!?])(\s|$)/)
  return m ? m[1] : t
}

export function buildTopic(test, lang) {
  if (!test) return null
  const qs = tests.questions(test.id) || []
  const title = clean(test.name) || 'Le thème'
  const intro = clean(test.description) || `Ce test porte sur « ${title} ».`

  // Prefer curated, detailed Russian content for known grammar topics.
  if (lang === 'ru' && topicRu[test.id]) {
    const ru = topicRu[test.id]
    return {
      title,
      intro: ru.intro || intro,
      rules: ru.rules || [],
      whenToUse: ru.whenToUse || [],
      examples: ru.examples || []
    }
  }

  // Rules = distinct explanations actually present in this test (its own grammar points).
  const seen = new Set()
  const rules = []
  for (const q of qs) {
    if (!q.explanation) continue
    const s = firstSentence(q.explanation)
    const key = s.toLowerCase()
    if (!s || seen.has(key)) continue
    seen.add(key)
    rules.push(s)
    if (rules.length >= 4) break
  }
  if (rules.length === 0 && intro) rules.push(firstSentence(intro))

  // When to use = extracted from explanations that talk about usage ("On utilise X pour…",
  // "exprimer", "sert à", "- action …", etc.). Fallback reuses intro/rules.
  const whenToUse = []
  for (const q of qs) {
    if (!q.explanation) continue
    const s = clean(q.explanation)
    if (/utilise .* pour|exprim|sert à|action (terminée|achevée|en cours)|du passé|habitude|représente|remplace/i.test(s)) {
      const w = firstSentence(s)
      if (w && !whenToUse.includes(w)) whenToUse.push(w)
    }
    if (whenToUse.length >= 3) break
  }
  while (whenToUse.length < 2 && rules.length > whenToUse.length) whenToUse.push(rules[whenToUse.length])

  // Examples = two real questions + their correct answer text.
  const examples = []
  for (const q of qs) {
    const rightText = q.options && q.options[q.correctIndex] != null ? q.options[q.correctIndex] : ''
    examples.push({
      question: clean(q.text),
      answer: rightText,
      explanation: firstSentence(q.explanation)
    })
    if (examples.length >= 2) break
  }

  return { title, intro, rules, whenToUse, examples }
}
