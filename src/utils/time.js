export function timeAgo(dateStr) {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return ''

  const now = new Date()
  const diff = Math.floor((now - date) / 1000)

  if (diff < 0) return 'justo ahora'
  if (diff < 60) return 'hace unos segundos'
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} h`

  const days = Math.floor(diff / 86400)
  if (days < 30) return `hace ${days} d`
  if (days < 365) return `hace ${Math.floor(days / 30)} mes${Math.floor(days / 30) > 1 ? 'es' : ''}`
  return `hace ${Math.floor(days / 365)} a${Math.floor(days / 365) > 1 ? 'ños' : 'ño'}`
}
