<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({
  name: 'MyBacktop',
})

const props = withDefaults(
  defineProps<{ target?: string; visibilityHeight?: number; right?: number; bottom?: number }>(),
  {
    target: '',
    visibilityHeight: 200,
    right: 40,
    bottom: 40,
  },
)

const emit = defineEmits<{ click: [event: MouseEvent] }>()

const visible = ref(false)
let container: HTMLElement | Window = window

function getScrollTop(): number {
  return container === window
    ? window.scrollY
    : (container as HTMLElement).scrollTop
}

function handleScroll(): void {
  visible.value = getScrollTop() >= props.visibilityHeight
}

function scrollToTop(event: MouseEvent): void {
  if (container === window) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    ;(container as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' })
  }
  emit('click', event)
}

onMounted(() => {
  if (props.target) {
    container = document.querySelector<HTMLElement>(props.target) ?? window
  }
  container.addEventListener('scroll', handleScroll)
  handleScroll()
})

onBeforeUnmount(() => {
  container.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <transition name="my-backtop-fade">
    <button
      v-show="visible"
      type="button"
      class="my-backtop"
      :style="{ right: `${right}px`, bottom: `${bottom}px` }"
      aria-label="回到顶部"
      @click="scrollToTop"
    >
      <slot>↑</slot>
    </button>
  </transition>
</template>
