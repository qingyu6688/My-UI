# API 文档

本页记录 My UI 当前公开导出的组件、插件安装选项、主题 API 和服务式 API。当前统一导出 45 个组件，更细的 Props、Events、Slots 会在各组件页面中持续补齐。

## 包入口

```ts
import MyUI, {
  MyButton,
  MyInput,
  MyTable,
  createTheme,
  applyTheme,
  useTheme,
} from '@qingyu6688/my-ui'
import '@qingyu6688/my-ui/theme-chalk/index.css'
```

## 插件安装

```ts
import { createApp } from 'vue'
import MyUI from '@qingyu6688/my-ui'

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

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `theme` | `ThemeInput` | 初始化时写入的主题颜色，未传时使用鼠尾草浅黄默认主题 |

## 组件导出

| 导出名 | 文档名称 | 分类 | 说明 |
| --- | --- | --- | --- |
| `Button` | Button 按钮 | 基础组件 | 触发页面操作，支持类型、尺寸、朴素、圆角、文本、图标和加载状态。 |
| `Color` | Color 色彩 | 基础组件 | 展示默认主题色、语义色和运行时主题变量。 |
| `Container` | Container 容器 | 基础组件 | 页面级布局容器，适合 Header、Aside、Main、Footer 组合。 |
| `Divider` | Divider 分割线 | 基础组件 | 分隔内容块，支持水平、垂直和带文字的分隔场景。 |
| `Icon` | Icon 图标 | 基础组件 | 统一图标尺寸、颜色和可访问性标识。 |
| `Layout` | Layout 布局 | 基础组件 | 栅格或结构化布局能力，适合页面分区和响应式排版。 |
| `Link` | Link 链接 | 基础组件 | 用于页面跳转或外部链接，支持不同语义类型。 |
| `Space` | Space 间距 | 基础组件 | 处理按钮组、标签组和行内元素之间的稳定间距。 |
| `Text` | Text 文本 | 基础组件 | 统一正文、辅助说明、状态文案和截断展示。 |
| `ConfigProvider` | ConfigProvider 全局配置 | 配置组件 | 统一管理命名空间、主题、尺寸、层级和组件默认配置。 |
| `Checkbox` | Checkbox 多选框 | 表单组件 | 处理多选和半选状态，支持单项与组选项。 |
| `Form` | Form 表单 | 表单组件 | 承载字段布局、校验、错误提示和表单上下文。 |
| `Input` | Input 输入框 | 表单组件 | 文本输入基础控件，支持前后缀、清空、禁用和状态展示。 |
| `InputNumber` | InputNumber 数字输入框 | 表单组件 | 适合数量、金额、步进值和范围限制。 |
| `Radio` | Radio 单选框 | 表单组件 | 用于少量互斥选项，支持单项与组选项。 |
| `Segmented` | Segmented 分段控制器 | 表单组件 | 在少量选项之间快速切换，适合视图和模式选择。 |
| `Select` | Select 选择器 | 表单组件 | 从固定选项中选择内容，适合表单筛选和配置项。 |
| `Switch` | Switch 开关 | 表单组件 | 表达启用/停用等即时状态切换。 |
| `Avatar` | Avatar 头像 | 数据展示 | 展示用户、组织或对象的头像、文字和图标占位。 |
| `Badge` | Badge 徽章 | 数据展示 | 用于数字提醒、状态点和轻量角标。 |
| `Card` | Card 卡片 | 数据展示 | 承载独立信息块，适合列表、概览和操作入口。 |
| `Collapse` | Collapse 折叠面板 | 数据展示 | 折叠展示内容块，适合设置项、筛选区和 FAQ。 |
| `Descriptions` | Descriptions 描述列表 | 数据展示 | 成组展示对象字段，适合详情页和摘要信息。 |
| `Empty` | Empty 空状态 | 数据展示 | 展示无数据、无结果和初始化状态。 |
| `Image` | Image 图片 | 数据展示 | 展示图片内容，支持预览、加载和失败状态。 |
| `Pagination` | Pagination 分页 | 数据展示 | 处理长列表翻页、页码切换和每页条数配置。 |
| `Progress` | Progress 进度条 | 数据展示 | 展示任务、上传、步骤完成度等进度状态。 |
| `Skeleton` | Skeleton 骨架屏 | 数据展示 | 在数据加载前提供占位结构，降低页面跳动。 |
| `Table` | Table 表格 | 数据展示 | 结构化展示数据，支持列配置和边框展示。 |
| `Tag` | Tag 标签 | 数据展示 | 展示分类、状态和轻量属性。 |
| `Timeline` | Timeline 时间线 | 数据展示 | 纵向展示时间节点、事件进度和历史记录。 |
| `Breadcrumb` | Breadcrumb 面包屑 | 导航 | 表达页面层级和返回路径。 |
| `Dropdown` | Dropdown 下拉菜单 | 导航 | 承载更多操作、分组选项和轻量菜单。 |
| `Menu` | Menu 菜单 | 导航 | 构建顶部或侧边导航，支持当前项高亮。 |
| `Steps` | Steps 步骤条 | 导航 | 展示流程进度和步骤状态。 |
| `Tabs` | Tabs 标签页 | 导航 | 在同级内容之间切换，适合示例、配置和详情分组。 |
| `Alert` | Alert 提示 | 反馈组件 | 展示信息、成功、警告和错误提示。 |
| `Dialog` | Dialog 对话框 | 反馈组件 | 在当前页面中承载确认、表单和复杂交互。 |
| `Drawer` | Drawer 抽屉 | 反馈组件 | 从屏幕边缘展开内容，适合详情和编辑面板。 |
| `Loading` | Loading 加载 | 反馈组件 | 表达局部或全局加载状态，支持指令和服务式调用。 |
| `Message` | Message 消息提示 | 反馈组件 | 展示短时反馈，适合保存、删除和校验结果。 |
| `MessageBox` | MessageBox 消息弹出框 | 反馈组件 | 提供 alert、confirm、prompt 等确认交互。 |
| `Popconfirm` | Popconfirm 气泡确认框 | 反馈组件 | 对危险或二次确认操作进行轻量确认。 |
| `Popover` | Popover 弹出框 | 反馈组件 | 承载比 Tooltip 更复杂的辅助内容。 |
| `Result` | Result 结果 | 反馈组件 | 展示成功、失败、警告等流程结果和下一步操作。 |
| `Tooltip` | Tooltip 文字提示 | 反馈组件 | 为图标按钮、短文本和不可见信息补充说明。 |

## 主题 API

| 方法 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| `createTheme(input)` | `ThemeInput` | `ThemeTokens` | 根据主色、辅助色、强调色生成完整主题 Token |
| `applyTheme(theme, target?)` | `ThemeTokens, HTMLElement?` | `void` | 将主题写入 CSS Variables，默认写入 `document.documentElement` |
| `useTheme()` | 无 | 主题操作集合 | 在 Vue 组件内读取、设置、重置、导入和导出主题 |
| `resetTheme()` | 无 | `void` | 恢复默认主题 |
| `exportTheme()` | 无 | `string` | 导出当前主题 JSON |
| `importTheme(themeJson)` | `string` | `ThemeTokens` | 从 JSON 导入并应用主题 |

## 服务式 API

| API | 说明 |
| --- | --- |
| `MyLoading` / `v-loading` | 加载状态，支持服务式调用和指令用法 |
| `Message` | 短消息提示，适合保存、删除、校验反馈 |
| `MessageBox` | 对话式确认，适合 alert、confirm、prompt 场景 |

## 类型约定

- 组件 Props 使用 TypeScript 类型定义，不使用 `any`。
- 事件参数需要保持清晰，复杂对象使用 `interface` 或 `type`。
- 公共 API 一旦发布，不直接删除或重命名，优先保持向上兼容。
