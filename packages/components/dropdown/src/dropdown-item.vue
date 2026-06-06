<script setup lang="ts">
import { inject } from 'vue'
import { dropdownKey, type DropdownItemProps } from './dropdown'

defineOptions({
  name: 'MyDropdownItem',
})

const props = withDefaults(defineProps<DropdownItemProps>(), {
  command: undefined,
  disabled: false,
  divided: false,
})

const dropdown = inject(dropdownKey)

function handleClick(): void {
  dropdown?.handleCommand(props.command ?? '', props.disabled)
}
</script>

<template>
  <div
    class="my-dropdown-item"
    :class="{ 'is-disabled': disabled, 'is-divided': divided }"
    role="menuitem"
    :aria-disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </div>
</template>
