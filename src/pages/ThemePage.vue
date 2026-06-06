<script setup lang="ts">
import { reactive } from 'vue'
import { Check, RotateCcw } from 'lucide-vue-next'
import { applyTheme, createTheme, defaultThemeInput, type ThemeInput } from '../../packages/my-ui/index'
import { themePresets, type SiteThemePreset } from '../data/home'

const themeForm = reactive<Required<ThemeInput>>({
  primary: defaultThemeInput.primary,
  secondary: defaultThemeInput.secondary,
  accent: defaultThemeInput.accent,
})

function applyCurrentTheme(): void {
  applyTheme(createTheme({
    primary: themeForm.primary,
    secondary: themeForm.secondary,
    accent: themeForm.accent,
  }))
}

function resetTheme(): void {
  themeForm.primary = defaultThemeInput.primary
  themeForm.secondary = defaultThemeInput.secondary
  themeForm.accent = defaultThemeInput.accent
  applyCurrentTheme()
}

function selectPreset(preset: SiteThemePreset): void {
  themeForm.primary = preset.primary
  themeForm.secondary = preset.secondary
  themeForm.accent = preset.accent
  applyCurrentTheme()
}
</script>

<template>
  <main class="page-shell theme-page">
    <section class="page-hero page-hero--split">
      <div>
        <p class="eyebrow">Theme</p>
        <h1>主题</h1>
        <p>默认提供鼠尾草浅黄配色，也可以把主色、辅助色和强调色替换成更贴合业务的方案。</p>
      </div>
      <my-space :size="10" wrap>
        <my-button type="primary" @click="applyCurrentTheme">
          应用主题
          <template #icon>
            <Check />
          </template>
        </my-button>
        <my-button @click="resetTheme">
          恢复默认
          <template #icon>
            <RotateCcw />
          </template>
        </my-button>
      </my-space>
    </section>

    <section class="theme-layout">
      <div class="theme-editor">
        <h2>主题编辑器</h2>
        <p>修改色值后点击应用，页面中的组件会立即读取新的 CSS 变量。</p>

        <label class="color-row">
          <span>主色</span>
          <input v-model="themeForm.primary" type="color" aria-label="主色" />
          <my-input v-model="themeForm.primary" />
        </label>
        <label class="color-row">
          <span>辅助色</span>
          <input v-model="themeForm.secondary" type="color" aria-label="辅助色" />
          <my-input v-model="themeForm.secondary" />
        </label>
        <label class="color-row">
          <span>强调色</span>
          <input v-model="themeForm.accent" type="color" aria-label="强调色" />
          <my-input v-model="themeForm.accent" />
        </label>

        <my-alert
          title="主题变量"
          description="当前主题会写入 :root，组件内部通过统一变量读取颜色、圆角和阴影。"
          type="info"
          show-icon
        />
      </div>

      <div class="theme-presets">
        <h2>推荐方案</h2>
        <div class="theme-card-grid">
          <article
            v-for="preset in themePresets"
            :key="preset.name"
            class="theme-card"
            @click="selectPreset(preset)"
          >
            <div class="theme-swatch-row">
              <span
                v-for="color in [preset.primary, preset.secondary, preset.accent]"
                :key="color"
                :style="{ backgroundColor: color }"
              />
            </div>
            <h3>{{ preset.name }}</h3>
            <p>{{ preset.description }}</p>
          </article>
        </div>

        <div class="theme-live-preview">
          <h2>实时预览</h2>
          <my-space :size="10" wrap>
            <my-button type="primary">保存</my-button>
            <my-button>取消</my-button>
            <my-tag type="success">已启用</my-tag>
          </my-space>
          <my-tabs model-value="preview">
            <my-tab-pane label="预览" name="preview">
              <my-alert
                title="主题已生效"
                description="按钮、标签、提示和输入框都会跟随当前变量变化。"
                type="success"
                show-icon
              />
            </my-tab-pane>
          </my-tabs>
        </div>
      </div>
    </section>
  </main>
</template>
