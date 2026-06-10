<script setup lang="ts">
import { computed, ref } from 'vue'
import { icons, MySearchIcon } from '@my-ui/icons'

const keyword = ref('')
const copiedName = ref('')
const copyFailed = ref(false)
let copyTimer: number | undefined

const normalizedKeyword = computed(() => keyword.value.trim().toLowerCase())

const visibleIcons = computed(() => {
  if (!normalizedKeyword.value) {
    return icons
  }

  return icons.filter((item) => {
    const keywords = [item.name, item.label, ...(item.keywords ?? [])].join(' ').toLowerCase()
    return keywords.includes(normalizedKeyword.value)
  })
})

async function copyIconName(name: string): Promise<void> {
  copiedName.value = name
  copyFailed.value = false
  window.clearTimeout(copyTimer)

  try {
    await navigator.clipboard?.writeText(name)
  } catch {
    copyFailed.value = true
  }

  copyTimer = window.setTimeout(() => {
    copiedName.value = ''
    copyFailed.value = false
  }, 1600)
}
</script>

<template>
  <div class="icon-gallery">
    <div class="icon-gallery__toolbar">
      <my-input
        v-model="keyword"
        class="icon-gallery__search"
        placeholder="Search Icons"
        clearable
      >
        <template #prefix>
          <MySearchIcon />
        </template>
      </my-input>
      <span class="icon-gallery__count">{{ visibleIcons.length }} icons</span>
    </div>

    <div v-if="visibleIcons.length" class="icon-gallery__grid" role="list">
      <button
        v-for="item in visibleIcons"
        :key="item.name"
        type="button"
        class="icon-gallery__cell"
        :class="{ 'is-copied': copiedName === item.name }"
        :aria-label="`复制 ${item.name}`"
        @click="copyIconName(item.name)"
      >
        <my-icon :size="24" :label="item.label">
          <component :is="item.component" />
        </my-icon>
        <span>{{ item.label }}</span>
      </button>
    </div>

    <div v-else class="icon-gallery__empty">
      没有匹配的图标
    </div>

    <p class="icon-gallery__tip">
      点击图标可复制组件名，支持按英文名称、组件名或关键字搜索。
      <span v-if="copiedName">{{ copyFailed ? '已选中：' : '已复制：' }}{{ copiedName }}</span>
    </p>
  </div>
</template>
