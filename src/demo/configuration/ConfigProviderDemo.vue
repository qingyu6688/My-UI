<script setup lang="ts">
import { computed, ref } from 'vue'
import { en, zhCn, type ComponentSize } from '../../../packages/my-ui'
import ConfigStatus from './ConfigStatus.vue'

const size = ref<ComponentSize>('default')
const zIndex = ref(2000)
const localeName = ref<'zh-cn' | 'en'>('zh-cn')

const locale = computed(() => (localeName.value === 'en' ? en : zhCn))
const tooltipContent = computed(() =>
  localeName.value === 'en'
    ? `Tooltip from ConfigProvider (zIndex: ${zIndex.value})`
    : `来自 ConfigProvider 的提示（z-index：${zIndex.value}）`,
)
</script>

<template>
  <div class="cp-demo">
    <!-- 控件区：不在 ConfigProvider 内，避免被全局尺寸影响 -->
    <div class="cp-demo__controls">
      <div class="cp-demo__row">
        <span class="cp-demo__label">size</span>
        <my-radio-group v-model="size">
          <my-radio value="small">small</my-radio>
          <my-radio value="default">default</my-radio>
          <my-radio value="large">large</my-radio>
        </my-radio-group>
      </div>
      <div class="cp-demo__row">
        <span class="cp-demo__label">zIndex</span>
        <my-radio-group v-model="zIndex">
          <my-radio :value="1000">1000</my-radio>
          <my-radio :value="2000">2000</my-radio>
          <my-radio :value="3000">3000</my-radio>
        </my-radio-group>
      </div>
      <div class="cp-demo__row">
        <span class="cp-demo__label">locale</span>
        <my-radio-group v-model="localeName">
          <my-radio value="zh-cn">中文（zhCn）</my-radio>
          <my-radio value="en">English（en）</my-radio>
        </my-radio-group>
      </div>
    </div>

    <!-- 演示区：ConfigProvider 包裹 -->
    <my-config-provider :size="size" :z-index="zIndex" :locale="locale">
      <div class="cp-demo__panel">
        <div class="cp-demo__section">
          <p class="cp-demo__hint">通过 <code>useConfig()</code> 读到的当前上下文：</p>
          <ConfigStatus />
        </div>

        <div class="cp-demo__section">
          <p class="cp-demo__hint">
            <code>size</code> 通过 <code>useSize()</code> 注入，按钮 / 输入框尺寸自动跟随：
          </p>
          <my-space>
            <my-button type="primary">主按钮</my-button>
            <my-button>次按钮</my-button>
            <my-input placeholder="输入内容" style="width: 200px;" />
          </my-space>
        </div>

        <div class="cp-demo__section">
          <p class="cp-demo__hint">
            <code>zIndex</code> 通过 <code>useZIndex()</code> 注入，弹层基准层级跟随：
          </p>
          <my-space>
            <my-tooltip :content="tooltipContent" placement="top">
              <my-button>悬停查看 Tooltip</my-button>
            </my-tooltip>
            <my-popover trigger="click" placement="bottom">
              <template #reference>
                <my-button>点击查看 Popover</my-button>
              </template>
              <div style="min-width: 180px;">
                <p style="margin: 0 0 4px;">Popover 内容</p>
                <p style="margin: 0; font-size: 12px; color: var(--my-text-color-secondary, #909399);">
                  z-index: {{ zIndex }}
                </p>
              </div>
            </my-popover>
          </my-space>
        </div>

        <div class="cp-demo__section">
          <p class="cp-demo__hint">
            <code>locale</code> 通过 <code>useLocale()</code> 注入，当前语言：
            <strong>{{ locale.name }}</strong>，确认 / 取消文案为
            <code>{{ locale.common.confirm }}</code> / <code>{{ locale.common.cancel }}</code>。
          </p>
        </div>
      </div>
    </my-config-provider>
  </div>
</template>

<style scoped>
.cp-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.cp-demo__controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 14px;
  border: 1px solid var(--my-border-color-light, #e4e7ed);
  border-radius: 6px;
  background: var(--my-bg-color-page, #f5f7fa);
}
.cp-demo__row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.cp-demo__label {
  width: 60px;
  font-size: 13px;
  color: var(--my-text-color-secondary, #909399);
  font-family: 'JetBrains Mono', 'Fira Code', Menlo, Consolas, monospace;
}
.cp-demo__panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.cp-demo__section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cp-demo__hint {
  margin: 0;
  font-size: 13px;
  color: var(--my-text-color-regular, #606266);
}
.cp-demo__hint code {
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--my-fill-color-light, #f0f2f5);
  font-family: 'JetBrains Mono', 'Fira Code', Menlo, Consolas, monospace;
  font-size: 12px;
}
</style>
