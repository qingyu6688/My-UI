<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { useSize } from '../../../hooks/use-config'
import { formContextKey } from '../../form/src/form'
import {
  selectContextKey,
  type SelectEmits,
  type SelectOptionState,
  type SelectProps,
  type SelectValue,
} from './select'

defineOptions({
  name: 'MySelect',
})

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: undefined,
  placeholder: '请选择',
  multiple: false,
  disabled: false,
  clearable: false,
  filterable: false,
  remote: false,
  remoteMethod: undefined,
  size: undefined,
  name: undefined,
  noDataText: '暂无数据',
})

const form = inject(formContextKey, undefined)
const actualSize = useSize(props, computed(() => form?.size.value))

const emit = defineEmits<SelectEmits>()

const triggerRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const queryInput = ref<HTMLInputElement | null>(null)

const visible = ref(false)
const query = ref('')
const hoverIndex = ref(-1)
const dropdownStyle = ref<Record<string, string>>({})

const options = ref<SelectOptionState[]>([])

function registerOption(state: SelectOptionState): void {
  if (!options.value.find((item) => item.value === state.value)) {
    options.value = [...options.value, state]
  }
}

function unregisterOption(state: SelectOptionState): void {
  options.value = options.value.filter((item) => item.value !== state.value)
}

const visibleOptions = computed<SelectOptionState[]>(() => {
  if (props.filterable && !props.remote && query.value.trim()) {
    const keyword = query.value.trim().toLowerCase()
    return options.value.filter((option) => option.label.toLowerCase().includes(keyword))
  }
  return options.value
})

const selectedValues = computed<SelectValue[]>(() => {
  if (props.modelValue === undefined || props.modelValue === null) return []
  return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
})

const selectedLabels = computed<string[]>(() =>
  selectedValues.value.map((value) => {
    const matched = options.value.find((option) => option.value === value)
    return matched?.label ?? String(value)
  }),
)

const displayText = computed(() => {
  if (props.multiple) return ''
  return selectedLabels.value[0] ?? ''
})

const isHovering = ref(false)

const showClear = computed(
  () =>
    props.clearable &&
    !props.disabled &&
    selectedValues.value.length > 0 &&
    (isHovering.value || visible.value),
)

function updatePosition(): void {
  if (!triggerRef.value) return
  const rect = triggerRef.value.getBoundingClientRect()
  dropdownStyle.value = {
    position: 'absolute',
    top: `${rect.bottom + window.scrollY + 4}px`,
    left: `${rect.left + window.scrollX}px`,
    width: `${rect.width}px`,
    zIndex: '2000',
  }
}

async function openDropdown(): Promise<void> {
  if (props.disabled || visible.value) return
  updatePosition()
  visible.value = true
  emit('visibleChange', true)
  await nextTick()
  if (props.filterable) {
    queryInput.value?.focus()
  }
  hoverIndex.value = visibleOptions.value.findIndex(
    (option) => option.value === selectedValues.value[0],
  )
}

function closeDropdown(): void {
  if (!visible.value) return
  visible.value = false
  emit('visibleChange', false)
  query.value = ''
}

function toggleDropdown(): void {
  if (visible.value) {
    closeDropdown()
  } else {
    void openDropdown()
  }
}

function select(value: SelectValue): void {
  if (props.multiple) {
    const current = selectedValues.value
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value]
    emit('update:modelValue', next)
    emit('change', next)
    return
  }

  emit('update:modelValue', value)
  emit('change', value)
  closeDropdown()
}

function removeTag(value: SelectValue): void {
  if (!props.multiple) return
  const next = selectedValues.value.filter((item) => item !== value)
  emit('update:modelValue', next)
  emit('change', next)
}

function clear(): void {
  const next = props.multiple ? [] : ''
  emit('update:modelValue', next)
  emit('change', next)
  emit('clear')
}

function handleQueryInput(event: Event): void {
  query.value = (event.target as HTMLInputElement).value
  if (props.remote && props.remoteMethod) {
    void props.remoteMethod(query.value)
  }
}

function handleKeydown(event: KeyboardEvent): void {
  if (!visible.value) {
    if (event.key === 'Enter' || event.key === 'ArrowDown' || event.key === ' ') {
      event.preventDefault()
      void openDropdown()
    }
    return
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    hoverIndex.value = (hoverIndex.value + 1) % Math.max(visibleOptions.value.length, 1)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    const length = Math.max(visibleOptions.value.length, 1)
    hoverIndex.value = (hoverIndex.value - 1 + length) % length
  } else if (event.key === 'Enter') {
    event.preventDefault()
    const target = visibleOptions.value[hoverIndex.value]
    if (target && !target.disabled) {
      select(target.value)
    }
  } else if (event.key === 'Escape') {
    closeDropdown()
  }
}

function handleOutsideClick(event: MouseEvent): void {
  if (!visible.value) return
  const target = event.target as Node
  if (
    triggerRef.value?.contains(target) ||
    dropdownRef.value?.contains(target)
  ) {
    return
  }
  closeDropdown()
}

function handleWindowResize(): void {
  if (visible.value) updatePosition()
}

watch(query, () => {
  hoverIndex.value = 0
})

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
  window.addEventListener('resize', handleWindowResize)
  window.addEventListener('scroll', handleWindowResize, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
  window.removeEventListener('resize', handleWindowResize)
  window.removeEventListener('scroll', handleWindowResize, true)
})

provide(selectContextKey, {
  modelValue: computed(() => props.modelValue),
  multiple: computed(() => props.multiple),
  size: actualSize,
  hoverIndex,
  visibleOptions,
  registerOption,
  unregisterOption,
  select,
})

defineExpose({ open: openDropdown, close: closeDropdown })
</script>

<template>
  <div
    class="my-select"
    :class="[
      `my-select--${actualSize}`,
      {
        'is-disabled': disabled,
        'is-multiple': multiple,
      },
    ]"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div
      ref="triggerRef"
      class="my-select__trigger"
      :class="{ 'is-focused': visible }"
      tabindex="0"
      role="combobox"
      :aria-expanded="visible"
      :aria-disabled="disabled"
      @click="toggleDropdown"
      @keydown="handleKeydown"
    >
      <template v-if="multiple">
        <span
          v-for="(value, index) in selectedValues"
          :key="String(value)"
          class="my-select__tag"
        >
          {{ selectedLabels[index] }}
          <button
            type="button"
            class="my-select__tag-close"
            aria-label="移除"
            @click.stop="removeTag(value)"
          >
            ×
          </button>
        </span>
        <input
          v-if="filterable"
          ref="queryInput"
          class="my-select__query"
          :value="query"
          :placeholder="selectedValues.length === 0 ? placeholder : ''"
          @input="handleQueryInput"
          @click.stop
        />
        <span v-if="selectedValues.length === 0 && !filterable" class="my-select__placeholder">
          {{ placeholder }}
        </span>
      </template>
      <template v-else>
        <input
          v-if="filterable && visible"
          ref="queryInput"
          class="my-select__query"
          :value="query"
          :placeholder="displayText || placeholder"
          @input="handleQueryInput"
          @click.stop
        />
        <span v-else-if="displayText" class="my-select__value">{{ displayText }}</span>
        <span v-else class="my-select__placeholder">{{ placeholder }}</span>
      </template>

      <button
        v-if="showClear"
        type="button"
        class="my-select__action"
        aria-label="清空"
        @click.stop="clear"
      >
        ×
      </button>
      <span class="my-select__arrow" :class="{ 'is-reverse': visible }" aria-hidden="true">▾</span>
    </div>

    <Teleport to="body">
      <div
        v-show="visible"
        ref="dropdownRef"
        class="my-select__dropdown"
        :style="dropdownStyle"
        role="listbox"
      >
        <div v-if="visibleOptions.length === 0" class="my-select__empty">
          {{ noDataText }}
        </div>
        <ul class="my-select__list">
          <slot />
        </ul>
      </div>
    </Teleport>
  </div>
</template>
