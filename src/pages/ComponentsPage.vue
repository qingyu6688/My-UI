<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import BasicDemos from '../components/demos/BasicDemos.vue'
import FormDemos from '../components/demos/FormDemos.vue'
import DataDemos from '../components/demos/DataDemos.vue'
import NavDemos from '../components/demos/NavDemos.vue'
import FeedbackDemos from '../components/demos/FeedbackDemos.vue'
import OtherDemos from '../components/demos/OtherDemos.vue'

interface Category {
  key: string
  label: string
  component: typeof BasicDemos
  items: string[]
}

const categories: Category[] = [
  {
    key: 'basic',
    label: '基础组件',
    component: BasicDemos,
    items: ['Button', 'Icon', 'Text', 'Typography', 'Link', 'Space', 'Divider', 'Scrollbar'],
  },
  {
    key: 'form',
    label: '表单组件',
    component: FormDemos,
    items: [
      'Input', 'InputNumber', 'Radio', 'Checkbox', 'Switch', 'Select', 'Slider', 'Rate',
      'Segmented', 'ColorPicker', 'TimePicker', 'DatePicker', 'DateTimePicker', 'TimeSelect',
      'Cascader', 'TreeSelect', 'Transfer', 'Upload', 'Autocomplete', 'InputTag', 'InputOTP',
      'Mention', 'Form',
    ],
  },
  {
    key: 'data',
    label: '数据展示',
    component: DataDemos,
    items: [
      'Tag', 'Badge', 'Avatar', 'Progress', 'Card', 'Descriptions', 'Empty', 'Skeleton',
      'Image', 'Table', 'Pagination', 'Collapse', 'Timeline', 'Statistic', 'Tree', 'Carousel',
      'Calendar', 'VirtualList',
    ],
  },
  {
    key: 'nav',
    label: '导航组件',
    component: NavDemos,
    items: ['Menu', 'Tabs', 'Breadcrumb', 'Steps', 'Dropdown', 'PageHeader', 'Anchor', 'Backtop / Affix'],
  },
  {
    key: 'feedback',
    label: '反馈组件',
    component: FeedbackDemos,
    items: [
      'Alert', 'Tooltip', 'Popover', 'Popconfirm', 'Dialog', 'Drawer', 'Message', 'MessageBox',
      'Loading', 'Result', 'Tour',
    ],
  },
  {
    key: 'other',
    label: '其他组件',
    component: OtherDemos,
    items: ['Watermark', 'Splitter', 'ConfigProvider', 'InfiniteScroll'],
  },
]

const activeKey = ref('basic')
const activeAnchor = ref('')

const activeCategory = computed(
  () => categories.find((category) => category.key === activeKey.value) ?? categories[0],
)

function scrollToComponent(name: string): void {
  void nextTick(() => {
    const el = document.getElementById(name)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      activeAnchor.value = name
    }
  })
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
          <p class="docs-sidebar__title">{{ category.label }}</p>
          <button
            v-for="item in category.items"
            :key="item"
            type="button"
            class="docs-sidebar__link"
            :class="{ 'is-active': activeKey === category.key && activeAnchor === item }"
            @click="selectComponent(category.key, item)"
          >
            {{ item }}
          </button>
        </div>
      </nav>
    </aside>

    <!-- 中间：内容 -->
    <div class="docs-main">
      <div class="docs-article">
        <header class="docs-article__head">
          <p class="eyebrow">Components</p>
          <h1>{{ activeCategory.label }}</h1>
          <p>覆盖该分类下全部组件的真实渲染示例，跟随当前主题色实时变化。</p>
        </header>

        <component :is="activeCategory.component" />
      </div>
    </div>

    <!-- 右侧：本页 TOC -->
    <aside class="docs-toc">
      <p class="docs-toc__title">本页组件</p>
      <a
        v-for="item in activeCategory.items"
        :key="item"
        class="docs-toc__link"
        :class="{ 'is-active': activeAnchor === item }"
        @click="scrollToComponent(item)"
      >
        {{ item }}
      </a>
    </aside>

    <my-backtop :visibility-height="200" />
  </main>
</template>
