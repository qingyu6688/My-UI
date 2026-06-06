# Image 图片

展示图片内容，后续支持预览、加载和失败状态。

## 当前状态

该组件已经接入统一导出，可通过 `@qingyu6688/my-ui` 引入使用。

## 基础用法

```vue
<template>
  <my-image src="/example.png" alt="示例图片" />
</template>
```

## 设计说明

- 分类：数据展示。
- 图片组件需要关注加载失败、懒加载、预览和可访问性文本。
- 后续会继续补齐 Props、Events、Slots 和 Exposes 表格。
