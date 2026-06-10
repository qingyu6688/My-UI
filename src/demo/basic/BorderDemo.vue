<script setup lang="ts">
const borderTokens = [
  { name: '--my-border-color', desc: '默认边框色' },
  { name: '--my-border-color-light', desc: '浅色边框' },
  { name: '--my-fill-color-light', desc: '浅填充' },
]

const radiusTokens = [
  { name: '--my-radius-small', size: 4, desc: '小圆角' },
  { name: '--my-radius-base', size: 6, desc: '常规圆角' },
  { name: '--my-radius-round', size: 999, desc: '胶囊圆角' },
]

const shadowTokens = [
  { name: '--my-shadow-light', desc: '轻量阴影' },
]
</script>

<template>
  <div class="border-tokens">
    <section>
      <h4>圆角</h4>
      <div class="border-tokens__grid">
        <div v-for="token in radiusTokens" :key="token.name" class="border-tokens__item">
          <div
            class="border-tokens__radius"
            :style="{ borderRadius: `var(${token.name})` }"
          />
          <code>{{ token.name }}</code>
          <span>{{ token.desc }}（{{ token.size }}px）</span>
        </div>
      </div>
    </section>

    <section>
      <h4>边框色</h4>
      <div class="border-tokens__grid">
        <div v-for="token in borderTokens" :key="token.name" class="border-tokens__item">
          <div class="border-tokens__border" :style="{ borderColor: `var(${token.name})` }" />
          <code>{{ token.name }}</code>
          <span>{{ token.desc }}</span>
        </div>
      </div>
    </section>

    <section>
      <h4>阴影</h4>
      <div class="border-tokens__grid">
        <div v-for="token in shadowTokens" :key="token.name" class="border-tokens__item">
          <div class="border-tokens__shadow" :style="{ boxShadow: `var(${token.name})` }" />
          <code>{{ token.name }}</code>
          <span>{{ token.desc }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.border-tokens {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.border-tokens h4 {
  margin: 0 0 12px;
  color: var(--my-text-color-primary);
}
.border-tokens__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}
.border-tokens__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px;
  border: 1px solid var(--my-border-color-light);
  border-radius: 8px;
  background: var(--my-bg-color);
}
.border-tokens__radius,
.border-tokens__border,
.border-tokens__shadow {
  width: 80px;
  height: 50px;
  background: var(--my-color-primary-light-9);
}
.border-tokens__border {
  background: var(--my-bg-color);
  border: 1px solid;
  border-radius: 6px;
}
.border-tokens__shadow {
  background: var(--my-bg-color);
  border-radius: 6px;
}
.border-tokens code {
  font-size: 12px;
  color: var(--my-color-primary-active);
}
.border-tokens span {
  font-size: 12px;
  color: var(--my-text-color-secondary);
}
</style>
