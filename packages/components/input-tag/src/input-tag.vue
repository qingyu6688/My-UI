<script setup lang="ts">
import { ref } from 'vue'
import type { InputTagEmits, InputTagProps } from './input-tag'

defineOptions({
  name: 'MyInputTag',
})

const props = withDefaults(defineProps<InputTagProps>(), {
  modelValue: () => [],
  placeholder: '',
  disabled: false,
  max: undefined,
  allowDuplicate: false,
})

const emit = defineEmits<InputTagEmits>()

const inputValue = ref('')

function addTag(): void {
  const value = inputValue.value.trim()
  if (!value) return
  const current = props.modelValue ?? []
  if (props.max !== undefined && current.length >= props.max) return
  if (!props.allowDuplicate && current.includes(value)) {
    inputValue.value = ''
    return
  }
  const next = [...current, value]
  emit('update:modelValue', next)
  emit('add', value)
  inputValue.value = ''
}

function removeTag(index: number): void {
  const current = props.modelValue ?? []
  const value = current[index]
  const next = current.filter((_, i) => i !== index)
  emit('update:modelValue', next)
  emit('remove', value)
}

function onBackspace(): void {
  if (inputValue.value === '' && (props.modelValue?.length ?? 0) > 0) {
    removeTag(props.modelValue.length - 1)
  }
}
</script>

<template>
  <div class="my-input-tag" :class="{ 'is-disabled': disabled }">
    <span v-for="(tag, index) in modelValue" :key="`${tag}-${index}`" class="my-input-tag__tag">
      {{ tag }}
      <button
        type="button"
        class="my-input-tag__close"
        aria-label="移除"
        :disabled="disabled"
        @click="removeTag(index)"
      >
        ×
      </button>
    </span>
    <input
      v-model="inputValue"
      class="my-input-tag__input"
      :placeholder="placeholder"
      :disabled="disabled"
      @keydown.enter.prevent="addTag"
      @keydown.delete="onBackspace"
      @blur="addTag"
    />
  </div>
</template>
