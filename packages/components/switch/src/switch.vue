<script setup lang="ts">
import { computed } from 'vue'
import { useSize } from '../../../hooks/use-config'
import type { SwitchEmits, SwitchProps } from './switch'

defineOptions({
  name: 'MySwitch',
})

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  activeValue: true,
  inactiveValue: false,
  activeText: '',
  inactiveText: '',
  disabled: false,
  loading: false,
  size: undefined,
  name: undefined,
})

const actualSize = useSize(props)

const emit = defineEmits<SwitchEmits>()

const checked = computed(() => props.modelValue === props.activeValue)

function toggle(): void {
  if (props.disabled || props.loading) return
  const next = checked.value ? props.inactiveValue : props.activeValue
  emit('update:modelValue', next)
  emit('change', next)
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    toggle()
  }
}
</script>

<template>
  <button
    type="button"
    class="my-switch"
    :class="[
      `my-switch--${actualSize}`,
      {
        'is-checked': checked,
        'is-disabled': disabled,
        'is-loading': loading,
      },
    ]"
    role="switch"
    :aria-checked="checked"
    :aria-disabled="disabled || loading"
    :disabled="disabled"
    :name="name"
    @click="toggle"
    @keydown="handleKeydown"
  >
    <span class="my-switch__core">
      <span class="my-switch__action">
        <span v-if="loading" class="my-switch__loading" aria-hidden="true" />
      </span>
    </span>
    <span v-if="activeText || inactiveText" class="my-switch__label">
      {{ checked ? activeText : inactiveText }}
    </span>
  </button>
</template>
