<script setup lang="ts">
import { ref } from 'vue'

const value = ref(true)
</script>

<template>
  <my-space align="center">
    <my-switch v-model="value" />
    <my-switch v-model="value" size="large" />
    <my-switch disabled />
  </my-space>
</template>
