<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import {
  tabsContextKey,
  type TabPaneInfo,
  type TabsEmits,
  type TabsName,
  type TabsProps,
} from './tabs'

defineOptions({
  name: 'MyTabs',
})

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: undefined,
  type: 'line',
  position: 'top',
  closable: false,
  addable: false,
})

const emit = defineEmits<TabsEmits>()

const panes = ref<TabPaneInfo[]>([])

const activeName = computed(() => props.modelValue ?? panes.value[0]?.name)

function registerPane(pane: TabPaneInfo): void {
  const existing = panes.value.findIndex((item) => item.name === pane.name)
  if (existing === -1) {
    panes.value = [...panes.value, pane]
  } else {
    const next = [...panes.value]
    next[existing] = pane
    panes.value = next
  }
}

function unregisterPane(name: TabsName): void {
  panes.value = panes.value.filter((item) => item.name !== name)
}

function setActive(name: TabsName): void {
  emit('update:modelValue', name)
  emit('tabClick', name)
}

function closePane(name: TabsName): void {
  emit('tabRemove', name)
}

provide(tabsContextKey, {
  activeName: computed(() => activeName.value),
  type: computed(() => props.type),
  panes,
  registerPane,
  unregisterPane,
  setActive,
  closePane,
})

function handleTabClick(pane: TabPaneInfo): void {
  if (pane.disabled || pane.name === activeName.value) return
  setActive(pane.name)
}

function handleTabClose(event: MouseEvent, name: TabsName): void {
  event.stopPropagation()
  closePane(name)
}
</script>

<template>
  <div
    class="my-tabs"
    :class="[
      `my-tabs--${type}`,
      `my-tabs--${position}`,
    ]"
  >
    <div class="my-tabs__header" role="tablist">
      <button
        v-for="pane in panes"
        :key="String(pane.name)"
        type="button"
        class="my-tabs__item"
        :class="{
          'is-active': pane.name === activeName,
          'is-disabled': pane.disabled,
        }"
        role="tab"
        :aria-selected="pane.name === activeName"
        :disabled="pane.disabled"
        @click="handleTabClick(pane)"
      >
        {{ pane.label }}
        <span
          v-if="(closable || pane.closable) && !pane.disabled"
          class="my-tabs__close"
          role="button"
          aria-label="关闭"
          tabindex="0"
          @click="handleTabClose($event, pane.name)"
        >
          ×
        </span>
      </button>
      <button
        v-if="addable"
        type="button"
        class="my-tabs__add"
        aria-label="新增"
        @click="emit('tabAdd')"
      >
        +
      </button>
    </div>
    <div class="my-tabs__content">
      <slot />
    </div>
  </div>
</template>
