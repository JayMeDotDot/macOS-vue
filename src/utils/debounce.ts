export default function <T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 16
): T {
  let preTimeout: number | null
  return ((...args: any[]) => {
    if (preTimeout) clearTimeout(preTimeout)
    preTimeout = window.setTimeout(() => {
      fn(...args)
      preTimeout = null
    }, delay)
  }) as any
}
