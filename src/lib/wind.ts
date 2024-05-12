export const getWindDirection = (angle?: number): String => {
  if (!Number.isInteger(angle) || angle === undefined) return 'N/A'
  const directions = ['↓ N', '↙ NE', '← E', '↖ SE', '↑ S', '↗ SW', '→ W', '↘ NW']
  return directions[Math.round(angle / 45) % 8]
}
