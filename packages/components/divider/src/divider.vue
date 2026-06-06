<script setup lang="ts">
import { computed, useSlots, type CSSProperties } from 'vue'
import type { DividerProps } from './divider'

defineOptions({
  name: 'MyDivider',
})

const props = withDefaults(defineProps<DividerProps>(), {
  direction: 'horizontal',
  borderStyle: 'solid',
  contentPosition: 'center',
})

const slots = useSlots()

const hasContent = computed(() => Boolean(slots.default))

const dividerStyle = computed<CSSProperties>(() => ({
  borderStyle: props.borderStyle,
}))
</script>

<template>
  <div
    class="my-divider"
    :class="[
      `my-divider--${direction}`,
      `my-divider--content-${contentPosition}`,
      {
        'has-content': hasContent,
      },
    ]"
    :style="dividerStyle"
    role="separator"
    :aria-orientation="direction"
  >
    <span v-if="hasContent && direction === 'horizontal'" class="my-divider__content">
      <slot />
    </span>
  </div>
</template>
