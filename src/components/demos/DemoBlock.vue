<script setup lang="ts">
defineOptions({ name: 'DemoBlock' })

defineProps<{ name: string; title?: string; description?: string }>()
</script>

<template>
  <section :id="name" class="demo-block">
    <header class="demo-block__head">
      <h3 class="demo-block__title">{{ title ?? name }}</h3>
      <p v-if="description" class="demo-block__desc">{{ description }}</p>
    </header>
    <div class="demo-block__preview">
      <slot />
    </div>
  </section>
</template>
