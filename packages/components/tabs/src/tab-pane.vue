<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { tabsContextKey, type TabPaneProps } from './tabs'

defineOptions({
  name: 'MyTabPane',
})

const props = withDefaults(defineProps<TabPaneProps>(), {
  label: '',
  disabled: false,
  closable: false,
  lazy: false,
})

const tabs = inject(tabsContextKey)
const rendered = ref(!props.lazy)

const active = computed(() => tabs?.activeName.value === props.name)

watch(active, (value) => {
  if (value) rendered.value = true
})

onMounted(() => {
  tabs?.registerPane({
    name: props.name,
    label: props.label,
    disabled: props.disabled,
    closable: props.closable,
    lazy: props.lazy,
  })
})

watch(
  () => [props.label, props.disabled, props.closable] as const,
  () => {
    tabs?.registerPane({
      name: props.name,
      label: props.label,
      disabled: props.disabled,
      closable: props.closable,
      lazy: props.lazy,
    })
  },
)

onBeforeUnmount(() => {
  tabs?.unregisterPane(props.name)
})
</script>

<template>
  <div
    v-show="active"
    class="my-tab-pane"
    role="tabpanel"
    :aria-hidden="!active"
  >
    <slot v-if="rendered" />
  </div>
</template>
