<script setup lang="ts">
import { Code2, FolderTree, PackageCheck, Rocket } from 'lucide-vue-next'

const guideLinks = [
  { id: 'install', label: '安装' },
  { id: 'usage', label: '快速开始' },
  { id: 'theme', label: '主题接入' },
  { id: 'structure', label: '目录约定' },
]

const installRows = [
  { name: 'Vue', value: '3.x' },
  { name: '语言', value: 'TypeScript' },
  { name: '构建工具', value: 'Vite' },
  { name: '默认主题', value: '#a8d5ba / #d7e8bd / #fff3c7' },
]
</script>

<template>
  <main class="page-shell doc-page">
    <aside class="doc-sidebar">
      <p>指南</p>
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
        <h1>指南</h1>
        <p>先完成安装和基础接入，再根据业务项目选择全量引入、局部注册或主题变量覆盖。</p>
      </section>

      <section id="install" class="doc-section">
        <div class="doc-section__title">
          <PackageCheck />
          <h2>安装</h2>
        </div>
        <p>项目使用 Vue 3 + TypeScript + Vite，组件库包会统一从入口文件导出。</p>
        <div class="code-block">
          <span>npm</span>
          <pre><code>npm install @qingyu6688/my-ui</code></pre>
        </div>
        <my-table :data="installRows" border>
          <my-table-column prop="name" label="项目" />
          <my-table-column prop="value" label="说明" />
        </my-table>
      </section>

      <section id="usage" class="doc-section">
        <div class="doc-section__title">
          <Rocket />
          <h2>快速开始</h2>
        </div>
        <p>推荐在入口文件中统一注册组件库和样式，页面内继续使用组件本身完成布局。</p>
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
          <h2>主题接入</h2>
        </div>
        <my-alert
          title="默认主题已经内置"
          description="主色为 #a8d5ba，辅助色为 #d7e8bd，强调色为 #fff3c7。后续可以通过主题页面生成新的变量配置。"
          type="success"
          show-icon
        />
        <div class="code-block">
          <span>theme.ts</span>
          <pre><code>import { applyTheme } from '@qingyu6688/my-ui'

applyTheme({
  primary: '#a8d5ba',
  secondary: '#d7e8bd',
  accent: '#fff3c7',
})</code></pre>
        </div>
      </section>

      <section id="structure" class="doc-section">
        <div class="doc-section__title">
          <FolderTree />
          <h2>目录约定</h2>
        </div>
        <p>页面与组件保持分层，文档站页面放在 src/pages，组件源码放在 packages/components。</p>
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
