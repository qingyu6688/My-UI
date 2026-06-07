<script setup lang="ts">
import { computed, ref } from 'vue'
import type { InputOtpEmits, InputOtpProps } from './input-otp'

defineOptions({
  name: 'MyInputOtp',
})

const props = withDefaults(defineProps<InputOtpProps>(), {
  modelValue: '',
  length: 6,
  disabled: false,
  type: 'text',
})

const emit = defineEmits<InputOtpEmits>()

const inputs = ref<HTMLInputElement[]>([])

const digits = computed(() => {
  const arr = (props.modelValue ?? '').split('')
  return Array.from({ length: props.length }, (_, i) => arr[i] ?? '')
})

function setRef(el: Element | null, index: number): void {
  if (el) inputs.value[index] = el as HTMLInputElement
}

function emitValue(chars: string[]): void {
  const value = chars.join('')
  emit('update:modelValue', value)
  if (value.length === props.length) emit('complete', value)
}

function onInput(event: Event, index: number): void {
  const target = event.target as HTMLInputElement
  let char = target.value.slice(-1)
  if (props.type === 'number' && !/\d/.test(char)) {
    target.value = digits.value[index]
    return
  }
  const next = [...digits.value]
  next[index] = char
  emitValue(next)
  if (char && index < props.length - 1) {
    inputs.value[index + 1]?.focus()
  }
}

function onKeydown(event: KeyboardEvent, index: number): void {
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    inputs.value[index - 1]?.focus()
  }
}

function onPaste(event: ClipboardEvent): void {
  event.preventDefault()
  const text = event.clipboardData?.getData('text') ?? ''
  const chars = text.slice(0, props.length).split('')
  if (props.type === 'number' && chars.some((c) => !/\d/.test(c))) return
  const next = Array.from({ length: props.length }, (_, i) => chars[i] ?? '')
  emitValue(next)
  const focusIndex = Math.min(chars.length, props.length - 1)
  inputs.value[focusIndex]?.focus()
}
</script>

<template>
  <div class="my-input-otp" :class="{ 'is-disabled': disabled }">
    <input
      v-for="(digit, index) in digits"
      :key="index"
      :ref="(el) => setRef(el as Element | null, index)"
      class="my-input-otp__cell"
      :value="digit"
      :disabled="disabled"
      :inputmode="type === 'number' ? 'numeric' : 'text'"
      maxlength="1"
      @input="onInput($event, index)"
      @keydown="onKeydown($event, index)"
      @paste="onPaste"
    />
  </div>
</template>
