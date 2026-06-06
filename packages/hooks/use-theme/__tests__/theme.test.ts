import { describe, expect, it } from 'vitest'
import { createTheme, defaultThemeInput, themeToCssVars } from '..'

describe('主题系统', () => {
  it('创建默认主题', () => {
    const theme = createTheme()

    expect(theme.primary).toBe(defaultThemeInput.primary)
    expect(theme.secondary).toBe(defaultThemeInput.secondary)
    expect(theme.accent).toBe(defaultThemeInput.accent)
  })

  it('过滤非法主题色', () => {
    const theme = createTheme({
      primary: 'green',
      secondary: '#abc',
      accent: '#fff3c7',
    })

    expect(theme.primary).toBe(defaultThemeInput.primary)
    expect(theme.secondary).toBe('#aabbcc')
  })

  it('转换为 CSS 变量', () => {
    const vars = themeToCssVars(createTheme())

    expect(vars['--my-color-primary']).toBe('#a8d5ba')
    expect(vars['--my-color-accent']).toBe('#fff3c7')
  })
})

