# VirtualizedTree 虚拟化树

面向超大节点量的树组件，虚拟化扁平节点列表，万级节点也能流畅展开和滚动。

## 基础用法

```vue
<script setup lang="ts">
function buildTree(level = 0, prefix = '0'): unknown[] {
  if (level >= 3) return []
  return Array.from({ length: 50 }, (_, i) => ({
    key: `${prefix}-${i}`,
    label: `节点 ${prefix}-${i}`,
    children: buildTree(level + 1, `${prefix}-${i}`),
  }))
}

const data = buildTree()
</script>

<template>
  <my-virtualized-tree :data="data" :height="420" />
</template>
```

## 引入方式

```ts
import { MyVirtualizedTree, type VirtualizedTreeNode } from '@qingyu6688/my-ui'
```

## API

### Node 类型

```ts
interface VirtualizedTreeNode {
  key: string | number
  label: string
  children?: VirtualizedTreeNode[]
}
```

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `VirtualizedTreeNode[]` | `[]` | 树数据 |
| `height` | `number` | `400` | 可视区高度（px） |
| `node-height` | `number` | `28` | 节点行高（px） |
| `default-expand-all` | `boolean` | `false` | 默认展开所有节点 |

### Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `node-click` | `(node: VirtualizedTreeNode)` | 节点被点击 |
| `expand-change` | `(keys: Array<string \| number>)` | 展开节点变化 |

## 设计说明

- 分类：数据展示。
- 适合节点数量极多（>1000）的场景，普通 `Tree` 组件足以应对常规层级。
- 内部将树压平为可见节点数组后再做虚拟滚动，展开 / 折叠会触发数组重建。
