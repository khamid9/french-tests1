export default function Avatar({ user, className = 'avatar', style }) {
  const raw = user && user.avatar
  const photo = user && (user.avatarUrl || (/^(https?:|data:image)/i.test(raw || '')))
  if (photo) {
    return <span className={className} style={style}><img src={photo} alt="" /></span>
  }
  const fallback = raw && raw !== 'G' ? raw : '🙂'
  return <span className={className} style={style}>{fallback}</span>
}