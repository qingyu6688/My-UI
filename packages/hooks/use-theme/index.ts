import { readonly, ref } from 'vue'
import { defaultThemeInput, semanticThemeTokens, THEME_STORAGE_KEY } from '../../constants/theme'
import { darkenColor, lightenColor, normalizeHexColor } from '../../utils/color'

export interface ThemeInput {
  primary?: string
  secondary?: string
  accent?: string
}

export interface ThemeTokens {
  primary: string
  primaryHover: string
  primaryActive: string
  primaryLight3: string
  primaryLight5: string
  primaryLight7: string
  primaryLight9: string
  secondary: string
  secondaryLight5: string
  secondaryLight8: string
  accent: string
  accentLight5: string
  accentLight8: string
}

export { defaultThemeInput }

const currentTheme = ref<ThemeTokens>(createTheme(defaultThemeInput))

export function createTheme(input: ThemeInput = {}): ThemeTokens {
  const primary = normalizeHexColor(input.primary ?? defaultThemeInput.primary, defaultThemeInput.primary)
  const secondary = normalizeHexColor(
    input.secondary ?? defaultThemeInput.secondary,
    defaultThemeInput.secondary,
  )
  const accent = normalizeHexColor(input.accent ?? defaultThemeInput.accent, defaultThemeInput.accent)

  return {
    primary,
    primaryHover: lightenColor(primary, 18),
    primaryActive: darkenColor(primary, 16),
    primaryLight3: lightenColor(primary, 30),
    primaryLight5: lightenColor(primary, 50),
    primaryLight7: lightenColor(primary, 70),
    primaryLight9: lightenColor(primary, 90),
    secondary,
    secondaryLight5: lightenColor(secondary, 50),
    secondaryLight8: lightenColor(secondary, 80),
    accent,
    accentLight5: lightenColor(accent, 50),
    accentLight8: lightenColor(accent, 80),
  }
}

export function themeToCssVars(theme: ThemeTokens): Record<string, string> {
  return {
    '--my-color-primary': theme.primary,
    '--my-color-primary-hover': theme.primaryHover,
    '--my-color-primary-active': theme.primaryActive,
    '--my-color-primary-light-3': theme.primaryLight3,
    '--my-color-primary-light-5': theme.primaryLight5,
    '--my-color-primary-light-7': theme.primaryLight7,
    '--my-color-primary-light-9': theme.primaryLight9,
    '--my-color-secondary': theme.secondary,
    '--my-color-secondary-light-5': theme.secondaryLight5,
    '--my-color-secondary-light-8': theme.secondaryLight8,
    '--my-color-accent': theme.accent,
    '--my-color-accent-light-5': theme.accentLight5,
    '--my-color-accent-light-8': theme.accentLight8,
    '--my-color-success': semanticThemeTokens.success,
    '--my-color-warning': semanticThemeTokens.warning,
    '--my-color-danger': semanticThemeTokens.danger,
    '--my-color-info': semanticThemeTokens.info,
    '--my-text-color-primary': semanticThemeTokens.textPrimary,
    '--my-text-color-regular': semanticThemeTokens.textRegular,
    '--my-text-color-secondary': semanticThemeTokens.textSecondary,
    '--my-bg-color-page': semanticThemeTokens.bgPage,
    '--my-bg-color': semanticThemeTokens.bgBase,
    '--my-bg-color-soft': semanticThemeTokens.bgSoft,
    '--my-border-color': semanticThemeTokens.borderBase,
    '--my-border-color-light': semanticThemeTokens.borderLight,
    '--my-fill-color-light': semanticThemeTokens.fillLight,
    '--my-radius-base': '6px',
    '--my-radius-small': '4px',
    '--my-radius-round': '999px',
    '--my-font-size-small': '13px',
    '--my-font-size-base': '14px',
    '--my-font-size-large': '16px',
    '--my-transition-duration': '0.2s',
    '--my-shadow-light': '0 8px 24px rgba(38, 51, 43, 0.08)',
  }
}

export function applyTheme(theme: ThemeTokens, target: HTMLElement | null = getDefaultThemeTarget()): void {
  if (!target) {
    return
  }

  Object.entries(themeToCssVars(theme)).forEach(([name, value]) => {
    target.style.setProperty(name, value)
  })
}

export function saveTheme(theme: ThemeTokens): void {
  if (typeof localStorage === 'undefined') {
    return
  }

  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme))
}

export function loadTheme(): ThemeTokens {
  if (typeof localStorage === 'undefined') {
    return createTheme(defaultThemeInput)
  }

  const cachedTheme = localStorage.getItem(THEME_STORAGE_KEY)

  if (!cachedTheme) {
    return createTheme(defaultThemeInput)
  }

  try {
    return createTheme(JSON.parse(cachedTheme) as ThemeInput)
  } catch {
    localStorage.removeItem(THEME_STORAGE_KEY)
    return createTheme(defaultThemeInput)
  }
}

export function exportTheme(): string {
  return JSON.stringify(currentTheme.value, null, 2)
}

export function importTheme(themeJson: string): ThemeTokens {
  const nextTheme = createTheme(JSON.parse(themeJson) as ThemeInput)
  setCurrentTheme(nextTheme)
  return nextTheme
}

export function resetTheme(): void {
  setCurrentTheme(createTheme(defaultThemeInput))
}

export function useTheme() {
  return {
    theme: readonly(currentTheme),
    setTheme: (input: ThemeInput) => setCurrentTheme(createTheme(input)),
    resetTheme,
    exportTheme,
    importTheme,
  }
}

function setCurrentTheme(theme: ThemeTokens): void {
  currentTheme.value = theme
  applyTheme(theme)
  saveTheme(theme)
}

function getDefaultThemeTarget(): HTMLElement | null {
  if (typeof document === 'undefined') {
    return null
  }

  return document.documentElement
}
