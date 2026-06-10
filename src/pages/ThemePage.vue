<script setup lang="ts">
import { computed, reactive } from 'vue'
import { Check, RotateCcw } from 'lucide-vue-next'
import { applyTheme, createTheme, defaultThemeInput, type ThemeInput } from '../../packages/my-ui/index'
import { themePresets, type SiteThemePreset } from '../data/home'
import { useSiteLocale } from '../composables/use-site-locale'
import { useSiteThemeMode } from '../composables/use-site-theme-mode'

const themeForm = reactive<Required<ThemeInput>>({
  primary: defaultThemeInput.primary,
  secondary: defaultThemeInput.secondary,
  accent: defaultThemeInput.accent,
})
const { isZh } = useSiteLocale()
const { mode, setThemeMode } = useSiteThemeMode()

const copy = computed(() => ({
  title: isZh.value ? '主题' : 'Theme',
  heroDesc: isZh.value
    ? '默认提供鼠尾草浅黄配色，也可以把主色、辅助色和强调色替换成更贴合业务的方案。'
    : 'The default sage and pale-yellow palette can be replaced with business-specific primary, secondary and accent colors.',
  apply: isZh.value ? '应用主题' : 'Apply Theme',
  reset: isZh.value ? '恢复默认' : 'Reset',
  editor: isZh.value ? '主题编辑器' : 'Theme Editor',
  editorDesc: isZh.value
    ? '修改色值后点击应用，页面中的组件会立即读取新的 CSS 变量。'
    : 'Edit the colors and apply them. Components will read the updated CSS variables immediately.',
  primary: isZh.value ? '主色' : 'Primary',
  secondary: isZh.value ? '辅助色' : 'Secondary',
  accent: isZh.value ? '强调色' : 'Accent',
  variableTitle: isZh.value ? '主题变量' : 'Theme variables',
  variableDesc: isZh.value
    ? '当前主题会写入 :root，组件内部通过统一变量读取颜色、圆角和阴影。'
    : 'The current theme is written to :root, and components read color, radius and shadow from shared variables.',
  presets: isZh.value ? '推荐方案' : 'Presets',
  preview: isZh.value ? '实时预览' : 'Live Preview',
  save: isZh.value ? '保存' : 'Save',
  cancel: isZh.value ? '取消' : 'Cancel',
  enabled: isZh.value ? '已启用' : 'Enabled',
  previewTab: isZh.value ? '预览' : 'Preview',
  previewTitle: isZh.value ? '主题已生效' : 'Theme applied',
  previewDesc: isZh.value
    ? '按钮、标签、提示和输入框都会跟随当前变量变化。'
    : 'Buttons, tags, alerts and inputs follow the current variables.',
}))

function applyCurrentTheme(): void {
  applyTheme(createTheme({
    primary: themeForm.primary,
    secondary: themeForm.secondary,
    accent: themeForm.accent,
  }))
  setThemeMode(mode.value)
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
        <h1>{{ copy.title }}</h1>
        <p>{{ copy.heroDesc }}</p>
      </div>
      <my-space :size="10" wrap>
        <my-button type="primary" @click="applyCurrentTheme">
          {{ copy.apply }}
          <template #icon>
            <Check />
          </template>
        </my-button>
        <my-button @click="resetTheme">
          {{ copy.reset }}
          <template #icon>
            <RotateCcw />
          </template>
        </my-button>
      </my-space>
    </section>

    <section class="theme-layout">
      <div class="theme-editor">
        <h2>{{ copy.editor }}</h2>
        <p>{{ copy.editorDesc }}</p>

        <label class="color-row">
          <span>{{ copy.primary }}</span>
          <input v-model="themeForm.primary" type="color" :aria-label="copy.primary" />
          <my-input v-model="themeForm.primary" />
        </label>
        <label class="color-row">
          <span>{{ copy.secondary }}</span>
          <input v-model="themeForm.secondary" type="color" :aria-label="copy.secondary" />
          <my-input v-model="themeForm.secondary" />
        </label>
        <label class="color-row">
          <span>{{ copy.accent }}</span>
          <input v-model="themeForm.accent" type="color" :aria-label="copy.accent" />
          <my-input v-model="themeForm.accent" />
        </label>

        <my-alert
          :title="copy.variableTitle"
          :description="copy.variableDesc"
          type="info"
          show-icon
        />
      </div>

      <div class="theme-presets">
        <h2>{{ copy.presets }}</h2>
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
            <h3>{{ isZh ? preset.name : preset.nameEn }}</h3>
            <p>{{ isZh ? preset.description : preset.descriptionEn }}</p>
          </article>
        </div>

        <div class="theme-live-preview">
          <h2>{{ copy.preview }}</h2>
          <my-space :size="10" wrap>
            <my-button type="primary">{{ copy.save }}</my-button>
            <my-button>{{ copy.cancel }}</my-button>
            <my-tag type="success">{{ copy.enabled }}</my-tag>
          </my-space>
          <my-tabs model-value="preview">
            <my-tab-pane :label="copy.previewTab" name="preview">
              <my-alert
                :title="copy.previewTitle"
                :description="copy.previewDesc"
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
