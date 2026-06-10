<script setup lang="ts">
import { computed, type Component } from 'vue'
import {
  CheckCircle2,
  CircleDashed,
  ClipboardCheck,
  Clock3,
  Code2,
  PackageCheck,
  Rocket,
} from 'lucide-vue-next'
import { useSiteLocale } from '../composables/use-site-locale'

interface RoadmapMetric {
  label: string
  value: string
  description: string
}

interface RoadmapPhase {
  title: string
  status: string
  description: string
  items: string[]
  icon: Component
}

interface RoadmapTrack {
  title: string
  description: string
  items: string[]
  icon: Component
}

const { text } = useSiteLocale()

const metrics = computed<RoadmapMetric[]>(() => [
  {
    label: text('组件规模', 'Components'),
    value: '75',
    description: text('覆盖基础、表单、数据展示、导航、反馈和其他增强组件。', 'Across basic, form, data, navigation, feedback and utility groups.'),
  },
  {
    label: text('测试用例', 'Tests'),
    value: '237',
    description: text('核心组件、服务式 API、主题工具和配置上下文均有覆盖。', 'Core components, service APIs, theme utils and config context are covered.'),
  },
  {
    label: text('页面入口', 'Pages'),
    value: '6',
    description: text('首页、指南、组件、演练场、主题和路线页面已拆分维护。', 'Home, guide, components, playground, theme and roadmap are separated.'),
  },
])

const phases = computed<RoadmapPhase[]>(() => [
  {
    title: text('基础工程完成', 'Workspace Foundation'),
    status: text('已完成', 'Done'),
    description: text('组件源码、主题包、预览站、文档站和测试结构已经稳定。', 'Component source, theme package, preview site, docs and tests are stable.'),
    items: [
      text('组件按源码、样式、文档和测试职责拆分目录。', 'Components are organized by source, styles, docs and tests.'),
      text('本地预览站按路由拆分页面。', 'Preview pages are split by routes.'),
      text('深浅色、主题色和中英文切换已接入。', 'Light/dark mode, theme colors and language switching are wired.'),
    ],
    icon: CheckCircle2,
  },
  {
    title: text('发布准备推进中', 'Release Readiness'),
    status: text('进行中', 'In Progress'),
    description: text('重点完善包入口、类型声明、README、组件文档和打包验证。', 'Package entries, types, README, component docs and build checks are being polished.'),
    items: [
      text('统一 `@qingyu6688/my-ui` 与 `/full` 两种入口。', 'Unify `@qingyu6688/my-ui` and `/full` entries.'),
      text('补齐新增组件的 VitePress 文档。', 'Complete VitePress docs for newly added components.'),
      text('稳定 dist 静态站点部署流程。', 'Stabilize static dist deployment flow.'),
    ],
    icon: Clock3,
  },
  {
    title: text('下一阶段质量增强', 'Next Quality Pass'),
    status: text('计划中', 'Planned'),
    description: text('继续补键盘交互、可访问性、边界状态和更完整的 API 表格。', 'Keyboard interaction, accessibility, edge states and richer API tables come next.'),
    items: [
      text('复杂表单与弹层组件补充边界测试。', 'Add edge tests for complex form and overlay components.'),
      text('组件文档补齐 Props、Events、Slots、Exposes。', 'Fill Props, Events, Slots and Exposes docs.'),
      text('主题编辑器继续增强导入导出能力。', 'Enhance import and export in the theme editor.'),
    ],
    icon: CircleDashed,
  },
])

const tracks = computed<RoadmapTrack[]>(() => [
  {
    title: text('组件 API 文档', 'Component API Docs'),
    description: text('让每个组件都能查到属性、事件、插槽、示例和源码位置。', 'Make props, events, slots, examples and source links discoverable for every component.'),
    items: [
      text('先补高频组件：Button、Input、Select、Table、Dialog。', 'Start with Button, Input, Select, Table and Dialog.'),
      text('示例代码与组件页源码展示保持一致。', 'Keep examples aligned with source display in the component page.'),
      text('为复杂组件增加常见问题说明。', 'Add common usage notes for complex components.'),
    ],
    icon: Code2,
  },
  {
    title: text('发布包稳定性', 'Package Stability'),
    description: text('确保库模式、全量入口、样式副作用和类型声明都能被业务项目直接消费。', 'Ensure library mode, full entry, style side effects and types work in real projects.'),
    items: [
      text('验证 ESM / CJS 输出。', 'Verify ESM and CJS outputs.'),
      text('检查 exports 与 sideEffects。', 'Check exports and sideEffects.'),
      text('准备 npm 发布前检查清单。', 'Prepare npm pre-publish checklist.'),
    ],
    icon: PackageCheck,
  },
  {
    title: text('站点体验', 'Site Experience'),
    description: text('首页、指南、路线和组件页继续保持清爽、稳定、便于查找的阅读体验。', 'Keep home, guide, roadmap and components clear, stable and easy to scan.'),
    items: [
      text('移动端导航和侧边栏继续收敛。', 'Refine mobile navigation and sidebars.'),
      text('演练场增加更多示例模板。', 'Add more playground templates.'),
      text('主题页补齐最近主题和对比度提示。', 'Complete recent themes and contrast hints.'),
    ],
    icon: Rocket,
  },
])

const releaseCommands = ['npm run typecheck', 'npm run lint', 'npm test', 'npm run build', 'npx vite build --outDir dist --emptyOutDir']

const copy = computed(() => ({
  title: text('路线', 'Roadmap'),
  desc: text(
    '路线页不只记录“做了什么”，也明确下一步怎样把组件库从可用推进到可发布、可维护。',
    'This roadmap records what is done and what moves the library toward publishable and maintainable quality.',
  ),
  metricsTitle: text('当前进度', 'Current Progress'),
  releaseTitle: text('发布前固定检查', 'Release Checks'),
  releaseDesc: text('每次合并前至少跑完下面几条命令，保证页面、组件库和静态站点都能交付。', 'Run these commands before merging to keep pages, library output and static site deployable.'),
  trackTitle: text('后续工作拆解', 'Next Work Tracks'),
  principle: text('推进原则', 'Principles'),
  principleDesc: text(
    '先补真实业务会查的内容，再做锦上添花的体验。组件稳定性、文档准确性和可部署性优先。',
    'Prioritize what real projects need to look up. Component stability, documentation accuracy and deployability come first.',
  ),
  docsFirst: text('文档优先', 'Docs first'),
  stable: text('组件稳定', 'Stable components'),
  deployable: text('可部署', 'Deployable'),
}))
</script>

<template>
  <main class="page-shell roadmap-page">
    <section class="roadmap-hero">
      <p class="eyebrow">Roadmap</p>
      <h1>{{ copy.title }}</h1>
      <p>{{ copy.desc }}</p>
      <dl class="roadmap-metrics">
        <div v-for="item in metrics" :key="item.label">
          <dt>{{ item.label }}</dt>
          <dd>{{ item.value }}</dd>
          <span>{{ item.description }}</span>
        </div>
      </dl>
    </section>

    <section class="roadmap-overview">
      <article class="roadmap-current">
        <div class="roadmap-section-head">
          <ClipboardCheck />
          <div>
            <h2>{{ copy.metricsTitle }}</h2>
            <p>{{ copy.principleDesc }}</p>
          </div>
        </div>

        <div class="roadmap-timeline">
          <div v-for="phase in phases" :key="phase.title" class="roadmap-timeline__item">
            <component :is="phase.icon" />
            <div>
              <span>{{ phase.status }}</span>
              <h3>{{ phase.title }}</h3>
              <p>{{ phase.description }}</p>
              <ul>
                <li v-for="detail in phase.items" :key="detail">{{ detail }}</li>
              </ul>
            </div>
          </div>
        </div>
      </article>

      <aside class="roadmap-release">
        <h2>{{ copy.releaseTitle }}</h2>
        <p>{{ copy.releaseDesc }}</p>
        <div class="roadmap-command-list">
          <code v-for="command in releaseCommands" :key="command">{{ command }}</code>
        </div>
      </aside>
    </section>

    <section class="roadmap-board">
      <div class="section-heading">
        <p class="eyebrow">Next</p>
        <h2>{{ copy.trackTitle }}</h2>
      </div>

      <div class="roadmap-track-grid">
        <article v-for="track in tracks" :key="track.title" class="roadmap-track">
          <component :is="track.icon" />
          <h3>{{ track.title }}</h3>
          <p>{{ track.description }}</p>
          <ul>
            <li v-for="item in track.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="roadmap-note">
      <h2>{{ copy.principle }}</h2>
      <p>{{ copy.principleDesc }}</p>
      <my-space :size="10" wrap>
        <my-tag type="success">{{ copy.docsFirst }}</my-tag>
        <my-tag>{{ copy.stable }}</my-tag>
        <my-tag type="warning">{{ copy.deployable }}</my-tag>
      </my-space>
    </section>
  </main>
</template>
