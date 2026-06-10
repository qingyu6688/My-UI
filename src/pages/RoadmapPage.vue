<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle2, CircleDashed, Clock3 } from 'lucide-vue-next'
import { roadmapItems } from '../data/home'
import { useSiteLocale } from '../composables/use-site-locale'

const { isZh } = useSiteLocale()
const copy = computed(() => ({
  title: isZh.value ? '路线' : 'Roadmap',
  desc: isZh.value
    ? '组件、主题和文档链路已经成型，后续重点补齐 API 细节、示例质量和发布体验。'
    : 'Components, themes and docs are in place. Next work focuses on API details, example quality and release polish.',
  principle: isZh.value ? '推进原则' : 'Principles',
  principleDesc: isZh.value
    ? '文档站保持轻量清晰，组件 API 优先补齐真实项目会查的内容：属性、事件、插槽、可访问性和边界状态。'
    : 'The docs stay light and clear. Component APIs prioritize props, events, slots, accessibility and edge states that real projects look up.',
  docsFirst: isZh.value ? '文档优先' : 'Docs first',
  stable: isZh.value ? '组件稳定' : 'Stable components',
  theme: isZh.value ? '主题可扩展' : 'Extensible theme',
}))

function iconName(status: string): typeof CheckCircle2 {
  if (status === '已完成') return CheckCircle2
  if (status === '进行中') return Clock3
  return CircleDashed
}
</script>

<template>
  <main class="page-shell roadmap-page">
    <section class="page-hero page-hero--compact">
      <p class="eyebrow">Roadmap</p>
      <h1>{{ copy.title }}</h1>
      <p>{{ copy.desc }}</p>
    </section>

    <section class="roadmap-grid">
      <article
        v-for="item in roadmapItems"
        :key="item.title"
        class="roadmap-card"
      >
        <component :is="iconName(item.status)" />
        <span>{{ isZh ? item.status : item.statusEn }}</span>
        <h2>{{ isZh ? item.title : item.titleEn }}</h2>
        <p>{{ isZh ? item.description : item.descriptionEn }}</p>
      </article>
    </section>

    <section class="roadmap-note">
      <h2>{{ copy.principle }}</h2>
      <p>{{ copy.principleDesc }}</p>
      <my-space :size="10" wrap>
        <my-tag type="success">{{ copy.docsFirst }}</my-tag>
        <my-tag>{{ copy.stable }}</my-tag>
        <my-tag type="warning">{{ copy.theme }}</my-tag>
      </my-space>
    </section>
  </main>
</template>
