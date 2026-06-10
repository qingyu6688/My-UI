import { computed, ref } from 'vue'
import { useSiteLocale, type SiteLocale } from './use-site-locale'

export type SiteThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'my-ui-site-theme-mode'
const TRANSITION_DURATION = 360

const lightModeVars: Record<string, string> = {
  '--my-text-color-primary': '#26332b',
  '--my-text-color-regular': '#3f4a42',
  '--my-text-color-secondary': '#6f7a71',
  '--my-bg-color-page': '#fbfcf7',
  '--my-bg-color': '#ffffff',
  '--my-bg-color-soft': '#f5f8ef',
  '--my-border-color': '#dce7d6',
  '--my-border-color-light': '#ecf2e7',
  '--my-fill-color-light': '#f7faef',
  '--my-shadow-light': '0 8px 24px rgba(38, 51, 43, 0.08)',
}

const darkModeVars: Record<string, string> = {
  '--my-text-color-primary': '#edf4ee',
  '--my-text-color-regular': '#d2ded4',
  '--my-text-color-secondary': '#9cad9f',
  '--my-bg-color-page': '#141a16',
  '--my-bg-color': '#1c241f',
  '--my-bg-color-soft': '#223025',
  '--my-border-color': '#35483b',
  '--my-border-color-light': '#2a3a30',
  '--my-fill-color-light': '#243329',
  '--my-shadow-light': '0 8px 24px rgba(0, 0, 0, 0.3)',
}

function readInitialMode(): SiteThemeMode {
  if (typeof window === 'undefined') return 'light'

  const saved = window.localStorage.getItem(STORAGE_KEY)
  return saved === 'dark' ? 'dark' : 'light'
}

function applyMode(mode: SiteThemeMode): void {
  if (typeof document === 'undefined') return

  document.documentElement.classList.toggle('dark', mode === 'dark')
  document.documentElement.style.colorScheme = mode
  Object.entries(mode === 'dark' ? darkModeVars : lightModeVars).forEach(([name, value]) => {
    document.documentElement.style.setProperty(name, value)
  })
}

const siteThemeMode = ref<SiteThemeMode>(readInitialMode())
const isThemeAnimating = ref(false)

applyMode(siteThemeMode.value)

function modeLabel(mode: SiteThemeMode, locale: SiteLocale): string {
  if (mode === 'dark') {
    return locale === 'zh' ? '切换到浅色模式' : 'Switch to light mode'
  }

  return locale === 'zh' ? '切换到深色模式' : 'Switch to dark mode'
}

export function useSiteThemeMode() {
  const { locale } = useSiteLocale()
  const isDark = computed(() => siteThemeMode.value === 'dark')
  const themeButtonLabel = computed(() => modeLabel(siteThemeMode.value, locale.value))

  function setThemeMode(mode: SiteThemeMode): void {
    siteThemeMode.value = mode
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, mode)
    }
    applyMode(mode)
  }

  function toggleThemeMode(): void {
    if (isThemeAnimating.value || typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }

    const nextMode: SiteThemeMode = isDark.value ? 'light' : 'dark'
    isThemeAnimating.value = true
    document.documentElement.classList.add('site-theme-transition')

    window.requestAnimationFrame(() => {
      siteThemeMode.value = nextMode
      window.localStorage.setItem(STORAGE_KEY, nextMode)
      applyMode(nextMode)
    })

    window.setTimeout(() => {
      document.documentElement.classList.remove('site-theme-transition')
      isThemeAnimating.value = false
    }, TRANSITION_DURATION)
  }

  return {
    mode: siteThemeMode,
    isDark,
    isThemeAnimating,
    themeButtonLabel,
    setThemeMode,
    toggleThemeMode,
  }
}
