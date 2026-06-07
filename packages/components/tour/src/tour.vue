<script setup lang="ts">
import { computed, nextTick, ref, watch, type CSSProperties } from 'vue'
import { MyButton } from '../../button'
import type { TourEmits, TourProps } from './tour'

defineOptions({
  name: 'MyTour',
})

const props = withDefaults(defineProps<TourProps>(), {
  modelValue: false,
  current: 0,
})

const emit = defineEmits<TourEmits>()

const innerCurrent = ref(props.current)
const targetRect = ref<DOMRect | null>(null)

const step = computed(() => props.steps[innerCurrent.value])
const isLast = computed(() => innerCurrent.value >= props.steps.length - 1)

function measure(): void {
  const target = step.value ? document.querySelector(step.value.target) : null
  targetRect.value = target ? target.getBoundingClientRect() : null
}

watch(
  () => [props.modelValue, props.current] as const,
  ([open, current]) => {
    innerCurrent.value = current
    if (open) void nextTick(measure)
  },
)

watch(innerCurrent, () => void nextTick(measure))

const highlightStyle = computed<CSSProperties>(() => {
  const rect = targetRect.value
  if (!rect) return { display: 'none' }
  const pad = 4
  return {
    top: `${rect.top - pad + window.scrollY}px`,
    left: `${rect.left - pad + window.scrollX}px`,
    width: `${rect.width + pad * 2}px`,
    height: `${rect.height + pad * 2}px`,
  }
})

const popperStyle = computed<CSSProperties>(() => {
  const rect = targetRect.value
  if (!rect) return { top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }
  return {
    top: `${rect.bottom + 12 + window.scrollY}px`,
    left: `${rect.left + window.scrollX}px`,
  }
})

function setCurrent(value: number): void {
  innerCurrent.value = value
  emit('update:current', value)
  emit('change', value)
}

function next(): void {
  if (isLast.value) {
    finish()
    return
  }
  setCurrent(innerCurrent.value + 1)
}

function prev(): void {
  if (innerCurrent.value > 0) setCurrent(innerCurrent.value - 1)
}

function close(): void {
  emit('update:modelValue', false)
  emit('close')
}

function finish(): void {
  emit('update:modelValue', false)
  emit('finish')
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="my-tour">
      <div class="my-tour__mask" />
      <div class="my-tour__highlight" :style="highlightStyle" />
      <div class="my-tour__popper" :style="popperStyle">
        <div v-if="step?.title" class="my-tour__title">{{ step.title }}</div>
        <div v-if="step?.description" class="my-tour__desc">{{ step.description }}</div>
        <div class="my-tour__footer">
          <span class="my-tour__counter">{{ innerCurrent + 1 }} / {{ steps.length }}</span>
          <div class="my-tour__actions">
            <my-button size="small" text @click="close">跳过</my-button>
            <my-button v-if="innerCurrent > 0" size="small" @click="prev">上一步</my-button>
            <my-button size="small" type="primary" @click="next">
              {{ isLast ? '完成' : '下一步' }}
            </my-button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
