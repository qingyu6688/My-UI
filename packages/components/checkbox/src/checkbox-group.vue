<script setup lang="ts">
import { computed, inject, provide, toRef } from 'vue'
import { useSize } from '../../../hooks/use-config'
import { formContextKey } from '../../form/src/form'
import {
  checkboxGroupKey,
  type CheckboxGroupEmits,
  type CheckboxGroupProps,
  type CheckboxValue,
} from './checkbox'

defineOptions({
  name: 'MyCheckboxGroup',
})

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: () => [],
  size: undefined,
  disabled: false,
  min: undefined,
  max: undefined,
})

const emit = defineEmits<CheckboxGroupEmits>()

const form = inject(formContextKey, undefined)
const actualSize = useSize(props, computed(() => form?.size.value))

provide(checkboxGroupKey, {
  modelValue: toRef(props, 'modelValue'),
  size: actualSize,
  disabled: toRef(props, 'disabled'),
  min: toRef(props, 'min'),
  max: toRef(props, 'max'),
  toggle: (value: CheckboxValue, checked: boolean) => {
    const current = props.modelValue ?? []
    const next = checked
      ? [...current, value]
      : current.filter((item) => item !== value)
    emit('update:modelValue', next)
    emit('change', next)
  },
})
</script>

<template>
  <div class="my-checkbox-group" role="group">
    <slot />
  </div>
</template>
