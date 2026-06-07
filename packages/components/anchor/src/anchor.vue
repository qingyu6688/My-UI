<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { AnchorEmits, AnchorProps } from './anchor'

defineOptions({
  name: 'MyAnchor',
})

const props = withDefaults(defineProps<AnchorProps>(), {
  offset: 0,
})

const emit = defineEmits<AnchorEmits>()

const activeHref = ref('')

function handleClick(event: MouseEvent, href: string): void {
  event.preventDefault()
  const target = document.querySelector(href)
  if (target) {
    const top = target.getBoundingClientRect().top + window.scrollY - props.offset
    window.scrollTo({ top, behavior: 'smooth' })
    setActive(href)
  }
}

function setActive(href: string): void {
  if (activeHref.value !== href) {
    activeHref.value = href
    emit('change', href)
  }
}

function updateActive(): void {
  let current = ''
  for (const link of props.links) {
    const el = document.querySelector(link.href)
    if (el && el.getBoundingClientRect().top - props.offset <= 1) {
      current = link.href
    }
  }
  if (current) setActive(current)
}

onMounted(() => {
  window.addEventListener('scroll', updateActive)
  updateActive()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActive)
})
</script>

<template>
  <nav class="my-anchor">
    <a
      v-for="link in links"
      :key="link.href"
      class="my-anchor__link"
      :class="{ 'is-active': activeHref === link.href }"
      :href="link.href"
      @click="handleClick($event, link.href)"
    >
      {{ link.title }}
    </a>
  </nav>
</template>
