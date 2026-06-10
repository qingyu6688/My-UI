<script setup lang="ts">
import { useSize } from '../../../hooks/use-config'
import type { ButtonEmits, ButtonProps } from './button'

defineOptions({
  name: 'MyButton',
})

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: undefined,
  nativeType: 'button',
  disabled: false,
  loading: false,
  plain: false,
  round: false,
  text: false,
})

const actualSize = useSize(props)

const emit = defineEmits<ButtonEmits>()

function handleClick(event: MouseEvent): void {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }

  emit('click', event)
}
</script>

<template>
  <button
    class="my-button"
    :class="[
      `my-button--${type}`,
      `my-button--${actualSize}`,
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-text': text,
      },
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    @click="handleClick"
  >
    <span v-if="loading" class="my-button__loading" aria-hidden="true" />
    <span v-if="$slots.icon && !loading" class="my-button__icon">
      <slot name="icon" />
    </span>
    <span v-if="$slots.default" class="my-button__content">
      <slot />
    </span>
  </button>
</template>

