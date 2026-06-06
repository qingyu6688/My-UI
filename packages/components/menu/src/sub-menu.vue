<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { menuContextKey, submenuContextKey, type SubMenuProps } from './menu'

defineOptions({
  name: 'MySubMenu',
})

const props = withDefaults(defineProps<SubMenuProps>(), {
  disabled: false,
  title: '',
})

const menu = inject(menuContextKey)
const parent = inject(submenuContextKey, undefined)
const level = (parent?.level ?? 0) + 1

provide(submenuContextKey, { level })

const open = computed(() => menu?.openIndexes.value.includes(props.index) ?? false)
const indent = computed(() => level * 16)

const showInline = computed(() => {
  if (!menu) return true
  return menu.mode.value === 'vertical' && !menu.collapse.value
})

function toggle(): void {
  if (props.disabled || !menu) return
  menu.toggleSubmenu(props.index)
}
</script>

<template>
  <li
    class="my-sub-menu"
    :class="{
      'is-open': open,
      'is-disabled': disabled,
    }"
    role="menuitem"
    :aria-disabled="disabled"
    :aria-expanded="open"
  >
    <div
      class="my-sub-menu__title"
      :style="{ paddingLeft: `${indent}px` }"
      @click="toggle"
    >
      <span v-if="$slots.icon" class="my-sub-menu__icon">
        <slot name="icon" />
      </span>
      <span class="my-sub-menu__label">
        <slot name="title">{{ title }}</slot>
      </span>
      <span class="my-sub-menu__arrow" :class="{ 'is-open': open }" aria-hidden="true">▾</span>
    </div>
    <ul v-show="showInline && open" class="my-sub-menu__list" role="menu">
      <slot />
    </ul>
  </li>
</template>
