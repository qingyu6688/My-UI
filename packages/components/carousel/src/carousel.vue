<script setup lang="ts">
import { onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { carouselKey, type CarouselEmits, type CarouselProps } from './carousel'

defineOptions({
  name: 'MyCarousel',
})

const props = withDefaults(defineProps<CarouselProps>(), {
  modelValue: 0,
  autoplay: true,
  interval: 3000,
  arrow: 'hover',
  indicator: true,
  loop: true,
  height: '200px',
})

const emit = defineEmits<CarouselEmits>()

const items = ref<number[]>([])
const activeIndex = ref(props.modelValue)
let timer: ReturnType<typeof setInterval> | null = null

provide(carouselKey, {
  register: (uid) => {
    if (!items.value.includes(uid)) items.value = [...items.value, uid]
  },
  unregister: (uid) => {
    items.value = items.value.filter((item) => item !== uid)
  },
  activeIndex,
  items,
})

const count = () => items.value.length

function setActive(index: number): void {
  const total = count()
  if (total === 0) return
  let next = index
  if (next < 0) next = props.loop ? total - 1 : 0
  if (next >= total) next = props.loop ? 0 : total - 1
  if (next === activeIndex.value) return
  const prev = activeIndex.value
  activeIndex.value = next
  emit('update:modelValue', next)
  emit('change', next, prev)
}

function next(): void {
  setActive(activeIndex.value + 1)
}
function prev(): void {
  setActive(activeIndex.value - 1)
}

function startTimer(): void {
  if (props.autoplay && props.interval > 0) {
    timer = setInterval(next, props.interval)
  }
}
function stopTimer(): void {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

watch(() => props.modelValue, (value) => setActive(value))

onMounted(startTimer)
onBeforeUnmount(stopTimer)
</script>

<template>
  <div
    class="my-carousel"
    :class="`my-carousel--arrow-${arrow}`"
    @mouseenter="stopTimer"
    @mouseleave="startTimer"
  >
    <div class="my-carousel__track" :style="{ height }">
      <slot />
    </div>

    <button
      v-if="arrow !== 'never'"
      type="button"
      class="my-carousel__arrow my-carousel__arrow--left"
      aria-label="上一张"
      @click="prev"
    >
      ‹
    </button>
    <button
      v-if="arrow !== 'never'"
      type="button"
      class="my-carousel__arrow my-carousel__arrow--right"
      aria-label="下一张"
      @click="next"
    >
      ›
    </button>

    <ul v-if="indicator" class="my-carousel__indicators">
      <li
        v-for="(item, index) in items"
        :key="item"
        class="my-carousel__indicator"
        :class="{ 'is-active': index === activeIndex }"
        @click="setActive(index)"
      />
    </ul>
  </div>
</template>
