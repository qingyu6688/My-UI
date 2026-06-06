<script setup lang="ts">
import { computed, inject } from 'vue'
import { radioGroupKey, type RadioEmits, type RadioProps } from './radio'

defineOptions({
  name: 'MyRadio',
})

const props = withDefaults(defineProps<RadioProps>(), {
  modelValue: undefined,
  label: undefined,
  disabled: false,
  size: 'default',
  name: undefined,
  border: false,
})

const emit = defineEmits<RadioEmits>()

const group = inject(radioGroupKey, undefined)

const actualSize = computed(() => group?.size.value ?? props.size)
const actualDisabled = computed(() => group?.disabled.value || props.disabled)
const actualName = computed(() => group?.name.value ?? props.name)

const checked = computed(() => {
  const current = group ? group.modelValue.value : props.modelValue
  return current === props.value
})

function handleChange(): void {
  if (actualDisabled.value) return
  if (group) {
    group.setValue(props.value)
  } else {
    emit('update:modelValue', props.value)
    emit('change', props.value)
  }
}
</script>

<template>
  <label
    class="my-radio"
    :class="[
      `my-radio--${actualSize}`,
      {
        'is-checked': checked,
        'is-disabled': actualDisabled,
        'is-bordered': border,
      },
    ]"
  >
    <span class="my-radio__input">
      <input
        type="radio"
        class="my-radio__original"
        :value="value"
        :checked="checked"
        :disabled="actualDisabled"
        :name="actualName"
        @change="handleChange"
      />
      <span class="my-radio__inner" aria-hidden="true" />
    </span>
    <span class="my-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
