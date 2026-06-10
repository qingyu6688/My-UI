import { computed, ref } from 'vue'
import { useSiteLocale, type SiteLocale } from './use-site-locale'

export type SiteThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'my-ui-site-theme-mode'

// 兼容回退动画时长：仅在不支持 View Transitions API 时用
const FALLBACK_DURATION = 260
const VIEW_TRANSITION_DURATION = 520

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
  if (saved === 'dark' || saved === 'light') return saved

  // 首次访问跟随系统
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
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

/**
 * 是否支持 View Transitions API + 用户没开"减少动画"偏好
 */
function canUseViewTransition(): boolean {
  if (typeof document === 'undefined' || typeof window === 'undefined') return false
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return !reduceMotion && typeof document.startViewTransition === 'function'
}

export function useSiteThemeMode() {
  const { locale } = useSiteLocale()
  const isDark = computed(() => siteThemeMode.value === 'dark')
  const themeButtonLabel = computed(() => modeLabel(siteThemeMode.value, locale.value))

  function persist(mode: SiteThemeMode): void {
    siteThemeMode.value = mode
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, mode)
    }
    applyMode(mode)
  }

  function setThemeMode(mode: SiteThemeMode): void {
    persist(mode)
  }

  /**
   * 切换主题。优先使用 View Transitions API 做圆形展开（GPU 合成，性能最佳）；
   * 不支持时退回精简 CSS 全局过渡（仅颜色相关属性，无 transform/box-shadow）。
   * @param event 触发事件，用于圆心定位
   */
  function toggleThemeMode(event?: MouseEvent): void {
    if (isThemeAnimating.value || typeof document === 'undefined') return
    const nextMode: SiteThemeMode = isDark.value ? 'light' : 'dark'

    // 路径 1：View Transitions API
    if (canUseViewTransition()) {
      const transitionType = nextMode === 'dark' ? 'reveal-new' : 'hide-old'
      document.documentElement.dataset.themeTransition = transitionType

      const transition = document.startViewTransition(() => {
        persist(nextMode)
      })

      const x = event?.clientX ?? window.innerWidth / 2
      const y = event?.clientY ?? window.innerHeight / 2
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      )

      isThemeAnimating.value = true
      const viewAnimationFinished = transition.ready
        .then(() => {
          const clipPath =
            nextMode === 'dark'
              ? [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
              : [`circle(${endRadius}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`]

          const animation = document.documentElement.animate(
            {
              clipPath,
            },
            {
              duration: VIEW_TRANSITION_DURATION,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              fill: 'both',
              pseudoElement: nextMode === 'dark' ? '::view-transition-new(root)' : '::view-transition-old(root)',
            },
          )

          return animation.finished
        })
        .catch(() => undefined)

      Promise.allSettled([transition.finished, viewAnimationFinished]).finally(() => {
        delete document.documentElement.dataset.themeTransition
        isThemeAnimating.value = false
      })
      return
    }

    // 路径 2：CSS 兼容回退（不支持 VT 或 prefers-reduced-motion）
    isThemeAnimating.value = true
    document.documentElement.classList.add('site-theme-transition')
    persist(nextMode)
    window.setTimeout(() => {
      document.documentElement.classList.remove('site-theme-transition')
      isThemeAnimating.value = false
    }, FALLBACK_DURATION)
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
