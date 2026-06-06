<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, useSlots, watch } from 'vue'
import { selectContextKey, type OptionProps } from './select'

defineOptions({
  name: 'MyOption',
})

const props = withDefaults(defineProps<OptionProps>(), {
  label: undefined,
  disabled: false,
})

const slots = useSlots()
const select = inject(selectContextKey)

const resolvedLabel = computed(() => {
  if (props.label !== undefined) return props.label
  const fallback = slots.default?.()
  const firstText = Array.isArray(fallback)
    ? fallback.find((vnode) => typeof vnode.children === 'string')?.children
    : undefined
  return typeof firstText === 'string' ? firstText : String(props.value)
})

const selected = computed(() => {
  if (!select) return false
  const current = select.modelValue.value
  if (Array.isArray(current)) return current.includes(props.value)
  return current === props.value
})

const visibleOptions = computed(() => select?.visibleOptions.value ?? [])
const hovered = computed(() => {
  if (!select) return false
  const index = visibleOptions.value.findIndex((option) => option.value === props.value)
  return index !== -1 && index === select.hoverIndex.value
})

const isVisible = computed(() =>
  select ? visibleOptions.value.some((option) => option.value === props.value) : true,
)

function handleClick(): void {
  if (props.disabled || !select) return
  select.select(props.value)
}

onMounted(() => {
  select?.registerOption({
    value: props.value,
    label: resolvedLabel.value,
    disabled: props.disabled,
  })
})

onBeforeUnmount(() => {
  select?.unregisterOption({
    value: props.value,
    label: resolvedLabel.value,
    disabled: props.disabled,
  })
})

watch(resolvedLabel, (next) => {
  if (!select) return
  select.unregisterOption({ value: props.value, label: '', disabled: props.disabled })
  select.registerOption({ value: props.value, label: next, disabled: props.disabled })
})
</script>

<template>
  <li
    v-show="isVisible"
    class="my-select__option"
    :class="{
      'is-selected': selected,
      'is-disabled': disabled,
      'is-hovered': hovered,
    }"
    role="option"
    :aria-selected="selected"
    :aria-disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ resolvedLabel }}</slot>
  </li>
</template>
