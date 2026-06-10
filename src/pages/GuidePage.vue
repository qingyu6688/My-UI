<script setup lang="ts">
import { computed } from 'vue'
import { Code2, FolderTree, PackageCheck, Rocket } from 'lucide-vue-next'
import { useSiteLocale } from '../composables/use-site-locale'

const { isZh } = useSiteLocale()

const guideLinks = computed(() => [
  { id: 'install', label: isZh.value ? '安装' : 'Install' },
  { id: 'usage', label: isZh.value ? '快速开始' : 'Quick Start' },
  { id: 'theme', label: isZh.value ? '主题接入' : 'Theme' },
  { id: 'structure', label: isZh.value ? '目录约定' : 'Structure' },
])

const installRows = computed(() => [
  { name: 'Vue', value: '3.x' },
  { name: isZh.value ? '语言' : 'Language', value: 'TypeScript' },
  { name: isZh.value ? '构建工具' : 'Build Tool', value: 'Vite' },
  { name: isZh.value ? '默认主题' : 'Default Theme', value: '#a8d5ba / #d7e8bd / #fff3c7' },
])

const copy = computed(() => ({
  guide: isZh.value ? '指南' : 'Guide',
  heroDesc: isZh.value
    ? '先完成安装和基础接入，再根据业务项目选择全量引入、局部注册或主题变量覆盖。'
    : 'Install and wire the library first, then choose full import, local registration or theme overrides by project need.',
  installTitle: isZh.value ? '安装' : 'Install',
  installDesc: isZh.value
    ? '项目使用 Vue 3 + TypeScript + Vite，组件库包会统一从入口文件导出。'
    : 'The project uses Vue 3, TypeScript and Vite. The package exports components from one entry.',
  tableProject: isZh.value ? '项目' : 'Item',
  tableInfo: isZh.value ? '说明' : 'Info',
  usageTitle: isZh.value ? '快速开始' : 'Quick Start',
  usageDesc: isZh.value
    ? '推荐在入口文件中统一注册组件库和样式，页面内继续使用组件本身完成布局。'
    : 'Register the plugin and styles in the app entry, then compose pages with the components.',
  themeTitle: isZh.value ? '主题接入' : 'Theme Setup',
  themeAlertTitle: isZh.value ? '默认主题已经内置' : 'Default theme included',
  themeAlertDesc: isZh.value
    ? '主色为 #a8d5ba，辅助色为 #d7e8bd，强调色为 #fff3c7。后续可以通过主题页面生成新的变量配置。'
    : 'Primary is #a8d5ba, secondary is #d7e8bd and accent is #fff3c7. The theme page can generate new variable settings.',
  structureTitle: isZh.value ? '目录约定' : 'Folder Structure',
  structureDesc: isZh.value
    ? '页面与组件保持分层，文档站页面放在 src/pages，组件源码放在 packages/components。'
    : 'Pages and components stay separated: docs pages live in src/pages and component source lives in packages/components.',
}))
</script>

<template>
  <main class="page-shell doc-page">
    <aside class="doc-sidebar">
      <p>{{ copy.guide }}</p>
      <a
        v-for="link in guideLinks"
        :key="link.id"
        :href="`#${link.id}`"
      >
        {{ link.label }}
      </a>
    </aside>

    <article class="doc-content">
      <section class="page-hero page-hero--compact">
        <p class="eyebrow">Guide</p>
        <h1>{{ copy.guide }}</h1>
        <p>{{ copy.heroDesc }}</p>
      </section>

      <section id="install" class="doc-section">
        <div class="doc-section__title">
          <PackageCheck />
          <h2>{{ copy.installTitle }}</h2>
        </div>
        <p>{{ copy.installDesc }}</p>
        <div class="code-block">
          <span>npm</span>
          <pre><code>npm install @qingyu6688/my-ui</code></pre>
        </div>
        <my-table :data="installRows" border>
          <my-table-column prop="name" :label="copy.tableProject" />
          <my-table-column prop="value" :label="copy.tableInfo" />
        </my-table>
      </section>

      <section id="usage" class="doc-section">
        <div class="doc-section__title">
          <Rocket />
          <h2>{{ copy.usageTitle }}</h2>
        </div>
        <p>{{ copy.usageDesc }}</p>
        <div class="code-block">
          <span>main.ts</span>
          <pre><code>import { createApp } from 'vue'
import MyUI from '@qingyu6688/my-ui'
import '@qingyu6688/my-ui/dist/index.css'
import App from './App.vue'

createApp(App).use(MyUI).mount('#app')</code></pre>
        </div>
      </section>

      <section id="theme" class="doc-section">
        <div class="doc-section__title">
          <Code2 />
          <h2>{{ copy.themeTitle }}</h2>
        </div>
        <my-alert
          :title="copy.themeAlertTitle"
          :description="copy.themeAlertDesc"
          type="success"
          show-icon
        />
        <div class="code-block">
          <span>theme.ts</span>
          <pre><code>import { applyTheme, createTheme } from '@qingyu6688/my-ui'

applyTheme(createTheme({
  primary: '#a8d5ba',
  secondary: '#d7e8bd',
  accent: '#fff3c7',
}))</code></pre>
        </div>
      </section>

      <section id="structure" class="doc-section">
        <div class="doc-section__title">
          <FolderTree />
          <h2>{{ copy.structureTitle }}</h2>
        </div>
        <p>{{ copy.structureDesc }}</p>
        <div class="structure-list">
          <span>src/pages</span>
          <span>src/router</span>
          <span>src/components</span>
          <span>packages/components</span>
          <span>packages/hooks</span>
          <span>docs</span>
        </div>
      </section>
    </article>
  </main>
</template>
