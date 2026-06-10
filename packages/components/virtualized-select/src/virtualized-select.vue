<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { usePopper } from '../../../hooks/use-popper'
import type { VirtualizedSelectOption } from './virtualized-select'

defineOptions({ name: 'MyVirtualizedSelect' })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    options: VirtualizedSelectOption[]
    placeholder?: string
    disabled?: boolean
    itemHeight?: number
    height?: number
  }>(),
  {
    modelValue: undefined,
    placeholder: '请选择',
    disabled: false,
    itemHeight: 32,
    height: 240,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const {
  visible,
  triggerRef,
  popperRef,
  popperStyle,
  toggle,
  close,
  open,
  update,
} = usePopper({ placement: 'bottom-start', offset: 4 })

const scrollEl = ref<HTMLElement | null>(null)
const scrollTop = ref(0)

const selectedLabel = computed(
  () => props.options.find((o) => o.value === props.modelValue)?.label ?? '',
)

const totalHeight = computed(() => props.options.length * props.itemHeight)
const visibleCount = computed(() => Math.ceil(props.height / props.itemHeight) + 4)
const startIndex = computed(() =>
  Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - 2),
)
const endIndex = computed(() =>
  Math.min(props.options.length, startIndex.value + visibleCount.value),
)
const visibleOptions = computed(() =>
  props.options.slice(startIndex.value, endIndex.value).map((option, i) => ({
    option,
    index: startIndex.value + i,
  })),
)
const offset = computed(() => startIndex.value * props.itemHeight)

function onScroll(event: Event): void {
  scrollTop.value = (event.target as HTMLElement).scrollTop
}

function onTrigger(): void {
  if (props.disabled) return
  toggle()
  if (visible.value) {
    void nextTick(() => update())
  }
}

function pick(option: VirtualizedSelectOption): void {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  emit('change', option.value)
  close()
}

function handleResize(): void {
  if (visible.value) update()
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

defineExpose({ open, close })
</script>

<template>
  <div class="my-virtualized-select" :class="{ 'is-disabled': disabled }">
    <div
      ref="triggerRef"
      class="my-virtualized-select__trigger"
      :class="{ 'is-focused': visible }"
      tabindex="0"
      @click="onTrigger"
    >
      <span v-if="selectedLabel" class="my-virtualized-select__value">{{ selectedLabel }}</span>
      <span v-else class="my-virtualized-select__placeholder">{{ placeholder }}</span>
      <span class="my-virtualized-select__arrow" :class="{ 'is-reverse': visible }">▾</span>
    </div>
    <Teleport to="body">
      <div
        v-show="visible"
        ref="popperRef"
        class="my-virtualized-select__panel"
        :style="popperStyle"
      >
        <div
          ref="scrollEl"
          class="my-virtualized-select__scroll"
          :style="{ height: `${height}px` }"
          @scroll="onScroll"
        >
          <div :style="{ height: `${totalHeight}px`, position: 'relative' }">
            <div
              :style="{
                transform: `translateY(${offset}px)`,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
              }"
            >
              <div
                v-for="{ option, index } in visibleOptions"
                :key="index"
                class="my-virtualized-select__option"
                :class="{
                  'is-active': option.value === modelValue,
                  'is-disabled': option.disabled,
                }"
                :style="{ height: `${itemHeight}px`, lineHeight: `${itemHeight}px` }"
                @click="pick(option)"
              >
                {{ option.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
