<script setup lang="ts">
import { CheckCircle2, CircleDashed, Clock3 } from 'lucide-vue-next'
import { roadmapItems } from '../data/home'

function iconName(status: string): typeof CheckCircle2 {
  if (status === '本轮完成') return CheckCircle2
  if (status === '下一步') return Clock3
  return CircleDashed
}
</script>

<template>
  <main class="page-shell roadmap-page">
    <section class="page-hero page-hero--compact">
      <p class="eyebrow">Roadmap</p>
      <h1>路线</h1>
      <p>先把首页、导航和基础组件链路打稳，再继续补齐 API 文档、主题工具和测试边界。</p>
    </section>

    <section class="roadmap-grid">
      <article
        v-for="item in roadmapItems"
        :key="item.title"
        class="roadmap-card"
      >
        <component :is="iconName(item.status)" />
        <span>{{ item.status }}</span>
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </article>
    </section>

    <section class="roadmap-note">
      <h2>推进原则</h2>
      <p>文档站保持轻量清晰，组件 API 优先补齐真实项目会查的内容：属性、事件、插槽、可访问性和边界状态。</p>
      <my-space :size="10" wrap>
        <my-tag type="success">文档优先</my-tag>
        <my-tag>组件稳定</my-tag>
        <my-tag type="warning">主题可扩展</my-tag>
      </my-space>
    </section>
  </main>
</template>
