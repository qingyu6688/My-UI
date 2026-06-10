<script setup lang="ts">
import { computed, ref } from 'vue'
import type { VirtualizedTableColumn } from './virtualized-table'

defineOptions({ name: 'MyVirtualizedTable' })

const props = withDefaults(
  defineProps<{
    data: Record<string, unknown>[]
    columns: VirtualizedTableColumn[]
    height?: number
    rowHeight?: number
  }>(),
  {
    height: 360,
    rowHeight: 40,
  },
)

const scrollTop = ref(0)

const totalHeight = computed(() => props.data.length * props.rowHeight)
const visibleCount = computed(() => Math.ceil(props.height / props.rowHeight) + 4)
const startIndex = computed(() =>
  Math.max(0, Math.floor(scrollTop.value / props.rowHeight) - 2),
)
const endIndex = computed(() =>
  Math.min(props.data.length, startIndex.value + visibleCount.value),
)
const visibleRows = computed(() =>
  props.data.slice(startIndex.value, endIndex.value).map((row, i) => ({
    row,
    index: startIndex.value + i,
  })),
)
const offset = computed(() => startIndex.value * props.rowHeight)

function onScroll(event: Event): void {
  scrollTop.value = (event.target as HTMLElement).scrollTop
}

function getColStyle(column: VirtualizedTableColumn): Record<string, string> {
  if (column.width) return { width: `${column.width}px`, minWidth: `${column.width}px` }
  return { flex: '1' }
}
</script>

<template>
  <div class="my-virtualized-table">
    <div class="my-virtualized-table__head">
      <div
        v-for="col in columns"
        :key="col.prop"
        class="my-virtualized-table__cell my-virtualized-table__cell--head"
        :style="getColStyle(col)"
      >
        {{ col.label }}
      </div>
    </div>
    <div
      class="my-virtualized-table__body"
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
            v-for="{ row, index } in visibleRows"
            :key="index"
            class="my-virtualized-table__row"
            :style="{ height: `${rowHeight}px` }"
          >
            <div
              v-for="col in columns"
              :key="col.prop"
              class="my-virtualized-table__cell"
              :style="getColStyle(col)"
            >
              {{ row[col.prop] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
