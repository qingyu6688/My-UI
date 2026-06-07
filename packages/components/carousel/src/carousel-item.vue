<script setup lang="ts">
import { computed, getCurrentInstance, inject, onBeforeUnmount, onMounted } from 'vue'
import { carouselKey } from './carousel'

defineOptions({
  name: 'MyCarouselItem',
})

const carousel = inject(carouselKey)
const uid = getCurrentInstance()?.uid ?? 0

const selfIndex = computed(() => carousel?.items.value.indexOf(uid) ?? -1)
const active = computed(() => selfIndex.value === (carousel?.activeIndex.value ?? 0))

onMounted(() => carousel?.register(uid))
onBeforeUnmount(() => carousel?.unregister(uid))
</script>

<template>
  <div v-show="active" class="my-carousel-item">
    <slot />
  </div>
</template>
