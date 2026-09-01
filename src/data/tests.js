import { demoQuestions } from './demoData.js'
import { themesA1_1 } from './programmeA1a.js'
import { themesA1b } from './programmeA1b.js'
import { themesA1c } from './programmeA1c.js'
import { themesA2 } from './programmeA2.js'
import { themesA2b } from './programmeA2c.js'
import { themesB1 } from './programmeB1.js'
import { themesB1b } from './programmeB1b.js'
import { themesB1c } from './programmeB1c.js'

// Helper to spread a question list into per-test question objects with stable ids.
function makeQuestions(testId, list, marks) {
  return list.map((item, i) => ({
    id: `${testId}-q${i + 1}`,
    testId,
    text: item.q,
    options: item.options,
    correctIndex: item.correctIndex,
    explanation: item.explanation
  }))
}

// Convert a curriculum theme into a full test object.
function themeToTest(theme, index) {
  return {
    id: theme.id,
    name: theme.name,
    description: theme.description,
    categoryId: theme.categoryId,
    level: theme.level,
    strictMode: theme.strictMode,
    timer: theme.timer,
    shuffle: theme.shuffle,
    createdAt: `2026-0${theme.level === 'B1' ? 3 : 2}-${String(index % 27 + 1).padStart(2, '0')}`,
    plays: 0,
    questions: makeQuestions(theme.id, theme.questions, 10)
  }
}

const curriculumThemes = [
  ...themesA1_1,
  ...themesA1b,
  ...themesA1c,
  ...themesA2,
  ...themesA2b,
  ...themesB1,
  ...themesB1b,
  ...themesB1c
]

const curriculumTests = curriculumThemes.map((theme, i) => themeToTest(theme, i))

export const demoTests = [
  {
    id: 'test-present',
    name: 'Présent de l\u2019indicatif',
    description: 'Conjugue les verbes au présent de l\u2019indicatif.',
    categoryId: 'conjugaison',
    level: 'A1',
    strictMode: true,
    timer: false,
    shuffle: true,
    createdAt: '2026-08-01',
    plays: 0,
    questions: makeQuestions('test-present', demoQuestions['test-present'], 10)
  },
  {
    id: 'test-passe-compose',
    name: 'Le passé composé',
    description: 'Mets les verbes au passé composé (auxiliaire avoir et être).',
    categoryId: 'conjugaison',
    level: 'A2',
    strictMode: false,
    timer: false,
    shuffle: true,
    createdAt: '2026-08-05',
    plays: 0,
    questions: makeQuestions('test-passe-compose', demoQuestions['test-passe-compose'], 10)
  },
  {
    id: 'test-vocabulaire-maison',
    name: 'Vocabulaire de la maison',
    description: 'Le vocabulaire de la maison et du logement.',
    categoryId: 'vocabulaire-basique',
    level: 'A1',
    strictMode: false,
    timer: false,
    shuffle: true,
    createdAt: '2026-08-10',
    plays: 0,
    questions: makeQuestions('test-vocabulaire-maison', demoQuestions['test-vocabulaire-maison'], 10)
  },
  {
    id: 'test-articles',
    name: 'Articles et prépositions',
    description: 'Choisis le bon article défini ou indéfini.',
    categoryId: 'articles',
    level: 'A2',
    strictMode: true,
    timer: false,
    shuffle: true,
    createdAt: '2026-08-12',
    plays: 0,
    questions: makeQuestions('test-articles', demoQuestions['test-articles'], 10)
  },
  {
    id: 'test-vocabulaire-aliments',
    name: 'Vocabulaire de la nourriture',
    description: 'Le vocabulaire de la nourriture et des aliments.',
    categoryId: 'vocabulaire-basique',
    level: 'A1',
    strictMode: false,
    timer: false,
    shuffle: true,
    createdAt: '2026-08-18',
    plays: 0,
    questions: makeQuestions('test-vocabulaire-aliments', demoQuestions['test-vocabulaire-aliments'], 10)
  },
  ...curriculumTests
]
