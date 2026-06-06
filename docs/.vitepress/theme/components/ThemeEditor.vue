<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import {
  createTheme,
  defaultThemeInput,
  themeToCssVars,
  useTheme,
} from '../../../../packages/my-ui/index'

// 与 packages/constants/theme.ts 中的 key 保持一致
const THEME_STORAGE_KEY = 'my-ui-theme'

interface ColorField {
  key: 'primary' | 'secondary' | 'accent'
  label: string
  hint: string
}

const COLOR_FIELDS: ColorField[] = [
  { key: 'primary', label: '主色', hint: '按钮、链接、选中态' },
  { key: 'secondary', label: '辅助色', hint: '成功、轻量背景' },
  { key: 'accent', label: '强调色', hint: '弱警告、空状态' },
]

const DERIVED_KEYS = [
  { key: 'primaryActive', label: 'active' },
  { key: 'primary', label: 'base' },
  { key: 'primaryHover', label: 'hover' },
  { key: 'primaryLight3', label: 'light-3' },
  { key: 'primaryLight5', label: 'light-5' },
  { key: 'primaryLight7', label: 'light-7' },
  { key: 'primaryLight9', label: 'light-9' },
] as const

const { setTheme, resetTheme } = useTheme()

const form = reactive({
  primary: defaultThemeInput.primary,
  secondary: defaultThemeInput.secondary,
  accent: defaultThemeInput.accent,
})

const copied = ref(false)
const switchOn = ref(true)

const derivedTheme = computed(() => createTheme({ ...form }))

const cssVarsText = computed(() => {
  const vars = themeToCssVars(derivedTheme.value)
  const body = Object.entries(vars)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n')
  return `:root {\n${body}\n}`
})

const jsonText = computed(() =>
  JSON.stringify({ primary: form.primary, secondary: form.secondary, accent: form.accent }, null, 2),
)

function apply(): void {
  setTheme({ primary: form.primary, secondary: form.secondary, accent: form.accent })
}

function restore(): void {
  form.primary = defaultThemeInput.primary
  form.secondary = defaultThemeInput.secondary
  form.accent = defaultThemeInput.accent
  resetTheme()
}

async function copyCss(): Promise<void> {
  try {
    await navigator.clipboard.writeText(cssVarsText.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    copied.value = false
  }
}

onMounted(() => {
  // 恢复上次保存的主题（仅取三个输入色）
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<typeof form>
      if (parsed.primary) form.primary = parsed.primary
      if (parsed.secondary) form.secondary = parsed.secondary
      if (parsed.accent) form.accent = parsed.accent
    }
  } catch {
    // 忽略损坏的本地数据
  }
  apply()
})
</script>

<template>
  <div class="theme-editor">
    <section class="theme-editor__panel">
      <h3>主题色</h3>
      <div v-for="field in COLOR_FIELDS" :key="field.key" class="theme-editor__field">
        <input
          v-model="form[field.key]"
          type="color"
          :aria-label="field.label"
          @input="apply"
        />
        <div class="theme-editor__field-meta">
          <span class="theme-editor__field-label">{{ field.label }}</span>
          <span class="theme-editor__field-hint">{{ field.hint }}</span>
        </div>
        <code>{{ form[field.key] }}</code>
      </div>

      <h4>主色派生</h4>
      <div class="theme-editor__ramp">
        <div
          v-for="item in DERIVED_KEYS"
          :key="item.key"
          class="theme-editor__ramp-item"
          :style="{ background: derivedTheme[item.key] }"
          :title="`${item.label} ${derivedTheme[item.key]}`"
        />
      </div>

      <div class="theme-editor__actions">
        <my-button type="primary" @click="apply">应用</my-button>
        <my-button @click="restore">恢复默认</my-button>
        <my-button type="primary" plain @click="copyCss">
          {{ copied ? '已复制' : '复制 CSS Variables' }}
        </my-button>
      </div>
    </section>

    <section class="theme-editor__preview">
      <h3>组件预览</h3>

      <div class="theme-editor__block">
        <span class="theme-editor__block-title">按钮</span>
        <my-space wrap>
          <my-button type="primary">主要</my-button>
          <my-button type="success">成功</my-button>
          <my-button type="warning">警告</my-button>
          <my-button type="danger">危险</my-button>
          <my-button type="primary" plain>朴素</my-button>
          <my-button type="primary" disabled>禁用</my-button>
          <my-button type="primary" loading>加载</my-button>
        </my-space>
      </div>

      <div class="theme-editor__block">
        <span class="theme-editor__block-title">标签与提示</span>
        <my-space wrap>
          <my-tag type="primary">主色标签</my-tag>
          <my-tag type="success">成功</my-tag>
          <my-tag type="warning" effect="dark">深色</my-tag>
        </my-space>
        <my-alert type="success" title="主题色已实时应用到所有组件" show-icon style="margin-top: 12px;" />
      </div>

      <div class="theme-editor__block">
        <span class="theme-editor__block-title">表单</span>
        <my-space wrap align="center">
          <my-input placeholder="输入框" style="width: 180px;" />
          <my-switch v-model="switchOn" />
          <my-radio-group :model-value="'a'">
            <my-radio value="a">选项 A</my-radio>
            <my-radio value="b">选项 B</my-radio>
          </my-radio-group>
        </my-space>
      </div>
    </section>

    <section class="theme-editor__export">
      <div class="theme-editor__export-col">
        <h4>主题 JSON</h4>
        <pre>{{ jsonText }}</pre>
      </div>
      <div class="theme-editor__export-col">
        <h4>CSS Variables</h4>
        <pre>{{ cssVarsText }}</pre>
      </div>
    </section>
  </div>
</template>

<style scoped>
.theme-editor {
  display: grid;
  gap: 20px;
  margin-top: 16px;
}

.theme-editor__panel,
.theme-editor__preview,
.theme-editor__export {
  border: 1px solid var(--my-border-color-light, #ecf2e7);
  border-radius: 8px;
  padding: 16px;
  background: var(--my-bg-color, #fff);
}

.theme-editor__panel h3,
.theme-editor__preview h3 {
  margin: 0 0 12px;
  font-size: 16px;
}

.theme-editor__panel h4 {
  margin: 16px 0 8px;
  font-size: 14px;
  color: var(--my-text-color-secondary, #6f7a71);
}

.theme-editor__field {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.theme-editor__field input[type='color'] {
  width: 40px;
  height: 32px;
  border: 1px solid var(--my-border-color, #dce7d6);
  border-radius: 6px;
  background: none;
  cursor: pointer;
  padding: 2px;
}

.theme-editor__field-meta {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.theme-editor__field-label {
  font-weight: 600;
}

.theme-editor__field-hint {
  font-size: 12px;
  color: var(--my-text-color-secondary, #6f7a71);
}

.theme-editor__ramp {
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--my-border-color-light, #ecf2e7);
}

.theme-editor__ramp-item {
  flex: 1;
  height: 36px;
}

.theme-editor__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.theme-editor__block {
  margin-bottom: 16px;
}

.theme-editor__block-title {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  color: var(--my-text-color-secondary, #6f7a71);
}

.theme-editor__export {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.theme-editor__export h4 {
  margin: 0 0 8px;
  font-size: 14px;
}

.theme-editor__export pre {
  margin: 0;
  max-height: 280px;
  overflow: auto;
  padding: 12px;
  border-radius: 6px;
  background: var(--my-bg-color-soft, #f5f8ef);
  font-size: 12px;
  line-height: 1.5;
}

@media (max-width: 720px) {
  .theme-editor__export {
    grid-template-columns: 1fr;
  }
}
</style>
