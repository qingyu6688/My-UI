<script setup lang="ts">
import { reactive } from 'vue'
import { defaultThemeInput, useTheme } from '../packages/my-ui'

const { setTheme, resetTheme } = useTheme()

const form = reactive({
  primary: defaultThemeInput.primary,
  secondary: defaultThemeInput.secondary,
  accent: defaultThemeInput.accent,
})

function applyCurrentTheme(): void {
  setTheme({
    primary: form.primary,
    secondary: form.secondary,
    accent: form.accent,
  })
}

function restoreTheme(): void {
  form.primary = defaultThemeInput.primary
  form.secondary = defaultThemeInput.secondary
  form.accent = defaultThemeInput.accent
  resetTheme()
}
</script>

<template>
  <main class="demo-page">
    <section class="demo-hero">
      <p class="demo-kicker">Vue 3 组件库</p>
      <h1>My UI</h1>
      <p class="demo-summary">鼠尾草浅黄主题，运行时切换颜色，适合中后台和工具型产品。</p>
      <div class="demo-actions">
        <my-button type="primary">主要操作</my-button>
        <my-button>默认按钮</my-button>
        <my-button type="primary" plain>朴素按钮</my-button>
      </div>
    </section>

    <section class="demo-workspace">
      <div class="theme-panel">
        <h2>主题色</h2>
        <label>
          <span>主色</span>
          <input v-model="form.primary" type="color" @input="applyCurrentTheme" />
          <code>{{ form.primary }}</code>
        </label>
        <label>
          <span>辅助色</span>
          <input v-model="form.secondary" type="color" @input="applyCurrentTheme" />
          <code>{{ form.secondary }}</code>
        </label>
        <label>
          <span>强调色</span>
          <input v-model="form.accent" type="color" @input="applyCurrentTheme" />
          <code>{{ form.accent }}</code>
        </label>
        <my-button type="primary" text @click="restoreTheme">恢复默认</my-button>
      </div>

      <div class="preview-panel">
        <h2>组件预览</h2>
        <div class="button-grid">
          <my-button>默认</my-button>
          <my-button type="primary">主要</my-button>
          <my-button type="success">成功</my-button>
          <my-button type="warning">提醒</my-button>
          <my-button type="danger">危险</my-button>
          <my-button loading>加载中</my-button>
        </div>
        <div class="surface-preview">
          <span>浅色背景</span>
          <strong>表单、表格和弹层会沿用同一套主题变量。</strong>
        </div>
      </div>
    </section>
  </main>
</template>

