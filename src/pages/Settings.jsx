import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { profile } from '../lib/db.js'
import { useToast } from '../components/ui.jsx'

const AVATARS = ['🙂', '😎', '🦊', '🦋', '🐻', '🐱', '🐶', '🦁', '🐼', '🦄', '🐸', '🐙', '🤖', '👩‍🎤', '🧑‍🚀', '🫀']

export default function Settings() {
  const { user, theme, setTheme, notifications, setNotifications, refresh, t, lang, setLang } = useApp()
  const toast = useToast()

  const [name, setName] = useState(user.name)
  const [avatar, setAvatar] = useState(user.avatar)
  const [curPw, setCurPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [conPw, setConPw] = useState('')

  const saveName = (e) => {
    e.preventDefault()
    const res = profile.updateName(name)
    if (res.error) toast(res.error, 'error')
    else { refresh(); toast(t('settings.nameUpdated'), 'success') }
  }

  const saveAvatar = (a) => {
    setAvatar(a)
    profile.updateAvatar(a)
    refresh()
    toast(t('settings.avatarUpdated'), 'success')
  }

  const savePw = (e) => {
    e.preventDefault()
    if (newPw !== conPw) { toast(t('settings.pwMismatch'), 'error'); return }
    const res = profile.changePassword({ current: curPw, next: newPw })
    if (res.error) toast(res.error, 'error')
    else { toast(t('settings.pwChanged'), 'success'); setCurPw(''); setNewPw(''); setConPw('') }
  }

  return (
    <div className="container fade-in" style={{ maxWidth: 620 }}>
      <div style={{ height: 28 }} />
      <h1>{t('settings.title')}</h1>

      {/* Appearance */}
      <div className="card mb">
        <h3>{t('settings.appearance')}</h3>
        <div className="mt">
          <label className="check"><input type="radio" name="theme" checked={theme === 'light'} onChange={() => setTheme('light')} /> {t('settings.themeLight')}</label>
          <label className="check" style={{ marginTop: 8 }}><input type="radio" name="theme" checked={theme === 'dark'} onChange={() => setTheme('dark')} /> {t('settings.themeDark')}</label>
        </div>
        <div className="divider" />
        <h3>{t('settings.langTitle')}</h3>
        <div className="mt">
          <label className="check"><input type="radio" name="lang" checked={lang === 'fr'} onChange={() => setLang('fr')} /> {t('language.fr')}</label>
          <label className="check" style={{ marginTop: 8 }}><input type="radio" name="lang" checked={lang === 'ru'} onChange={() => setLang('ru')} /> {t('language.ru')}</label>
        </div>
        <div className="divider" />
        <h3>{t('settings.notifications')}</h3>
        <div className="mt">
          <label className="check"><input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} /> {t('settings.notifEnable')}</label>
        </div>
      </div>

      {/* Profile */}
      <div className="card mb">
        <h3>{t('settings.name')}</h3>
        <form onSubmit={saveName} className="row mt wrap">
          <input style={{ flex: 1, padding: 11, border: '1.5px solid var(--border)', borderRadius: 12, background: 'var(--card)', color: 'var(--text)', fontSize: 15 }}
            value={name} onChange={(e) => setName(e.target.value)} />
          <button className="btn sm primary" type="submit">{t('save')}</button>
        </form>

        <div className="divider" />
        <h3>{t('settings.avatar')}</h3>
        <div className="row wrap mt">
          {AVATARS.map((a) => (
            <button key={a} onClick={() => saveAvatar(a)}
              style={{ fontSize: 26, width: 48, height: 48, borderRadius: 12, border: avatar === a ? '2.5px solid var(--primary)' : '1.5px solid var(--border)', background: 'var(--card)', cursor: 'pointer' }}>
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Password */}
      <div className="card mb">
        <h3>{t('settings.pwTitle')}</h3>
        <form onSubmit={savePw} className="mt">
          <div className="field"><label>{t('settings.pwCurrent')}</label><input type="password" value={curPw} onChange={(e) => setCurPw(e.target.value)} /></div>
          <div className="field"><label>{t('settings.pwNew')}</label><input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} /></div>
          <div className="field"><label>{t('settings.pwConfirm')}</label><input type="password" value={conPw} onChange={(e) => setConPw(e.target.value)} /></div>
          <button className="btn primary block" type="submit">{t('settings.changePw')}</button>
        </form>
      </div>
    </div>
  )
}
