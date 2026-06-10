<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowRight,
  BookOpen,
  Boxes,
  CheckCircle2,
  Code2,
  FolderTree,
  Palette,
  PlayCircle,
  Rocket,
  TerminalSquare,
} from 'lucide-vue-next'
import { componentCount, galleryCategories, themePresets } from '../data/home'
import { useSiteLocale } from '../composables/use-site-locale'
import MyUILogo from '../components/MyUILogo.vue'

interface HomeMetric {
  label: string
  value: string
}

interface HomeInstallStep {
  title: string
  description: string
  command: string
}

interface HomeEntry {
  title: string
  description: string
  action: string
  path: string
  icon: Component
}

const router = useRouter()
const { isZh, text } = useSiteLocale()

const totalComponents = componentCount

const copy = computed(() => ({
  eyebrow: text('My UI for Vue 3', 'My UI for Vue 3'),
  lead: text(
    '一个可运行、可打包、可发布的 Vue 3 组件库工程。克隆仓库后安装依赖即可打开本地预览站，也可以生成静态 dist 部署到服务器。',
    'A runnable, buildable and publishable Vue 3 component library workspace. Clone it, install dependencies, preview locally, or build a static dist for deployment.',
  ),
  installGuide: text('查看安装指南', 'Installation Guide'),
  components: text('浏览组件', 'Browse Components'),
  panelTitle: text('本地跑起来', 'Run Locally'),
  panelDesc: text('从空目录到看到页面，只需要这几步。', 'A short path from an empty folder to a running page.'),
  overviewTitle: text('首页只放最常用入口', 'Common Entrances First'),
  overviewDesc: text(
    '先把项目如何安装、组件如何查看、主题如何修改、演练场如何验证讲清楚，其余细节进入对应页面。',
    'The home page points to install, components, theme editing and playground first; details live on dedicated pages.',
  ),
  categoriesTitle: text('组件范围', 'Component Scope'),
  categoriesDesc: text(
    '组件按真实后台项目的使用场景分组，后续 API 文档和示例也沿用这套分类。',
    'Components are grouped by real admin scenarios, and API docs follow the same structure.',
  ),
  themeTitle: text('默认主题', 'Default Theme'),
  themeDesc: text(
    '默认鼠尾草浅黄主题已经接入全站，主题页可以替换主色、辅助色和强调色。',
    'The default sage palette is wired into the whole site, and the theme page can replace primary, secondary and accent colors.',
  ),
}))

const metrics = computed<HomeMetric[]>(() => [
  { label: text('组件数量', 'Components'), value: `${totalComponents}` },
  { label: text('开发框架', 'Framework'), value: 'Vue 3' },
  { label: text('类型系统', 'Types'), value: 'TypeScript' },
  { label: text('当前版本', 'Version'), value: '1.0.15' },
])

const installSteps = computed<HomeInstallStep[]>(() => [
  {
    title: text('克隆仓库', 'Clone'),
    description: text('从 GitHub 拉取当前项目源码。', 'Pull the project source from GitHub.'),
    command: 'git clone https://github.com/qingyu6688/My-UI.git',
  },
  {
    title: text('安装依赖', 'Install'),
    description: text('进入目录后安装工作区依赖。', 'Install workspace dependencies after entering the folder.'),
    command: 'cd My-UI && npm install',
  },
  {
    title: text('启动预览站', 'Preview'),
    description: text('打开首页、指南、组件、主题、路线和演练场。', 'Open home, guide, components, theme, roadmap and playground.'),
    command: 'npm run dev',
  },
])

const entries = computed<HomeEntry[]>(() => [
  {
    title: text('安装指南', 'Guide'),
    description: text('按新同学接手项目的顺序，说明环境检查、安装依赖、启动和打包。', 'Environment check, dependency install, local preview and build steps in order.'),
    action: text('阅读指南', 'Read Guide'),
    path: '/guide',
    icon: BookOpen,
  },
  {
    title: text('组件画廊', 'Components'),
    description: text('查看 75 个组件的真实渲染示例、源码入口和分类说明。', 'Browse real demos, source entries and categories for 75 components.'),
    action: text('查看组件', 'View Components'),
    path: '/components',
    icon: Boxes,
  },
  {
    title: text('演练场', 'Playground'),
    description: text('在独立页面里编辑示例代码，快速验证组件组合和主题变量。', 'Edit examples and verify component composition and theme variables quickly.'),
    action: text('打开演练场', 'Open Playground'),
    path: '/playground',
    icon: PlayCircle,
  },
  {
    title: text('主题编辑', 'Theme'),
    description: text('修改主色、辅助色和强调色，实时观察组件状态变化。', 'Change primary, secondary and accent colors and preview component states.'),
    action: text('调整主题', 'Edit Theme'),
    path: '/theme',
    icon: Palette,
  },
])

const categoryItems = computed(() =>
  galleryCategories.map((category) => {
    const labels: Record<string, string> = {
      basic: text('基础', 'Basic'),
      form: text('表单', 'Form'),
      data: text('数据展示', 'Data'),
      nav: text('导航', 'Navigation'),
      feedback: text('反馈', 'Feedback'),
      other: text('其他', 'Other'),
    }

    return {
      ...category,
      label: labels[category.key] ?? category.label,
    }
  }),
)

function go(path: string): void {
  void router.push(path)
}
</script>

<template>
  <main class="home-page home-page--refined">
    <section class="home-hero home-hero--product">
      <div class="home-hero__motion" aria-hidden="true">
        <span class="home-hero__motion-line home-hero__motion-line--one" />
        <span class="home-hero__motion-line home-hero__motion-line--two" />
        <span class="home-hero__motion-chip home-hero__motion-chip--one" />
        <span class="home-hero__motion-chip home-hero__motion-chip--two" />
        <span class="home-hero__motion-chip home-hero__motion-chip--three" />
      </div>
      <div class="home-hero__copy">
        <div class="home-brand-lockup">
          <MyUILogo class="home-brand-lockup__logo" :size="70" />
          <div>
            <p class="eyebrow">{{ copy.eyebrow }}</p>
            <h1>My UI</h1>
          </div>
        </div>
        <p class="home-hero__lead">
          {{ copy.lead }}
        </p>

        <div class="home-hero__metrics">
          <div v-for="item in metrics" :key="item.label">
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
          </div>
        </div>

        <my-space class="home-hero__actions" :size="12" wrap>
          <my-button type="primary" size="large" @click="go('/guide')">
            {{ copy.installGuide }}
            <template #icon>
              <ArrowRight />
            </template>
          </my-button>
          <my-button size="large" @click="go('/components')">
            {{ copy.components }}
          </my-button>
        </my-space>

        <div class="home-hero__meta">
          <span>
            <CheckCircle2 />
            Vue 3 + TypeScript
          </span>
          <span>
            <TerminalSquare />
            npm run dev
          </span>
          <span>
            <Rocket />
            dist
          </span>
        </div>
      </div>

      <div class="home-install-panel" :aria-label="copy.panelTitle">
        <div class="preview-toolbar">
          <span class="preview-dot" />
          <span class="preview-dot" />
          <span class="preview-dot" />
          <span class="preview-title">Quick Start</span>
        </div>

        <div class="home-install-panel__body">
          <div class="home-install-panel__head">
            <Code2 />
            <div>
              <h2>{{ copy.panelTitle }}</h2>
              <p>{{ copy.panelDesc }}</p>
            </div>
          </div>

          <ol class="home-install-steps">
            <li v-for="(step, index) in installSteps" :key="step.title">
              <span class="home-install-steps__index">{{ index + 1 }}</span>
              <div>
                <strong>{{ step.title }}</strong>
                <p>{{ step.description }}</p>
                <pre><code>{{ step.command }}</code></pre>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section class="home-section home-section--tight">
      <div class="section-heading">
        <p class="eyebrow">Overview</p>
        <h2>{{ copy.overviewTitle }}</h2>
        <p>{{ copy.overviewDesc }}</p>
      </div>

      <div class="entry-grid entry-grid--wide">
        <article
          v-for="entry in entries"
          :key="entry.path"
          class="entry-card entry-card--compact"
        >
          <div class="entry-card__icon">
            <component :is="entry.icon" />
          </div>
          <h3>{{ entry.title }}</h3>
          <p>{{ entry.description }}</p>
          <my-button text type="primary" @click="go(entry.path)">
            {{ entry.action }}
            <template #icon>
              <ArrowRight />
            </template>
          </my-button>
        </article>
      </div>
    </section>

    <section class="home-section home-section--split">
      <div class="section-heading">
        <p class="eyebrow">{{ copy.categoriesTitle }}</p>
        <h2>{{ copy.categoriesTitle }}</h2>
        <p>{{ copy.categoriesDesc }}</p>
      </div>

      <div class="home-category-list">
        <button
          v-for="category in categoryItems"
          :key="category.key"
          type="button"
          @click="go('/components')"
        >
          <FolderTree />
          <span>{{ category.label }}</span>
          <strong>{{ category.count }}</strong>
        </button>
      </div>

      <div class="home-theme-strip">
        <div>
          <p class="eyebrow">{{ copy.themeTitle }}</p>
          <h2>{{ isZh ? themePresets[0].name : themePresets[0].nameEn }}</h2>
          <p>{{ copy.themeDesc }}</p>
        </div>
        <div class="home-theme-strip__swatches">
          <span
            v-for="color in [themePresets[0].primary, themePresets[0].secondary, themePresets[0].accent]"
            :key="color"
            :style="{ backgroundColor: color }"
          >
            {{ color }}
          </span>
        </div>
      </div>
    </section>
  </main>
</template>
