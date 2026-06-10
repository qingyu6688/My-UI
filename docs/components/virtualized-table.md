# VirtualizedTable 虚拟化表格

面向超长数据集的表格，行渲染采用虚拟滚动策略，仅渲染可视区域，避免一次性挂载数千个 DOM。

## 基础用法

```vue
<script setup lang="ts">
const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '邮箱' },
]
const data = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  name: `用户 ${i + 1}`,
  email: `user${i + 1}@example.com`,
}))
</script>

<template>
  <my-virtualized-table :columns="columns" :data="data" :height="400" />
</template>
```

## 引入方式

```ts
import { MyVirtualizedTable, type VirtualizedTableColumn } from '@qingyu6688/my-ui'
```

## API

### Column 类型

```ts
interface VirtualizedTableColumn {
  prop: string
  label: string
  width?: number
}
```

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `columns` | `VirtualizedTableColumn[]` | `[]` | 列定义 |
| `data` | `Record<string, unknown>[]` | `[]` | 行数据 |
| `height` | `number` | `400` | 可视区高度（px），超出后内部滚动 |
| `row-height` | `number` | `40` | 行高（px），建议固定以保证虚拟列表性能 |
| `stripe` | `boolean` | `false` | 是否显示斑马纹 |
| `border` | `boolean` | `false` | 是否显示边框 |

## 设计说明

- 分类：数据展示。
- 适合行数较多、每行结构一致的场景。需要复杂列内自定义渲染时建议改用普通 `Table` 组件。
- 行高必须保持稳定，否则虚拟滚动会出现跳动。
