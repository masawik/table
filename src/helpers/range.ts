export function range(size: number, startAt = 0): Array<number> {
  return [...Array(size).fill(null)].map((_, i) => i + startAt)
}