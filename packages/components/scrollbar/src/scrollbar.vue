<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, type CSSProperties } from 'vue'

defineOptions({
  name: 'MyScrollbar',
})

const props = withDefaults(
  defineProps<{ height?: string | number; maxHeight?: string | number; always?: boolean }>(),
  {
    height: undefined,
    maxHeight: undefined,
    always: false,
  },
)

const emit = defineEmits<{ scroll: [value: { scrollTop: number; scrollLeft: number }] }>()

const wrapRef = ref<HTMLElement | null>(null)
const thumbHeight = ref(0)
const thumbTop = ref(0)
const visible = ref(false)

const wrapStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.height !== undefined) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  if (props.maxHeight !== undefined) {
    style.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
  }
  return style
})

function update(): void {
  const el = wrapRef.value
  if (!el) return
  const { scrollHeight, clientHeight, scrollTop } = el
  if (scrollHeight <= clientHeight) {
    thumbHeight.value = 0
    return
  }
  thumbHeight.value = (clientHeight / scrollHeight) * clientHeight
  thumbTop.value = (scrollTop / scrollHeight) * clientHeight
}

function handleScroll(): void {
  update()
  const el = wrapRef.value
  if (el) emit('scroll', { scrollTop: el.scrollTop, scrollLeft: el.scrollLeft })
}

onMounted(() => {
  update()
  window.addEventListener('resize', update)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', update)
})

defineExpose({ update, wrapRef })
</script>

<template>
  <div
    class="my-scrollbar"
    :class="{ 'is-always': always }"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
  >
    <div ref="wrapRef" class="my-scrollbar__wrap" :style="wrapStyle" @scroll="handleScroll">
      <div class="my-scrollbar__view">
        <slot />
      </div>
    </div>
    <div
      v-show="thumbHeight > 0 && (always || visible)"
      class="my-scrollbar__bar"
    >
      <div
        class="my-scrollbar__thumb"
        :style="{ height: `${thumbHeight}px`, transform: `translateY(${thumbTop}px)` }"
      />
    </div>
  </div>
</template>
