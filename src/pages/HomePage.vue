<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, Boxes, CheckCircle2, Palette, Sparkles } from 'lucide-vue-next'
import { componentCount, themePresets } from '../data/home'
import { useSiteLocale } from '../composables/use-site-locale'

const router = useRouter()
const { isZh } = useSiteLocale()

const totalComponents = componentCount
const copy = computed(() => ({
  lead: isZh.value
    ? '一个面向后台系统和文档站的 Vue 3 组件库，默认采用鼠尾草浅黄主题，并支持在项目中自由替换主题色。'
    : 'A Vue 3 component library for admin systems and docs, with a sage and pale-yellow default theme that can be customized freely.',
  start: isZh.value ? '开始使用' : 'Get Started',
  components: isZh.value ? '查看组件' : 'View Components',
  count: isZh.value ? `${totalComponents} 个组件` : `${totalComponents} components`,
  theme: isZh.value ? '可配置主题色' : 'Customizable theme',
  previewLabel: isZh.value ? '组件预览' : 'Component preview',
  defaultTheme: isZh.value ? '默认主题' : 'Default Theme',
  sageTheme: isZh.value ? '鼠尾草浅黄' : 'Sage Light Yellow',
  overviewTitle: isZh.value ? '像 Element Plus 一样组织文档入口' : 'Documentation entrances shaped like Element Plus',
  overviewDesc: isZh.value
    ? '首页只承载第一印象和常用入口，具体内容分别进入指南、组件、主题和路线页面。'
    : 'The home page keeps the first impression and common entrances, while details live in Guide, Components, Theme and Roadmap.',
  guideTitle: isZh.value ? '指南' : 'Guide',
  guideDesc: isZh.value
    ? '从安装、全量引入、按需使用到目录约定，先把项目接入方式讲清楚。'
    : 'Installation, full import, local usage and folder conventions are documented first.',
  guideAction: isZh.value ? '阅读指南' : 'Read Guide',
  componentTitle: isZh.value ? '组件' : 'Components',
  componentDesc: isZh.value
    ? '按照基础、表单、反馈、导航和数据展示分类，方便后续扩展 API 文档。'
    : 'Components are grouped by basic, form, feedback, navigation and data display for API docs.',
  componentAction: isZh.value ? '浏览组件' : 'Browse Components',
  themeTitle: isZh.value ? '主题' : 'Theme',
  themeDesc: isZh.value
    ? '保留默认鼠尾草浅黄配色，同时支持修改主色、辅助色和强调色。'
    : 'The default palette stays available while primary, secondary and accent colors can be replaced.',
  themeAction: isZh.value ? '调整主题' : 'Edit Theme',
}))

function go(path: string): void {
  void router.push(path)
}
</script>

<template>
  <main class="home-page">
    <section class="home-hero">
      <div class="home-hero__copy">
        <p class="eyebrow">My UI for Vue 3</p>
        <h1>My UI</h1>
        <p class="home-hero__lead">
          {{ copy.lead }}
        </p>

        <my-space class="home-hero__actions" :size="12" wrap>
          <my-button type="primary" size="large" @click="go('/guide')">
            {{ copy.start }}
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
            <Boxes />
            {{ copy.count }}
          </span>
          <span>
            <Palette />
            {{ copy.theme }}
          </span>
        </div>
      </div>

      <div class="home-hero__panel" :aria-label="copy.previewLabel">
        <div class="preview-toolbar">
          <span class="preview-dot" />
          <span class="preview-dot" />
          <span class="preview-dot" />
          <span class="preview-title">Theme Preview</span>
        </div>

        <div class="preview-card preview-card--main">
          <div>
            <my-tag type="success">{{ copy.defaultTheme }}</my-tag>
            <h2>{{ copy.sageTheme }}</h2>
            <p>#a8d5ba / #d7e8bd / #fff3c7</p>
          </div>
          <my-switch />
        </div>

        <div class="preview-grid">
          <div
            v-for="preset in themePresets"
            :key="preset.name"
            class="preview-theme"
          >
            <div class="theme-swatch-row">
              <span
                v-for="color in [preset.primary, preset.secondary, preset.accent]"
                :key="color"
                :style="{ backgroundColor: color }"
              />
            </div>
            <strong>{{ isZh ? preset.name : preset.nameEn }}</strong>
            <p>{{ isZh ? preset.description : preset.descriptionEn }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="home-section">
      <div class="section-heading">
        <p class="eyebrow">Overview</p>
        <h2>{{ copy.overviewTitle }}</h2>
        <p>{{ copy.overviewDesc }}</p>
      </div>

      <div class="entry-grid">
        <article class="entry-card">
          <div class="entry-card__icon">
            <Sparkles />
          </div>
          <h3>{{ copy.guideTitle }}</h3>
          <p>{{ copy.guideDesc }}</p>
          <my-button text type="primary" @click="go('/guide')">
            {{ copy.guideAction }}
            <template #icon>
              <ArrowRight />
            </template>
          </my-button>
        </article>

        <article class="entry-card">
          <div class="entry-card__icon">
            <Boxes />
          </div>
          <h3>{{ copy.componentTitle }}</h3>
          <p>{{ copy.componentDesc }}</p>
          <my-button text type="primary" @click="go('/components')">
            {{ copy.componentAction }}
            <template #icon>
              <ArrowRight />
            </template>
          </my-button>
        </article>

        <article class="entry-card">
          <div class="entry-card__icon">
            <Palette />
          </div>
          <h3>{{ copy.themeTitle }}</h3>
          <p>{{ copy.themeDesc }}</p>
          <my-button text type="primary" @click="go('/theme')">
            {{ copy.themeAction }}
            <template #icon>
              <ArrowRight />
            </template>
          </my-button>
        </article>
      </div>
    </section>
  </main>
</template>
