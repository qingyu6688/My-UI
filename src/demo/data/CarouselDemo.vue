<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <my-carousel v-model="active" height="140px">
    <my-carousel-item>
      <div class="demo-carousel-slide" style="background: var(--my-color-primary-light-5);">
        第一页
      </div>
    </my-carousel-item>
    <my-carousel-item>
      <div class="demo-carousel-slide" style="background: var(--my-color-secondary-light-5);">
        第二页
      </div>
    </my-carousel-item>
    <my-carousel-item>
      <div class="demo-carousel-slide" style="background: var(--my-color-accent-light-5);">
        第三页
      </div>
    </my-carousel-item>
  </my-carousel>
</template>
