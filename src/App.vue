<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <router-view />
  </div>
</template>
