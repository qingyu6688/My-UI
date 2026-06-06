<script setup lang="ts">
import { computed, inject } from 'vue'
import { collapseContextKey, type CollapseItemProps } from './collapse'

defineOptions({
  name: 'MyCollapseItem',
})

const props = withDefaults(defineProps<CollapseItemProps>(), {
  title: '',
  disabled: false,
})

const collapse = inject(collapseContextKey)

const isActive = computed(() => collapse?.activeNames.value.includes(props.name) ?? false)

function handleClick(): void {
  if (props.disabled) return
  collapse?.toggle(props.name)
}
</script>

<template>
  <div class="my-collapse-item" :class="{ 'is-active': isActive, 'is-disabled': disabled }">
    <button
      type="button"
      class="my-collapse-item__header"
      :aria-expanded="isActive"
      :disabled="disabled"
      @click="handleClick"
    >
      <span class="my-collapse-item__title">
        <slot name="title">{{ title }}</slot>
      </span>
      <span class="my-collapse-item__arrow" :class="{ 'is-active': isActive }" aria-hidden="true">
        ›
      </span>
    </button>
    <transition name="my-collapse">
      <div v-show="isActive" class="my-collapse-item__wrap">
        <div class="my-collapse-item__content">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>
