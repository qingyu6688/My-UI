<script setup lang="ts">
import { computed, ref } from 'vue'
import type { AlertEmits, AlertProps } from './alert'

defineOptions({
  name: 'MyAlert',
})

const props = withDefaults(defineProps<AlertProps>(), {
  type: 'info',
  title: '',
  description: '',
  closable: true,
  closeText: '',
  showIcon: false,
  center: false,
  effect: 'light',
})

const emit = defineEmits<AlertEmits>()

const visible = ref(true)

const iconText = computed(() => {
  switch (props.type) {
    case 'success':
      return '✓'
    case 'warning':
      return '!'
    case 'danger':
      return '×'
    default:
      return 'i'
  }
})

function close(event: MouseEvent): void {
  visible.value = false
  emit('close', event)
}
</script>

<template>
  <transition name="my-alert-fade">
    <div
      v-if="visible"
      class="my-alert"
      :class="[
        `my-alert--${type}`,
        `my-alert--${effect}`,
        {
          'is-center': center,
          'has-description': description || $slots.default,
        },
      ]"
      role="alert"
    >
      <span v-if="showIcon" class="my-alert__icon" aria-hidden="true">
        <slot name="icon">{{ iconText }}</slot>
      </span>
      <div class="my-alert__content">
        <p v-if="title || $slots.title" class="my-alert__title">
          <slot name="title">{{ title }}</slot>
        </p>
        <p v-if="description || $slots.default" class="my-alert__description">
          <slot>{{ description }}</slot>
        </p>
      </div>
      <button
        v-if="closable"
        type="button"
        class="my-alert__close"
        :aria-label="closeText || '关闭'"
        @click="close"
      >
        {{ closeText || '×' }}
      </button>
    </div>
  </transition>
</template>
