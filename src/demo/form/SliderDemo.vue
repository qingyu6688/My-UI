<script setup lang="ts">
import { ref } from 'vue'

const value = ref(40)
</script>

<template>
  <div style="max-width: 320px;">
    <my-slider v-model="value" show-stops :step="10" />
  </div>
</template>
