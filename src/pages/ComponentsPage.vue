<script setup lang="ts">
import { computed, ref } from 'vue'
import { Search } from 'lucide-vue-next'
import { componentGroups, previewRows } from '../data/home'

const keyword = ref('')

const filteredGroups = computed(() =>
  componentGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        `${item.name}${item.description}`.toLowerCase().includes(keyword.value.trim().toLowerCase()),
      ),
    }))
    .filter((group) => group.items.length > 0),
)
</script>

<template>
  <main class="page-shell component-page">
    <section class="page-hero page-hero--split">
      <div>
        <p class="eyebrow">Components</p>
        <h1>组件</h1>
        <p>按真实组件库文档的方式分类展示，后续每个组件可以继续扩展 Props、Events、Slots 和示例。</p>
      </div>
      <div class="component-search">
        <my-input v-model="keyword" clearable placeholder="搜索组件">
          <template #prefix>
            <Search />
          </template>
        </my-input>
      </div>
    </section>

    <section class="component-layout">
      <div class="component-list">
        <section
          v-for="group in filteredGroups"
          :key="group.title"
          class="component-group"
        >
          <div class="component-group__heading">
            <h2>{{ group.title }}</h2>
            <span>{{ group.items.length }} 个组件</span>
          </div>

          <div class="component-grid">
            <article
              v-for="item in group.items"
              :key="item.name"
              class="component-card"
            >
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
            </article>
          </div>
        </section>

        <div
          v-if="filteredGroups.length === 0"
          class="component-empty"
        >
          没有找到匹配的组件
        </div>
      </div>

      <aside class="component-preview">
        <p class="eyebrow">Example</p>
        <h2>基础组件预览</h2>
        <p>这里保留常用交互组件的真实渲染，方便检查主题、间距和圆角是否统一。</p>

        <my-space :size="10" wrap>
          <my-button type="primary">主要按钮</my-button>
          <my-button>默认按钮</my-button>
          <my-button text>文字按钮</my-button>
        </my-space>

        <div class="preview-field">
          <my-input placeholder="请输入内容" />
          <my-switch />
        </div>

        <my-tabs model-value="data">
          <my-tab-pane label="数据" name="data">
            <my-table :data="previewRows" border>
              <my-table-column prop="name" label="组件" />
              <my-table-column prop="type" label="分类" />
              <my-table-column prop="status" label="状态" />
            </my-table>
          </my-tab-pane>
          <my-tab-pane label="反馈" name="feedback">
            <my-alert
              title="组件状态清晰"
              description="反馈组件会跟随当前主题色显示，后续 API 文档也可以沿用同一套排版。"
              type="success"
              show-icon
            />
          </my-tab-pane>
        </my-tabs>
      </aside>
    </section>
  </main>
</template>
