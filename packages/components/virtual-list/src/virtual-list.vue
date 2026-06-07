<script setup lang="ts">
import { computed, ref } from 'vue'
import type { VirtualListProps } from './virtual-list'

defineOptions({
  name: 'MyVirtualList',
})

const props = withDefaults(defineProps<VirtualListProps>(), {
  itemHeight: 32,
  height: 320,
  buffer: 4,
})

const scrollTop = ref(0)

const totalHeight = computed(() => props.items.length * props.itemHeight)

const visibleCount = computed(() => Math.ceil(props.height / props.itemHeight) + props.buffer * 2)

const startIndex = computed(() =>
  Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - props.buffer),
)

const endIndex = computed(() =>
  Math.min(props.items.length, startIndex.value + visibleCount.value),
)

const offset = computed(() => startIndex.value * props.itemHeight)

interface VisibleEntry {
  index: number
  item: unknown
}

const visibleItems = computed<VisibleEntry[]>(() =>
  props.items.slice(startIndex.value, endIndex.value).map((item, i) => ({
    index: startIndex.value + i,
    item,
  })),
)

function onScroll(event: Event): void {
  scrollTop.value = (event.target as HTMLElement).scrollTop
}
</script>

<template>
  <div class="my-virtual-list" :style="{ height: `${height}px` }" @scroll="onScroll">
    <div class="my-virtual-list__phantom" :style="{ height: `${totalHeight}px` }" />
    <div class="my-virtual-list__content" :style="{ transform: `translateY(${offset}px)` }">
      <div
        v-for="entry in visibleItems"
        :key="entry.index"
        class="my-virtual-list__item"
        :style="{ height: `${itemHeight}px` }"
      >
        <slot :item="entry.item" :index="entry.index" />
      </div>
    </div>
  </div>
</template>
