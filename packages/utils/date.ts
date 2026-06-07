/** 简易日期格式化，支持 YYYY MM DD HH mm ss */
export function formatDate(date: Date, pattern = 'YYYY-MM-DD'): string {
  const pad = (n: number): string => String(n).padStart(2, '0')
  return pattern
    .replace('YYYY', String(date.getFullYear()))
    .replace('MM', pad(date.getMonth() + 1))
    .replace('DD', pad(date.getDate()))
    .replace('HH', pad(date.getHours()))
    .replace('mm', pad(date.getMinutes()))
    .replace('ss', pad(date.getSeconds()))
}

/** 解析 YYYY-MM-DD 字符串为 Date，失败返回 null */
export function parseDate(value: string): Date | null {
  if (!value) return null
  const match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(value.trim())
  if (!match) return null
  const [, y, m, d] = match
  const date = new Date(Number(y), Number(m) - 1, Number(d))
  return Number.isNaN(date.getTime()) ? null : date
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}
