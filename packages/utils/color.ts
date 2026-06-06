const HEX_COLOR_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i
const SHORT_HEX_LENGTH = 4
const FULL_HEX_LENGTH = 7
const HEX_RADIX = 16
const RGB_MAX = 255
const PERCENT_MAX = 100

interface RgbColor {
  red: number
  green: number
  blue: number
}

export function isHexColor(value: string): boolean {
  return HEX_COLOR_PATTERN.test(value)
}

export function normalizeHexColor(value: string, fallback: string): string {
  if (!isHexColor(value)) {
    return fallback
  }

  if (value.length === SHORT_HEX_LENGTH) {
    const [, red, green, blue] = value
    return `#${red}${red}${green}${green}${blue}${blue}`.toLowerCase()
  }

  if (value.length === FULL_HEX_LENGTH) {
    return value.toLowerCase()
  }

  return fallback
}

export function mixColor(color: string, mixWith: string, weight: number): string {
  const normalizedWeight = clamp(weight, 0, PERCENT_MAX) / PERCENT_MAX
  const base = hexToRgb(color)
  const target = hexToRgb(mixWith)

  return rgbToHex({
    red: Math.round(base.red * (1 - normalizedWeight) + target.red * normalizedWeight),
    green: Math.round(base.green * (1 - normalizedWeight) + target.green * normalizedWeight),
    blue: Math.round(base.blue * (1 - normalizedWeight) + target.blue * normalizedWeight),
  })
}

export function lightenColor(color: string, weight: number): string {
  return mixColor(color, '#ffffff', weight)
}

export function darkenColor(color: string, weight: number): string {
  return mixColor(color, '#000000', weight)
}

function hexToRgb(color: string): RgbColor {
  const normalized = normalizeHexColor(color, '#000000').slice(1)
  const numberValue = Number.parseInt(normalized, HEX_RADIX)

  return {
    red: (numberValue >> 16) & RGB_MAX,
    green: (numberValue >> 8) & RGB_MAX,
    blue: numberValue & RGB_MAX,
  }
}

function rgbToHex(color: RgbColor): string {
  const red = toHexPart(color.red)
  const green = toHexPart(color.green)
  const blue = toHexPart(color.blue)

  return `#${red}${green}${blue}`
}

function toHexPart(value: number): string {
  return clamp(Math.round(value), 0, RGB_MAX).toString(HEX_RADIX).padStart(2, '0')
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

