import { useState } from 'react'
import { NavLink, Outlet, Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import Avatar from './Avatar.jsx'

export default function Layout() {
  const { user } = useApp()
  const loc = useLocation()
  const suspended = user && user.accessStatus && user.accessStatus !== 'active' && loc.pathname !== '/acces'
  return (
    <>
      <Header />
      <main style={{ minHeight: 'calc(100vh - var(--header-h))' }}>
        {suspended ? <Navigate to="/acces" replace /> : <Outlet />}
      </main>
      <Footer />
    </>
  )
}

function Header() {
  const { user, logout, theme, setTheme, t } = useApp()
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const nav = useNavigate()

  const items = user ? (
    <>
      <NavLink to="/">{t('nav.home')}</NavLink>
      <NavLink to="/tests">{t('nav.tests')}</NavLink>
      <NavLink to="/jeu">{t('nav.jeu')}</NavLink>
      <NavLink to="/profil">{t('nav.profil')}</NavLink>
      <NavLink to="/favoris">{t('nav.favoris')}</NavLink>
      <NavLink to="/erreurs">{t('nav.erreurs')}</NavLink>
    </>
  ) : (
    <>
      <NavLink to="/">{t('nav.home')}</NavLink>
      <NavLink to="/tests">{t('nav.tests')}</NavLink>
      <NavLink to="/profil">{t('nav.author')}</NavLink>
    </>
  )

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="brand"><span className="logo">🇫🇷</span> Français Test</Link>
          <nav className="nav">{items}</nav>
          <div className="header-right">
            <button className="icon-btn theme-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title={t('header.theme')} aria-label={t('header.theme')}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            {user ? (
              <div className="avatar-group">
                <button className="avatar-chip" onClick={() => nav('/profil')}>
                  <Avatar user={user} className="avatar" />
                  <span className="nav-name">{user.name}</span>
                </button>
                <button className="icon-btn caret" onClick={() => setMenu(!menu)} aria-label={t('header.profileMenu')}>
                  ▾
                </button>
                {menu && (
                  <div className="menu-pop">
                    <Link to="/parametres">{t('nav.settings')}</Link>
                    <button onClick={() => { logout(); setMenu(false); nav('/') }}>{t('nav.logout')}</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/profil" className="btn sm login-btn"><span className="login-text">{t('nav.author')}</span><span className="login-ico">👤</span></Link>
            )}
            <button className="icon-btn hamburger" onClick={() => setOpen(!open)} aria-label={t('header.menu')}>☰</button>
          </div>
        </div>
      </header>
      {open && (
        <div className="mobile-nav">
          {items}
          {user && (
            <button className="mobile-logout" onClick={() => { logout(); setOpen(false); nav('/') }}>{t('nav.logout')}</button>
          )}
        </div>
      )}
    </>
  )
}

function Footer() {
  const { t } = useApp()
  return (
    <div className="footer">
      © 2026 Français Test — {t('footer.tagline')} 🇫🇷
    </div>
  )
}
