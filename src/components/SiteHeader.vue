<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Github, Menu, Search, X } from 'lucide-vue-next'
import { navItems } from '../data/home'

const router = useRouter()
const route = useRoute()
const isMenuOpen = ref(false)

const activePath = computed(() => {
  if (route.path === '/') {
    return ''
  }

  return navItems.find((item) => route.path.startsWith(item.path))?.path ?? route.path
})

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
      <my-button text class="site-brand" aria-label="返回首页" @click="navigate('/')">
        <span class="site-brand__mark">My</span>
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
          {{ item.label }}
        </my-menu-item>
      </my-menu>

      <my-space class="site-header__actions" :size="8">
        <div class="site-search">
          <my-input
            readonly
            placeholder="搜索组件"
            @focus="openSearch"
            @click="openSearch"
          >
            <template #prefix>
              <Search />
            </template>
          </my-input>
        </div>
        <my-button class="site-icon-button site-github-button" aria-label="打开 GitHub" @click="openGithub">
          <template #icon>
            <Github />
          </template>
        </my-button>
        <my-button
          class="site-icon-button site-menu-trigger"
          :aria-label="isMenuOpen ? '关闭导航' : '打开导航'"
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
          {{ item.label }}
        </my-menu-item>
      </my-menu>
    </div>
  </header>
</template>
