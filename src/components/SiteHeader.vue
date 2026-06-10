<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FlaskConical, Github, Menu, Moon, Search, Sun, X } from 'lucide-vue-next'
import { navItems } from '../data/home'
import { useSiteLocale } from '../composables/use-site-locale'
import { useSiteThemeMode } from '../composables/use-site-theme-mode'
import MyUILogo from './MyUILogo.vue'

const router = useRouter()
const route = useRoute()
const isMenuOpen = ref(false)
const { isZh, languageButtonText, languageButtonLabel, toggleSiteLocale } = useSiteLocale()
const { isDark, isThemeAnimating, themeButtonLabel, toggleThemeMode } = useSiteThemeMode()

const activePath = computed(() => {
  if (route.path === '/') {
    return ''
  }

  return navItems.find((item) => route.path.startsWith(item.path))?.path ?? route.path
})

const searchPlaceholder = computed(() => (isZh.value ? '搜索组件' : 'Search components'))
const githubLabel = computed(() => (isZh.value ? '打开 GitHub' : 'Open GitHub'))
const playgroundLabel = computed(() => (isZh.value ? '打开演练场' : 'Open Playground'))
const brandLabel = computed(() => (isZh.value ? '返回首页' : 'Back to home'))
const menuLabel = computed(() => {
  if (isMenuOpen.value) return isZh.value ? '关闭导航' : 'Close navigation'
  return isZh.value ? '打开导航' : 'Open navigation'
})

function getNavLabel(item: (typeof navItems)[number]): string {
  return isZh.value ? item.label : item.labelEn
}

async function navigate(path: string): Promise<void> {
  if (route.path !== path) {
    await router.push(path)
  }
  isMenuOpen.value = false
}

async function openSearch(): Promise<void> {
  await navigate('/components')
}

function openGithub(): void {
  window.open('https://github.com/qingyu6688/My-UI', '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <my-button text class="site-brand" :aria-label="brandLabel" @click="navigate('/')">
        <span class="site-brand__logo">
          <MyUILogo :size="32" decorative />
        </span>
        <span class="site-brand__name">My UI</span>
      </my-button>

      <my-menu
        :model-value="activePath"
        mode="horizontal"
        class="site-menu"
        @select="navigate"
      >
        <my-menu-item
          v-for="item in navItems"
          :key="item.path"
          :index="item.path"
        >
          {{ getNavLabel(item) }}
        </my-menu-item>
      </my-menu>

      <my-space class="site-header__actions" :size="8" :wrap="false">
        <div class="site-search">
          <my-input
            readonly
            :placeholder="searchPlaceholder"
            @focus="openSearch"
            @click="openSearch"
          >
            <template #prefix>
              <Search />
            </template>
          </my-input>
        </div>
        <button
          type="button"
          class="site-theme-switch"
          :class="{ 'is-dark': isDark }"
          role="switch"
          :aria-checked="isDark"
          :aria-label="themeButtonLabel"
          :title="themeButtonLabel"
          :disabled="isThemeAnimating"
          @click="(e: MouseEvent) => toggleThemeMode(e)"
        >
          <span class="site-theme-switch__track">
            <span class="site-theme-switch__star site-theme-switch__star--one" />
            <span class="site-theme-switch__star site-theme-switch__star--two" />
            <span class="site-theme-switch__star site-theme-switch__star--three" />
            <span class="site-theme-switch__star site-theme-switch__star--four" />
            <span class="site-theme-switch__cloud site-theme-switch__cloud--one" />
            <span class="site-theme-switch__cloud site-theme-switch__cloud--two" />
            <span class="site-theme-switch__thumb">
              <Sun class="site-theme-switch__icon site-theme-switch__icon--sun" />
              <Moon class="site-theme-switch__icon site-theme-switch__icon--moon" />
            </span>
          </span>
        </button>
        <my-button
          class="site-language-button"
          :aria-label="languageButtonLabel"
          @click="toggleSiteLocale"
        >
          {{ languageButtonText }}
        </my-button>
        <my-button
          class="site-icon-button site-playground-button"
          :aria-label="playgroundLabel"
          :title="playgroundLabel"
          @click="navigate('/playground')"
        >
          <template #icon>
            <FlaskConical />
          </template>
        </my-button>
        <my-button class="site-icon-button site-github-button" :aria-label="githubLabel" @click="openGithub">
          <template #icon>
            <Github />
          </template>
        </my-button>
        <my-button
          class="site-icon-button site-menu-trigger"
          :aria-label="menuLabel"
          :aria-expanded="isMenuOpen"
          @click="isMenuOpen = !isMenuOpen"
        >
          <template #icon>
            <X v-if="isMenuOpen" />
            <Menu v-else />
          </template>
        </my-button>
      </my-space>
    </div>

    <div v-if="isMenuOpen" class="site-mobile-menu">
      <my-menu :model-value="activePath" mode="vertical" @select="navigate">
        <my-menu-item
          v-for="item in navItems"
          :key="item.path"
          :index="item.path"
        >
          {{ getNavLabel(item) }}
        </my-menu-item>
      </my-menu>
    </div>
  </header>
</template>
