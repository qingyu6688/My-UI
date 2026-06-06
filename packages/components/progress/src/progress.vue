<script setup lang="ts">
import { computed } from 'vue'
import type { ProgressProps } from './progress'

defineOptions({
  name: 'MyProgress',
})

const props = withDefaults(defineProps<ProgressProps>(), {
  type: 'line',
  strokeWidth: 6,
  status: undefined,
  showText: true,
  textInside: false,
  width: 120,
  color: undefined,
})

const clamped = computed(() => Math.min(Math.max(props.percentage, 0), 100))

const barColor = computed(() => {
  if (props.color) return props.color
  switch (props.status) {
    case 'success':
      return 'var(--my-color-success)'
    case 'warning':
      return 'var(--my-color-warning)'
    case 'danger':
      return 'var(--my-color-danger)'
    default:
      return 'var(--my-color-primary)'
  }
})

// 圆形进度
const radius = computed(() => 50 - props.strokeWidth / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => circumference.value * (1 - clamped.value / 100))
</script>

<template>
  <div
    class="my-progress"
    :class="[`my-progress--${type}`, status ? `is-${status}` : '']"
    role="progressbar"
    :aria-valuenow="clamped"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <template v-if="type === 'line'">
      <div class="my-progress__track">
        <div
          class="my-progress__bar"
          :style="{ width: `${clamped}%`, background: barColor, height: `${strokeWidth}px` }"
        >
          <span v-if="showText && textInside" class="my-progress__text-inside">{{ clamped }}%</span>
        </div>
      </div>
      <span v-if="showText && !textInside" class="my-progress__text">{{ clamped }}%</span>
    </template>

    <template v-else>
      <div class="my-progress__circle" :style="{ width: `${width}px`, height: `${width}px` }">
        <svg viewBox="0 0 100 100">
          <circle
            class="my-progress__circle-track"
            cx="50"
            cy="50"
            :r="radius"
            fill="none"
            :stroke-width="strokeWidth"
          />
          <circle
            class="my-progress__circle-bar"
            cx="50"
            cy="50"
            :r="radius"
            fill="none"
            :stroke="barColor"
            :stroke-width="strokeWidth"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="dashOffset"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <span v-if="showText" class="my-progress__circle-text">{{ clamped }}%</span>
      </div>
    </template>
  </div>
</template>
