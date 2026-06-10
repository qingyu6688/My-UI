<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { usePopper } from '../../../hooks/use-popper'
import { useSize } from '../../../hooks/use-config'
import { formContextKey } from '../../form/src/form'
import type { CascaderEmits, CascaderOption, CascaderProps } from './cascader'

defineOptions({
  name: 'MyCascader',
})

const props = withDefaults(defineProps<CascaderProps>(), {
  modelValue: () => [],
  placeholder: '请选择',
  disabled: false,
  clearable: false,
  separator: ' / ',
  size: undefined,
})

const emit = defineEmits<CascaderEmits>()

const form = inject(formContextKey, undefined)
const actualSize = useSize(props, computed(() => form?.size.value))

const { visible, triggerRef, popperRef, popperStyle, toggle, close } = usePopper({
  placement: 'bottom-start',
  offset: 6,
})

const isHovering = ref(false)
// 每一列已选中的 option
const activePath = ref<CascaderOption[]>([])

watch(
  () => props.modelValue,
  (value) => {
    activePath.value = resolvePath(value ?? [])
  },
  { immediate: true },
)

function resolvePath(values: Array<string | number>): CascaderOption[] {
  const path: CascaderOption[] = []
  let level = props.options
  for (const value of values) {
    const found = level.find((option) => option.value === value)
    if (!found) break
    path.push(found)
    level = found.children ?? []
  }
  return path
}

// 渲染用的列：根列 + 各已选项的 children
const columns = computed<CascaderOption[][]>(() => {
  const cols: CascaderOption[][] = [props.options]
  for (const option of activePath.value) {
    if (option.children && option.children.length) {
      cols.push(option.children)
    }
  }
  return cols
})

const label = computed(() =>
  activePath.value.length ? activePath.value.map((option) => option.label).join(props.separator) : '',
)

const showClear = computed(
  () => props.clearable && !props.disabled && activePath.value.length > 0 && isHovering.value,
)

function onTriggerClick(): void {
  if (props.disabled) return
  toggle()
}

function isActiveAt(level: number, option: CascaderOption): boolean {
  return activePath.value[level]?.value === option.value
}

function handlePick(level: number, option: CascaderOption): void {
  if (option.disabled) return
  const nextPath = activePath.value.slice(0, level)
  nextPath.push(option)
  activePath.value = nextPath

  const hasChildren = option.children && option.children.length > 0
  if (!hasChildren) {
    const value = nextPath.map((item) => item.value)
    emit('update:modelValue', value)
    emit('change', value)
    close()
  }
}

function clear(): void {
  activePath.value = []
  emit('update:modelValue', [])
  emit('change', [])
}
</script>

<template>
  <div
    class="my-cascader"
    :class="[`my-cascader--${actualSize}`, { 'is-disabled': disabled }]"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div ref="triggerRef" class="my-cascader__trigger" @click="onTriggerClick">
      <span v-if="label" class="my-cascader__value">{{ label }}</span>
      <span v-else class="my-cascader__placeholder">{{ placeholder }}</span>
      <button
        v-if="showClear"
        type="button"
        class="my-cascader__clear"
        aria-label="清空"
        @click.stop="clear"
      >
        ×
      </button>
      <span v-else class="my-cascader__arrow" :class="{ 'is-reverse': visible }" aria-hidden="true">▾</span>
    </div>

    <Teleport to="body">
      <div v-show="visible" ref="popperRef" class="my-cascader__panel" :style="popperStyle">
        <ul v-for="(column, level) in columns" :key="level" class="my-cascader__column">
          <li
            v-for="option in column"
            :key="option.value"
            class="my-cascader__option"
            :class="{
              'is-active': isActiveAt(level, option),
              'is-disabled': option.disabled,
              'has-children': option.children && option.children.length,
            }"
            @click="handlePick(level, option)"
          >
            {{ option.label }}
            <span v-if="option.children && option.children.length" class="my-cascader__expand">›</span>
          </li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>
