<script setup lang="ts">
function genChildren(prefix: string, depth: number): Array<{ key: string; label: string; children?: unknown[] }> {
  if (depth === 0) return []
  return Array.from({ length: 8 }, (_, i) => ({
    key: `${prefix}-${i}`,
    label: `节点 ${prefix}-${i}`,
    children: genChildren(`${prefix}-${i}`, depth - 1),
  }))
}

const data = genChildren('n', 3)
</script>

<template>
  <my-virtualized-tree :data="data" :height="320" default-expand-all />
</template>
