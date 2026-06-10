<script setup lang="ts">
import { useSize } from '../../../hooks/use-config'
import type { TagEmits, TagProps } from './tag'

defineOptions({
  name: 'MyTag',
})

const props = withDefaults(defineProps<TagProps>(), {
  type: 'default',
  size: undefined,
  effect: 'light',
  closable: false,
  round: false,
  disableTransitions: false,
})

const actualSize = useSize(props)

const emit = defineEmits<TagEmits>()

function handleClose(event: MouseEvent): void {
  event.stopPropagation()
  emit('close', event)
}
</script>

<template>
  <span
    class="my-tag"
    :class="[
      `my-tag--${type}`,
      `my-tag--${actualSize}`,
      `my-tag--${effect}`,
      {
        'is-round': round,
        'is-closable': closable,
        'is-static': disableTransitions,
      },
    ]"
    @click="emit('click', $event)"
  >
    <span class="my-tag__content"><slot /></span>
    <button
      v-if="closable"
      type="button"
      class="my-tag__close"
      aria-label="关闭标签"
      @click="handleClose"
    >
      ×
    </button>
  </span>
</template>
