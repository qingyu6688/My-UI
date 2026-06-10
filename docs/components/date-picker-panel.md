# DatePickerPanel 日期面板

`DatePicker` 的内嵌版本，以面板形式直接展示日历，无需点击触发，适合日程、行程类页面。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'

const date = ref<Date | null>(new Date())
</script>

<template>
  <my-date-picker-panel v-model="date" />
  <p>已选：{{ date }}</p>
</template>
```

## 引入方式

```ts
import { MyDatePickerPanel } from '@qingyu6688/my-ui'
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `model-value` | `Date \| null` | `null` | 选中日期，配合 `v-model` 使用 |
| `disabled-date` | `(date: Date) => boolean` | — | 禁用某一天的判定函数 |
| `first-day-of-week` | `0 \| 1` | `1` | 一周起始日，`0` 为周日，`1` 为周一 |

### Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `(date: Date \| null)` | 日期变化 |
| `change` | `(date: Date \| null)` | 日期确认时触发 |

## 设计说明

- 分类：表单组件。
- 适合直接嵌入页面的日程编排、行程预订、日历类业务场景。
- 与 `DatePicker` 共享日历内核，但去掉了触发器和气泡层。

## 相关文档

- [主题定制](/guide/theme)
