import { describe, expect, it } from 'vitest'
import { darkenColor, isHexColor, lightenColor, normalizeHexColor } from '../color'

describe('颜色工具', () => {
  it('识别十六进制颜色', () => {
    expect(isHexColor('#a8d5ba')).toBe(true)
    expect(isHexColor('#abc')).toBe(true)
    expect(isHexColor('a8d5ba')).toBe(false)
  })

  it('规范化短色值', () => {
    expect(normalizeHexColor('#abc', '#000000')).toBe('#aabbcc')
    expect(normalizeHexColor('错误颜色', '#000000')).toBe('#000000')
  })

  it('生成亮色和深色', () => {
    expect(lightenColor('#000000', 50)).toBe('#808080')
    expect(darkenColor('#ffffff', 50)).toBe('#808080')
  })
})

