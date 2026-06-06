<script setup lang="ts">
import { computed, provide, toRef } from 'vue'
import {
  collapseContextKey,
  type CollapseEmits,
  type CollapseName,
  type CollapseProps,
} from './collapse'

defineOptions({
  name: 'MyCollapse',
})

const props = withDefaults(defineProps<CollapseProps>(), {
  modelValue: () => [],
  accordion: false,
})

const emit = defineEmits<CollapseEmits>()

const activeNames = computed<CollapseName[]>(() => {
  if (Array.isArray(props.modelValue)) return props.modelValue
  return props.modelValue === undefined || props.modelValue === '' ? [] : [props.modelValue]
})

function toggle(name: CollapseName): void {
  if (props.accordion) {
    const next = activeNames.value.includes(name) ? '' : name
    emit('update:modelValue', next)
    emit('change', next)
    return
  }
  const next = activeNames.value.includes(name)
    ? activeNames.value.filter((item) => item !== name)
    : [...activeNames.value, name]
  emit('update:modelValue', next)
  emit('change', next)
}

provide(collapseContextKey, {
  activeNames,
  accordion: toRef(props, 'accordion'),
  toggle,
})
</script>

<template>
  <div class="my-collapse">
    <slot />
  </div>
</template>
