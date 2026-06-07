<script setup lang="ts">
import { computed, inject } from 'vue'
import { treeContextKey, type TreeNodeData } from './tree'

defineOptions({
  name: 'MyTreeNode',
})

const props = defineProps<{ node: TreeNodeData; level: number }>()

const tree = inject(treeContextKey)

const key = computed(() => tree?.getKey(props.node) as string | number)
const hasChildren = computed(() => (props.node.children?.length ?? 0) > 0)
const expanded = computed(() => tree?.isExpanded(key.value) ?? false)
const checked = computed(() => tree?.isChecked(key.value) ?? false)
const selected = computed(() => tree?.isSelected(key.value) ?? false)
</script>

<template>
  <div class="my-tree-node">
    <div
      class="my-tree-node__content"
      :class="{ 'is-selected': selected, 'is-disabled': node.disabled }"
      :style="{ paddingLeft: `${level * 18}px` }"
      @click="tree?.selectNode(node)"
    >
      <span
        class="my-tree-node__arrow"
        :class="{ 'is-expanded': expanded, 'is-leaf': !hasChildren }"
        @click.stop="hasChildren && tree?.toggleExpand(key)"
      >
        {{ hasChildren ? '›' : '' }}
      </span>
      <span
        v-if="tree?.showCheckbox"
        class="my-tree-node__checkbox"
        :class="{ 'is-checked': checked }"
        @click.stop="tree?.toggleCheck(node)"
      >
        {{ checked ? '☑' : '☐' }}
      </span>
      <span class="my-tree-node__label">{{ node.label }}</span>
    </div>
    <div v-if="hasChildren && expanded" class="my-tree-node__children">
      <my-tree-node
        v-for="child in node.children"
        :key="tree?.getKey(child)"
        :node="child"
        :level="level + 1"
      />
    </div>
  </div>
</template>
