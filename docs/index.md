# My UI

My UI 是一个面向 Vue 3 的组件库项目，目标是提供稳定、清晰、可定制主题的中后台组件基础。项目默认采用鼠尾草浅黄主题，并通过 CSS Variables 支持运行时换肤。

## 快速入口

| 页面 | 内容 |
| --- | --- |
| [快速开始](/guide/quick-start) | 安装、全量注册、按需引入和本地开发 |
| [主题定制](/guide/theme) | 主题变量、运行时换肤和默认配色 |
| [主题编辑器](/theme/) | 可视化修改主色、辅助色和强调色 |
| [组件文档](/components/button) | 按分类查看组件说明和使用示例 |
| [API 文档](/api) | 组件导出、主题 API、服务式 API |
| [更新日志](/changelog) | 版本更新记录 |

## 默认主题

| 名称 | 色值 |
| --- | --- |
| 主色 | `#a8d5ba` |
| 辅助色 | `#d7e8bd` |
| 强调色 | `#fff3c7` |

## 安装使用

```ts
import { createApp } from 'vue'
import MyUI from '@qingyu6688/my-ui'
import '@qingyu6688/my-ui/theme-chalk/index.css'
import App from './App.vue'

createApp(App).use(MyUI).mount('#app')
```

当前仓库还处于组件库建设阶段，目前源码层统一导出 75 个组件模块。文档会随着组件 API 稳定逐步补齐更细的 Props、Events、Slots 表格。
