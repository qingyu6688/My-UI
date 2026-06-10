<script setup lang="ts">
import { computed, ref } from 'vue'
import { Check, Code2, Copy, Github, SquareArrowOutUpRight } from 'lucide-vue-next'
import { useSiteLocale } from '../../composables/use-site-locale'

defineOptions({ name: 'DemoBox' })

const props = defineProps<{
  name: string
  title?: string
  titleEn?: string
  description?: string
  descriptionEn?: string
  source: string
  path: string
}>()

const GITHUB_BASE = 'https://github.com/qingyu6688/My-UI/blob/main/'

const expanded = ref(false)
const copied = ref(false)
const { isZh } = useSiteLocale()

const displayTitle = computed(() => {
  if (isZh.value) return props.title ?? props.name
  return props.titleEn ?? props.name
})
const displayDescription = computed(() =>
  isZh.value ? props.description ?? '' : props.descriptionEn ?? '',
)
const actionText = computed(() => ({
  playground: isZh.value ? '在 Playground 中编辑' : 'Edit in Playground',
  github: isZh.value ? '在 GitHub 中查看' : 'View on GitHub',
  copy: copied.value
    ? isZh.value ? '已复制' : 'Copied'
    : isZh.value ? '复制代码' : 'Copy code',
  code: expanded.value
    ? isZh.value ? '收起代码' : 'Hide code'
    : isZh.value ? '查看代码' : 'Show code',
}))

function utoa(data: string): string {
  return btoa(unescape(encodeURIComponent(data)))
}

async function copyCode(): Promise<void> {
  try {
    await navigator.clipboard.writeText(props.source)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    copied.value = false
  }
}

function openPlayground(): void {
  const files = { 'src/App.vue': props.source }
  const hash = utoa(JSON.stringify(files))
  window.open(`https://play.vuejs.org/#${hash}`, '_blank', 'noopener,noreferrer')
}

function openGithub(): void {
  window.open(`${GITHUB_BASE}${props.path}`, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <section :id="name" class="demo-block">
    <header class="demo-block__head">
      <h3 class="demo-block__title">{{ displayTitle }}</h3>
      <p v-if="displayDescription" class="demo-block__desc">{{ displayDescription }}</p>
    </header>

    <div class="demo-block__preview">
      <slot />
    </div>

    <div class="demo-block__actions">
      <button
        type="button"
        class="demo-block__action"
        :title="actionText.playground"
        :aria-label="actionText.playground"
        @click="openPlayground"
      >
        <SquareArrowOutUpRight :size="16" />
      </button>
      <button
        type="button"
        class="demo-block__action"
        :title="actionText.github"
        :aria-label="actionText.github"
        @click="openGithub"
      >
        <Github :size="16" />
      </button>
      <button
        type="button"
        class="demo-block__action"
        :title="actionText.copy"
        :aria-label="actionText.copy"
        @click="copyCode"
      >
        <Check v-if="copied" :size="16" />
        <Copy v-else :size="16" />
      </button>
      <button
        type="button"
        class="demo-block__action"
        :title="actionText.code"
        :aria-label="actionText.code"
        @click="expanded = !expanded"
      >
        <Code2 :size="16" />
      </button>
    </div>

    <transition name="demo-box-code">
      <div v-show="expanded" class="demo-block__code">
        <pre><code>{{ source }}</code></pre>
      </div>
    </transition>
  </section>
</template>
