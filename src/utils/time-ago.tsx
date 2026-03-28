export const timeAgo = (dateString: string): string => {
  const now = new Date()
  const past = new Date(dateString)

  let diff = Math.floor((now.getTime() - past.getTime()) / 1000)

  const years = Math.floor(diff / 31536000)
  diff %= 31536000

  const months = Math.floor(diff / 2592000)
  diff %= 2592000

  const days = Math.floor(diff / 86400)
  diff %= 86400

  const hours = Math.floor(diff / 3600)
  diff %= 3600

  const minutes = Math.floor(diff / 60)
  const seconds = diff % 60

  if (years > 0) return `${years}y ${months}mo ago`
  if (months > 0) return `${months}mo ${days}d ago`
  if (days > 0) return `${days}d ${hours}h ago`
  if (hours > 0) return `${hours}h ${minutes}m ago`
  if (minutes > 0) return `${minutes}m ${seconds}s ago`

  return `${seconds}s ago`
}
