<script setup lang="ts">
const themeColors = [
  { name: '--my-color-primary', label: '主色' },
  { name: '--my-color-primary-hover', label: '主色 hover' },
  { name: '--my-color-primary-active', label: '主色 active' },
  { name: '--my-color-primary-light-3', label: '主色 light-3' },
  { name: '--my-color-primary-light-5', label: '主色 light-5' },
  { name: '--my-color-primary-light-7', label: '主色 light-7' },
  { name: '--my-color-primary-light-9', label: '主色 light-9' },
]

const semanticColors = [
  { name: '--my-color-success', label: '成功' },
  { name: '--my-color-warning', label: '警告' },
  { name: '--my-color-danger', label: '危险' },
  { name: '--my-color-info', label: '信息' },
]

const accentColors = [
  { name: '--my-color-secondary', label: '辅助色' },
  { name: '--my-color-accent', label: '强调色' },
]

const textColors = [
  { name: '--my-text-color-primary', label: '主要文字' },
  { name: '--my-text-color-regular', label: '常规文字' },
  { name: '--my-text-color-secondary', label: '次要文字' },
]
</script>

<template>
  <div class="color-palette">
    <section>
      <h4>主题色派生（鼠尾草浅黄）</h4>
      <div class="color-palette__row">
        <div v-for="c in themeColors" :key="c.name" class="color-palette__swatch">
          <div class="color-palette__chip" :style="{ background: `var(${c.name})` }" />
          <span class="color-palette__label">{{ c.label }}</span>
          <code>{{ c.name }}</code>
        </div>
      </div>
    </section>

    <section>
      <h4>辅助色 / 强调色</h4>
      <div class="color-palette__row">
        <div v-for="c in accentColors" :key="c.name" class="color-palette__swatch">
          <div class="color-palette__chip" :style="{ background: `var(${c.name})` }" />
          <span class="color-palette__label">{{ c.label }}</span>
          <code>{{ c.name }}</code>
        </div>
      </div>
    </section>

    <section>
      <h4>语义色</h4>
      <div class="color-palette__row">
        <div v-for="c in semanticColors" :key="c.name" class="color-palette__swatch">
          <div class="color-palette__chip" :style="{ background: `var(${c.name})` }" />
          <span class="color-palette__label">{{ c.label }}</span>
          <code>{{ c.name }}</code>
        </div>
      </div>
    </section>

    <section>
      <h4>文字色</h4>
      <div class="color-palette__row">
        <div v-for="c in textColors" :key="c.name" class="color-palette__swatch">
          <div class="color-palette__chip" :style="{ background: `var(${c.name})` }" />
          <span class="color-palette__label">{{ c.label }}</span>
          <code>{{ c.name }}</code>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.color-palette {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.color-palette h4 {
  margin: 0 0 12px;
  color: var(--my-text-color-primary);
}
.color-palette__row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}
.color-palette__swatch {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px;
  border: 1px solid var(--my-border-color-light);
  border-radius: 8px;
  background: var(--my-bg-color);
}
.color-palette__chip {
  width: 100%;
  height: 48px;
  border-radius: 6px;
  border: 1px solid var(--my-border-color-light);
}
.color-palette__label {
  font-size: 13px;
  color: var(--my-text-color-primary);
  font-weight: 600;
}
.color-palette code {
  font-size: 11px;
  color: var(--my-text-color-secondary);
  word-break: break-all;
}
</style>
