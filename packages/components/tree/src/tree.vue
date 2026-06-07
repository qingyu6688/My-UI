<script setup lang="ts">
import { provide, reactive, ref } from 'vue'
import TreeNode from './tree-node.vue'
import {
  treeContextKey,
  type TreeEmits,
  type TreeKey,
  type TreeNodeData,
  type TreeProps,
} from './tree'

defineOptions({
  name: 'MyTree',
})

const props = withDefaults(defineProps<TreeProps>(), {
  nodeKey: 'key',
  showCheckbox: false,
  defaultExpandedKeys: () => [],
  defaultCheckedKeys: () => [],
  defaultExpandAll: false,
})

const emit = defineEmits<TreeEmits>()

function getKey(node: TreeNodeData): TreeKey {
  return (node[props.nodeKey] as TreeKey) ?? node.label
}

const expandedKeys = reactive(new Set<TreeKey>())
const checkedKeys = reactive(new Set<TreeKey>())
const selectedKey = ref<TreeKey | undefined>(undefined)

function initExpand(nodes: TreeNodeData[]): void {
  for (const node of nodes) {
    if (props.defaultExpandAll || props.defaultExpandedKeys.includes(getKey(node))) {
      expandedKeys.add(getKey(node))
    }
    if (node.children) initExpand(node.children)
  }
}
initExpand(props.data)
props.defaultCheckedKeys.forEach((key) => checkedKeys.add(key))

function collectKeys(node: TreeNodeData, acc: TreeKey[]): void {
  acc.push(getKey(node))
  node.children?.forEach((child) => collectKeys(child, acc))
}

provide(treeContextKey, {
  expandedKeys,
  checkedKeys,
  get selectedKey() {
    return selectedKey.value
  },
  showCheckbox: props.showCheckbox,
  getKey,
  isExpanded: (key) => expandedKeys.has(key),
  isChecked: (key) => checkedKeys.has(key),
  isSelected: (key) => selectedKey.value === key,
  toggleExpand: (key) => {
    if (expandedKeys.has(key)) expandedKeys.delete(key)
    else expandedKeys.add(key)
    emit('expand', [...expandedKeys])
  },
  toggleCheck: (node) => {
    // 连同子孙一起勾选/取消
    const keys: TreeKey[] = []
    collectKeys(node, keys)
    const nextChecked = !checkedKeys.has(getKey(node))
    keys.forEach((key) => {
      if (nextChecked) checkedKeys.add(key)
      else checkedKeys.delete(key)
    })
    emit('check', [...checkedKeys])
  },
  selectNode: (node) => {
    if (node.disabled) return
    selectedKey.value = getKey(node)
    emit('nodeClick', node)
  },
})

defineExpose({
  getCheckedKeys: () => [...checkedKeys],
})
</script>

<template>
  <div class="my-tree">
    <tree-node v-for="node in data" :key="getKey(node)" :node="node" :level="0" />
  </div>
</template>
