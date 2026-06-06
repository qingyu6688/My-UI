<script setup lang="ts">
import { provide, toRef } from 'vue'
import {
  radioGroupKey,
  type RadioGroupEmits,
  type RadioGroupProps,
  type RadioValue,
} from './radio'

defineOptions({
  name: 'MyRadioGroup',
})

const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: undefined,
  size: 'default',
  disabled: false,
  name: undefined,
})

const emit = defineEmits<RadioGroupEmits>()

provide(radioGroupKey, {
  modelValue: toRef(props, 'modelValue'),
  size: toRef(props, 'size'),
  disabled: toRef(props, 'disabled'),
  name: toRef(props, 'name'),
  setValue: (value: RadioValue) => {
    emit('update:modelValue', value)
    emit('change', value)
  },
})
</script>

<template>
  <div class="my-radio-group" role="radiogroup">
    <slot />
  </div>
</template>
