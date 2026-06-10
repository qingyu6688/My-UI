<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <my-input-otp v-model="value" :length="6" type="number" />
</template>
