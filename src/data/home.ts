import type { Component } from 'vue'
import { BookOpen, Boxes, Layers, Rocket } from 'lucide-vue-next'

export interface NavItem {
  label: string
  labelEn: string
  path: string
}

export interface SiteThemePreset {
  name: string
  nameEn: string
  description: string
  descriptionEn: string
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
  titleEn: string
  status: string
  statusEn: string
  description: string
  descriptionEn: string
}

export const navItems: NavItem[] = [
  { label: '指南', labelEn: 'Guide', path: '/guide' },
  { label: '组件', labelEn: 'Components', path: '/components' },
  { label: '主题', labelEn: 'Theme', path: '/theme' },
  { label: '路线', labelEn: 'Roadmap', path: '/roadmap' },
]

export const themePresets: SiteThemePreset[] = [
  {
    name: '默认主题',
    nameEn: 'Default Theme',
    description: '鼠尾草浅黄，适合安静的管理台和工具页。',
    descriptionEn: 'Sage and pale yellow for calm admin tools and docs.',
    primary: '#a8d5ba',
    secondary: '#d7e8bd',
    accent: '#fff3c7',
  },
  {
    name: '海盐蓝绿',
    nameEn: 'Sea Salt Teal',
    description: '更清爽的后台风格，适合数据密集页面。',
    descriptionEn: 'A cleaner dashboard palette for dense data pages.',
    primary: '#7fc7c2',
    secondary: '#c8e6df',
    accent: '#f6d78b',
  },
  {
    name: '鸢尾灰紫',
    nameEn: 'Iris Gray Violet',
    description: '低饱和品牌色，适合内容管理和协作产品。',
    descriptionEn: 'A muted brand palette for content and collaboration products.',
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

/** 组件总数（与组件画廊分类统计保持一致：10+23+18+9+11+4） */
export const componentCount = 75

/** 组件画廊分类概览，用于首页快速跳转 */
export const galleryCategories = [
  { key: 'basic', label: '基础组件', count: 10 },
  { key: 'form', label: '表单组件', count: 23 },
  { key: 'data', label: '数据展示', count: 18 },
  { key: 'nav', label: '导航组件', count: 9 },
  { key: 'feedback', label: '反馈组件', count: 11 },
  { key: 'other', label: '其他组件', count: 4 },
]

export const roadmapItems: RoadmapItem[] = [
  {
    title: '全量组件交付',
    titleEn: 'Full Component Delivery',
    status: '已完成',
    statusEn: 'Done',
    description: '需求文档中的 P0、P1、P2 组件已全部实现，共 75 个，含主题系统与配置中心。',
    descriptionEn: 'P0, P1 and P2 components are implemented with the theme system and config provider.',
  },
  {
    title: '组件展示画廊',
    titleEn: 'Component Gallery',
    status: '已完成',
    statusEn: 'Done',
    description: '组件页提供全部组件的真实渲染示例，跟随当前主题色实时预览。',
    descriptionEn: 'The component page renders real examples and follows the current theme in real time.',
  },
  {
    title: '测试与质量',
    titleEn: 'Tests and Quality',
    status: '已完成',
    statusEn: 'Done',
    description: '232 个单元测试覆盖核心交互，typecheck、lint 与文档构建全部通过。',
    descriptionEn: '232 unit tests cover core interactions, with typecheck, lint and docs build passing.',
  },
  {
    title: '发布准备',
    titleEn: 'Release Readiness',
    status: '进行中',
    statusEn: 'In Progress',
    description: '完善构建产物的 exports、补齐组件 API 文档示例与变更记录。',
    descriptionEn: 'Exports, component API examples and changelog details are being prepared for release.',
  },
]
