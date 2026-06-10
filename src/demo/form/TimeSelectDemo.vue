<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <my-time-select v-model="value" start="09:00" end="18:00" step="00:30" />
</template>
