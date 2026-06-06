# My UI 组件库需求文档

## 1. 文档信息

| 项目 | 内容 |
| --- | --- |
| 项目名称 | My UI |
| 文档版本 | 1.0.0 |
| 项目版本 | 1.0.0 |
| 项目类型 | 前端组件库 |
| 编写日期 | 2026-06-06 |
| 主要入口 | `packages/`，文档站入口为 `docs/` |
| 开发者备注 | maorongkang@gmail.com |

## 2. 环境检查记录

| 环境项 | 当前结果 |
| --- | --- |
| Node.js | v24.3.0 |
| npm | 11.4.2 |
| Java | 17.0.8 LTS |
| Python | 3.12.3 |
| pip | 25.2 |
| Git | 2.47.1.windows.1 |
| 操作系统 | Microsoft Windows 10 专业版 |

## 3. 参考范围

本项目参考 Element Plus 的产品结构与工程组织方式，但不会照搬实现。参考重点如下：

- Element Plus 是面向 Vue 3 的 TypeScript 组件库，采用 Composition API。
- Element Plus 组件按基础组件、配置组件、表单组件、数据展示、导航、反馈、其他进行分类。
- Element Plus 仓库采用分包结构，核心目录包含 `components`、`constants`、`directives`、`hooks`、`locale`、`theme-chalk`、`utils`、`test-utils` 等。
- Element Plus 主题支持 SCSS 变量与 CSS Variables，CSS Variables 可以在运行时动态修改，适合本项目的主题色创新。

参考链接：

- [Element Plus GitHub 仓库](https://github.com/element-plus/element-plus)
- [Element Plus 组件总览](https://element-plus.org/zh-CN/component/overview)
- [Element Plus 主题定制](https://element-plus.org/en-US/guide/theming)
- [Element Plus 暗黑模式](https://element-plus.org/en-US/guide/dark-mode)

## 4. 项目定位

My UI 是一个基于 Vue 3、TypeScript、Vite 的企业级 UI 组件库。它面向中后台系统、管理端页面、工具型产品和业务组件沉淀场景，目标是提供稳定、清晰、可定制的组件基础设施。

项目创新点是“可自定义主题色”。使用者可以在运行时调整组件库的主色、辅助色和浅黄色强调色，并即时应用到所有组件。默认主题为“鼠尾草浅黄”：

| 主题色 | 色值 | 用途 |
| --- | --- | --- |
| 鼠尾草主色 | `#a8d5ba` | 主按钮、选中态、焦点态、链接强调 |
| 浅绿辅助色 | `#d7e8bd` | 成功态、轻量背景、辅助提示 |
| 浅黄强调色 | `#fff3c7` | 弱警告、空状态背景、温和提示 |

## 5. 用户与场景

### 5.1 目标用户

- 前端开发者：在 Vue 3 项目中快速搭建统一 UI。
- 中后台项目团队：需要稳定组件、统一主题和较低维护成本。
- 设计/产品协作者：需要通过主题色快速验证品牌风格。
- 组件库维护者：需要清晰的工程结构、文档、测试和发布流程。

### 5.2 典型场景

- 企业后台快速搭建表单、表格、导航和反馈交互。
- 多品牌系统在同一组件库上切换不同主题。
- 文档站中实时预览组件用法和主题效果。
- 业务团队按需引入组件，减少最终产物体积。

## 6. 产品目标

### 6.1 核心目标

- 提供一套可用于生产项目的 Vue 3 组件库基础。
- 支持完整主题变量体系，主题修改后组件状态、边框、背景、文本、阴影等保持一致。
- 支持全量引入和按需引入。
- 提供组件文档、示例、API 表格、主题演示和变更记录。
- 保持类型定义完整，组件 Props、Events、Slots 都要有明确类型。

### 6.2 非目标

- 第一阶段不做低代码搭建平台。
- 第一阶段不做复杂设计稿解析。
- 组件库本体不依赖数据库；文档站如需用户主题收藏，后续再接入后端与 MySQL。
- 不追求完全复刻 Element Plus 的所有内部实现，优先保留一致的使用体验和清晰的本项目结构。

## 7. 技术选型

| 模块 | 选型 | 说明 |
| --- | --- | --- |
| 前端框架 | Vue 3 | 组件库主框架 |
| 开发语言 | TypeScript | 开启严格模式 |
| 构建工具 | Vite | 支持库模式构建和文档站开发 |
| 样式方案 | SCSS + CSS Variables | SCSS 负责基础生成，CSS Variables 负责运行时主题切换 |
| 文档站 | VitePress | 适合组件文档、示例和 API 表格 |
| 单元测试 | Vitest + Vue Test Utils | 覆盖组件行为、Hooks、工具函数 |
| E2E 测试 | Playwright | 覆盖文档示例、弹层、键盘交互 |
| 代码检查 | ESLint + Prettier | 统一代码风格 |
| 包管理 | npm workspaces | 保持 `npm install`、`npm run dev` 等命令习惯 |

## 8. 整体模块拆解

| 模块 | 参考 Element Plus | My UI 规划 | 核心产物 |
| --- | --- | --- | --- |
| 组件核心 | `packages/components` | 存放所有 Vue 组件，每个组件独立目录 | 组件源码、类型、测试、样式入口 |
| 主题样式 | `packages/theme-chalk` | 维护默认主题、暗色主题、主题变量和组件样式 | CSS、SCSS、变量表 |
| 工具函数 | `packages/utils` | 存放 DOM、类型判断、事件、颜色计算等工具 | 可复用工具函数 |
| Hooks | `packages/hooks` | 存放组合式函数，如 `useTheme`、`useNamespace`、`useZIndex` | 组合式 API |
| 常量 | `packages/constants` | 统一尺寸、层级、事件名、默认配置 | 常量与枚举 |
| 指令 | `packages/directives` | 支持 ClickOutside、Loading、InfiniteScroll 等指令 | Vue 指令 |
| 国际化 | `packages/locale` | 内置 `zh-cn`、`en`，后续扩展更多语言 | 语言包 |
| 图标 | `packages/icons` | 内置基础图标或适配外部图标包 | Vue 图标组件 |
| 统一导出 | `packages/my-ui` | 聚合组件、样式、插件安装逻辑 | npm 发布入口 |
| 文档站 | `docs` | 组件文档、主题编辑器、更新日志 | VitePress 站点 |
| 演练项目 | `play` | 本地调试组件和主题效果 | 示例应用 |
| 内部工具 | `internal` | 构建、生成组件模板、发布脚本 | CLI 与构建脚本 |
| 测试工具 | `packages/test-utils` | 封装挂载、事件触发、快照辅助 | 测试辅助方法 |

## 9. 主题系统需求

### 9.1 主题能力

主题系统是 My UI 的核心差异点，必须在第一阶段完成。

| 能力 | 说明 | 优先级 |
| --- | --- | --- |
| 默认主题 | 内置鼠尾草浅黄主题 | P0 |
| 运行时切换 | 修改 CSS Variables 后页面即时生效，不重新构建 | P0 |
| 主题生成 | 根据主色、辅助色、强调色生成浅色、深色、悬停、激活、禁用色 | P0 |
| 主题持久化 | 用户选择后保存到 `localStorage` | P0 |
| 主题重置 | 一键恢复默认主题 | P0 |
| 主题导出 | 导出 JSON 或 CSS Variables 片段 | P1 |
| 主题导入 | 导入 JSON 后恢复主题 | P1 |
| 暗色模式 | 支持 `html.dark` 或 `data-theme="dark"` | P1 |
| 局部主题 | 在某个容器内覆盖主题变量，不影响全局 | P1 |
| 对比度提示 | 主题色与文本色对比不足时给出提示 | P2 |

### 9.2 默认主题变量

```css
:root {
  --my-color-primary: #a8d5ba;
  --my-color-secondary: #d7e8bd;
  --my-color-accent: #fff3c7;

  --my-text-color-primary: #26332b;
  --my-text-color-regular: #3f4a42;
  --my-text-color-secondary: #6f7a71;

  --my-bg-color-page: #fbfcf7;
  --my-bg-color: #ffffff;
  --my-bg-color-soft: #f5f8ef;

  --my-border-color: #dce7d6;
  --my-border-color-light: #ecf2e7;
  --my-fill-color-light: #f7faef;

  --my-radius-base: 6px;
  --my-radius-small: 4px;
  --my-transition-duration: 0.2s;
}
```

### 9.3 主题 API

```ts
import { createApp } from 'vue'
import MyUI, { createTheme } from '@my-ui/components'
import '@my-ui/theme-chalk/index.css'

const app = createApp(App)

app.use(MyUI, {
  theme: createTheme({
    primary: '#a8d5ba',
    secondary: '#d7e8bd',
    accent: '#fff3c7',
  }),
})
```

主题相关方法：

| 方法 | 说明 |
| --- | --- |
| `createTheme(options)` | 创建主题对象，补全派生色和语义色 |
| `applyTheme(theme, target?)` | 将主题变量写入 `document.documentElement` 或指定容器 |
| `resetTheme()` | 恢复默认鼠尾草浅黄主题 |
| `useTheme()` | 在组件或业务页面内读取、修改当前主题 |
| `exportTheme()` | 导出当前主题 JSON |
| `importTheme(themeJson)` | 导入并应用主题 |

### 9.4 主题编辑器

文档站需要提供一个“主题编辑器”页面，包含以下能力：

- 颜色选择器：主色、辅助色、强调色。
- 实时预览：展示按钮、输入框、表格、标签、弹窗等常用组件。
- 状态预览：默认、悬停、激活、禁用、聚焦、加载。
- 操作按钮：应用、重置、导出 JSON、复制 CSS Variables。
- 保存策略：本地保存最近一次配置，不上传用户数据。

## 10. 组件范围

组件范围参考 Element Plus 的分类方式，按 P0、P1、P2 分阶段实现。P0 是首个可用版本必须完成的基础能力，P1 是常规业务项目高频能力，P2 是增强和复杂场景。

### 10.1 Basic 基础组件

| 组件 | 中文名 | 关键需求 | 优先级 |
| --- | --- | --- | --- |
| Button | 按钮 | 类型、尺寸、禁用、加载、图标、朴素、文本按钮 | P0 |
| Border | 边框 | 统一边框变量、圆角变量、文档展示 | P1 |
| Color | 色彩 | 展示主题色、语义色、派生色 | P0 |
| Container | 布局容器 | Header、Aside、Main、Footer 组合 | P1 |
| Icon | 图标 | 统一尺寸、颜色、旋转、可访问标签 | P0 |
| Layout | 栅格布局 | Row、Col、间距、响应式断点 | P1 |
| Link | 链接 | 类型、下划线、禁用、外链状态 | P0 |
| Text | 文本 | 类型、截断、行数限制、标签语义 | P0 |
| Scrollbar | 滚动条 | 自定义滚动条、横向/纵向、原生兼容 | P1 |
| Space | 间距 | 水平/垂直、换行、分隔符、尺寸 | P0 |
| Splitter | 分隔面板 | 拖拽调整、最小尺寸、折叠 | P2 |
| Typography | 排版 | 标题、段落、引用、代码文本 | P1 |

### 10.2 Configuration 配置组件

| 组件 | 中文名 | 关键需求 | 优先级 |
| --- | --- | --- | --- |
| ConfigProvider | 全局配置 | 主题、语言、命名空间、尺寸、层级、空状态配置 | P0 |

### 10.3 Form 表单组件

| 组件 | 中文名 | 关键需求 | 优先级 |
| --- | --- | --- | --- |
| Form | 表单 | 校验、布局、标签宽度、错误提示、滚动到错误项 | P0 |
| Input | 输入框 | 前后缀、清空、密码、字数统计、禁用 | P0 |
| InputNumber | 数字输入框 | 步进、精度、范围、键盘操作 | P0 |
| Radio | 单选框 | 单项、按钮组、禁用、尺寸 | P0 |
| Checkbox | 多选框 | 半选、组、限制数量、按钮样式 | P0 |
| Select | 选择器 | 单选、多选、过滤、清空、远程搜索 | P0 |
| Switch | 开关 | 文案、图标、加载、禁用 | P0 |
| Slider | 滑块 | 单值、范围、步长、标记、提示 | P1 |
| Rate | 评分 | 半星、清空、文案、只读 | P1 |
| ColorPicker | 颜色选择器 | 颜色面板、透明度、预设色、格式转换 | P1 |
| ColorPickerPanel | 颜色选择器面板 | 可单独嵌入主题编辑器 | P1 |
| DatePicker | 日期选择器 | 日期、范围、快捷项、格式化 | P1 |
| DatePickerPanel | 日期选择器面板 | 可嵌入弹层或业务面板 | P2 |
| DateTimePicker | 日期时间选择器 | 日期时间、范围、快捷项 | P1 |
| TimePicker | 时间选择器 | 时分秒、范围、禁用时间 | P1 |
| TimeSelect | 时间选择 | 固定间隔选项、起止限制 | P2 |
| Cascader | 级联选择器 | 多级、懒加载、搜索、多选 | P1 |
| TreeSelect | 树形选择 | 树数据、搜索、多选、懒加载 | P1 |
| Transfer | 穿梭框 | 搜索、禁用、批量移动、自定义项 | P2 |
| Upload | 上传器 | 文件限制、拖拽、进度、失败重试 | P1 |
| Autocomplete | 自动补全输入框 | 本地/远程建议、键盘选择 | P2 |
| InputTag | 标签输入框 | 新增、删除、重复校验、最大数量 | P2 |
| InputOTP | 一次性验证码输入 | 自动聚焦、粘贴、数字限制 | P2 |
| Mention | 提及 | 触发符、搜索、插入、键盘操作 | P2 |
| VirtualizedSelect | 虚拟化选择器 | 大数据选项、滚动性能、远程加载 | P2 |

### 10.4 Data 数据展示

| 组件 | 中文名 | 关键需求 | 优先级 |
| --- | --- | --- | --- |
| Table | 表格 | 列配置、排序、筛选、选择、固定列、空状态 | P0 |
| Pagination | 分页 | 页码、页大小、总数、简洁模式 | P0 |
| Tag | 标签 | 类型、关闭、尺寸、圆角、主题色适配 | P0 |
| Card | 卡片 | 标题、内容、操作区、轻量阴影 | P1 |
| Empty | 空状态 | 默认图、描述、操作按钮 | P1 |
| Skeleton | 骨架屏 | 段落、头像、动画、加载态包裹 | P1 |
| Progress | 进度条 | 线形、环形、状态、内显文字 | P1 |
| Avatar | 头像 | 图片、文字、图标、加载失败回退 | P1 |
| Badge | 徽章 | 数字、圆点、最大值、偏移 | P1 |
| Collapse | 折叠面板 | 手风琴、自定义标题、禁用 | P1 |
| Descriptions | 描述列表 | 列数、边框、响应式、对齐 | P1 |
| Image | 图片 | 预览、懒加载、加载失败、适应方式 | P1 |
| Calendar | 日历 | 月视图、自定义日期单元、选择 | P2 |
| Carousel | 走马灯 | 自动播放、箭头、指示器、触摸 | P2 |
| InfiniteScroll | 无限滚动 | 阈值、禁用、加载完成、容器滚动 | P2 |
| Result | 结果 | 成功、警告、错误、操作区 | P2 |
| Timeline | 时间线 | 正序/倒序、节点类型、自定义内容 | P2 |
| Tour | 漫游式引导 | 步骤、遮罩、定位、跳过 | P2 |
| Tree | 树形控件 | 选择、勾选、懒加载、拖拽 | P2 |
| VirtualizedTree | 虚拟化树 | 大数据树性能优化 | P2 |
| VirtualizedTable | 虚拟化表格 | 大数据表格滚动性能优化 | P2 |
| Statistic | 统计组件 | 数值格式、前后缀、倒计时 | P2 |
| Segmented | 分段控制器 | 单选、禁用、图标、尺寸 | P1 |

### 10.5 Navigation 导航

| 组件 | 中文名 | 关键需求 | 优先级 |
| --- | --- | --- | --- |
| Menu | 菜单 | 横向/纵向、子菜单、折叠、路由高亮 | P0 |
| Tabs | 标签页 | 卡片、边框、可关闭、懒加载 | P0 |
| Breadcrumb | 面包屑 | 分隔符、图标、自定义渲染 | P1 |
| Dropdown | 下拉菜单 | 触发方式、命令、禁用、分组 | P1 |
| Steps | 步骤条 | 横向/纵向、状态、图标 | P1 |
| PageHeader | 页头 | 返回、标题、面包屑、操作区 | P1 |
| Backtop | 回到顶部 | 滚动容器、出现阈值、自定义内容 | P2 |
| Affix | 固钉 | 偏移、目标容器、状态变化 | P2 |
| Anchor | 锚点 | 滚动定位、高亮、偏移 | P2 |

### 10.6 Feedback 反馈组件

| 组件 | 中文名 | 关键需求 | 优先级 |
| --- | --- | --- | --- |
| Alert | 提示 | 类型、标题、描述、关闭、图标 | P0 |
| Dialog | 对话框 | 遮罩、关闭、拖拽、异步确认、焦点管理 | P0 |
| Drawer | 抽屉 | 方向、尺寸、关闭控制、嵌套 | P0 |
| Loading | 加载 | 指令、服务调用、全屏、局部 | P0 |
| Message | 消息提示 | 类型、时长、关闭、合并重复 | P0 |
| MessageBox | 消息弹出框 | alert、confirm、prompt、Promise API | P1 |
| Notification | 通知 | 位置、时长、标题、操作 | P1 |
| Tooltip | 文字提示 | 位置、触发方式、延迟、可访问性 | P0 |
| Popover | 弹出框 | 标题、内容、触发、宽度 | P1 |
| Popconfirm | 气泡确认框 | 确认、取消、自定义按钮 | P1 |

### 10.7 Others 其他

| 组件 | 中文名 | 关键需求 | 优先级 |
| --- | --- | --- | --- |
| Divider | 分割线 | 横向、纵向、文案位置 | P0 |
| Watermark | 水印 | 多行、旋转、层级、不可选中 | P2 |

## 11. 组件通用规范

### 11.1 命名

- 组件类名使用 `PascalCase`，例如 `MyButton`。
- 组件标签推荐使用短前缀，默认命名空间为 `my`，例如 `<my-button />`。
- 样式类名采用 BEM 风格，例如 `.my-button`、`.my-button--primary`、`.my-button__icon`。
- 命名空间必须可通过 `ConfigProvider` 修改，方便业务系统避免样式冲突。

### 11.2 Props、Events、Slots

- 每个组件必须导出完整 Props 类型。
- Events 必须声明事件名和参数类型。
- Slots 必须在文档中说明插槽名、作用域参数和使用场景。
- 禁止使用 `any`，复杂参数使用 `interface` 或 `type`。

### 11.3 状态

所有交互组件至少考虑以下状态：

- 默认状态
- 悬停状态
- 聚焦状态
- 激活状态
- 禁用状态
- 加载状态
- 错误状态
- 空状态

### 11.4 可访问性

- 弹层组件需要处理键盘关闭、焦点回收和 `aria-*` 属性。
- 表单控件需要关联 label、错误提示和禁用态。
- 图标按钮需要提供 `aria-label` 或可见文本。
- 主题编辑器需要提示颜色对比度风险。

## 12. 文档站需求

文档站不仅展示组件，也要承担调试和主题演示作用。

### 12.1 页面结构

- 首页：组件库定位、安装方式、默认主题预览。
- 指南：安装、快速开始、按需引入、主题定制、暗色模式、国际化、贡献指南。
- 组件：按分类展示每个组件的示例和 API。
- 主题编辑器：可视化修改主题色并实时预览。
- 更新日志：记录版本变化、破坏性变更、迁移说明。

### 12.2 组件文档模板

每个组件文档需要包含：

- 基础用法
- 不同类型和尺寸
- 禁用、加载、错误等状态
- 主题变量影响说明
- Props 表格
- Events 表格
- Slots 表格
- Exposes 表格
- 可访问性说明

## 13. 工程目录设计

```text
packages/
  components/
    button/
      src/
      style/
      __tests__/
      index.ts
    input/
    table/
  constants/
  directives/
  hooks/
  icons/
  locale/
  my-ui/
  test-utils/
  theme-chalk/
    src/
      common/
      dark/
      button.scss
      input.scss
      index.scss
  utils/
docs/
  guide/
  components/
  theme/
  changelog.md
play/
internal/
  build/
  scripts/
tests/
  e2e/
```

## 14. 构建与发布需求

### 14.1 构建产物

- ESM：支持现代构建工具按需引入。
- CJS：兼容部分 Node 或旧工具链场景。
- CSS：提供完整样式入口和组件级样式入口。
- 类型声明：发布 `.d.ts` 文件。
- Source Map：开发调试可选开启。

### 14.2 引入方式

全量引入：

```ts
import { createApp } from 'vue'
import MyUI from '@my-ui/components'
import '@my-ui/theme-chalk/index.css'

createApp(App).use(MyUI)
```

按需引入：

```ts
import { MyButton } from '@my-ui/components'
import '@my-ui/theme-chalk/button.css'
```

### 14.3 发布要求

- 发布前运行 `npm test`、`npm run build`、`npm run lint`。
- 每次发布必须更新版本号和 `docs/changelog.md`。
- 包入口需要明确 `exports`，避免用户依赖内部路径。
- 不发布 `.env`、测试快照临时文件、构建缓存。

## 15. 数据与存储

组件库本体不需要数据库。

主题编辑器第一阶段只使用本地存储：

| 数据 | 存储方式 | 说明 |
| --- | --- | --- |
| 当前主题 | `localStorage` | key 建议为 `my-ui-theme` |
| 最近主题列表 | `localStorage` | 最多保存 5 条 |
| 默认主题 | 静态常量 | 打包在主题模块中 |

如果后续需要“主题市场”或“团队主题共享”，再新增后端服务和 MySQL 表，例如：

- `theme_presets`：主题预设表。
- `theme_versions`：主题版本表。
- `theme_favorites`：用户收藏表。

## 16. 测试要求

| 测试类型 | 范围 | 要求 |
| --- | --- | --- |
| 单元测试 | 工具函数、Hooks、组件状态 | 核心工具函数覆盖率不低于 80% |
| 组件测试 | Props、Events、Slots、键盘操作 | 高优先级组件必须覆盖 |
| 样式测试 | 主题变量、暗色模式、状态色 | 核心组件必须覆盖默认主题和自定义主题 |
| E2E 测试 | 文档示例、弹层、表单、主题编辑器 | 发布前必须通过 |
| 类型测试 | 组件类型导出、泛型参数 | 关键类型不得回退成 `any` |

## 17. 验收标准

### 17.1 P0 版本验收

- 完成主题系统、ConfigProvider、基础组件、核心表单组件、核心反馈组件。
- 默认主题色准确使用 `#a8d5ba`、`#d7e8bd`、`#fff3c7`。
- 主题编辑器可以修改主题并实时影响组件预览。
- 全量引入和按需引入都能正常工作。
- 文档站包含安装、快速开始、主题定制和 P0 组件文档。
- `npm test`、`npm run build`、`npm run lint` 通过。

### 17.2 生产可用验收

- P0、P1 组件完成并有稳定 API。
- 所有组件具备中文文档和 API 表格。
- 主题变量覆盖常用交互状态，不出现明显色彩断层。
- 弹层、表单、菜单等复杂组件通过键盘与可访问性检查。
- 构建产物支持 Tree Shaking。
- 更新日志记录完整，破坏性变更有迁移说明。

## 18. 里程碑规划

| 阶段 | 目标 | 主要内容 |
| --- | --- | --- |
| M1 需求与工程初始化 | 建立基础工程 | 初始化 Vue 3 + TypeScript + Vite、目录、规范、文档站 |
| M2 主题系统 | 完成核心创新点 | 默认主题、CSS Variables、主题编辑器、ConfigProvider |
| M3 基础组件 | 形成可展示组件库雏形 | Button、Icon、Text、Link、Space、Divider、Alert、Tooltip |
| M4 表单与反馈 | 支撑后台基础页面 | Form、Input、Select、Radio、Checkbox、Switch、Dialog、Message |
| M5 数据与导航 | 支撑管理端业务 | Table、Pagination、Tag、Menu、Tabs、Breadcrumb、Dropdown |
| M6 增强组件 | 补齐复杂组件 | 日期、上传、树、虚拟化、引导、水印等 |
| M7 发布稳定版 | 准备生产使用 | 完整测试、构建、文档、变更记录、npm 发布准备 |

## 19. 风险与处理

| 风险 | 影响 | 处理方式 |
| --- | --- | --- |
| API 设计过早膨胀 | 后续维护困难 | P0 只保留高频能力，复杂能力放到 P1/P2 |
| 主题变量不够统一 | 切换主题后视觉不一致 | 先定义语义 Token，再映射组件 Token |
| 组件数量过多 | 首版周期过长 | 分阶段交付，先完成真实项目最常用组件 |
| 弹层与表单边界复杂 | 容易出现交互缺陷 | 单独补焦点、键盘、滚动锁定测试 |
| 文档缺失 | 使用成本高 | 组件开发必须同步文档和示例 |

## 20. 待确认问题

- npm 包名是否使用 `@my-ui/components`，还是改成更具体的组织名。
- 组件前缀是否固定为 `my`，还是允许项目初始化时配置默认前缀。
- 图标库是自研一套基础图标，还是先适配 `lucide-vue-next`。
- P0 首版是否需要兼容 Nuxt/SSR。
- 是否需要在第一阶段提供暗色模式，还是放到 P1。
