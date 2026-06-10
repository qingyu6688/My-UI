<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { useSize } from '../../../hooks/use-config'
import { formContextKey } from '../../form/src/form'
import type { InputNumberEmits, InputNumberProps } from './input-number'

defineOptions({
  name: 'MyInputNumber',
})

const props = withDefaults(defineProps<InputNumberProps>(), {
  modelValue: undefined,
  min: -Infinity,
  max: Infinity,
  step: 1,
  precision: undefined,
  size: undefined,
  disabled: false,
  readonly: false,
  placeholder: '',
  controls: true,
  name: undefined,
  id: undefined,
})

const form = inject(formContextKey, undefined)
const actualSize = useSize(props, computed(() => form?.size.value))

const emit = defineEmits<InputNumberEmits>()

const displayValue = ref<string>(formatDisplay(props.modelValue))

watch(
  () => props.modelValue,
  (value) => {
    displayValue.value = formatDisplay(value)
  },
)

const incrementDisabled = computed(() => {
  if (props.disabled || props.readonly) return true
  const current = props.modelValue ?? props.min
  return typeof current === 'number' && current + props.step > props.max
})

const decrementDisabled = computed(() => {
  if (props.disabled || props.readonly) return true
  const current = props.modelValue ?? props.max
  return typeof current === 'number' && current - props.step < props.min
})

function formatDisplay(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return ''
  }
  if (typeof props.precision === 'number') {
    return value.toFixed(props.precision)
  }
  return String(value)
}

function clamp(value: number): number {
  return Math.min(Math.max(value, props.min), props.max)
}

function applyPrecision(value: number): number {
  if (typeof props.precision !== 'number') {
    return value
  }
  return Number(value.toFixed(props.precision))
}

function commit(next: number | null): void {
  const oldValue = props.modelValue ?? null
  emit('update:modelValue', next)
  emit('change', next, oldValue)
}

function increment(): void {
  if (incrementDisabled.value) return
  const base = props.modelValue ?? Math.max(props.min, 0)
  commit(applyPrecision(clamp(base + props.step)))
}

function decrement(): void {
  if (decrementDisabled.value) return
  const base = props.modelValue ?? Math.min(props.max, 0)
  commit(applyPrecision(clamp(base - props.step)))
}

function handleInput(event: Event): void {
  displayValue.value = (event.target as HTMLInputElement).value
}

function handleBlur(event: FocusEvent): void {
  const raw = displayValue.value.trim()
  if (raw === '') {
    commit(null)
    displayValue.value = ''
  } else {
    const parsed = Number(raw)
    if (Number.isNaN(parsed)) {
      displayValue.value = formatDisplay(props.modelValue)
    } else {
      const next = applyPrecision(clamp(parsed))
      commit(next)
      displayValue.value = formatDisplay(next)
    }
  }
  emit('blur', event)
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    increment()
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    decrement()
  }
}
</script>

<template>
  <div
    class="my-input-number"
    :class="[
      `my-input-number--${actualSize}`,
      {
        'is-disabled': disabled,
        'is-without-controls': !controls,
      },
    ]"
  >
    <button
      v-if="controls"
      type="button"
      class="my-input-number__decrement"
      :disabled="decrementDisabled"
      aria-label="减少"
      @click="decrement"
    >
      −
    </button>
    <input
      :id="id"
      class="my-input-number__inner"
      type="text"
      inputmode="decimal"
      :value="displayValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :name="name"
      @input="handleInput"
      @blur="handleBlur"
      @focus="emit('focus', $event)"
      @keydown="handleKeydown"
    />
    <button
      v-if="controls"
      type="button"
      class="my-input-number__increment"
      :disabled="incrementDisabled"
      aria-label="增加"
      @click="increment"
    >
      +
    </button>
  </div>
</template>
