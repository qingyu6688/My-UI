<script setup lang="ts">
import {
  computed,
  defineComponent,
  h,
  inject,
  nextTick,
  onBeforeUnmount,
  onErrorCaptured,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ref,
  shallowRef,
  toRef,
  toRefs,
  watch,
  watchEffect,
  type Component,
} from 'vue'
import { Copy, FileCode2, Play, RotateCcw } from 'lucide-vue-next'
import {
  Message,
  MessageBox,
  MyLoading,
  applyTheme,
  createTheme,
  defaultThemeInput,
  useTheme,
} from '../../packages/my-ui'
import { useSiteLocale } from '../composables/use-site-locale'

type PlaygroundTab = 'app' | 'css' | 'output'
type SetupState = Record<string, unknown>
const PLAYGROUND_RUNTIME_STYLE_ID = 'my-ui-playground-runtime-style'

// 注入到用户脚本中的 Vue / MyUI API
// 包含 Vue 编译器宏的运行时 noop：用户写 defineProps/defineEmits 等不会 ReferenceError
const noopMacro = (): Record<string, unknown> => ({})
const noopEmitMacro = (): (() => void) => () => undefined
const vueApi: Record<string, unknown> = {
  computed, h, inject, nextTick, onBeforeUnmount, onMounted, onUnmounted,
  provide, reactive, ref, shallowRef, toRef, toRefs, watch, watchEffect,
  // Vue 编译器宏的运行时 noop（避免 ReferenceError）
  defineProps: noopMacro,
  defineEmits: noopEmitMacro,
  defineModel: () => ref<unknown>(undefined),
  defineOptions: () => undefined,
  defineExpose: () => undefined,
  defineSlots: noopMacro,
  withDefaults: <T>(props: T): T => props,
}
// 站点级辅助：让用户直接复制 demo 文件代码到演练场也能跑（demo 文件里大量使用 text(zh, en)）
const localeApi = useSiteLocale()
const myUiApi: Record<string, unknown> = {
  Message, MessageBox, MyLoading,
  applyTheme, createTheme, defaultThemeInput, useTheme,
  // 站点国际化工具：text(zh, en) 立即返回当前语言对应的值
  useSiteLocale,
  text: localeApi.text,
  isZh: localeApi.isZh,
}
const VUE_API_NAMES = Object.keys(vueApi)
const MYUI_API_NAMES = Object.keys(myUiApi)

const defaultCode = [
  '<script setup lang="ts">',
  "import { reactive, ref } from 'vue'",
  '',
  "const msg = ref('Hello My UI!')",
  'const form = reactive({',
  "  name: 'My UI',",
  "  theme: 'sage',",
  '})',
  '</' + 'script>',
  '',
  '<template>',
  '  <div class="playground-demo">',
  '    <my-title :level="1">{{ msg }}</my-title>',
  '    <my-alert',
  '      title="Welcome to My UI Playground"',
  '      description="Edit the code on the left, then preview components on the right."',
  '      type="success"',
  '      show-icon',
  '    />',
  '',
  '    <my-space wrap>',
  '      <my-button type="primary">Primary</my-button>',
  '      <my-button>Default</my-button>',
  '      <my-tag type="success">Theme ready</my-tag>',
  '    </my-space>',
  '',
  '    <my-form :model="form" label-width="80px" class="playground-demo__form">',
  '      <my-form-item label="Name">',
  '        <my-input v-model="form.name" />',
  '      </my-form-item>',
  '      <my-form-item label="Theme">',
  '        <my-select v-model="form.theme" style="width: 180px;">',
  '          <my-option label="Sage" value="sage" />',
  '          <my-option label="Sea Salt" value="sea" />',
  '        </my-select>',
  '      </my-form-item>',
  '    </my-form>',
  '  </div>',
  '</template>',
  '',
  '<style>',
  '.playground-demo {',
  '  display: grid;',
  '  gap: 18px;',
  '  max-width: 720px;',
  '}',
  '',
  '.playground-demo__form {',
  '  max-width: 360px;',
  '}',
  '</style>',
].join('\n')

const { text } = localeApi
const sourceCode = ref(defaultCode)
const runtimeStyle = ref(extractBlock(defaultCode, 'style'))
const errorMessage = ref('')
const activeTab = ref<PlaygroundTab>('app')
const autoRun = ref(true)
const previewKey = ref(0)
const previewComponent = shallowRef<Component>(safeCreatePreview(defaultCode))
let runtimeStyleElement: HTMLStyleElement | null = null
let autoRunTimer: number | undefined

const copy = computed(() => ({
  title: text('My UI 演练场', 'My UI Playground'),
  subtitle: text('编辑示例代码，实时预览 My UI 组件效果。', 'Edit examples and preview My UI components in real time.'),
  appTab: 'App.vue',
  cssTab: 'CSS',
  outputTab: text('输出', 'Output'),
  run: text('运行', 'Run'),
  reset: text('重置', 'Reset'),
  copy: text('复制', 'Copy'),
  copied: text('代码已复制', 'Code copied'),
  autoRun: text('自动运行', 'Auto run'),
  preview: text('预览', 'Preview'),
  noError: text('暂无错误', 'No errors'),
  errorTitle: text('运行错误', 'Runtime error'),
  editorLabel: text('代码编辑器', 'Code editor'),
  previewLabel: text('组件预览', 'Component preview'),
  version: text('My UI 本地组件库 + Vue 3', 'My UI local library + Vue 3'),
}))

const lineNumbers = computed(() => sourceCode.value.split('\n').map((_, index) => index + 1))

watch(sourceCode, () => {
  if (!autoRun.value) return

  window.clearTimeout(autoRunTimer)
  autoRunTimer = window.setTimeout(() => {
    runCode()
  }, 320)
})

watch(
  runtimeStyle,
  (css) => {
    applyRuntimeStyle(css)
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (typeof document === 'undefined') return
  const element = runtimeStyleElement ?? document.getElementById(PLAYGROUND_RUNTIME_STYLE_ID)
  element?.remove()
  runtimeStyleElement = null
})

function extractBlock(source: string, tag: 'script' | 'template' | 'style'): string {
  const match = source.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  return match?.[1].trim() ?? ''
}

function getRuntimeStyleElement(): HTMLStyleElement | null {
  if (typeof document === 'undefined') return null

  const existing = document.getElementById(PLAYGROUND_RUNTIME_STYLE_ID) as HTMLStyleElement | null
  if (existing) {
    runtimeStyleElement = existing
    return existing
  }

  const element = document.createElement('style')
  element.id = PLAYGROUND_RUNTIME_STYLE_ID
  document.head.appendChild(element)
  runtimeStyleElement = element
  return element
}

function applyRuntimeStyle(css: string): void {
  if (typeof document === 'undefined') return

  if (!css.trim()) {
    const element = runtimeStyleElement ?? document.getElementById(PLAYGROUND_RUNTIME_STYLE_ID)
    element?.remove()
    runtimeStyleElement = null
    return
  }

  const element = getRuntimeStyleElement()
  if (element) {
    element.textContent = css
  }
}

function stripTsAnnotations(source: string): string {
  return source
    // 1) 类型断言 `as Foo<Bar>` → ''
    .replace(/\s+as\s+[A-Za-z_$][\w$<>,\s.[\]|&?]*?(?=[;,)\]\n}=])/g, '')
    // 2) 非空断言 `foo!` → 'foo'
    .replace(/([A-Za-z_$][\w$]*)!\b/g, '$1')
    // 3) 类型参数 `<T>(...)` 或 `<T = U>` → '' （函数泛型）
    .replace(/<\s*[A-Za-z_$][\w$,\s=|&]*?\s*>(?=\()/g, '')
    // 4) 形参/变量类型注解 `: SomeType` → ''（不跨 = 与 ,/)）
    .replace(/:\s*[A-Za-z_$][\w$<>,\s.[\]|&?]*?(?=[=,)\]\n;}])/g, '')
    // 5) interface / type 定义整段移除
    .replace(/\b(?:interface|type)\s+[A-Za-z_$][\w$]*[\s\S]*?(?:\}|;)\s*\n?/g, '')
    // 6) declare 整段
    .replace(/^\s*declare\s+[\s\S]*?(?:\}|;)\s*\n?/gm, '')
}

/**
 * 处理 import 语句：从已注入命名空间提取需要的名字，再剥离 import 行
 */
function processImports(source: string): { stripped: string; used: Set<string> } {
  const used = new Set<string>()
  const importRegex = /import\s+(?:type\s+)?(?:\{([^}]*)\}|\*\s+as\s+\w+|(\w+))(?:\s*,\s*\{([^}]*)\})?\s+from\s+['"]([^'"]+)['"];?/g

  const stripped = source.replace(importRegex, (_, named1, defaultImport, named2) => {
    const parts = [named1, named2].filter(Boolean).join(',')
    parts.split(',').forEach((raw) => {
      const name = raw.trim().split(/\s+as\s+/).pop()?.trim()
      if (name) used.add(name)
    })
    if (defaultImport) used.add(defaultImport)
    return ''
  })

  return { stripped, used }
}

function collectSetupBindings(source: string): string[] {
  const bindings = new Set<string>()
  const patterns = [
    // const / let / var Name
    /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)/g,
    // const { a, b: alias } = ...
    /\b(?:const|let|var)\s*\{([^}]+)\}\s*=/g,
    // const [a, b] = ...
    /\b(?:const|let|var)\s*\[([^\]]+)\]\s*=/g,
    // function Name
    /\bfunction\s+([A-Za-z_$][\w$]*)/g,
  ]

  patterns.forEach((pattern, idx) => {
    let match = pattern.exec(source)
    while (match) {
      if (idx === 1 || idx === 2) {
        // 解构
        match[1].split(',').forEach((raw) => {
          const name = raw.trim().split(/[:=\s]/)[0]?.trim()
          if (name && /^[A-Za-z_$][\w$]*$/.test(name)) bindings.add(name)
        })
      } else {
        bindings.add(match[1])
      }
      match = pattern.exec(source)
    }
  })

  return Array.from(bindings)
}

function createSetupState(script: string): SetupState {
  const { stripped: noImports } = processImports(script)
  const tsStripped = stripTsAnnotations(noImports)
  const normalized = tsStripped
    .replace(/export\s+default\s+[\s\S]*/g, '')
    .replace(/defineProps\s*<[^>]+>\s*\(\s*\)/g, '({})')
    .replace(/defineEmits\s*<[^>]+>\s*\(\s*\)/g, '(() => {})')
    .trim()

  if (!normalized) return {}

  const bindings = collectSetupBindings(normalized)
  // 用 IIFE 把用户脚本隔离到独立作用域。这样：
  //   1) 外层注入 const text = MyUI.text 与用户 const { text } = useSiteLocale() 不冲突
  //   2) 用户在内部 shadow 同名变量时正常工作，最后通过 return 上抛
  // 没有 IIFE 时，两个同名 const 在同一作用域会触发 SyntaxError（strict mode），
  // 然后 setup 返回 {}，模板里的 `text(...)` 就会报 "text is not a function"。
  const setupBody = `
    "use strict";
    const { ${VUE_API_NAMES.join(', ')} } = Vue;
    const { ${MYUI_API_NAMES.join(', ')} } = MyUI;
    return (function () {
      ${normalized}
      return { ${bindings.join(', ')} };
    })();
  `
  const setupFactory = new Function('Vue', 'MyUI', setupBody) as (
    vueApi: Record<string, unknown>,
    myUIApi: Record<string, unknown>,
  ) => SetupState

  return setupFactory(vueApi, myUiApi)
}

function formatError(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

function createPreviewComponent(source: string): Component {
  const template = extractBlock(source, 'template')
  const script = extractBlock(source, 'script')

  if (!template) {
    errorMessage.value = text('未找到 template 区块。', 'Template block was not found.')
    return createErrorComponent(errorMessage.value)
  }

  // 提前编译失败检测：用空 setup 试编译一次。若 template 语法有问题，
  // 立即降级为 error 组件，避免后续 patch 阶段访问 null subTree。
  return {
    name: 'PlaygroundRuntimePreview',
    setup() {
      try {
        const state = createSetupState(script)
        // setup 成功后立即清除上次的脚本错误（template 的运行时错误由错误边界捕获）
        if (errorMessage.value) errorMessage.value = ''
        return state
      } catch (error) {
        // 脚本失败时返回空 state，让模板里引用未定义变量被错误边界捕获
        errorMessage.value = formatError(error)
        return {}
      }
    },
    template,
  } as Component
}

/**
 * 永不抛错版：捕获 createPreviewComponent 本身的异常（如正则解析崩了），
 * 返回 error 组件，确保 PlaygroundPage 渲染流程不被打断。
 */
function safeCreatePreview(source: string): Component {
  try {
    return createPreviewComponent(source)
  } catch (error) {
    errorMessage.value = formatError(error)
    return createErrorComponent(errorMessage.value)
  }
}

/**
 * 错误边界组件：onErrorCaptured 拦截预览子树的渲染异常
 * 防止 Vue 内部访问已卸载实例的 subTree 触发 "null subTree" 错误
 */
const PreviewBoundary = defineComponent({
  name: 'PlaygroundPreviewBoundary',
  setup(_, { slots }) {
    const captured = shallowRef<string>('')

    onErrorCaptured((err) => {
      captured.value = formatError(err)
      errorMessage.value = captured.value
      // 阻止错误继续向上冒泡，避免触发 Vue 内核 null subTree
      return false
    })

    return () => {
      if (captured.value) {
        return h('div', { class: 'playground-runtime-error' }, captured.value)
      }
      return slots.default?.()
    }
  },
})

function createErrorComponent(message: string): Component {
  return {
    name: 'PlaygroundErrorPreview',
    render() {
      return h('div', { class: 'playground-runtime-error' }, message)
    },
  } as Component
}

function runCode(): void {
  errorMessage.value = ''
  runtimeStyle.value = extractBlock(sourceCode.value, 'style')
  previewComponent.value = safeCreatePreview(sourceCode.value)
  previewKey.value += 1
}

function resetCode(): void {
  sourceCode.value = defaultCode
  activeTab.value = 'app'
  runCode()
}

async function copyCode(): Promise<void> {
  await navigator.clipboard.writeText(sourceCode.value)
  Message.success(copy.value.copied)
}

function insertTab(event: KeyboardEvent): void {
  const target = event.target as HTMLTextAreaElement | null
  if (!target) return

  const start = target.selectionStart
  const end = target.selectionEnd
  sourceCode.value = `${sourceCode.value.slice(0, start)}  ${sourceCode.value.slice(end)}`

  void nextTick(() => {
    target.selectionStart = start + 2
    target.selectionEnd = start + 2
  })
}
</script>

<template>
  <main class="playground-page">
    <section class="playground-toolbar">
      <div class="playground-toolbar__brand">
        <span class="playground-toolbar__mark">
          <FileCode2 />
        </span>
        <div>
          <h1>{{ copy.title }}</h1>
          <p>{{ copy.subtitle }}</p>
        </div>
      </div>

      <div class="playground-toolbar__meta">
        <my-tag type="primary">{{ copy.version }}</my-tag>
        <label class="playground-auto-run">
          <span>{{ copy.autoRun }}</span>
          <my-switch v-model="autoRun" />
        </label>
        <my-button type="primary" @click="runCode">
          {{ copy.run }}
          <template #icon>
            <Play />
          </template>
        </my-button>
        <my-button @click="resetCode">
          {{ copy.reset }}
          <template #icon>
            <RotateCcw />
          </template>
        </my-button>
        <my-button @click="copyCode">
          {{ copy.copy }}
          <template #icon>
            <Copy />
          </template>
        </my-button>
      </div>
    </section>

    <section class="playground-workspace">
      <div class="playground-panel playground-panel--editor" :aria-label="copy.editorLabel">
        <div class="playground-tabs">
          <button
            type="button"
            class="playground-tab"
            :class="{ 'is-active': activeTab === 'app' }"
            @click="activeTab = 'app'"
          >
            {{ copy.appTab }}
          </button>
          <button
            type="button"
            class="playground-tab"
            :class="{ 'is-active': activeTab === 'css' }"
            @click="activeTab = 'css'"
          >
            {{ copy.cssTab }}
          </button>
          <button
            type="button"
            class="playground-tab"
            :class="{ 'is-active': activeTab === 'output' }"
            @click="activeTab = 'output'"
          >
            {{ copy.outputTab }}
          </button>
        </div>

        <div v-if="activeTab === 'app'" class="playground-editor">
          <div class="playground-editor__lines" aria-hidden="true">
            <span v-for="line in lineNumbers" :key="line">{{ line }}</span>
          </div>
          <textarea
            v-model="sourceCode"
            class="playground-editor__input"
            spellcheck="false"
            @keydown.tab.prevent="insertTab"
          />
        </div>

        <div v-else-if="activeTab === 'css'" class="playground-code-view">
          <pre><code>{{ runtimeStyle || '/* CSS will appear here after running the code. */' }}</code></pre>
        </div>

        <div v-else class="playground-output">
          <strong>{{ errorMessage ? copy.errorTitle : copy.noError }}</strong>
          <pre v-if="errorMessage">{{ errorMessage }}</pre>
        </div>
      </div>

      <div class="playground-panel playground-panel--preview" :aria-label="copy.previewLabel">
        <div class="playground-preview__head">
          <span>{{ copy.preview }}</span>
        </div>
        <div class="playground-preview__stage">
          <PreviewBoundary :key="previewKey">
            <component :is="previewComponent" />
          </PreviewBoundary>
        </div>
      </div>
    </section>
  </main>
</template>
