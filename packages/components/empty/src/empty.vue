<script setup lang="ts">
defineOptions({
  name: 'MyEmpty',
})

withDefaults(defineProps<{ description?: string; imageSize?: number }>(), {
  description: '暂无数据',
  imageSize: 80,
})
</script>

<template>
  <div class="my-empty">
    <div class="my-empty__image" :style="{ width: `${imageSize}px` }">
      <slot name="image">
        <svg viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
            <ellipse cx="32" cy="33" rx="32" ry="7" fill="var(--my-fill-color-light)" />
            <g stroke="var(--my-border-color)" stroke-width="1">
              <path
                d="M55 12.76L44.85 1.62C44.5.61 43.7 0 42.81 0H21.19c-.89 0-1.69.61-2.04 1.62L9 12.76V22h46v-9.24z"
                fill="var(--my-bg-color)"
              />
              <path
                d="M41.61 15.37c0-1.04.84-1.88 1.88-1.88H55v18.5C55 33.65 53.65 35 52 35H12c-1.65 0-3-1.35-3-3.01v-18.5h11.51c1.04 0 1.88.84 1.88 1.88v.13c0 1.04.85 1.87 1.89 1.87h13.44c1.04 0 1.89-.84 1.89-1.88v-.12z"
                fill="var(--my-bg-color-soft)"
              />
            </g>
          </g>
        </svg>
      </slot>
    </div>
    <p v-if="description || $slots.description" class="my-empty__description">
      <slot name="description">{{ description }}</slot>
    </p>
    <div v-if="$slots.default" class="my-empty__actions">
      <slot />
    </div>
  </div>
</template>
