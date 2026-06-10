<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <my-time-picker v-model="value" />
</template>
