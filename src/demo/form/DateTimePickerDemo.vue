<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <my-date-time-picker v-model="value" clearable />
</template>
