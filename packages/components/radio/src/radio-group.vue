<script setup lang="ts">
import { computed, inject, provide, toRef } from 'vue'
import { useSize } from '../../../hooks/use-config'
import { formContextKey } from '../../form/src/form'
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
  size: undefined,
  disabled: false,
  name: undefined,
})

const emit = defineEmits<RadioGroupEmits>()

const form = inject(formContextKey, undefined)
const actualSize = useSize(props, computed(() => form?.size.value))

provide(radioGroupKey, {
  modelValue: toRef(props, 'modelValue'),
  size: actualSize,
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
