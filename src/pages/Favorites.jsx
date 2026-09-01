import { useApp } from '../context/AppContext.jsx'
import { tests, profile } from '../lib/db.js'
import { useToast } from '../components/ui.jsx'
import { TestCard } from './Home.jsx'
import { Empty } from '../components/ui.jsx'

export default function Favorites() {
  const { user, refresh, t } = useApp()
  const toast = useToast()
  const all = tests.list()
  const favs = all.filter((t) => (user?.favorites || []).includes(t.id))

  const toggleFav = (id) => {
    profile.toggleFavorite(id)
    refresh()
    toast(t('fav.remove'), 'info')
  }

  return (
    <div className="container fade-in">
      <div style={{ height: 28 }} />
      <h1>{t('fav.title')}</h1>
      <p className="muted">{t('fav.sub')}</p>
      {favs.length === 0 ? (
        <Empty icon="❤️" text={t('fav.empty')} />
      ) : (
        <div className="grid grid-tests mt mb">
          {favs.map((t) => <TestCard key={t.id} t={t} onFav={toggleFav} />)}
        </div>
      )}
    </div>
  )
}
