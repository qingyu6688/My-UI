# ColorPickerPanel 颜色面板

`ColorPicker` 的内嵌版本，直接以面板形式展示，不需要点击触发，适合主题配置类页面。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#a8d5ba')
</script>

<template>
  <my-color-picker-panel v-model="color" />
  <p>当前颜色：{{ color }}</p>
</template>
```

## 引入方式

```ts
import { MyColorPickerPanel } from '@qingyu6688/my-ui'
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `model-value` | `string` | `'#ffffff'` | 当前颜色（HEX 格式），配合 `v-model` 使用 |
| `show-alpha` | `boolean` | `false` | 是否启用透明通道 |
| `predefine` | `string[]` | `[]` | 预设色板，每项为 HEX 色值 |

### Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `(value: string)` | 颜色变化 |
| `change` | `(value: string)` | 颜色确认时触发 |

## 设计说明

- 分类：表单组件。
- 适合直接嵌入到主题编辑器、画布工具栏等长期展示色板的场景。
- 与 `ColorPicker` 共享底层取色逻辑，但不带触发器和气泡。

## 相关文档

- [主题编辑器](/theme/)
- [Color 色彩](/components/color)
