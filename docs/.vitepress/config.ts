import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My UI',
  description: '支持鼠尾草浅黄主题的 Vue 3 组件库',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/quick-start' },
      { text: '组件', link: '/components/button' },
      { text: '主题编辑器', link: '/theme/' },
      { text: '需求文档', link: '/requirements' },
      { text: '更新日志', link: '/changelog' },
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/guide/quick-start' },
          { text: '主题定制', link: '/guide/theme' },
          { text: '主题编辑器', link: '/theme/' },
        ],
      },
      {
        text: '基础组件',
        items: [
          { text: 'Border 边框', link: '/components/border' },
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'ButtonGroup 按钮组', link: '/components/button-group' },
          { text: 'Color 色彩', link: '/components/color' },
          { text: 'Container 容器', link: '/components/container' },
          { text: 'Divider 分割线', link: '/components/divider' },
          { text: 'Icon 图标', link: '/components/icon' },
          { text: 'Layout 布局', link: '/components/layout' },
          { text: 'Link 链接', link: '/components/link' },
          { text: 'Space 间距', link: '/components/space' },
          { text: 'Text 文本', link: '/components/text' }
        ],
      },
      {
        text: '配置组件',
        items: [
          { text: 'ConfigProvider 全局配置', link: '/components/config-provider' }
        ],
      },
      {
        text: '表单组件',
        items: [
          { text: 'Checkbox 多选框', link: '/components/checkbox' },
          { text: 'ColorPickerPanel 颜色面板', link: '/components/color-picker-panel' },
          { text: 'DatePickerPanel 日期面板', link: '/components/date-picker-panel' },
          { text: 'Form 表单', link: '/components/form' },
          { text: 'Input 输入框', link: '/components/input' },
          { text: 'InputNumber 数字输入框', link: '/components/input-number' },
          { text: 'Radio 单选框', link: '/components/radio' },
          { text: 'Segmented 分段控制器', link: '/components/segmented' },
          { text: 'Select 选择器', link: '/components/select' },
          { text: 'Switch 开关', link: '/components/switch' },
          { text: 'VirtualizedSelect 虚拟化选择器', link: '/components/virtualized-select' }
        ],
      },
      {
        text: '数据展示',
        items: [
          { text: 'Avatar 头像', link: '/components/avatar' },
          { text: 'Badge 徽章', link: '/components/badge' },
          { text: 'Card 卡片', link: '/components/card' },
          { text: 'Collapse 折叠面板', link: '/components/collapse' },
          { text: 'Descriptions 描述列表', link: '/components/descriptions' },
          { text: 'Empty 空状态', link: '/components/empty' },
          { text: 'Image 图片', link: '/components/image' },
          { text: 'Pagination 分页', link: '/components/pagination' },
          { text: 'Progress 进度条', link: '/components/progress' },
          { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
          { text: 'Table 表格', link: '/components/table' },
          { text: 'Tag 标签', link: '/components/tag' },
          { text: 'Timeline 时间线', link: '/components/timeline' },
          { text: 'VirtualizedTable 虚拟化表格', link: '/components/virtualized-table' },
          { text: 'VirtualizedTree 虚拟化树', link: '/components/virtualized-tree' }
        ],
      },
      {
        text: '导航',
        items: [
          { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' },
          { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
          { text: 'Menu 菜单', link: '/components/menu' },
          { text: 'Steps 步骤条', link: '/components/steps' },
          { text: 'Tabs 标签页', link: '/components/tabs' }
        ],
      },
      {
        text: '反馈组件',
        items: [
          { text: 'Alert 提示', link: '/components/alert' },
          { text: 'Dialog 对话框', link: '/components/dialog' },
          { text: 'Drawer 抽屉', link: '/components/drawer' },
          { text: 'Loading 加载', link: '/components/loading' },
          { text: 'Message 消息提示', link: '/components/message' },
          { text: 'MessageBox 消息弹出框', link: '/components/message-box' },
          { text: 'Notification 通知', link: '/components/notification' },
          { text: 'Popconfirm 气泡确认框', link: '/components/popconfirm' },
          { text: 'Popover 弹出框', link: '/components/popover' },
          { text: 'Result 结果', link: '/components/result' },
          { text: 'Tooltip 文字提示', link: '/components/tooltip' }
        ],
      },
      {
        text: '项目文档',
        items: [
          { text: '需求文档', link: '/requirements' },
          { text: 'API 文档', link: '/api' },
          { text: '数据库 Schema', link: '/schema' },
          { text: '部署说明', link: '/deploy' },
          { text: '环境记录', link: '/environment' },
          { text: '更新日志', link: '/changelog' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/qingyu6688/My-UI' }],
  },
})
