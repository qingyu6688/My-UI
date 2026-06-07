<script setup lang="ts">
import { ref } from 'vue'
import { Check, Code2, Copy, Github, SquareArrowOutUpRight } from 'lucide-vue-next'

defineOptions({ name: 'DemoBox' })

const props = defineProps<{
  name: string
  title?: string
  description?: string
  source: string
  path: string
}>()

const GITHUB_BASE = 'https://github.com/qingyu6688/My-UI/blob/main/'

const expanded = ref(false)
const copied = ref(false)

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
  <section :id="name" class="demo-box">
    <header class="demo-box__head">
      <h3 class="demo-box__title">{{ title ?? name }}</h3>
      <p v-if="description" class="demo-box__desc">{{ description }}</p>
    </header>

    <div class="demo-box__preview">
      <slot />
    </div>

    <div class="demo-box__actions">
      <button
        type="button"
        class="demo-box__action"
        title="在 Playground 中编辑"
        aria-label="Edit in Playground"
        @click="openPlayground"
      >
        <SquareArrowOutUpRight :size="16" />
      </button>
      <button
        type="button"
        class="demo-box__action"
        title="在 GitHub 上编辑"
        aria-label="Edit on GitHub"
        @click="openGithub"
      >
        <Github :size="16" />
      </button>
      <button
        type="button"
        class="demo-box__action"
        :title="copied ? '已复制' : '复制代码'"
        aria-label="复制代码"
        @click="copyCode"
      >
        <Check v-if="copied" :size="16" />
        <Copy v-else :size="16" />
      </button>
      <button
        type="button"
        class="demo-box__action"
        :title="expanded ? '收起代码' : '查看代码'"
        aria-label="查看代码"
        @click="expanded = !expanded"
      >
        <Code2 :size="16" />
      </button>
    </div>

    <transition name="demo-box-code">
      <div v-show="expanded" class="demo-box__code">
        <pre><code>{{ source }}</code></pre>
      </div>
    </transition>
  </section>
</template>
