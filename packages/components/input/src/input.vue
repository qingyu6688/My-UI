<script setup lang="ts">
import { computed, ref, useAttrs, useSlots, type StyleValue } from 'vue'
import type { InputEmits, InputProps } from './input'

defineOptions({
  name: 'MyInput',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  size: 'default',
  placeholder: '',
  disabled: false,
  readonly: false,
  clearable: false,
  showPassword: false,
  showWordLimit: false,
  maxlength: undefined,
  rows: 3,
  autofocus: false,
  name: undefined,
  id: undefined,
})

const emit = defineEmits<InputEmits>()
const slots = useSlots()
const attrs = useAttrs()

const isFocused = ref(false)
const passwordVisible = ref(false)
const rootClass = computed(() => attrs.class)
const rootStyle = computed<StyleValue | undefined>(() => attrs.style as StyleValue | undefined)
const inputAttrs = computed(() => {
  const result: Record<string, unknown> = {}

  Object.entries(attrs).forEach(([key, value]) => {
    if (key !== 'class' && key !== 'style') {
      result[key] = value
    }
  })

  return result
})

const currentValue = computed(() => String(props.modelValue ?? ''))

const isTextarea = computed(() => props.type === 'textarea')

const actualType = computed(() => {
  if (props.type === 'password') {
    return passwordVisible.value ? 'text' : 'password'
  }
  return props.type
})

const showClear = computed(
  () =>
    props.clearable &&
    !props.disabled &&
    !props.readonly &&
    currentValue.value.length > 0 &&
    (isFocused.value || isHovering.value),
)

const showPasswordToggle = computed(
  () => props.showPassword && !props.disabled && !props.readonly && props.type === 'password',
)

const showWordCount = computed(
  () => props.showWordLimit && typeof props.maxlength === 'number',
)

const isHovering = ref(false)

function handleInput(event: Event): void {
  const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value
  emit('update:modelValue', value)
  emit('input', value)
}

function handleChange(event: Event): void {
  emit('change', (event.target as HTMLInputElement | HTMLTextAreaElement).value)
}

function handleFocus(event: FocusEvent): void {
  isFocused.value = true
  emit('focus', event)
}

function handleBlur(event: FocusEvent): void {
  isFocused.value = false
  emit('blur', event)
}

function clear(): void {
  emit('update:modelValue', '')
  emit('input', '')
  emit('change', '')
  emit('clear')
}

function togglePassword(): void {
  passwordVisible.value = !passwordVisible.value
}
</script>

<template>
  <div
    class="my-input"
    :class="[
      rootClass,
      `my-input--${size}`,
      {
        'is-textarea': isTextarea,
        'is-disabled': disabled,
        'is-focused': isFocused,
        'has-prefix': $slots.prefix,
        'has-suffix': $slots.suffix || showClear || showPasswordToggle,
      },
    ]"
    :style="rootStyle"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <template v-if="!isTextarea">
      <span v-if="slots.prefix" class="my-input__prefix">
        <slot name="prefix" />
      </span>
      <input
        :id="id"
        class="my-input__inner"
        :type="actualType"
        :value="currentValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :autofocus="autofocus"
        :name="name"
        v-bind="inputAttrs"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span class="my-input__suffix">
        <button
          v-if="showClear"
          type="button"
          class="my-input__action"
          aria-label="清空"
          @mousedown.prevent
          @click="clear"
        >
          ×
        </button>
        <button
          v-if="showPasswordToggle"
          type="button"
          class="my-input__action"
          :aria-label="passwordVisible ? '隐藏密码' : '显示密码'"
          @mousedown.prevent
          @click="togglePassword"
        >
          {{ passwordVisible ? '🙈' : '👁' }}
        </button>
        <span v-if="showWordCount" class="my-input__count">
          {{ currentValue.length }}/{{ maxlength }}
        </span>
        <slot name="suffix" />
      </span>
    </template>

    <template v-else>
      <textarea
        :id="id"
        class="my-input__inner my-input__textarea"
        :value="currentValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :rows="rows"
        :autofocus="autofocus"
        :name="name"
        v-bind="inputAttrs"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span v-if="showWordCount" class="my-input__count my-input__count--textarea">
        {{ currentValue.length }}/{{ maxlength }}
      </span>
    </template>
  </div>
</template>
