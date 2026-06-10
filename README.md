# My UI

基于 **Vue 3 + TypeScript + Vite** 构建的中后台组件库。覆盖 100+ 常用组件，内置运行时主题切换、按需引入、全局配置（命名空间 / 尺寸 / 层级 / 多语言）和完整的 TypeScript 类型声明，目标是支撑管理端、工具型产品和业务组件复用场景。

工程结构参考 Element Plus 分层：组件源码、主题系统、本地预览站、VitePress 文档、单元测试与构建产物都集中在同一个 monorepo 内维护。

开发者备注：`maorongkang@gmail.com`

## 项目信息

| 项目 | 内容 |
| --- | --- |
| npm 包名 | `@qingyu6688/my-ui` |
| 当前版本 | `1.0.15` |
| 项目类型 | Vue 3 组件库 / 文档站 / 本地预览站 |
| 技术栈 | Vue 3、TypeScript、Vite、Vue Router、VitePress、SCSS、Vitest |
| 组件前缀 | `My`，例如 `MyButton`、`MyInput`、`MyTable` |
| 标签前缀 | `my-`，例如 `<my-button />`、`<my-input />` |
| 主题特色 | 支持运行时主题色替换，默认鼠尾草浅黄主题 |
| 仓库地址 | <https://github.com/qingyu6688/My-UI> |

## 安装

```bash
# npm
npm install @qingyu6688/my-ui

# pnpm
pnpm add @qingyu6688/my-ui

# yarn
yarn add @qingyu6688/my-ui
```

> 需要 Vue `^3.5.0`，Node `>= 18`。

## 两种使用方式

My UI 暴露两个独立入口，分别面向"按需引入"和"一次性全量注册"两种场景。选哪一个取决于你的项目体量和构建工具能力。

| 入口 | 引入路径 | 特点 | 适合场景 |
| --- | --- | --- | --- |
| **主入口（按需引入）** | `@qingyu6688/my-ui` | 零副作用、仅命名导出、需手动引入样式 | 业务项目，希望最终产物体积最小化 |
| **`/full` 入口（全量）** | `@qingyu6688/my-ui/full` | 默认导出 Vue 插件，自动 `app.use` 注册所有组件并内联样式 | Demo、原型、快速接入 |

> 二者公共 API 完全一致，区别只在「样式是否随入口自动加载」和「是否提供默认导出的插件」。

### 方式一：全量引入（推荐用于快速上手）

```ts
import { createApp } from 'vue'
import MyUI from '@qingyu6688/my-ui/full'
import App from './App.vue'

createApp(App).use(MyUI).mount('#app')
```

`/full` 入口在 `sideEffects` 中显式声明了样式副作用，样式会随插件自动注入，无需额外 `import css`。

可在 `use` 时传入初始主题：

```ts
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

### 方式二：按需引入（推荐用于业务项目）

主入口仅做命名导出，搭配现代打包器（Vite / Rollup / webpack 5+）的 tree-shaking 能力，未使用的组件不会进入最终产物。

```ts
// main.ts 只引入一次样式
import '@qingyu6688/my-ui/theme-chalk/index.css'
```

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { MyButton, MyInput, Message } from '@qingyu6688/my-ui'

const keyword = ref('')

function search() {
  Message.success(`正在搜索：${keyword.value}`)
}
</script>

<template>
  <MyInput v-model="keyword" placeholder="请输入关键词" />
  <MyButton type="primary" @click="search">搜索</MyButton>
</template>
```

服务式 API（`Message`、`MessageBox`、`Notification`、`Loading`）和组合式函数（`useTheme`、`useConfig`、`useLocale` 等）同样支持具名导入。

## TypeScript 支持

- 仓库自带 `index.d.ts` 与 `full.d.ts`，无需安装额外的 `@types/*` 包。
- 组件 Props、Events、Slots、Exposes 均为强类型；服务式 API 与组合式函数有完整类型签名。
- 主题相关类型（`ThemeInput`、`ThemeVariables`）和配置上下文类型（`ConfigProviderProps`、`Language`、`ComponentSize`）从主入口导出，可直接复用：

```ts
import type { ThemeInput, ConfigProviderProps, ComponentSize } from '@qingyu6688/my-ui'

const dark: ThemeInput = {
  primary: '#3a7d44',
  secondary: '#2d5a3d',
  accent: '#f4d03f',
}

const config: ConfigProviderProps = {
  namespace: 'my',
  size: 'large',
  zIndex: 3000,
}
```

> 推荐 `tsconfig.json` 开启 `strict: true` 和 `"moduleResolution": "bundler"` 以获得最佳类型推导。

## 主题切换

主题系统围绕「主色 / 辅助色 / 强调色」三个基础色生成一组 CSS Variables，并应用到所有组件。

| 主题色 | 默认值 | 用途 |
| --- | --- | --- |
| 主色 `primary` | `#a8d5ba` | 主按钮、选中态、焦点态、重点链接 |
| 辅助色 `secondary` | `#d7e8bd` | 辅助背景、成功提示、轻量状态 |
| 强调色 `accent` | `#fff3c7` | 温和提示、弱警告、空状态背景 |

运行时切换：

```ts
import { applyTheme, createTheme } from '@qingyu6688/my-ui'

applyTheme(
  createTheme({
    primary: '#7fc7c2',
    secondary: '#c8e6df',
    accent: '#f6d78b',
  }),
)
```

在组件 `<script setup>` 中使用：

```ts
import { useTheme } from '@qingyu6688/my-ui'

const { theme, setTheme, resetTheme } = useTheme()

setTheme({ primary: '#3a7d44' })
```

## 全局配置（ConfigProvider）

`ConfigProvider` 注入命名空间、尺寸、层级、语言四类全局配置，子组件通过 `useConfig` / `useSize` / `useZIndex` / `useLocale` 自动响应：

```vue
<template>
  <MyConfigProvider
    namespace="my"
    size="large"
    :z-index="3000"
    :locale="enUs"
  >
    <MyButton type="primary">Save</MyButton>
    <MyInput placeholder="Follow global size" />
  </MyConfigProvider>
</template>

<script setup lang="ts">
import { MyConfigProvider, MyButton, MyInput } from '@qingyu6688/my-ui'
import enUs from '@qingyu6688/my-ui/locale/lang/en-us'
</script>
```

| 配置 | 默认值 | 影响 |
| --- | --- | --- |
| `namespace` | `'my'` | 组件 CSS 类名前缀 |
| `size` | `'default'` | 全局组件默认尺寸，可被组件级 `size` 覆盖 |
| `zIndex` | `2000` | 弹层（Dialog/Tooltip/Popover…）层级基线 |
| `locale` | `zhCn` | 语言包，影响内置文案（确定 / 取消 / 表单校验等） |

## 组件清单

当前覆盖 7 大分类、共 100+ 组件：

- **基础**：Button / ButtonGroup / Icon / Layout / Container / Link / Text / Typography / Divider / Space / Scrollbar / Border / Color / Splitter
- **配置**：ConfigProvider
- **表单**：Autocomplete / Cascader / Checkbox / ColorPicker / ColorPickerPanel / DatePicker / DatePickerPanel / DateTimePicker / Form / Input / InputNumber / InputOtp / InputTag / Mention / Radio / Rate / Segmented / Select / Slider / Switch / TimePicker / TimeSelect / Transfer / TreeSelect / Upload / VirtualizedSelect
- **数据展示**：Avatar / Badge / Calendar / Card / Carousel / Collapse / Descriptions / Empty / Image / Pagination / Progress / Skeleton / Statistic / Table / Tag / Timeline / Tree / VirtualList / VirtualizedTable / VirtualizedTree
- **导航**：Affix / Anchor / Backtop / Breadcrumb / Dropdown / Menu / PageHeader / Steps / Tabs
- **反馈**：Alert / Dialog / Drawer / Loading / Message / MessageBox / Notification / Popconfirm / Popover / Result / Tooltip / Tour
- **其他**：InfiniteScroll / Watermark

完整 API 见 VitePress 文档站 `docs/components/`。

## 图标库

`@qingyu6688/my-ui` 内置 80 个常用 SVG 图标，统一从 `packages/icons` 导出。图标组件遵循当前文字颜色和主题变量，可直接放入 `MyIcon`、`MyButton`、`MyMenuItem` 等组件插槽中。

```vue
<script setup lang="ts">
import { MyIcon, MySearchIcon, MySettingIcon, icons } from '@qingyu6688/my-ui'
</script>

<template>
  <my-icon :size="22" label="搜索">
    <MySearchIcon />
  </my-icon>

  <my-button>
    设置
    <template #icon>
      <MySettingIcon />
    </template>
  </my-button>

  <button v-for="item in icons" :key="item.name" type="button">
    <component :is="item.component" />
    {{ item.label }}
  </button>
</template>
```

本地预览站的 Icon 页面参考 Element Plus 的图标页组织，提供搜索、数量统计、网格浏览和点击复制组件名能力，适合后续扩展成业务图标选择器。

## 本地开发

```bash
# 1. 克隆并安装依赖
git clone https://github.com/qingyu6688/My-UI.git
cd My-UI
npm install

# 2. 启动本地预览站（src/）
npm run dev
# → http://localhost:5173/

# 3. 启动 VitePress 文档站（docs/）
npm run docs:dev

# 4. 构建组件库产物（输出到 packages/my-ui/dist/）
npm run build
```

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动本地预览站 |
| `npm run docs:dev` | 启动 VitePress 文档站 |
| `npm run typecheck` | TypeScript 类型检查 |
| `npm run lint` | ESLint 检查 |
| `npm test` | 运行 Vitest 单元测试 |
| `npm run build` | 构建组件库产物 |
| `npm run docs:build` | 构建文档站 |
| `npm run format` | 使用 Prettier 格式化 |

## 工程目录

```text
My-UI/
  packages/
    components/        组件源码、类型、测试
    hooks/             组合式函数（主题、配置、弹层定位等）
    my-ui/             组件库统一入口、产物目录与发布配置
    theme-chalk/       SCSS 样式、主题变量与组件样式入口
    utils/             通用工具函数
    locale/            国际化语言包
    icons/             图标入口
    directives/        指令入口
    constants/         常量定义
    test-utils/        测试辅助
  src/                 本地预览站（独立于发布产物）
    components/        预览站公共组件
    composables/       预览站组合式逻辑
    demo/              组件示例源码
    pages/             预览站页面
    router/            Vue Router 配置
    styles/            预览站样式
  docs/                VitePress 文档站
  play/                实验入口
```

## 开发流程

新增组件建议按以下顺序推进：

1. 在 `packages/components/<name>/` 下创建组件源码与 `src/*.vue`、`index.ts`、类型定义。
2. 在 `packages/components/index.ts` 中导出。
3. 在 `packages/my-ui/full.ts` 的 `components` 列表中注册（按需入口无需修改）。
4. 在 `packages/theme-chalk/src/` 中补充样式并在 `index.scss` 引入。
5. 在 `src/demo/<分类>/` 添加示例、在 `src/components/demos/` 接入展示。
6. 在 `docs/components/` 补齐组件文档。
7. 在 `packages/components/<name>/__tests__/` 编写单元测试。
8. 提交前依次执行类型检查、Lint、测试、构建。

## 提交前检查

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run docs:build
```

测试体系当前主要覆盖：组件渲染、基础交互、Props 行为、服务式调用、主题工具函数、配置上下文、弹层定位 Hook。

## 版本记录

版本号遵循 `主版本号.次版本号.修订号`。

| 版本 | 重点 |
| --- | --- |
| `1.0.15` | 参考 Element Plus 重做 Icon 图标页，新增搜索、复制反馈和更完整的内置图标网格 |
| `1.0.14` | 新增 My UI 品牌图标、浏览器 favicon 和内置图标集合，优化 Icon 组件页面展示 |
| `1.0.13` | 修复深色切回浅色时的闪烁卡顿，优化首页浮动动效和路线页项目口径 |
| `1.0.12` | 参考 Theme-switching 重写深浅色主题切换滑块和页面扩散动画 |
| `1.0.11` | 优化首页、指南页和路线页，补齐项目安装、运行、打包和发布检查路径 |
| `1.0.10` | 补全 npm 元信息、扩展 ConfigProvider 演示、`/full` 入口与发布流程梳理 |
| `1.0.9` | 新增全局尺寸解析能力，组件尺寸跟随 ConfigProvider 和 Form 上下文 |
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

- 完成组件 Props / Events / Slots / Exposes 文档全覆盖。
- 完善复杂组件的键盘交互与可访问性。
- 主题编辑器支持 JSON 导入导出、最近主题、WCAG 对比度提示。
- 扩展 i18n 语言包（en-us / ja-jp）。
- 补齐 8 个新组件的 VitePress 文档（Border / Color / Notification / VirtualizedSelect / Table / Tree / ColorPickerPanel / DatePickerPanel / ButtonGroup）。
- 系统排查暗色模式 token 完整性（边框 / 阴影 / 分割线 / 禁用态）。

## License

[MIT](./packages/my-ui/LICENSE) © qingyu6688
