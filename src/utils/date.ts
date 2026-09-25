export function formatCreatedAt(value: string): string {
  return new Intl.DateTimeFormat('uk-UA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}
