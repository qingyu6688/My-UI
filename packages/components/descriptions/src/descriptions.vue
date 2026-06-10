<script setup lang="ts">
import { computed, useSlots, type VNode } from 'vue'
import { useSize } from '../../../hooks/use-config'
import type { DescriptionsProps } from './descriptions'

defineOptions({
  name: 'MyDescriptions',
})

const props = withDefaults(defineProps<DescriptionsProps>(), {
  title: '',
  column: 3,
  border: false,
  size: undefined,
})

const actualSize = useSize(props)

const slots = useSlots()

interface ResolvedItem {
  label: string
  span: number
  node: VNode
}

const items = computed<ResolvedItem[]>(() => {
  const children = slots.default?.() ?? []
  const result: ResolvedItem[] = []
  for (const node of children) {
    const type = node.type as { name?: string }
    if (type?.name !== 'MyDescriptionsItem') continue
    const itemProps = (node.props ?? {}) as { label?: string; span?: number | string }
    result.push({
      label: itemProps.label ?? '',
      span: Number(itemProps.span ?? 1),
      node,
    })
  }
  return result
})

// 按 column 切分成行
const rows = computed<ResolvedItem[][]>(() => {
  const result: ResolvedItem[][] = []
  let current: ResolvedItem[] = []
  let used = 0
  for (const item of items.value) {
    const span = Math.min(item.span, props.column)
    if (used + span > props.column) {
      result.push(current)
      current = []
      used = 0
    }
    current.push(item)
    used += span
  }
  if (current.length) result.push(current)
  return result
})
</script>

<template>
  <div class="my-descriptions" :class="[`my-descriptions--${actualSize}`, { 'is-bordered': border }]">
    <div v-if="title || $slots.title" class="my-descriptions__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <table class="my-descriptions__table">
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="my-descriptions__row">
          <template v-for="(item, itemIndex) in row" :key="itemIndex">
            <th
              class="my-descriptions__label"
              :colspan="1"
            >
              {{ item.label }}
            </th>
            <td
              class="my-descriptions__content"
              :colspan="item.span * 2 - 1"
            >
              <component :is="item.node" />
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
