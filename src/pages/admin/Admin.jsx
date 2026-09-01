import { useState } from 'react'
import { Link } from 'react-router-dom'
import { admin, categories, tests } from '../../lib/db.js'
import { useApp } from '../../context/AppContext.jsx'
import { useToast } from '../../components/ui.jsx'

export default function Admin() {
  const [t, setT] = useState('dashboard')
  const set = (x) => setT(x)
  return (
    <div className="container fade-in" style={{ maxWidth: 900 }}>
      <div style={{ height: 24 }} />
      <h1>Panneau d'administration</h1>
      <div className="tabs">
        {[
          ['dashboard', 'Dashboard'],
          ['users', 'Utilisateurs'],
          ['access', 'Accès'],
          ['categories', 'Catégories'],
          ['tests', 'Tests'],
          ['stats', 'Statistiques']
        ].map(([id, label]) => (
          <button key={id} className={`tab ${t === id ? 'active' : ''}`} onClick={() => set(id)}>{label}</button>
        ))}
      </div>
      <div className="mb">
        {t === 'dashboard' && <Dashboard />}
        {t === 'users' && <Users />}
        {t === 'access' && <Access />}
        {t === 'categories' && <Categories />}
        {t === 'tests' && <TestsAdmin />}
        {t === 'stats' && <Stats />}
      </div>
    </div>
  )
}

function Dashboard() {
  const s = admin.stats()
  const tiles = [
    { icon: '👥', label: 'Utilisateurs', v: s.users },
    { icon: '📝', label: 'Tests', v: s.tests },
    { icon: '❓', label: 'Questions', v: s.questions },
    { icon: '▶️', label: 'Tests passés', v: s.attempts },
    { icon: '📊', label: 'Résultat moyen', v: s.avg + '%' }
  ]
  return <div className="grid grid-stats">
    {tiles.map((x) => (
      <div className="stat-tile" key={x.label}>
        <span className="icon">{x.icon}</span>
        <span className="value">{x.v}</span>
        <span className="label">{x.label}</span>
      </div>
    ))}
  </div>
}

function Users() {
  const [, force] = useState(0)
  const { user: me } = useApp()
  const toast = useToast()
  const users = admin.users()
  const toggle = (u) => {
    admin.setBlocked(u.id, !admin.isBlocked(u.id))
    force((x) => x + 1)
    toast(admin.isBlocked(u.id) ? 'Utilisateur bloqué' : 'Utilisateur débloqué', 'info')
  }
  const fmtExpiry = (u) => {
    if (u.accessStatus === 'blocked') return 'Bloqué'
    if (!u.accessExpires) return 'Sans limite'
    if (u.accessStatus === 'expired') return 'Expiré'
    if (u.accessStatus === 'pending') return 'En attente'
    return `Jusqu\u2019au ${new Date(u.accessExpires).toLocaleDateString('fr-FR')}`
  }
  return (
    <div className="card">
      <div className="table-wrap">
        <table>
          <thead><tr><th>Utilisateur</th><th>Rôle</th><th>Niv.</th><th>XP</th><th>Tests</th><th>Accès</th><th>Statut</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td><Link className="user-cell" to={`/user/${u.id}`}><span className="avatar">{u.avatar}</span>{u.name}</Link></td>
                <td><span className="chip">{u.role}</span></td>
                <td>{u.level}</td>
                <td>{u.xp}</td>
                <td>{u.stats.testsCompleted}</td>
                <td>{fmtExpiry(u)}</td>
                <td>
                  {u.id !== me?.id ? (
                    <button className={`btn sm ${admin.isBlocked(u.id) ? 'green' : 'danger'}`} onClick={() => toggle(u)}>
                      {admin.isBlocked(u.id) ? 'Débloquer' : 'Bloquer'}
                    </button>
                  ) : <span className="muted">toi</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const MONTHS = [1, 3, 6, 12]

function Access() {
  const [, force] = useState(0)
  const { user: me } = useApp()
  const toast = useToast()
  const [months, setMonths] = useState(3)
  const users = admin.users()
  const pending = admin.renewalRequests()

  const grant = (u) => {
    admin.grantAccess(u.id, months)
    force((x) => x + 1)
    toast(`Accès accordé pour ${months} mois à ${u.name}`, 'success')
  }
  const deny = (u) => {
    admin.denyRenewal(u.id)
    force((x) => x + 1)
    toast(`Demande de ${u.name} refusée`, 'info')
  }

  return (
    <div>
      <div className="card mb">
        <h3>Demandes de prolongation ({pending.length})</h3>
        <p className="muted" style={{ fontSize: 13 }}>Ces utilisateurs ont besoin de votre approbation pour utiliser la plateforme.</p>
        {pending.length === 0 && <p className="muted mt">Aucune demande en attente. ✅</p>}
        <div className="row wrap mt" style={{ gap: 8 }}>
          {[1, 3, 6, 12].map((m) => (
            <button key={m} className={`btn sm ${months === m ? 'primary' : 'ghost'}`} onClick={() => setMonths(m)}>{m} mois</button>
          ))}
        </div>
        {pending.length > 0 && (
          <div className="table-wrap mt">
            <table>
              <thead><tr><th>Utilisateur</th><th>Demande reçue</th><th>Expiré le</th><th>Actions</th></tr></thead>
              <tbody>
                {pending.map((u) => (
                  <tr key={u.id}>
                    <td><Link className="user-cell" to={`/user/${u.id}`}><span className="avatar">{u.avatar}</span>{u.name}</Link></td>
                    <td>{new Date(u.renewalRequestedAt).toLocaleDateString('fr-FR')}</td>
                    <td>{new Date(u.accessExpires).toLocaleDateString('fr-FR')}</td>
                    <td>
                      <div className="row">
                        <button className="btn sm green" onClick={() => grant(u)}>Approuver</button>
                        <button className="btn sm danger" onClick={() => deny(u)}>Refuser</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card">
        <h3>Gestion des accès</h3>
        <p className="muted" style={{ fontSize: 13 }}>Définissez ou modifiez la durée d\u2019accès de chaque utilisateur.</p>
        <div className="table-wrap mt">
          <table>
            <thead><tr><th>Utilisateur</th><th>Statut</th><th>Accès jusqu\u2019au</th><th>Actions</th></tr></thead>
            <tbody>
              {users.map((u) => {
                const isMe = u.id === me?.id
                return (
                  <tr key={u.id}>
                    <td><Link className="user-cell" to={`/user/${u.id}`}><span className="avatar">{u.avatar}</span>{u.name}</Link></td>
                    <td><span className={`chip ${u.accessStatus === 'active' ? 'badge' : ''}`} style={u.accessStatus === 'active' ? { background: 'var(--green)' } : undefined}>
                      {u.accessStatus === 'active' ? 'Actif' : u.accessStatus === 'blocked' ? 'Bloqué' : u.accessStatus === 'pending' ? 'En attente' : 'Expiré'}
                    </span></td>
                    <td>{u.accessExpires ? new Date(u.accessExpires).toLocaleDateString('fr-FR') : 'Sans limite'}</td>
                    <td>
                      {!isMe && u.role !== 'admin' ? (
                        <div className="row">
                          <button className="btn sm ghost" onClick={() => { admin.grantAccess(u.id, months); force((x) => x + 1); toast(`Accès défini : ${months} mois`, 'success') }}>
                            +{months} mois
                          </button>
                          <button className="btn sm ghost" onClick={() => { admin.setUnlimited(u.id); force((x) => x + 1); toast('Accès illimité', 'info') }}>∞</button>
                          <button className="btn sm danger" onClick={() => { admin.suspendNow(u.id); force((x) => x + 1); toast('Accès suspendu', 'info') }}>Suspendre</button>
                        </div>
                      ) : <span className="muted">—</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Categories() {
  const [, force] = useState(0)
  const cats = categories.list()
  const toast = useToast()
  const [name, setName] = useState('')
  const [color, setColor] = useState('#6366f1')
  const [icon, setIcon] = useState('🗂️')
  const [editing, setEditing] = useState(null)
  const [eName, setEName] = useState('')

  const create = () => {
    if (!name.trim()) { toast('Nom requis', 'error'); return }
    admin.createCategory(name.trim(), color, icon || '🗂️')
    setName(''); force((x) => x + 1); toast('Catégorie créée', 'success')
  }
  const remove = (id) => { admin.deleteCategory(id); force((x) => x + 1); toast('Catégorie supprimée', 'info') }
  const startEdit = (c) => { setEditing(c.id); setEName(c.name) }
  const saveEdit = () => { admin.updateCategory(editing, { name: eName }); setEditing(null); force((x) => x + 1); toast('Enregistré', 'success') }

  return (
    <div>
      <div className="card mb">
        <h3>Nouvelle catégorie</h3>
        <div className="form-grid mt">
          <div className="field"><label>Nom</label><input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="field"><label>Couleur</label><input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ height: 44, padding: 4 }} /></div>
          <div className="field"><label>Icône</label><input value={icon} onChange={(e) => setIcon(e.target.value)} /></div>
        </div>
        <button className="btn sm primary mt" onClick={create}>Ajouter</button>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Nom</th><th>Couleur</th><th>Actions</th></tr></thead>
            <tbody>
              {cats.map((c) => (
                <tr key={c.id}>
                  <td className="row">{c.icon} {editing === c.id ? <input value={eName} onChange={(e) => setEName(e.target.value)} style={{ padding: 8, border: '1px solid var(--border)', borderRadius: 8, background: 'var(--card)', color: 'var(--text)' }} /> : c.name}</td>
                  <td><span style={{ display: 'inline-block', width: 22, height: 22, borderRadius: 6, background: c.color }}></span></td>
                  <td>
                    {editing === c.id ? (
                      <div className="row"><button className="btn sm green" onClick={saveEdit}>OK</button><button className="btn sm ghost" onClick={() => setEditing(null)}>Annuler</button></div>
                    ) : (
                      <div className="row"><button className="btn sm ghost" onClick={() => startEdit(c)}>Éditer</button><button className="btn sm danger" onClick={() => remove(c.id)}>Suppr.</button></div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function TestsAdmin() {
  const [, force] = useState(0)
  const cats = categories.list()
  const toast = useToast()
  const [view, setView] = useState('list')
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(blank())
  const all = tests.list()

  function blank(o = {}) {
    return { name: '', description: '', categoryId: cats[0]?.id, level: 'A1', strictMode: false, timer: false, shuffle: true, ...o }
  }

  const openForm = (id) => {
    if (id) {
      const t = tests.byId(id)
      setForm({ id, name: t.name, description: t.description, categoryId: t.categoryId, level: t.level, strictMode: t.strictMode, timer: t.timer, shuffle: t.shuffle })
    } else setForm(blank())
    setEditId(id || null)
    setView('form')
  }

  const save = (e) => {
    e.preventDefault()
    if (!form.name.trim()) { toast('Nom requis', 'error'); return }
    if (editId) admin.updateTest(editId, form)
    else admin.createTest(form)
    setView('list'); force((x) => x + 1); toast('Test enregistré', 'success')
  }

  const remove = (id) => { admin.deleteTest(id); force((x) => x + 1); toast('Test supprimé', 'info') }

  if (view === 'form') {
    return (
      <div className="card">
        <h3>{editId ? 'Éditer le test' : 'Nouveau test'}</h3>
        <form onSubmit={save}>
          <div className="field"><label>Nom</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="field"><label>Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="form-grid">
            <div className="field"><label>Catégorie</label>
              <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                {cats.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
              </select>
            </div>
            <div className="field"><label>Niveau</label>
              <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
                {['A1', 'A2', 'B1', 'B2', 'C1'].map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <div className="row wrap mt mb">
            <label className="check"><input type="checkbox" checked={form.strictMode} onChange={(e) => setForm({ ...form, strictMode: e.target.checked })} /> Protection stricte</label>
            <label className="check"><input type="checkbox" checked={form.timer} onChange={(e) => setForm({ ...form, timer: e.target.checked })} /> Minuteur</label>
            <label className="check"><input type="checkbox" checked={form.shuffle} onChange={(e) => setForm({ ...form, shuffle: e.target.checked })} /> Ordre aléatoire</label>
          </div>
          <div className="row">
            <button className="btn primary" type="submit">Enregistrer</button>
            <button className="btn ghost" type="button" onClick={() => setView('list')}>Annuler</button>
          </div>
        </form>
        {editId && <QuestionsAdmin testId={editId} />}
      </div>
    )
  }

  return (
    <div className="card">
      <button className="btn sm primary mb" onClick={() => openForm(null)}>+ Nouveau test</button>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Test</th><th>Catégorie</th><th>Niveau</th><th>Questions</th><th>Strict</th><th>Actions</th></tr></thead>
          <tbody>
            {all.map((t) => (
              <tr key={t.id}>
                <td style={{ fontWeight: 700 }}>{t.name}</td>
                <td>{t.category.icon} {t.category.name}</td>
                <td>{t.level}</td>
                <td>{t.numQuestions}</td>
                <td>{t.strictMode ? '🛡️' : '—'}</td>
                <td>
                  <div className="row">
                    <button className="btn sm ghost" onClick={() => openForm(t.id)}>Éditer</button>
                    <button className="btn sm danger" onClick={() => remove(t.id)}>Suppr.</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function QuestionsAdmin({ testId }) {
  const [, force] = useState(0)
  const toast = useToast()
  const [creating, setCreating] = useState(false)
  const [qForm, setQForm] = useState(blankQ())
  const qs = tests.questions(testId) || []

  function blankQ() {
    return { text: '', options: ['', ''], correctIndex: 0, explanation: '' }
  }
  const setOpt = (i, v) => {
    const opts = [...qForm.options]; opts[i] = v; setQForm({ ...qForm, options: opts })
  }
  const addOpt = () => setQForm({ ...qForm, options: [...qForm.options, ''] })
  const remOpt = (i) => setQForm({ ...qForm, options: qForm.options.filter((_, x) => x !== i) })

  const saveQ = () => {
    if (!qForm.text.trim() || qForm.options.some((o) => !o.trim()) || qForm.options.length < 2) {
      toast('Remplis la question et au moins 2 options', 'error'); return
    }
    admin.addQuestion(testId, { text: qForm.text, options: qForm.options, correctIndex: qForm.correctIndex, explanation: qForm.explanation })
    setQForm(blankQ()); setCreating(false); force((x) => x + 1); toast('Question ajoutée', 'success')
  }
  const rmQ = (qid) => { admin.deleteQuestion(testId, qid); force((x) => x + 1); toast('Question supprimée', 'info') }

  return (
    <div className="mt">
      <div className="divider" />
      <div className="row between">
        <h3>Questions ({qs.length})</h3>
        <button className="btn sm ghost" onClick={() => setCreating(!creating)}>{creating ? 'Fermer' : '+ Ajouter'}</button>
      </div>

      {creating && (
        <div className="card mt">
          <div className="field"><label>Question</label><textarea value={qForm.text} onChange={(e) => setQForm({ ...qForm, text: e.target.value })} /></div>
          <label className="muted" style={{ fontSize: 13, fontWeight: 700 }}>Options (coche la bonne réponse)</label>
          <div className="mt">
            {qForm.options.map((o, i) => (
              <div className="row" key={i} style={{ marginBottom: 8 }}>
                <input type="radio" name="correct" checked={qForm.correctIndex === i} onChange={() => setQForm({ ...qForm, correctIndex: i })} />
                <input value={o} onChange={(e) => setOpt(i, e.target.value)} style={{ flex: 1, padding: 9, border: '1.5px solid var(--border)', borderRadius: 10, background: 'var(--card)', color: 'var(--text)' }} placeholder={`Option ${i + 1}`} />
                {qForm.options.length > 2 && <button className="btn sm danger" onClick={() => remOpt(i)}>✕</button>}
              </div>
            ))}
          </div>
          <button className="btn sm ghost mt" onClick={addOpt}>+ Option</button>
          <div className="field mt"><label>Explication (pourquoi ?)</label><textarea value={qForm.explanation} onChange={(e) => setQForm({ ...qForm, explanation: e.target.value })} /></div>
          <button className="btn primary sm mt" onClick={saveQ}>Ajouter la question</button>
        </div>
      )}

      <div className="mt">
        {qs.map((q) => (
          <div className="card mb" key={q.id} style={{ padding: 14 }}>
            <div className="row between">
              <div style={{ fontWeight: 700 }}>{q.text}</div>
              <button className="btn sm danger" onClick={() => rmQ(q.id)}>Suppr.</button>
            </div>
            <div className="row wrap mt">
              {q.options.map((o, i) => (
                <span key={i} className={`chip ${i === q.correctIndex ? 'badge' : ''}`} style={i === q.correctIndex ? { background: 'var(--green)' } : undefined}>{i === q.correctIndex ? '✓ ' : ''}{o}</span>
              ))}
            </div>
            <div className="muted mt" style={{ fontSize: 13 }}>{q.explanation}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Stats() {
  const [, force] = useState(0)
  const s = admin.stats()
  return (
    <div>
      <div className="grid grid-stats mb">
        <div className="stat-tile"><span className="value">{s.attempts}</span><span className="label">Tests passés</span></div>
        <div className="stat-tile"><span className="value">{s.avg}%</span><span className="label">Résultat moyen</span></div>
      </div>
    </div>
  )
}
