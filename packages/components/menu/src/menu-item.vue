<script setup lang="ts">
import { computed, inject } from 'vue'
import { menuContextKey, submenuContextKey, type MenuItemProps } from './menu'

defineOptions({
  name: 'MyMenuItem',
})

const props = withDefaults(defineProps<MenuItemProps>(), {
  disabled: false,
})

const menu = inject(menuContextKey)
const submenu = inject(submenuContextKey, undefined)

const active = computed(() => menu?.activeIndex.value === props.index)
const indent = computed(() => (submenu ? submenu.level * 16 + 16 : 16))

function handleClick(): void {
  if (props.disabled || !menu) return
  menu.selectItem(props.index)
}
</script>

<template>
  <li
    class="my-menu-item"
    :class="{
      'is-active': active,
      'is-disabled': disabled,
    }"
    role="menuitem"
    :aria-disabled="disabled"
    :style="{ paddingLeft: `${indent}px` }"
    @click="handleClick"
  >
    <span v-if="$slots.icon" class="my-menu-item__icon">
      <slot name="icon" />
    </span>
    <span class="my-menu-item__title">
      <slot />
    </span>
  </li>
</template>
