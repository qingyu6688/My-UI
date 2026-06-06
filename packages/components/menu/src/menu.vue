<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import { menuContextKey, type MenuEmits, type MenuProps } from './menu'

defineOptions({
  name: 'MyMenu',
})

const props = withDefaults(defineProps<MenuProps>(), {
  modelValue: undefined,
  mode: 'vertical',
  collapse: false,
  defaultOpeneds: () => [],
  uniqueOpened: false,
})

const emit = defineEmits<MenuEmits>()

const openIndexes = ref<string[]>([...props.defaultOpeneds])

watch(
  () => props.collapse,
  (next) => {
    if (next) openIndexes.value = []
  },
)

function selectItem(index: string): void {
  emit('update:modelValue', index)
  emit('select', index)
}

function toggleSubmenu(index: string): void {
  if (openIndexes.value.includes(index)) {
    openIndexes.value = openIndexes.value.filter((item) => item !== index)
    emit('close', index)
    return
  }
  openIndexes.value = props.uniqueOpened ? [index] : [...openIndexes.value, index]
  emit('open', index)
}

provide(menuContextKey, {
  activeIndex: computed(() => props.modelValue),
  mode: computed(() => props.mode),
  collapse: computed(() => props.collapse),
  openIndexes,
  selectItem,
  toggleSubmenu,
})
</script>

<template>
  <ul
    class="my-menu"
    :class="[
      `my-menu--${mode}`,
      {
        'is-collapse': collapse && mode === 'vertical',
      },
    ]"
    role="menubar"
  >
    <slot />
  </ul>
</template>
