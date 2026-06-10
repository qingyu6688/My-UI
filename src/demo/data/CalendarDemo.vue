<script setup lang="ts">
import { ref } from 'vue'

const value = ref(new Date())
</script>

<template>
  <div style="max-width: 360px;">
    <my-calendar v-model="value" />
  </div>
</template>
