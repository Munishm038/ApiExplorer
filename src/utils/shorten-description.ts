export function shortenDescription(
  description: string,
  maxLength = 50,
): string {
  if (!description) return '';
  return description.length > maxLength
    ? `${description.slice(0, maxLength).trim()}...`
    : description;
}
