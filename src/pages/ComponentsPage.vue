<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import BasicDemos from '../components/demos/BasicDemos.vue'
import ConfigurationDemos from '../components/demos/ConfigurationDemos.vue'
import FormDemos from '../components/demos/FormDemos.vue'
import DataDemos from '../components/demos/DataDemos.vue'
import NavDemos from '../components/demos/NavDemos.vue'
import FeedbackDemos from '../components/demos/FeedbackDemos.vue'
import OtherDemos from '../components/demos/OtherDemos.vue'
import { useSiteLocale } from '../composables/use-site-locale'

interface ComponentNavItem {
  id: string
  zh: string
  en: string
}

interface Category {
  key: string
  label: string
  labelEn: string
  description: string
  descriptionEn: string
  component: typeof BasicDemos
  items: ComponentNavItem[]
}

const categories: Category[] = [
  {
    key: 'basic',
    label: '基础组件',
    labelEn: 'Basic',
    description: '承载页面搭建中最常用的按钮、图标、布局、文本和间距能力。',
    descriptionEn: 'Core building blocks for buttons, icons, layout, text and spacing.',
    component: BasicDemos,
    items: [
      { id: 'Button', zh: '按钮', en: 'Button' },
      { id: 'Border', zh: '边框', en: 'Border' },
      { id: 'Color', zh: '色彩', en: 'Color' },
      { id: 'Container', zh: '布局容器', en: 'Container' },
      { id: 'Icon', zh: '图标', en: 'Icon' },
      { id: 'Layout', zh: '布局', en: 'Layout' },
      { id: 'Link', zh: '链接', en: 'Link' },
      { id: 'Text', zh: '文本', en: 'Text' },
      { id: 'Scrollbar', zh: '滚动条', en: 'Scrollbar' },
      { id: 'Space', zh: '间距', en: 'Space' },
      { id: 'Splitter', zh: '分隔面板', en: 'Splitter' },
      { id: 'Typography', zh: '排版', en: 'Typography' },
    ],
  },
  {
    key: 'configuration',
    label: '配置组件',
    labelEn: 'Configuration',
    description: '通过 ConfigProvider 统一注入命名空间、尺寸、层级、语言等全局配置。',
    descriptionEn: 'Inject namespace, size, z-index and locale globally via ConfigProvider.',
    component: ConfigurationDemos,
    items: [
      { id: 'ConfigProvider', zh: '全局配置', en: 'Config Provider' },
    ],
  },
  {
    key: 'form',
    label: '表单组件',
    labelEn: 'Form',
    description: '输入、选择、上传、校验和复杂表单控件，覆盖后台系统高频录入场景。',
    descriptionEn: 'Inputs, pickers, upload, validation and advanced form controls for admin workflows.',
    component: FormDemos,
    items: [
      { id: 'Input', zh: '输入框', en: 'Input' },
      { id: 'InputNumber', zh: '数字输入框', en: 'Input Number' },
      { id: 'Radio', zh: '单选框', en: 'Radio' },
      { id: 'Checkbox', zh: '多选框', en: 'Checkbox' },
      { id: 'Switch', zh: '开关', en: 'Switch' },
      { id: 'Select', zh: '选择器', en: 'Select' },
      { id: 'VirtualizedSelect', zh: '虚拟化选择器', en: 'Virtualized Select' },
      { id: 'Slider', zh: '滑块', en: 'Slider' },
      { id: 'Rate', zh: '评分', en: 'Rate' },
      { id: 'Segmented', zh: '分段控制器', en: 'Segmented' },
      { id: 'ColorPicker', zh: '颜色选择器', en: 'Color Picker' },
      { id: 'ColorPickerPanel', zh: '颜色选择器面板', en: 'ColorPickerPanel' },
      { id: 'DatePickerPanel', zh: '日期选择器面板', en: 'Date Picker Panel' },
      { id: 'TimePicker', zh: '时间选择器', en: 'Time Picker' },
      { id: 'DatePicker', zh: '日期选择器', en: 'Date Picker' },
      { id: 'DateTimePicker', zh: '日期时间选择器', en: 'DateTime Picker' },
      { id: 'TimeSelect', zh: '时间选择', en: 'Time Select' },
      { id: 'Cascader', zh: '级联选择器', en: 'Cascader' },
      { id: 'TreeSelect', zh: '树形选择', en: 'Tree Select' },
      { id: 'Transfer', zh: '穿梭框', en: 'Transfer' },
      { id: 'Upload', zh: '上传', en: 'Upload' },
      { id: 'Autocomplete', zh: '自动补全输入框', en: 'Autocomplete' },
      { id: 'InputTag', zh: '标签输入', en: 'Input Tag' },
      { id: 'InputOTP', zh: '验证码输入', en: 'Input OTP' },
      { id: 'Mention', zh: '提及', en: 'Mention' },
      { id: 'Form', zh: '表单', en: 'Form' },
    ],
  },
  {
    key: 'data',
    label: '数据展示',
    labelEn: 'Data',
    description: '列表、表格、标签、骨架屏和状态类内容展示，适合数据密集页面。',
    descriptionEn: 'Tables, lists, tags, placeholders and status displays for data-heavy pages.',
    component: DataDemos,
    items: [
      { id: 'Tag', zh: '标签', en: 'Tag' },
      { id: 'Badge', zh: '徽章', en: 'Badge' },
      { id: 'Avatar', zh: '头像', en: 'Avatar' },
      { id: 'Progress', zh: '进度条', en: 'Progress' },
      { id: 'Card', zh: '卡片', en: 'Card' },
      { id: 'Descriptions', zh: '描述列表', en: 'Descriptions' },
      { id: 'Empty', zh: '空状态', en: 'Empty' },
      { id: 'Skeleton', zh: '骨架屏', en: 'Skeleton' },
      { id: 'Image', zh: '图片', en: 'Image' },
      { id: 'Table', zh: '表格', en: 'Table' },
      { id: 'Pagination', zh: '分页', en: 'Pagination' },
      { id: 'Collapse', zh: '折叠面板', en: 'Collapse' },
      { id: 'Timeline', zh: '时间线', en: 'Timeline' },
      { id: 'Statistic', zh: '统计数值', en: 'Statistic' },
      { id: 'Tree', zh: '树形控件', en: 'Tree' },
      { id: 'Carousel', zh: '走马灯', en: 'Carousel' },
      { id: 'Calendar', zh: '日历', en: 'Calendar' },
      { id: 'VirtualList', zh: '虚拟列表', en: 'Virtual List' },
      { id: 'VirtualizedTable', zh: '虚拟化表格', en: 'Virtualized Table' },
      { id: 'VirtualizedTree', zh: '虚拟化树形控件', en: 'Virtualized Tree' },
      { id: 'InfiniteScroll', zh: '无限滚动', en: 'Infinite Scroll' },
    ],
  },
  {
    key: 'nav',
    label: '导航组件',
    labelEn: 'Navigation',
    description: '菜单、标签页、面包屑、步骤条和锚点，用来表达页面结构与位置。',
    descriptionEn: 'Menus, tabs, breadcrumbs, steps and anchors for structure and navigation.',
    component: NavDemos,
    items: [
      { id: 'Menu', zh: '菜单', en: 'Menu' },
      { id: 'Tabs', zh: '标签页', en: 'Tabs' },
      { id: 'Breadcrumb', zh: '面包屑', en: 'Breadcrumb' },
      { id: 'Steps', zh: '步骤条', en: 'Steps' },
      { id: 'Dropdown', zh: '下拉菜单', en: 'Dropdown' },
      { id: 'PageHeader', zh: '页头', en: 'Page Header' },
      { id: 'Anchor', zh: '锚点', en: 'Anchor' },
      { id: 'Affix', zh: '固钉', en: 'Affix' },
      { id: 'Backtop', zh: '回到顶部', en: 'Backtop' },
    ],
  },
  {
    key: 'feedback',
    label: '反馈组件',
    labelEn: 'Feedback',
    description: '提示、弹层、加载、结果页和引导流程，统一处理操作反馈。',
    descriptionEn: 'Alerts, overlays, loading, result states and tours for consistent feedback.',
    component: FeedbackDemos,
    items: [
      { id: 'Alert', zh: '提示', en: 'Alert' },
      { id: 'Tooltip', zh: '文字提示', en: 'Tooltip' },
      { id: 'Popover', zh: '弹出框', en: 'Popover' },
      { id: 'Popconfirm', zh: '气泡确认框', en: 'Popconfirm' },
      { id: 'Dialog', zh: '对话框', en: 'Dialog' },
      { id: 'Drawer', zh: '抽屉', en: 'Drawer' },
      { id: 'Message', zh: '消息提示', en: 'Message' },
      { id: 'MessageBox', zh: '消息弹出框', en: 'Message Box' },
      { id: 'Notification', zh: '通知', en: 'Notification' },
      { id: 'Loading', zh: '加载', en: 'Loading' },
      { id: 'Result', zh: '结果', en: 'Result' },
      { id: 'Tour', zh: '漫游引导', en: 'Tour' },
    ],
  },
  {
    key: 'other',
    label: '其他组件',
    labelEn: 'Others',
    description: '分割线与水印两个补充组件。',
    descriptionEn: 'Divider and Watermark utilities.',
    component: OtherDemos,
    items: [
      { id: 'Divider', zh: '分割线', en: 'Divider' },
      { id: 'Watermark', zh: '水印', en: 'Watermark' },
    ],
  },
]

const activeKey = ref('basic')
const activeAnchor = ref(categories[0].items[0].id)
const { isZh } = useSiteLocale()

const activeCategory = computed(
  () => categories.find((category) => category.key === activeKey.value) ?? categories[0],
)
const pageTitle = computed(() => (isZh.value ? activeCategory.value.label : activeCategory.value.labelEn))
const pageDescription = computed(() =>
  isZh.value ? activeCategory.value.description : activeCategory.value.descriptionEn,
)
const tocTitle = computed(() => (isZh.value ? '本页组件' : 'On this page'))
const pageEyebrow = computed(() => (isZh.value ? '组件文档' : 'Components'))

function categoryLabel(category: Category): string {
  return isZh.value ? category.label : category.labelEn
}

function itemLabel(item: ComponentNavItem): string {
  return isZh.value ? `${item.id} ${item.zh}` : item.en
}

function scrollToComponent(name: string): void {
  void nextTick(() => {
    const el = document.getElementById(name)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      activeAnchor.value = name
    }
  })
}

function selectCategory(categoryKey: string): void {
  const category = categories.find((item) => item.key === categoryKey)
  const firstItem = category?.items[0]
  if (!category || !firstItem) return

  activeKey.value = category.key
  activeAnchor.value = firstItem.id
  scrollToComponent(firstItem.id)
}

function selectComponent(categoryKey: string, name: string): void {
  if (activeKey.value !== categoryKey) {
    activeKey.value = categoryKey
  }
  scrollToComponent(name)
}
</script>

<template>
  <main class="docs-layout">
    <!-- 左侧：全组件分组导航 -->
    <aside class="docs-sidebar">
      <nav class="docs-sidebar__inner">
        <div v-for="category in categories" :key="category.key" class="docs-sidebar__group">
          <button
            type="button"
            class="docs-sidebar__title"
            :class="{ 'is-active': activeKey === category.key }"
            @click="selectCategory(category.key)"
          >
            <span>{{ categoryLabel(category) }}</span>
            <small>{{ category.items.length }}</small>
          </button>
          <button
            v-for="item in category.items"
            :key="item.id"
            type="button"
            class="docs-sidebar__link"
            :class="{ 'is-active': activeKey === category.key && activeAnchor === item.id }"
            @click="selectComponent(category.key, item.id)"
          >
            {{ itemLabel(item) }}
          </button>
        </div>
      </nav>
    </aside>

    <!-- 中间：内容 -->
    <div class="docs-main">
      <div class="docs-article">
        <header class="docs-article__head">
          <p class="eyebrow">{{ pageEyebrow }}</p>
          <h1>{{ pageTitle }}</h1>
          <p>{{ pageDescription }}</p>
        </header>

        <component :is="activeCategory.component" />
      </div>
    </div>

    <!-- 右侧：本页 TOC -->
    <aside class="docs-toc">
      <p class="docs-toc__title">{{ tocTitle }}</p>
      <a
        v-for="item in activeCategory.items"
        :key="item.id"
        class="docs-toc__link"
        :class="{ 'is-active': activeAnchor === item.id }"
        @click="scrollToComponent(item.id)"
      >
        {{ itemLabel(item) }}
      </a>
    </aside>

    <my-backtop :visibility-height="200" />
  </main>
</template>
