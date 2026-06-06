# ConfigProvider 全局配置

统一管理命名空间、主题、尺寸、层级和组件默认配置。

## 基础用法

```vue
<template>
  <my-config-provider>ConfigProvider</my-config-provider>
</template>
```

## 引入方式

```ts
import { MyConfigProvider } from '@qingyu6688/my-ui'
```

## 设计说明

- 分类：配置组件。
- 样式会跟随 My UI 主题变量变化。
- 复杂交互需要同时关注默认、悬停、聚焦、禁用和错误状态。
- 后续会继续补齐 Props、Events、Slots 和 Exposes 表格。

## API

通用导出与主题 API 见 [API 文档](/api)。

