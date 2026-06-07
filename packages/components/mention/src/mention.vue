<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePopper } from '../../../hooks/use-popper'
import type { MentionEmits, MentionOption, MentionProps } from './mention'

defineOptions({
  name: 'MyMention',
})

const props = withDefaults(defineProps<MentionProps>(), {
  modelValue: '',
  prefix: '@',
  placeholder: '',
  disabled: false,
})

const emit = defineEmits<MentionEmits>()

const { visible, triggerRef, popperRef, popperStyle, open, close, update } = usePopper({
  placement: 'bottom-start',
  offset: 4,
})

const query = ref('')
const triggerPos = ref(-1)

const filtered = computed(() => {
  const keyword = query.value.toLowerCase()
  return props.options.filter((option) =>
    (option.label ?? option.value).toLowerCase().includes(keyword),
  )
})

function onInput(event: Event): void {
  const target = event.target as HTMLInputElement
  const value = target.value
  emit('update:modelValue', value)

  const caret = target.selectionStart ?? value.length
  const before = value.slice(0, caret)
  const idx = before.lastIndexOf(props.prefix)
  if (idx >= 0 && !/\s/.test(before.slice(idx + 1))) {
    triggerPos.value = idx
    query.value = before.slice(idx + 1)
    open()
    void update()
  } else {
    close()
  }
}

function selectOption(option: MentionOption): void {
  if (option.disabled) return
  const value = props.modelValue
  const before = value.slice(0, triggerPos.value)
  const after = value.slice(triggerPos.value + 1 + query.value.length)
  const next = `${before}${props.prefix}${option.value} ${after}`
  emit('update:modelValue', next)
  emit('select', option)
  close()
}
</script>

<template>
  <div class="my-mention">
    <div ref="triggerRef">
      <input
        class="my-mention__input"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="onInput"
      />
    </div>
    <Teleport to="body">
      <div v-show="visible" ref="popperRef" class="my-mention__panel" :style="popperStyle">
        <ul class="my-mention__list">
          <li
            v-for="option in filtered"
            :key="option.value"
            class="my-mention__item"
            :class="{ 'is-disabled': option.disabled }"
            @mousedown.prevent="selectOption(option)"
          >
            {{ option.label ?? option.value }}
          </li>
          <li v-if="filtered.length === 0" class="my-mention__empty">无匹配</li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>
