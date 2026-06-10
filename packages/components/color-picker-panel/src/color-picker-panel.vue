<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { normalizeHexColor } from '../../../utils/color'

defineOptions({ name: 'MyColorPickerPanel' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    predefine?: string[]
  }>(),
  {
    modelValue: '#a8d5ba',
    predefine: () => [],
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const draft = ref(props.modelValue)

watch(
  () => props.modelValue,
  (value) => {
    draft.value = value
  },
)

const normalized = computed(() => normalizeHexColor(draft.value, '#000000'))

function onNativeInput(event: Event): void {
  const value = (event.target as HTMLInputElement).value
  draft.value = value
  emit('update:modelValue', value)
  emit('change', value)
}

function onHexInput(event: Event): void {
  const value = (event.target as HTMLInputElement).value
  draft.value = value
  const norm = normalizeHexColor(value, '')
  if (norm) {
    emit('update:modelValue', norm)
    emit('change', norm)
  }
}

function pickPredefined(color: string): void {
  draft.value = color
  emit('update:modelValue', color)
  emit('change', color)
}
</script>

<template>
  <div class="my-color-picker-panel">
    <div class="my-color-picker-panel__preview" :style="{ background: normalized }" />
    <div class="my-color-picker-panel__inputs">
      <input type="color" :value="normalized" @input="onNativeInput" />
      <input
        class="my-color-picker-panel__hex"
        :value="draft"
        spellcheck="false"
        @input="onHexInput"
      />
    </div>
    <div v-if="predefine.length" class="my-color-picker-panel__predefine">
      <span
        v-for="color in predefine"
        :key="color"
        class="my-color-picker-panel__swatch"
        :style="{ background: color }"
        :title="color"
        @click="pickPredefined(color)"
      />
    </div>
  </div>
</template>
