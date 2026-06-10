<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { usePopper } from '../../../hooks/use-popper'
import { useSize } from '../../../hooks/use-config'
import { MyTree, type TreeKey, type TreeNodeData } from '../../tree'
import { formContextKey } from '../../form/src/form'
import type { TreeSelectEmits, TreeSelectProps } from './tree-select'

defineOptions({
  name: 'MyTreeSelect',
})

const props = withDefaults(defineProps<TreeSelectProps>(), {
  modelValue: undefined,
  nodeKey: 'key',
  placeholder: '请选择',
  disabled: false,
  clearable: false,
  defaultExpandAll: false,
  size: undefined,
})

const form = inject(formContextKey, undefined)
const actualSize = useSize(props, computed(() => form?.size.value))

const emit = defineEmits<TreeSelectEmits>()

const { visible, triggerRef, popperRef, popperStyle, toggle, close } = usePopper({
  placement: 'bottom-start',
  offset: 6,
})

const isHovering = ref(false)

function findLabel(nodes: TreeNodeData[], key: TreeKey): string {
  for (const node of nodes) {
    const nodeKeyValue = (node[props.nodeKey] as TreeKey) ?? node.label
    if (nodeKeyValue === key) return node.label
    if (node.children) {
      const found = findLabel(node.children, key)
      if (found) return found
    }
  }
  return ''
}

const label = computed(() =>
  props.modelValue !== undefined ? findLabel(props.data, props.modelValue) : '',
)

const showClear = computed(
  () => props.clearable && !props.disabled && props.modelValue !== undefined && isHovering.value,
)

function onTriggerClick(): void {
  if (props.disabled) return
  toggle()
}

function onNodeClick(node: TreeNodeData): void {
  const key = (node[props.nodeKey] as TreeKey) ?? node.label
  emit('update:modelValue', key)
  emit('change', key)
  close()
}

function clear(): void {
  emit('update:modelValue', undefined)
  emit('change', undefined)
}
</script>

<template>
  <div
    class="my-tree-select"
    :class="[`my-tree-select--${actualSize}`, { 'is-disabled': disabled }]"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div ref="triggerRef" class="my-tree-select__trigger" @click="onTriggerClick">
      <span v-if="label" class="my-tree-select__value">{{ label }}</span>
      <span v-else class="my-tree-select__placeholder">{{ placeholder }}</span>
      <button
        v-if="showClear"
        type="button"
        class="my-tree-select__clear"
        aria-label="清空"
        @click.stop="clear"
      >
        ×
      </button>
      <span v-else class="my-tree-select__arrow" :class="{ 'is-reverse': visible }" aria-hidden="true">▾</span>
    </div>

    <Teleport to="body">
      <div v-show="visible" ref="popperRef" class="my-tree-select__panel" :style="popperStyle">
        <my-tree
          :data="data"
          :node-key="nodeKey"
          :default-expand-all="defaultExpandAll"
          @node-click="onNodeClick"
        />
      </div>
    </Teleport>
  </div>
</template>
