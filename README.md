# My UI

My UI 是一个基于 **Vue 3 + TypeScript + Vite** 的前端组件库项目。它参考 Element Plus 的工程分层、组件组织和文档站体验，目标是沉淀一套适合中后台系统、管理端页面、工具型产品和业务组件复用场景的 UI 基础设施。

项目当前重点不是做一个只有按钮和输入框的示例库，而是把组件源码、主题系统、本地预览站、VitePress 文档、单元测试和构建产物放在同一个工作区里维护，方便后续持续补齐组件 API、示例、类型声明和发布流程。

开发者备注：`maorongkang@gmail.com`

## 项目信息

| 项目 | 内容 |
| --- | --- |
| 项目名称 | My UI |
| 当前版本 | `1.0.8` |
| 项目类型 | Vue 3 组件库 / 文档站 / 本地预览站 |
| 技术栈 | Vue 3、TypeScript、Vite、Vue Router、VitePress、SCSS、Vitest |
| 组件前缀 | `My`，例如 `MyButton`、`MyInput`、`MyTable` |
| 标签前缀 | `my-`，例如 `<my-button />`、`<my-input />` |
| 主题特色 | 支持运行时主题色替换，默认鼠尾草浅黄主题 |
| 主要入口 | `packages/my-ui/index.ts` |

## 核心目标

- 提供一套适合真实管理端项目使用的 Vue 3 基础组件。
- 组件 API 尽量保持清晰、稳定、可维护，后续方便扩展。
- 使用 TypeScript 约束 Props、事件、服务式 API 和工具函数。
- 通过 SCSS + CSS Variables 支持统一样式和运行时主题切换。
- 提供本地预览站，用来展示首页、指南、组件、演练场、主题和路线页面。
- 提供 VitePress 文档站，用来沉淀组件说明、主题方案、部署说明和更新日志。
- 保持测试、类型检查、Lint、构建命令完整，减少后续维护成本。

## 默认主题

My UI 默认主题使用鼠尾草浅黄配色，整体风格偏安静、清爽，适合后台系统和工具型产品。

| 主题色 | 色值 | 用途 |
| --- | --- | --- |
| 主色 | `#a8d5ba` | 主按钮、选中态、焦点态、重点链接 |
| 辅助色 | `#d7e8bd` | 辅助背景、成功提示、轻量状态 |
| 强调色 | `#fff3c7` | 温和提示、弱警告、空状态背景 |

主题系统目前围绕三个基础色生成一组 CSS Variables，并应用到按钮、表单、反馈、导航、数据展示和文档站外壳中。

## 功能概览

### 组件库

- 组件源码集中在 `packages/components/`。
- 组件统一通过 `packages/components/index.ts` 导出。
- 插件安装入口位于 `packages/my-ui/index.ts`。
- 样式入口位于 `packages/theme-chalk/src/index.scss`。
- 支持完整安装，也支持按组件模块导入。
- 包含组件、服务、指令和组合式函数，例如 `Message`、`MessageBox`、`Notification`、`vLoading`、`useTheme`、`useConfig`。

### 主题系统

- 内置默认主题色：`#a8d5ba`、`#d7e8bd`、`#fff3c7`。
- 支持 `createTheme` 根据基础色生成主题变量。
- 支持 `applyTheme` 在运行时写入 CSS Variables。
- 支持 `useTheme` 在组件或页面中读取和应用主题。
- 支持 `ConfigProvider` 管理全局配置，例如命名空间、尺寸、层级和默认主题。
- 本地预览站提供主题编辑页面，可以实时查看主题变化。

### 本地预览站

本地预览站位于 `src/`，使用 Vue Router 拆分页面，不把页面内容堆在 `App.vue` 中。

| 页面 | 路由 | 说明 |
| --- | --- | --- |
| 首页 | `/` | 展示项目定位、主题特色、组件入口和路线概览 |
| 指南 | `/guide` | 展示安装、快速开始、主题接入和工程说明 |
| 组件 | `/components` | 按分类展示组件、示例、源码和基础说明 |
| 演练场 | `/playground` | 在线编辑示例代码，运行并预览 My UI 组件效果 |
| 主题 | `/theme` | 修改主题色并实时预览 |
| 路线 | `/roadmap` | 展示已完成事项和后续计划 |

### 演练场

演练场用于快速验证组件效果，适合开发组件时做轻量调试。

当前能力包括：

- `App.vue` 示例编辑。
- CSS 示例查看。
- 错误输出展示。
- 手动运行、重置、复制代码。
- 自动运行开关。
- 右侧实时预览 My UI 组件。
- 预览区跟随当前主题变量和站点深浅色外壳。

为了支持演练场的动态模板编译，本地预览站在非库构建模式下会使用带模板编译能力的 Vue bundler 版本；组件库生产构建仍然将 `vue` 作为外部依赖处理。

### 文档站

文档站位于 `docs/`，使用 VitePress 维护。

当前文档内容包括：

- `docs/requirements.md`：需求文档。
- `docs/api.md`：API 文档。
- `docs/schema.md`：数据库 Schema 说明。
- `docs/deploy.md`：部署说明。
- `docs/environment.md`：环境记录。
- `docs/changelog.md`：更新日志。
- `docs/components/`：组件文档。
- `docs/guide/`：指南文档。
- `docs/theme/`：主题说明。

## 组件范围

当前项目已经覆盖基础组件、配置组件、表单组件、数据展示、导航组件、反馈组件和其他增强组件。下面按使用场景整理主要模块。

### 基础组件

| 组件 | 说明 |
| --- | --- |
| Button 按钮 | 页面操作入口，支持类型、尺寸、加载、禁用、图标和文本按钮 |
| Icon 图标 | 统一图标尺寸、颜色和可访问性标识 |
| Layout 布局 | 提供 Row、Col 等基础布局能力 |
| Container 容器 | 提供 Header、Aside、Main、Footer 等页面结构容器 |
| Link 链接 | 用于页面跳转和外部链接 |
| Text 文本 | 统一正文、辅助说明、状态文本和截断展示 |
| Typography 排版 | 提供 Title、Paragraph 等内容排版能力 |
| Divider 分割线 | 分隔内容区域，支持文字分割 |
| Space 间距 | 处理按钮组、标签组和行内元素间距 |
| Scrollbar 滚动条 | 提供统一滚动容器样式 |

### 配置组件

| 组件 | 说明 |
| --- | --- |
| ConfigProvider | 提供全局配置入口，管理命名空间、尺寸、层级和主题等上下文 |

### 表单组件

| 组件 | 说明 |
| --- | --- |
| Autocomplete | 自动补全输入框 |
| Cascader | 级联选择器 |
| Checkbox | 多选框和多选框组 |
| ColorPicker | 颜色选择器 |
| ColorPickerPanel | 颜色选择器面板 |
| DatePicker | 日期选择器 |
| DatePickerPanel | 日期选择器面板 |
| DateTimePicker | 日期时间选择器 |
| Form | 表单和表单项 |
| Input | 输入框 |
| InputNumber | 数字输入框 |
| InputOtp | 一次性验证码输入 |
| InputTag | 标签输入 |
| Mention | 提及输入 |
| Radio | 单选框和单选框组 |
| Rate | 评分 |
| Segmented | 分段控制器 |
| Select | 选择器 |
| Slider | 滑块 |
| Switch | 开关 |
| TimePicker | 时间选择器 |
| TimeSelect | 时间选择 |
| Transfer | 穿梭框 |
| TreeSelect | 树选择 |
| Upload | 上传 |
| VirtualizedSelect | 虚拟化选择器 |

### 数据展示

| 组件 | 说明 |
| --- | --- |
| Avatar | 头像 |
| Badge | 徽章 |
| Calendar | 日历 |
| Card | 卡片 |
| Carousel | 走马灯 |
| Collapse | 折叠面板 |
| Descriptions | 描述列表 |
| Empty | 空状态 |
| Image | 图片 |
| Pagination | 分页 |
| Progress | 进度条 |
| Skeleton | 骨架屏 |
| Statistic | 统计数值 |
| Table | 表格 |
| Tag | 标签 |
| Timeline | 时间线 |
| Tree | 树 |
| VirtualList | 虚拟列表 |
| VirtualizedTable | 虚拟化表格 |
| VirtualizedTree | 虚拟化树 |

### 导航组件

| 组件 | 说明 |
| --- | --- |
| Affix | 固钉 |
| Anchor | 锚点 |
| Backtop | 回到顶部 |
| Breadcrumb | 面包屑 |
| Dropdown | 下拉菜单 |
| Menu | 菜单 |
| PageHeader | 页头 |
| Steps | 步骤条 |
| Tabs | 标签页 |

### 反馈组件

| 组件 | 说明 |
| --- | --- |
| Alert | 提示 |
| Dialog | 对话框 |
| Drawer | 抽屉 |
| Loading | 加载状态，支持服务和指令 |
| Message | 消息提示 |
| MessageBox | 弹出确认框 |
| Notification | 通知 |
| Popconfirm | 气泡确认框 |
| Popover | 弹出框 |
| Result | 结果页 |
| Tooltip | 文字提示 |
| Tour | 漫游式引导 |

### 其他增强组件

| 组件 | 说明 |
| --- | --- |
| InfiniteScroll | 无限滚动 |
| Splitter | 分隔面板 |
| Watermark | 水印 |

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动本地预览站

```bash
npm run dev
```

默认访问地址：

```text
http://localhost:5173/
```

如果端口被占用，Vite 会自动切换到其他端口，也可以手动指定：

```bash
npm run dev -- --host 127.0.0.1 --port 5174
```

### 启动 VitePress 文档站

```bash
npm run docs:dev
```

### 构建组件库

```bash
npm run build
```

构建产物输出到：

```text
packages/my-ui/dist/
```

## 使用方式

### 完整安装

在业务项目入口中安装 My UI：

```ts
import { createApp } from 'vue'
import MyUI from 'my-ui'
import 'my-ui/theme-chalk/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(MyUI)
app.mount('#app')
```

模板中即可使用：

```vue
<template>
  <my-space>
    <my-button type="primary">保存</my-button>
    <my-button>取消</my-button>
  </my-space>
</template>
```

### 安装时传入主题

```ts
import { createApp } from 'vue'
import MyUI from 'my-ui'
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

### 按需导入

```ts
import { MyButton, MyInput, MyMessage } from 'my-ui'
import 'my-ui/theme-chalk/index.css'
```

在组件中使用：

```vue
<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('')
</script>

<template>
  <my-input v-model="keyword" placeholder="请输入关键词" />
  <my-button type="primary">搜索</my-button>
</template>
```

### 运行时切换主题

```ts
import { applyTheme, createTheme } from 'my-ui'

const theme = createTheme({
  primary: '#7fc7c2',
  secondary: '#c8e6df',
  accent: '#f6d78b',
})

applyTheme(theme)
```

### 全局配置

```vue
<template>
  <my-config-provider namespace="my" size="large">
    <my-button type="primary">全局大尺寸按钮</my-button>
    <my-input placeholder="跟随全局尺寸" />
  </my-config-provider>
</template>
```

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm install` | 安装依赖 |
| `npm run dev` | 启动本地预览站 |
| `npm run docs:dev` | 启动 VitePress 文档站 |
| `npm run typecheck` | 执行 TypeScript 类型检查 |
| `npm run lint` | 执行 ESLint 检查 |
| `npm test` | 运行 Vitest 单元测试 |
| `npm run build` | 构建组件库产物 |
| `npm run docs:build` | 构建文档站 |
| `npm run format` | 使用 Prettier 格式化项目 |

## 工程目录

```text
My-UI/
  packages/
    components/        组件源码、组件类型、组件测试
    hooks/             组合式函数，例如主题、配置、弹层定位
    my-ui/             组件库统一安装入口和构建产物目录
    theme-chalk/       SCSS 样式、主题变量和组件样式入口
    utils/             通用工具函数
    locale/            国际化语言包
    icons/             图标入口
    directives/        指令入口
    constants/         常量定义
    test-utils/        测试辅助工具
  src/
    components/        本地预览站公共组件
    composables/       本地预览站组合式逻辑
    data/              首页、导航和组件分类数据
    demo/              组件示例
    pages/             本地预览站页面
    router/            Vue Router 路由配置
    styles/            本地预览站样式
  docs/
    components/        组件文档
    guide/             使用指南
    theme/             主题文档
    api.md             API 文档
    changelog.md       更新日志
    deploy.md          部署说明
    environment.md     环境记录
    requirements.md    需求文档
    schema.md          数据库 Schema 说明
  play/
    README.md          实验入口说明
```

## 开发流程

建议按下面顺序开发新组件：

1. 在 `packages/components/<component-name>/` 下创建组件源码。
2. 在组件目录中补充 `index.ts`、`src/*.vue` 和类型定义。
3. 在 `packages/components/index.ts` 中导出组件。
4. 在 `packages/my-ui/index.ts` 中注册组件。
5. 在 `packages/theme-chalk/src/` 中补充组件样式。
6. 在 `packages/theme-chalk/src/index.scss` 中引入样式。
7. 在 `src/demo/` 中补充本地预览示例。
8. 在 `src/components/demos/` 或组件页中接入示例。
9. 在 `docs/components/` 中补充组件文档。
10. 在 `packages/components/<component-name>/__tests__/` 中补充测试。
11. 执行类型检查、Lint、测试和构建。

## 提交前检查

提交前建议至少执行：

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run docs:build
```

当前测试体系主要覆盖：

- 组件渲染。
- 基础交互。
- Props 行为。
- 服务式调用。
- 主题工具函数。
- 配置上下文。
- 弹层定位 Hook。

## 文档维护

项目文档统一使用 Markdown。

文档维护重点：

- README 负责说明项目整体结构和快速上手。
- `docs/requirements.md` 负责记录需求、组件范围和验收标准。
- `docs/changelog.md` 负责记录版本变化。
- `docs/components/` 负责沉淀组件用法。
- `docs/deploy.md` 负责说明构建和部署流程。
- `docs/environment.md` 负责记录本地环境。

## 版本记录

项目版本号遵循 `主版本号.次版本号.修订号`。

近期版本重点：

| 版本 | 重点 |
| --- | --- |
| `1.0.8` | 修复顶部导航中等宽度折叠问题，优化演练场导航位置 |
| `1.0.7` | 新增演练场页面和 `/playground` 路由 |
| `1.0.6` | 优化深浅色主题切换，使用平滑颜色过渡 |
| `1.0.5` | 补齐主体区域中英文切换，新增深浅色模式 |
| `1.0.4` | 优化组件页三栏布局，补齐源码展示能力 |
| `1.0.3` | 扩展组件目录和样式入口 |
| `1.0.2` | 重写核心 Markdown 文档 |
| `1.0.1` | 拆分首页、指南、组件、主题、路线页面 |
| `1.0.0` | 初始化组件库工程 |

完整记录见 `docs/changelog.md`。

## 当前路线

- 补齐每个组件的 Props、Events、Slots、Exposes 文档。
- 完善复杂组件键盘交互和可访问性细节。
- 增强主题导入、导出、最近主题和对比度提示。
- 完善组件单元测试和边界测试。
- 准备组件库发布说明、类型声明和示例项目。
- 持续优化演练场，让组件调试更接近 Element Plus Playground 的体验。

## 说明

My UI 仍处于持续完善阶段，当前更适合作为组件库工程模板、学习项目和中后台组件沉淀起点。后续如果用于生产项目，建议先结合业务场景补齐目标组件的 API 文档、测试用例、可访问性细节和浏览器兼容性验证。
