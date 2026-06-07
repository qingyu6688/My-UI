<script setup lang="ts">
import { computed, ref } from 'vue'
import type { RateEmits, RateProps } from './rate'

defineOptions({
  name: 'MyRate',
})

const props = withDefaults(defineProps<RateProps>(), {
  modelValue: 0,
  max: 5,
  disabled: false,
  allowHalf: false,
  readonly: false,
  showText: false,
  texts: () => [],
})

const emit = defineEmits<RateEmits>()

const hoverValue = ref(0)
const isHovering = ref(false)

const currentValue = computed(() => (isHovering.value ? hoverValue.value : props.modelValue))

const stars = computed(() =>
  Array.from({ length: props.max }, (_, i) => {
    const index = i + 1
    if (currentValue.value >= index) return 'full'
    if (props.allowHalf && currentValue.value >= index - 0.5) return 'half'
    return 'empty'
  }),
)

const text = computed(() => {
  if (!props.showText) return ''
  const idx = Math.ceil(currentValue.value) - 1
  return props.texts[idx] ?? String(currentValue.value)
})

function locked(): boolean {
  return props.disabled || props.readonly
}

function handleMove(event: MouseEvent, index: number): void {
  if (locked()) return
  isHovering.value = true
  if (props.allowHalf) {
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const isLeft = event.clientX - rect.left < rect.width / 2
    hoverValue.value = isLeft ? index - 0.5 : index
  } else {
    hoverValue.value = index
  }
}

function handleLeave(): void {
  isHovering.value = false
}

function handleClick(): void {
  if (locked()) return
  const value = hoverValue.value
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div class="my-rate" :class="{ 'is-disabled': disabled || readonly }" @mouseleave="handleLeave">
    <span
      v-for="(state, index) in stars"
      :key="index"
      class="my-rate__item"
      :class="`is-${state}`"
      @mousemove="handleMove($event, index + 1)"
      @click="handleClick"
    >
      <span class="my-rate__star">★</span>
      <span v-if="state === 'half'" class="my-rate__star my-rate__star--half">★</span>
    </span>
    <span v-if="showText" class="my-rate__text">{{ text }}</span>
  </div>
</template>
