# 快速开始

本页说明如何在 Vue 3 项目中接入 My UI。当前仓库以本地开发和文档站验证为主，后续发布 npm 包后可以直接通过包名安装。

## 环境要求

| 项目 | 建议版本 |
| --- | --- |
| Node.js | 20 或更高版本 |
| Vue | 3.x |
| TypeScript | 5.x |
| 构建工具 | Vite |

## 安装依赖

在当前仓库开发时执行：

```bash
npm install
```

作为外部项目使用时，发布后使用：

```bash
npm install @qingyu6688/my-ui
```

## 全量引入

```ts
import { createApp } from 'vue'
import MyUI from '@qingyu6688/my-ui'
import '@qingyu6688/my-ui/theme-chalk/index.css'
import App from './App.vue'

createApp(App).use(MyUI).mount('#app')
```

## 配置默认主题

```ts
import { createApp } from 'vue'
import MyUI from '@qingyu6688/my-ui'
import App from './App.vue'

createApp(App)
  .use(MyUI, {
    theme: {
      primary: '#a8d5ba',
      secondary: '#d7e8bd',
      accent: '#fff3c7',
    },
  })
  .mount('#app')
```

## 按需引入

```ts
import { MyButton, MyInput, MyTable } from '@qingyu6688/my-ui'
```

按需引入适合业务项目逐步接入组件库。组件样式目前建议统一引入完整样式入口，待构建策略稳定后再补充组件级样式入口。

## 本地预览

```bash
npm run dev
```

本地预览站包含首页、指南、组件、主题、路线几个页面，适合检查组件视觉和主题变量效果。

