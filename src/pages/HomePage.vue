<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowRight, Boxes, CheckCircle2, Palette, Sparkles } from 'lucide-vue-next'
import { componentCount, themePresets } from '../data/home'

const router = useRouter()

const totalComponents = componentCount

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
          一个面向后台系统和文档站的 Vue 3 组件库，默认采用鼠尾草浅黄主题，并支持在项目中自由替换主题色。
        </p>

        <my-space class="home-hero__actions" :size="12" wrap>
          <my-button type="primary" size="large" @click="go('/guide')">
            开始使用
            <template #icon>
              <ArrowRight />
            </template>
          </my-button>
          <my-button size="large" @click="go('/components')">
            查看组件
          </my-button>
        </my-space>

        <div class="home-hero__meta">
          <span>
            <CheckCircle2 />
            Vue 3 + TypeScript
          </span>
          <span>
            <Boxes />
            {{ totalComponents }} 个组件
          </span>
          <span>
            <Palette />
            可配置主题色
          </span>
        </div>
      </div>

      <div class="home-hero__panel" aria-label="组件预览">
        <div class="preview-toolbar">
          <span class="preview-dot" />
          <span class="preview-dot" />
          <span class="preview-dot" />
          <span class="preview-title">Theme Preview</span>
        </div>

        <div class="preview-card preview-card--main">
          <div>
            <my-tag type="success">默认主题</my-tag>
            <h2>鼠尾草浅黄</h2>
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
            <strong>{{ preset.name }}</strong>
            <p>{{ preset.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="home-section">
      <div class="section-heading">
        <p class="eyebrow">Overview</p>
        <h2>像 Element Plus 一样组织文档入口</h2>
        <p>首页只承载第一印象和常用入口，具体内容分别进入指南、组件、主题和路线页面。</p>
      </div>

      <div class="entry-grid">
        <article class="entry-card">
          <div class="entry-card__icon">
            <Sparkles />
          </div>
          <h3>指南</h3>
          <p>从安装、全量引入、按需使用到目录约定，先把项目接入方式讲清楚。</p>
          <my-button text type="primary" @click="go('/guide')">
            阅读指南
            <template #icon>
              <ArrowRight />
            </template>
          </my-button>
        </article>

        <article class="entry-card">
          <div class="entry-card__icon">
            <Boxes />
          </div>
          <h3>组件</h3>
          <p>按照基础、表单、反馈、导航和数据展示分类，方便后续扩展 API 文档。</p>
          <my-button text type="primary" @click="go('/components')">
            浏览组件
            <template #icon>
              <ArrowRight />
            </template>
          </my-button>
        </article>

        <article class="entry-card">
          <div class="entry-card__icon">
            <Palette />
          </div>
          <h3>主题</h3>
          <p>保留默认鼠尾草浅黄配色，同时支持修改主色、辅助色和强调色。</p>
          <my-button text type="primary" @click="go('/theme')">
            调整主题
            <template #icon>
              <ArrowRight />
            </template>
          </my-button>
        </article>
      </div>
    </section>
  </main>
</template>
