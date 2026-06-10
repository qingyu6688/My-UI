# VirtualizedSelect 虚拟化选择器

面向超长选项列表的选择器，下拉面板内部用虚拟滚动渲染，万级数据也能保持流畅。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'

const options = Array.from({ length: 10000 }, (_, i) => ({
  value: i,
  label: `选项 ${i + 1}`,
}))
const selected = ref<number | null>(null)
</script>

<template>
  <my-virtualized-select
    v-model="selected"
    :options="options"
    placeholder="请选择"
    style="width: 240px;"
  />
</template>
```

## 引入方式

```ts
import { MyVirtualizedSelect, type VirtualizedSelectOption } from '@qingyu6688/my-ui'
```

## API

### Options 类型

```ts
interface VirtualizedSelectOption {
  value: string | number
  label: string
  disabled?: boolean
}
```

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `model-value` | `string \| number \| null` | `null` | 当前选中值，配合 `v-model` 使用 |
| `options` | `VirtualizedSelectOption[]` | `[]` | 选项数据，建议保持引用稳定以利于虚拟列表复用节点 |
| `placeholder` | `string` | `'请选择'` | 未选中时的占位文案 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `clearable` | `boolean` | `false` | 是否显示清除按钮 |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | 尺寸，未传时跟随 `ConfigProvider` |

### Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `(value)` | 选中值变化 |
| `change` | `(value)` | 选项确认时触发 |

## 设计说明

- 分类：表单组件。
- 适合「数据量大、行高一致」的场景；列表项过于复杂（不等高、需要嵌套）时建议改用普通 `Select`。
- 下拉面板的 z-index 跟随 `ConfigProvider` 的 `zIndex` 设置。
