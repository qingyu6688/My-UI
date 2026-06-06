<script setup lang="ts">
import { computed, inject } from 'vue'
import {
  checkboxGroupKey,
  type CheckboxEmits,
  type CheckboxProps,
  type CheckboxValue,
} from './checkbox'

defineOptions({
  name: 'MyCheckbox',
})

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: undefined,
  value: undefined,
  label: undefined,
  trueValue: true,
  falseValue: false,
  indeterminate: false,
  disabled: false,
  size: 'default',
  name: undefined,
  border: false,
})

const emit = defineEmits<CheckboxEmits>()

const group = inject(checkboxGroupKey, undefined)

const actualSize = computed(() => group?.size.value ?? props.size)
const actualDisabled = computed(() => {
  if (group?.disabled.value || props.disabled) return true
  if (group) {
    const current = group.modelValue.value
    const { min, max } = group
    if (max?.value !== undefined && current.length >= max.value && !current.includes(props.value as CheckboxValue)) {
      return true
    }
    if (min?.value !== undefined && current.length <= min.value && current.includes(props.value as CheckboxValue)) {
      return true
    }
  }
  return false
})

const checked = computed(() => {
  if (group && props.value !== undefined) {
    return group.modelValue.value.includes(props.value)
  }
  if (Array.isArray(props.modelValue) && props.value !== undefined) {
    return props.modelValue.includes(props.value)
  }
  return props.modelValue === props.trueValue
})

function handleChange(event: Event): void {
  if (actualDisabled.value) return
  const nextChecked = (event.target as HTMLInputElement).checked

  if (group && props.value !== undefined) {
    group.toggle(props.value, nextChecked)
    return
  }

  if (Array.isArray(props.modelValue) && props.value !== undefined) {
    const next = nextChecked
      ? [...props.modelValue, props.value]
      : props.modelValue.filter((item) => item !== props.value)
    emit('update:modelValue', next)
    emit('change', next)
    return
  }

  const next = nextChecked ? props.trueValue : props.falseValue
  emit('update:modelValue', next as boolean)
  emit('change', next as boolean)
}
</script>

<template>
  <label
    class="my-checkbox"
    :class="[
      `my-checkbox--${actualSize}`,
      {
        'is-checked': checked,
        'is-disabled': actualDisabled,
        'is-indeterminate': indeterminate && !checked,
        'is-bordered': border,
      },
    ]"
  >
    <span class="my-checkbox__input">
      <input
        type="checkbox"
        class="my-checkbox__original"
        :checked="checked"
        :disabled="actualDisabled"
        :name="name"
        :value="value"
        :indeterminate="indeterminate"
        @change="handleChange"
      />
      <span class="my-checkbox__inner" aria-hidden="true" />
    </span>
    <span class="my-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
