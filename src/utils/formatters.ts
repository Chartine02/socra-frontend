export function formatDate(value: Date | string | null): string {
  if (!value) {
    return 'Not yet'
  }

  const date = value instanceof Date ? value : new Date(value)

  return new Intl.DateTimeFormat('en-RW', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`
}

export function formatDuration(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) {
    return `${minutes} min`
  }

  return `${hours}h ${minutes}m`
}