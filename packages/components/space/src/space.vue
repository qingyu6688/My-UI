<script setup lang="ts">
import { Comment, computed, Fragment, useSlots, type CSSProperties, type VNode } from 'vue'
import type { SpaceProps, SpaceSize, SpaceSizeName } from './space'

defineOptions({
  name: 'MySpace',
})

const props = withDefaults(defineProps<SpaceProps>(), {
  direction: 'horizontal',
  size: 'default',
  wrap: true,
  align: undefined,
  fill: false,
})

const slots = useSlots()

const SIZE_MAP: Record<SpaceSizeName, number> = {
  small: 8,
  default: 12,
  large: 20,
}

function resolveGap(size: SpaceSize): [number, number] {
  if (typeof size === 'number') {
    return [size, size]
  }
  if (Array.isArray(size)) {
    return size
  }
  const value = SIZE_MAP[size]
  return [value, value]
}

const containerStyle = computed<CSSProperties>(() => {
  const [columnGap, rowGap] = resolveGap(props.size)
  return {
    columnGap: `${columnGap}px`,
    rowGap: `${rowGap}px`,
    flexWrap: props.wrap ? 'wrap' : 'nowrap',
    alignItems: props.align,
  }
})

const items = computed<VNode[]>(() => {
  const defaultSlot = slots.default?.() ?? []
  const flat: VNode[] = []

  const walk = (nodes: VNode[]): void => {
    for (const node of nodes) {
      if (node.type === Fragment && Array.isArray(node.children)) {
        walk(node.children as VNode[])
        continue
      }
      if (node.type === Comment) {
        continue
      }
      flat.push(node)
    }
  }

  walk(defaultSlot)
  return flat
})

const hasSeparator = computed(() => Boolean(slots.separator))
</script>

<template>
  <div
    class="my-space"
    :class="[
      `my-space--${direction}`,
      {
        'is-fill': fill,
      },
    ]"
    :style="containerStyle"
  >
    <template v-for="(item, index) in items" :key="index">
      <div class="my-space__item">
        <component :is="item" />
      </div>
      <div
        v-if="hasSeparator && index < items.length - 1"
        class="my-space__separator"
        aria-hidden="true"
      >
        <slot name="separator" />
      </div>
    </template>
  </div>
</template>
