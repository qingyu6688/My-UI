import { computed, ref } from 'vue'

export type SiteLocale = 'zh' | 'en'

const STORAGE_KEY = 'my-ui-site-locale'

function readInitialLocale(): SiteLocale {
  if (typeof window === 'undefined') return 'zh'

  const saved = window.localStorage.getItem(STORAGE_KEY)
  return saved === 'en' ? 'en' : 'zh'
}

const siteLocale = ref<SiteLocale>(readInitialLocale())

export function useSiteLocale() {
  const isZh = computed(() => siteLocale.value === 'zh')
  const languageButtonText = computed(() => (isZh.value ? 'EN' : '中'))
  const languageButtonLabel = computed(() => (isZh.value ? '切换到英文' : 'Switch to Chinese'))

  function setSiteLocale(locale: SiteLocale): void {
    siteLocale.value = locale
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, locale)
    }
  }

  function toggleSiteLocale(): void {
    setSiteLocale(isZh.value ? 'en' : 'zh')
  }

  function text<T>(zh: T, en: T): T {
    return isZh.value ? zh : en
  }

  return {
    locale: siteLocale,
    isZh,
    languageButtonText,
    languageButtonLabel,
    setSiteLocale,
    toggleSiteLocale,
    text,
  }
}
