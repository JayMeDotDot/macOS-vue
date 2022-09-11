export default function <T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 16
): T {
  const pre = 0
  return ((...args: any[]) => {
    const now = Date.now()
    if (now - pre > delay) {
      fn(...args)
    }
  }) as any
}
