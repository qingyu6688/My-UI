<script setup lang="ts">
import { computed, ref } from 'vue'
import type { VirtualizedTreeNode } from './virtualized-tree'

defineOptions({ name: 'MyVirtualizedTree' })

interface FlatNode {
  key: string | number
  label: string
  level: number
  hasChildren: boolean
  raw: VirtualizedTreeNode
}

const props = withDefaults(
  defineProps<{
    data: VirtualizedTreeNode[]
    height?: number
    itemHeight?: number
    defaultExpandAll?: boolean
  }>(),
  {
    height: 320,
    itemHeight: 32,
    defaultExpandAll: false,
  },
)

const emit = defineEmits<{ nodeClick: [node: VirtualizedTreeNode] }>()

const expanded = ref<Set<string | number>>(
  new Set(props.defaultExpandAll ? collectAll(props.data) : []),
)
const scrollTop = ref(0)

function collectAll(list: VirtualizedTreeNode[]): Array<string | number> {
  const keys: Array<string | number> = []
  const walk = (nodes: VirtualizedTreeNode[]): void => {
    nodes.forEach((node) => {
      keys.push(node.key)
      if (node.children) walk(node.children)
    })
  }
  walk(list)
  return keys
}

// 把树扁平化成可见节点列表
const flat = computed<FlatNode[]>(() => {
  const list: FlatNode[] = []
  const walk = (nodes: VirtualizedTreeNode[], level: number): void => {
    nodes.forEach((node) => {
      list.push({
        key: node.key,
        label: node.label,
        level,
        hasChildren: Boolean(node.children?.length),
        raw: node,
      })
      if (node.children && expanded.value.has(node.key)) {
        walk(node.children, level + 1)
      }
    })
  }
  walk(props.data, 0)
  return list
})

const totalHeight = computed(() => flat.value.length * props.itemHeight)
const visibleCount = computed(() => Math.ceil(props.height / props.itemHeight) + 4)
const startIndex = computed(() =>
  Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - 2),
)
const endIndex = computed(() => Math.min(flat.value.length, startIndex.value + visibleCount.value))
const visibleNodes = computed(() =>
  flat.value.slice(startIndex.value, endIndex.value).map((node, i) => ({
    node,
    index: startIndex.value + i,
  })),
)
const offset = computed(() => startIndex.value * props.itemHeight)

function onScroll(event: Event): void {
  scrollTop.value = (event.target as HTMLElement).scrollTop
}

function toggle(node: FlatNode): void {
  if (!node.hasChildren) return
  const next = new Set(expanded.value)
  if (next.has(node.key)) next.delete(node.key)
  else next.add(node.key)
  expanded.value = next
}

function onClick(node: FlatNode): void {
  emit('nodeClick', node.raw)
}
</script>

<template>
  <div
    class="my-virtualized-tree"
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
          v-for="{ node, index } in visibleNodes"
          :key="index"
          class="my-virtualized-tree__node"
          :style="{
            height: `${itemHeight}px`,
            paddingLeft: `${8 + node.level * 18}px`,
          }"
          @click="onClick(node)"
        >
          <span
            class="my-virtualized-tree__arrow"
            :class="{
              'is-expanded': expanded.has(node.key),
              'is-leaf': !node.hasChildren,
            }"
            @click.stop="toggle(node)"
          >
            {{ node.hasChildren ? '›' : '' }}
          </span>
          <span class="my-virtualized-tree__label">{{ node.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
