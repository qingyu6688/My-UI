import type { Component } from 'vue'
import { BookOpen, Boxes, Layers, Rocket } from 'lucide-vue-next'

export interface NavItem {
  label: string
  path: string
}

export interface SiteThemePreset {
  name: string
  description: string
  primary: string
  secondary: string
  accent: string
}

export interface ComponentItem {
  name: string
  description: string
}

export interface ComponentGroup {
  title: string
  description: string
  icon: Component
  items: ComponentItem[]
}

export interface RoadmapItem {
  title: string
  status: string
  description: string
}

export const navItems: NavItem[] = [
  { label: '指南', path: '/guide' },
  { label: '组件', path: '/components' },
  { label: '主题', path: '/theme' },
  { label: '路线', path: '/roadmap' },
]

export const themePresets: SiteThemePreset[] = [
  {
    name: '默认主题',
    description: '鼠尾草浅黄，适合安静的管理台和工具页。',
    primary: '#a8d5ba',
    secondary: '#d7e8bd',
    accent: '#fff3c7',
  },
  {
    name: '海盐蓝绿',
    description: '更清爽的后台风格，适合数据密集页面。',
    primary: '#7fc7c2',
    secondary: '#c8e6df',
    accent: '#f6d78b',
  },
  {
    name: '鸢尾灰紫',
    description: '低饱和品牌色，适合内容管理和协作产品。',
    primary: '#aeb4e8',
    secondary: '#d7dbf5',
    accent: '#ffe2a8',
  },
]

export const componentGroups: ComponentGroup[] = [
  {
    title: '基础组件',
    description: '页面搭建中最常用的按钮、图标、文本和间距能力。',
    icon: Boxes,
    items: [
      { name: 'Button', description: '触发操作，支持类型、尺寸、禁用和文本按钮。' },
      { name: 'Icon', description: '统一图标尺寸和颜色，适配按钮与列表场景。' },
      { name: 'Text', description: '用于正文、辅助说明和状态文案。' },
      { name: 'Link', description: '页面跳转与外链入口。' },
      { name: 'Space', description: '处理按钮组、标签组等横纵间距。' },
      { name: 'Divider', description: '分隔内容块，保持信息层级清晰。' },
      { name: 'Alert', description: '展示成功、警告、错误和信息提示。' },
      { name: 'Tooltip', description: '为图标按钮和短标签补充说明。' },
      { name: 'Color', description: '服务主题编辑和颜色选择场景。' },
    ],
  },
  {
    title: '表单组件',
    description: '输入、选择、校验与开关交互，服务真实业务表单。',
    icon: BookOpen,
    items: [
      { name: 'Form', description: '承载字段布局、校验和错误提示。' },
      { name: 'Input', description: '文本输入，支持前后缀、清空和禁用。' },
      { name: 'InputNumber', description: '数值输入，适合数量、金额和步进场景。' },
      { name: 'Select', description: '从固定选项中选择单个或多个值。' },
      { name: 'Radio', description: '互斥选择，适合少量选项。' },
      { name: 'Checkbox', description: '多选与布尔状态选择。' },
      { name: 'Switch', description: '开关状态切换，适合即时启停。' },
    ],
  },
  {
    title: '数据展示',
    description: '列表、状态标签和分页，覆盖管理台高频信息展示。',
    icon: Layers,
    items: [
      { name: 'Table', description: '结构化展示数据，支持边框和列配置。' },
      { name: 'Pagination', description: '处理长列表翻页和数据定位。' },
      { name: 'Tag', description: '展示状态、分类和轻量标签。' },
    ],
  },
  {
    title: '导航组件',
    description: '菜单和标签页，负责页面结构切换和信息层级表达。',
    icon: Rocket,
    items: [
      { name: 'Menu', description: '顶部或侧边导航，支持当前项高亮。' },
      { name: 'Tabs', description: '同级内容切换，适合示例和配置分组。' },
    ],
  },
]

export const previewRows = [
  { name: 'Button', type: '基础组件', status: '已完成' },
  { name: 'Input', type: '表单组件', status: '已完成' },
  { name: 'Table', type: '数据展示', status: '已完成' },
]

export const roadmapItems: RoadmapItem[] = [
  {
    title: '首页与导航',
    status: '本轮完成',
    description: '按 Element Plus 的清爽文档站风格整理首页、导航与独立页面入口。',
  },
  {
    title: '组件 API 文档',
    status: '下一步',
    description: '继续补齐 Props、Events、Slots 文档和边界测试。',
  },
  {
    title: '主题编辑器',
    status: '计划中',
    description: '增加主题导入导出、最近主题和对比度提示。',
  },
]
