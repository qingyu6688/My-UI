# Icon 图标

统一图标尺寸、颜色和可访问性标识。`MyIcon` 可以包裹内置图标，也可以包裹业务项目自己的 SVG 图标。

内置图标集合参考 Element Plus 的展示方式组织，提供可搜索的 `icons` 元数据，适合在文档站、低代码面板或图标选择器里直接渲染。

## 基础用法

```vue
<script setup lang="ts">
import { MySearchIcon, MySettingIcon, MyLoadingIcon } from '@qingyu6688/my-ui'
</script>

<template>
  <my-icon :size="20" label="搜索">
    <MySearchIcon />
  </my-icon>

  <my-icon :size="20" color="var(--my-color-primary)">
    <MySettingIcon />
  </my-icon>

  <my-icon :size="20" spin>
    <MyLoadingIcon />
  </my-icon>
</template>
```

## 引入方式

```ts
import { MyIcon, MySearchIcon, MyThemeIcon, icons } from '@qingyu6688/my-ui'
```

## 渲染图标集合

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { icons } from '@qingyu6688/my-ui'

const keyword = ref('')

const visibleIcons = computed(() => {
  const value = keyword.value.trim().toLowerCase()
  if (!value) return icons

  return icons.filter((item) => {
    return [item.name, item.label, ...(item.keywords ?? [])]
      .join(' ')
      .toLowerCase()
      .includes(value)
  })
})
</script>

<template>
  <my-input v-model="keyword" placeholder="Search Icons" clearable />

  <button v-for="item in visibleIcons" :key="item.name" type="button">
    <my-icon :size="24" :label="item.label">
      <component :is="item.component" />
    </my-icon>
    {{ item.label }}
  </button>
</template>
```

## 设计说明

- 分类：基础组件。
- 样式会跟随 My UI 主题变量变化。
- 内置图标统一导出为 Vue 组件，常见操作、消息、状态、图表、上传下载、深浅色和导航图标可直接在 `my-icon`、`my-button`、`my-menu-item` 等插槽中使用。
- 点击复制、图标选择器、文档网格等场景推荐使用 `icons` 元数据渲染，避免手写重复列表。
- 复杂交互需要同时关注默认、悬停、聚焦、禁用和错误状态。
- 后续会继续补齐 Props、Events、Slots 和 Exposes 表格。

## API

通用导出与主题 API 见 [API 文档](/api)。
