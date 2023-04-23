export const dateToString = (
  date: Date,
  options?: Record<string, string>,
): string => {
  const defaultOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  return date.toLocaleString('fr-FR', options ?? defaultOptions)
}
