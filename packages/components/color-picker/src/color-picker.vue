<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePopper } from '../../../hooks/use-popper'
import { isHexColor } from '../../../utils/color'
import { MyButton } from '../../button'
import type { ColorPickerEmits, ColorPickerProps } from './color-picker'

defineOptions({
  name: 'MyColorPicker',
})

const props = withDefaults(defineProps<ColorPickerProps>(), {
  modelValue: '',
  disabled: false,
  predefine: () => [],
  size: 'default',
})

const emit = defineEmits<ColorPickerEmits>()

const { visible, triggerRef, popperRef, popperStyle, toggle, close } = usePopper({
  placement: 'bottom-start',
  offset: 8,
})

const draft = ref(props.modelValue || '#a8d5ba')

watch(
  () => props.modelValue,
  (value) => {
    if (value) draft.value = value
  },
)

function onTriggerClick(): void {
  if (props.disabled) return
  toggle()
}

function pick(color: string): void {
  draft.value = color
}

function onNativeInput(event: Event): void {
  draft.value = (event.target as HTMLInputElement).value
}

function onHexInput(event: Event): void {
  const value = (event.target as HTMLInputElement).value
  if (isHexColor(value)) draft.value = value
}

function confirm(): void {
  emit('update:modelValue', draft.value)
  emit('change', draft.value)
  close()
}
</script>

<template>
  <span class="my-color-picker" :class="[`my-color-picker--${size}`, { 'is-disabled': disabled }]">
    <span
      ref="triggerRef"
      class="my-color-picker__trigger"
      :style="{ background: modelValue || 'transparent' }"
      role="button"
      :aria-disabled="disabled"
      @click="onTriggerClick"
    >
      <span v-if="!modelValue" class="my-color-picker__empty">+</span>
    </span>

    <Teleport to="body">
      <div v-show="visible" ref="popperRef" class="my-color-picker__panel" :style="popperStyle">
        <div class="my-color-picker__preview" :style="{ background: draft }" />
        <div class="my-color-picker__inputs">
          <input type="color" :value="draft" @input="onNativeInput" />
          <input
            class="my-color-picker__hex"
            :value="draft"
            placeholder="#000000"
            @input="onHexInput"
          />
        </div>
        <div v-if="predefine.length" class="my-color-picker__predefine">
          <span
            v-for="color in predefine"
            :key="color"
            class="my-color-picker__swatch"
            :style="{ background: color }"
            @click="pick(color)"
          />
        </div>
        <div class="my-color-picker__actions">
          <my-button size="small" text @click="close">取消</my-button>
          <my-button size="small" type="primary" @click="confirm">确定</my-button>
        </div>
      </div>
    </Teleport>
  </span>
</template>
