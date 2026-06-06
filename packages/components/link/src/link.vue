<script setup lang="ts">
import { computed } from 'vue'
import type { LinkEmits, LinkProps } from './link'

defineOptions({
  name: 'MyLink',
})

const props = withDefaults(defineProps<LinkProps>(), {
  type: 'default',
  underline: 'hover',
  disabled: false,
  href: '',
  target: '_self',
})

const emit = defineEmits<LinkEmits>()

const isExternal = computed(() => /^(https?:|\/\/)/i.test(props.href))

const linkRel = computed(() => {
  if (props.target === '_blank' && isExternal.value) {
    return 'noopener noreferrer'
  }
  return undefined
})

const linkHref = computed(() => {
  if (props.disabled || !props.href) {
    return undefined
  }
  return props.href
})

function handleClick(event: MouseEvent): void {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<template>
  <a
    class="my-link"
    :class="[
      `my-link--${type}`,
      `my-link--underline-${underline}`,
      {
        'is-disabled': disabled,
        'is-external': isExternal,
      },
    ]"
    :href="linkHref"
    :target="href ? target : undefined"
    :rel="linkRel"
    :aria-disabled="disabled"
    @click="handleClick"
  >
    <span v-if="$slots.icon" class="my-link__icon">
      <slot name="icon" />
    </span>
    <span class="my-link__content">
      <slot />
    </span>
  </a>
</template>
