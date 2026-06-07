<script setup lang="ts">
import { ref } from 'vue'
import { usePopper } from '../../../hooks/use-popper'
import type { AutocompleteEmits, AutocompleteItem, AutocompleteProps } from './autocomplete'

defineOptions({
  name: 'MyAutocomplete',
})

const props = withDefaults(defineProps<AutocompleteProps>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  fetchSuggestions: undefined,
  triggerOnFocus: true,
})

const emit = defineEmits<AutocompleteEmits>()

const { visible, triggerRef, popperRef, popperStyle, open, close, update } = usePopper({
  placement: 'bottom-start',
  offset: 4,
})

const suggestions = ref<AutocompleteItem[]>([])
const hoverIndex = ref(-1)

function loadSuggestions(query: string): void {
  if (!props.fetchSuggestions) return
  props.fetchSuggestions(query, (items) => {
    suggestions.value = items
    hoverIndex.value = -1
    if (items.length > 0) {
      open()
      void update()
    } else {
      close()
    }
  })
}

function onInput(event: Event): void {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  loadSuggestions(value)
}

function onFocus(): void {
  if (props.triggerOnFocus) loadSuggestions(props.modelValue)
}

function onBlur(): void {
  // 延迟关闭，保证点击建议项先触发
  setTimeout(close, 150)
}

function selectItem(item: AutocompleteItem): void {
  emit('update:modelValue', item.value)
  emit('select', item)
  emit('change', item.value)
  close()
}

function onKeydown(event: KeyboardEvent): void {
  if (!visible.value) return
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    hoverIndex.value = (hoverIndex.value + 1) % suggestions.value.length
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    hoverIndex.value = (hoverIndex.value - 1 + suggestions.value.length) % suggestions.value.length
  } else if (event.key === 'Enter' && hoverIndex.value >= 0) {
    event.preventDefault()
    selectItem(suggestions.value[hoverIndex.value])
  } else if (event.key === 'Escape') {
    close()
  }
}
</script>

<template>
  <div class="my-autocomplete">
    <div ref="triggerRef" class="my-autocomplete__input-wrap">
      <input
        class="my-autocomplete__input"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
      />
    </div>
    <Teleport to="body">
      <div v-show="visible" ref="popperRef" class="my-autocomplete__panel" :style="popperStyle">
        <ul class="my-autocomplete__list">
          <li
            v-for="(item, index) in suggestions"
            :key="index"
            class="my-autocomplete__item"
            :class="{ 'is-active': index === hoverIndex }"
            @mousedown.prevent="selectItem(item)"
          >
            <slot :item="item">{{ item.value }}</slot>
          </li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>
