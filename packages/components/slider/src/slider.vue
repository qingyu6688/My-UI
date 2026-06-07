<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SliderEmits, SliderProps } from './slider'

defineOptions({
  name: 'MySlider',
})

const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  showTooltip: true,
  showStops: false,
})

const emit = defineEmits<SliderEmits>()

const trackRef = ref<HTMLElement | null>(null)
const dragging = ref(false)

const percentage = computed(() => {
  const range = props.max - props.min
  if (range <= 0) return 0
  return ((props.modelValue - props.min) / range) * 100
})

const stops = computed(() => {
  if (!props.showStops || props.step <= 0) return []
  const count = Math.floor((props.max - props.min) / props.step) - 1
  return Array.from({ length: Math.max(count, 0) }, (_, i) => ((i + 1) * props.step / (props.max - props.min)) * 100)
})

function setByClientX(clientX: number): void {
  const track = trackRef.value
  if (!track) return
  const rect = track.getBoundingClientRect()
  let ratio = (clientX - rect.left) / rect.width
  ratio = Math.min(Math.max(ratio, 0), 1)
  const raw = props.min + ratio * (props.max - props.min)
  const stepped = Math.round(raw / props.step) * props.step
  const value = Math.min(Math.max(stepped, props.min), props.max)
  if (value !== props.modelValue) {
    emit('update:modelValue', value)
    emit('change', value)
  }
}

function onTrackClick(event: MouseEvent): void {
  if (props.disabled) return
  setByClientX(event.clientX)
}

function onMouseMove(event: MouseEvent): void {
  if (!dragging.value) return
  setByClientX(event.clientX)
}

function onMouseUp(): void {
  dragging.value = false
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
}

function onThumbDown(): void {
  if (props.disabled) return
  dragging.value = true
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

function onKeydown(event: KeyboardEvent): void {
  if (props.disabled) return
  let value = props.modelValue
  if (event.key === 'ArrowRight' || event.key === 'ArrowUp') value += props.step
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') value -= props.step
  else return
  event.preventDefault()
  value = Math.min(Math.max(value, props.min), props.max)
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div class="my-slider" :class="{ 'is-disabled': disabled }">
    <div ref="trackRef" class="my-slider__track" @click="onTrackClick">
      <div class="my-slider__fill" :style="{ width: `${percentage}%` }" />
      <span
        v-for="(stop, index) in stops"
        :key="index"
        class="my-slider__stop"
        :style="{ left: `${stop}%` }"
      />
      <div
        class="my-slider__thumb"
        :style="{ left: `${percentage}%` }"
        role="slider"
        tabindex="0"
        :aria-valuenow="modelValue"
        :aria-valuemin="min"
        :aria-valuemax="max"
        @mousedown="onThumbDown"
        @keydown="onKeydown"
      >
        <span v-if="showTooltip" class="my-slider__tooltip">{{ modelValue }}</span>
      </div>
    </div>
  </div>
</template>
