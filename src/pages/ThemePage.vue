<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { Check, Download, RotateCcw, Trash2, Upload } from 'lucide-vue-next'
import {
  applyTheme,
  createTheme,
  defaultThemeInput,
  type ThemeInput,
} from '../../packages/my-ui/index'
import { themePresets, type SiteThemePreset } from '../data/home'
import { useSiteLocale } from '../composables/use-site-locale'
import { useSiteThemeMode } from '../composables/use-site-theme-mode'

const THEME_INPUT_KEY = 'my-ui-theme-input'
const RECENT_THEMES_KEY = 'my-ui-recent-themes'
const MAX_RECENT = 5

interface RecentTheme extends Required<ThemeInput> {
  timestamp: number
}

const themeForm = reactive<Required<ThemeInput>>({
  primary: defaultThemeInput.primary,
  secondary: defaultThemeInput.secondary,
  accent: defaultThemeInput.accent,
})
const recentThemes = ref<RecentTheme[]>([])
const fileInputRef = ref<HTMLInputElement | null>(null)
const importError = ref<string>('')

const { isZh } = useSiteLocale()
const { mode, setThemeMode } = useSiteThemeMode()

const copy = computed(() => ({
  title: isZh.value ? '主题' : 'Theme',
  heroDesc: isZh.value
    ? '默认提供鼠尾草浅黄配色，也可以把主色、辅助色和强调色替换成更贴合业务的方案。'
    : 'The default sage and pale-yellow palette can be replaced with business-specific primary, secondary and accent colors.',
  apply: isZh.value ? '应用主题' : 'Apply Theme',
  reset: isZh.value ? '恢复默认' : 'Reset',
  exportJson: isZh.value ? '导出 JSON' : 'Export JSON',
  importJson: isZh.value ? '导入 JSON' : 'Import JSON',
  editor: isZh.value ? '主题编辑器' : 'Theme Editor',
  editorDesc: isZh.value
    ? '修改色值后点击应用，页面中的组件会立即读取新的 CSS 变量；当前主题会持久化到本地。'
    : 'Edit and apply colors to update component CSS variables. The current theme is persisted locally.',
  primary: isZh.value ? '主色' : 'Primary',
  secondary: isZh.value ? '辅助色' : 'Secondary',
  accent: isZh.value ? '强调色' : 'Accent',
  contrast: isZh.value ? '主色文字对比度（WCAG）' : 'Primary Contrast (WCAG)',
  contrastDesc: isZh.value
    ? '展示主色与白 / 黑文字的对比度。AA 正文需 ≥ 4.5，AAA 正文需 ≥ 7。'
    : 'Contrast of the primary color against white / black text. WCAG AA requires ≥ 4.5, AAA requires ≥ 7.',
  whiteText: isZh.value ? '白色文字' : 'White text',
  blackText: isZh.value ? '黑色文字' : 'Black text',
  variableTitle: isZh.value ? '主题变量' : 'Theme variables',
  variableDesc: isZh.value
    ? '当前主题会写入 :root，组件内部通过统一变量读取颜色、圆角和阴影。'
    : 'The current theme is written to :root, and components read color, radius and shadow from shared variables.',
  presets: isZh.value ? '推荐方案' : 'Presets',
  recent: isZh.value ? '最近主题' : 'Recent',
  recentEmpty: isZh.value
    ? '尚未应用过自定义主题，应用一次后会出现在这里。'
    : 'No themes applied yet. Apply a theme and it will show up here.',
  recentClear: isZh.value ? '清空记录' : 'Clear',
  preview: isZh.value ? '实时预览' : 'Live Preview',
  save: isZh.value ? '保存' : 'Save',
  cancel: isZh.value ? '取消' : 'Cancel',
  enabled: isZh.value ? '已启用' : 'Enabled',
  previewTab: isZh.value ? '预览' : 'Preview',
  previewTitle: isZh.value ? '主题已生效' : 'Theme applied',
  previewDesc: isZh.value
    ? '按钮、标签、提示和输入框都会跟随当前变量变化。'
    : 'Buttons, tags, alerts and inputs follow the current variables.',
  importErrorInvalid: isZh.value
    ? '导入失败：文件内容不是合法的主题 JSON。'
    : 'Import failed: file content is not a valid theme JSON.',
  importErrorRead: isZh.value ? '导入失败：文件读取异常。' : 'Import failed: cannot read file.',
}))

const contrastInfo = computed(() => {
  const ratioWhite = contrastRatio(themeForm.primary, '#ffffff')
  const ratioBlack = contrastRatio(themeForm.primary, '#000000')
  return {
    white: { ratio: ratioWhite, ...wcagLevel(ratioWhite) },
    black: { ratio: ratioBlack, ...wcagLevel(ratioBlack) },
  }
})

function applyCurrentTheme(): void {
  applyTheme(createTheme({
    primary: themeForm.primary,
    secondary: themeForm.secondary,
    accent: themeForm.accent,
  }))
  setThemeMode(mode.value)
  persistThemeInput()
  pushRecentTheme()
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

function applyRecent(item: RecentTheme): void {
  themeForm.primary = item.primary
  themeForm.secondary = item.secondary
  themeForm.accent = item.accent
  applyCurrentTheme()
}

function clearRecent(): void {
  recentThemes.value = []
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(RECENT_THEMES_KEY)
  }
}

function exportThemeAsJson(): void {
  const input = {
    primary: themeForm.primary,
    secondary: themeForm.secondary,
    accent: themeForm.accent,
  }
  const blob = new Blob([JSON.stringify(input, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `my-ui-theme-${Date.now()}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function triggerImport(): void {
  importError.value = ''
  fileInputRef.value?.click()
}

function handleImport(event: Event): void {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  target.value = ''
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result)) as ThemeInput
      if (!parsed || typeof parsed !== 'object') throw new Error('invalid')
      themeForm.primary = normalizeHex(parsed.primary) ?? themeForm.primary
      themeForm.secondary = normalizeHex(parsed.secondary) ?? themeForm.secondary
      themeForm.accent = normalizeHex(parsed.accent) ?? themeForm.accent
      applyCurrentTheme()
    } catch {
      importError.value = copy.value.importErrorInvalid
    }
  }
  reader.onerror = () => {
    importError.value = copy.value.importErrorRead
  }
  reader.readAsText(file)
}

function persistThemeInput(): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(
    THEME_INPUT_KEY,
    JSON.stringify({
      primary: themeForm.primary,
      secondary: themeForm.secondary,
      accent: themeForm.accent,
    }),
  )
}

function loadPersistedThemeInput(): Required<ThemeInput> | null {
  if (typeof localStorage === 'undefined') return null
  const raw = localStorage.getItem(THEME_INPUT_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as ThemeInput
    const primary = normalizeHex(parsed.primary)
    const secondary = normalizeHex(parsed.secondary)
    const accent = normalizeHex(parsed.accent)
    if (!primary || !secondary || !accent) return null
    return { primary, secondary, accent }
  } catch {
    return null
  }
}

function pushRecentTheme(): void {
  const next: RecentTheme = {
    primary: themeForm.primary,
    secondary: themeForm.secondary,
    accent: themeForm.accent,
    timestamp: Date.now(),
  }
  // 去重：按色值组合相等视为同一主题
  const filtered = recentThemes.value.filter(
    (item) =>
      !(
        item.primary === next.primary &&
        item.secondary === next.secondary &&
        item.accent === next.accent
      ),
  )
  recentThemes.value = [next, ...filtered].slice(0, MAX_RECENT)
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(RECENT_THEMES_KEY, JSON.stringify(recentThemes.value))
  }
}

function loadRecentThemes(): RecentTheme[] {
  if (typeof localStorage === 'undefined') return []
  const raw = localStorage.getItem(RECENT_THEMES_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (item): item is RecentTheme =>
          item &&
          typeof item.primary === 'string' &&
          typeof item.secondary === 'string' &&
          typeof item.accent === 'string',
      )
      .slice(0, MAX_RECENT)
  } catch {
    return []
  }
}

function normalizeHex(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed.toLowerCase()
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    const [, r, g, b] = trimmed
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase()
  }
  return null
}

function relativeLuminance(hex: string): number {
  const normalized = normalizeHex(hex) ?? '#000000'
  const r = parseInt(normalized.slice(1, 3), 16) / 255
  const g = parseInt(normalized.slice(3, 5), 16) / 255
  const b = parseInt(normalized.slice(5, 7), 16) / 255
  const toLinear = (v: number): number =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

function contrastRatio(color1: string, color2: string): number {
  const l1 = relativeLuminance(color1)
  const l2 = relativeLuminance(color2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function wcagLevel(ratio: number): { level: 'AAA' | 'AA' | 'AA Large' | 'Fail'; tone: string } {
  if (ratio >= 7) return { level: 'AAA', tone: 'success' }
  if (ratio >= 4.5) return { level: 'AA', tone: 'success' }
  if (ratio >= 3) return { level: 'AA Large', tone: 'warning' }
  return { level: 'Fail', tone: 'danger' }
}

onMounted(() => {
  const persisted = loadPersistedThemeInput()
  if (persisted) {
    themeForm.primary = persisted.primary
    themeForm.secondary = persisted.secondary
    themeForm.accent = persisted.accent
    applyTheme(createTheme(persisted))
  }
  recentThemes.value = loadRecentThemes()
})
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
        <my-button @click="exportThemeAsJson">
          {{ copy.exportJson }}
          <template #icon>
            <Download />
          </template>
        </my-button>
        <my-button @click="triggerImport">
          {{ copy.importJson }}
          <template #icon>
            <Upload />
          </template>
        </my-button>
        <input
          ref="fileInputRef"
          type="file"
          accept="application/json,.json"
          hidden
          @change="handleImport"
        />
      </my-space>
    </section>

    <my-alert
      v-if="importError"
      :title="importError"
      type="error"
      show-icon
      closable
      style="margin-bottom: 16px;"
      @close="importError = ''"
    />

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

        <div class="theme-contrast">
          <h3>{{ copy.contrast }}</h3>
          <p class="theme-contrast__desc">{{ copy.contrastDesc }}</p>
          <div class="theme-contrast__grid">
            <div
              class="theme-contrast__chip"
              :style="{ backgroundColor: themeForm.primary, color: '#ffffff' }"
            >
              <span class="theme-contrast__sample">Aa</span>
              <span class="theme-contrast__label">{{ copy.whiteText }}</span>
              <span class="theme-contrast__ratio">{{ contrastInfo.white.ratio.toFixed(2) }}</span>
              <my-tag :type="contrastInfo.white.tone" size="small">
                {{ contrastInfo.white.level }}
              </my-tag>
            </div>
            <div
              class="theme-contrast__chip"
              :style="{ backgroundColor: themeForm.primary, color: '#000000' }"
            >
              <span class="theme-contrast__sample">Aa</span>
              <span class="theme-contrast__label">{{ copy.blackText }}</span>
              <span class="theme-contrast__ratio">{{ contrastInfo.black.ratio.toFixed(2) }}</span>
              <my-tag :type="contrastInfo.black.tone" size="small">
                {{ contrastInfo.black.level }}
              </my-tag>
            </div>
          </div>
        </div>

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

        <div class="theme-recent">
          <div class="theme-recent__header">
            <h2>{{ copy.recent }}</h2>
            <my-button
              v-if="recentThemes.length"
              size="small"
              text
              @click="clearRecent"
            >
              {{ copy.recentClear }}
              <template #icon>
                <Trash2 />
              </template>
            </my-button>
          </div>
          <p v-if="!recentThemes.length" class="theme-recent__empty">
            {{ copy.recentEmpty }}
          </p>
          <div v-else class="theme-recent__list">
            <button
              v-for="(item, index) in recentThemes"
              :key="`${item.timestamp}-${index}`"
              type="button"
              class="theme-recent__item"
              @click="applyRecent(item)"
            >
              <div class="theme-swatch-row">
                <span :style="{ backgroundColor: item.primary }" />
                <span :style="{ backgroundColor: item.secondary }" />
                <span :style="{ backgroundColor: item.accent }" />
              </div>
              <code>{{ item.primary }}</code>
            </button>
          </div>
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
