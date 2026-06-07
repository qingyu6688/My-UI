<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import type { WatermarkProps } from './watermark'

defineOptions({
  name: 'MyWatermark',
})

const props = withDefaults(defineProps<WatermarkProps>(), {
  content: '',
  font: () => ({ color: 'rgba(38, 51, 43, 0.12)', fontSize: 16 }),
  rotate: -22,
  gap: () => [120, 100],
  zIndex: 9,
})

// 用 SVG 生成可平铺的水印背景图
const backgroundImage = computed(() => {
  const [gapX, gapY] = props.gap
  const color = props.font.color ?? 'rgba(38, 51, 43, 0.12)'
  const fontSize = props.font.fontSize ?? 16
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${gapX}" height="${gapY}">
    <text x="0" y="${gapY / 2}" fill="${color}" font-size="${fontSize}" transform="rotate(${props.rotate} 0 ${gapY / 2})">${props.content}</text>
  </svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
})

const overlayStyle = computed<CSSProperties>(() => ({
  backgroundImage: backgroundImage.value,
  zIndex: props.zIndex,
}))
</script>

<template>
  <div class="my-watermark">
    <slot />
    <div class="my-watermark__overlay" :style="overlayStyle" aria-hidden="true" />
  </div>
</template>
