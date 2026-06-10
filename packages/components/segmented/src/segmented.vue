<script setup lang="ts">
import { computed } from 'vue'
import { useSize } from '../../../hooks/use-config'
import {
  type SegmentedEmits,
  type SegmentedOption,
  type SegmentedProps,
  type SegmentedValue,
} from './segmented'

defineOptions({
  name: 'MySegmented',
})

const props = withDefaults(defineProps<SegmentedProps>(), {
  modelValue: undefined,
  size: undefined,
  disabled: false,
  block: false,
})

const actualSize = useSize(props)

const emit = defineEmits<SegmentedEmits>()

const normalizedOptions = computed<SegmentedOption[]>(() =>
  props.options.map((option) =>
    typeof option === 'object'
      ? option
      : { label: String(option), value: option },
  ),
)

function isActive(value: SegmentedValue): boolean {
  return props.modelValue === value
}

function handleClick(option: SegmentedOption): void {
  if (props.disabled || option.disabled || isActive(option.value)) return
  emit('update:modelValue', option.value)
  emit('change', option.value)
}
</script>

<template>
  <div
    class="my-segmented"
    :class="[`my-segmented--${actualSize}`, { 'is-block': block, 'is-disabled': disabled }]"
    role="radiogroup"
  >
    <button
      v-for="option in normalizedOptions"
      :key="String(option.value)"
      type="button"
      class="my-segmented__item"
      :class="{ 'is-active': isActive(option.value), 'is-disabled': option.disabled }"
      role="radio"
      :aria-checked="isActive(option.value)"
      :disabled="disabled || option.disabled"
      @click="handleClick(option)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
