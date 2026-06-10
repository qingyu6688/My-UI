<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: number | string
    label?: string
    decorative?: boolean
  }>(),
  {
    size: 40,
    label: 'My UI',
    decorative: false,
  },
)

function normalizeSize(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value
}

const logoStyle = computed<CSSProperties>(() => {
  const size = normalizeSize(props.size)
  return {
    width: size,
    height: size,
  }
})

interface LogoAriaProps {
  role?: 'img'
  'aria-label'?: string
  'aria-hidden'?: boolean
}

const ariaProps = computed<LogoAriaProps>(() => {
  if (props.decorative) {
    return { 'aria-hidden': true }
  }

  return {
    role: 'img',
    'aria-label': props.label,
  }
})
</script>

<template>
  <svg
    class="my-ui-logo"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :style="logoStyle"
    v-bind="ariaProps"
  >
    <defs>
      <linearGradient id="my-ui-logo-bg" x1="10" y1="8" x2="56" y2="58" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#A8D5BA" />
        <stop offset="0.54" stop-color="#D7E8BD" />
        <stop offset="1" stop-color="#FFF3C7" />
      </linearGradient>
      <linearGradient id="my-ui-logo-mark" x1="18" y1="18" x2="46" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#26332B" />
        <stop offset="1" stop-color="#4F6F5A" />
      </linearGradient>
    </defs>

    <rect x="6" y="6" width="52" height="52" rx="15" fill="url(#my-ui-logo-bg)" />
    <rect x="6" y="6" width="52" height="52" rx="15" stroke="rgba(38, 51, 43, 0.14)" />
    <path
      d="M18 43V22C18 20.8954 18.8954 20 20 20H24.282C24.9872 20 25.6406 20.3709 26.0019 20.9767L32 31.034L37.9981 20.9767C38.3594 20.3709 39.0128 20 39.718 20H44C45.1046 20 46 20.8954 46 22V43"
      stroke="url(#my-ui-logo-mark)"
      stroke-width="5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20 45H44"
      stroke="#26332B"
      stroke-width="5"
      stroke-linecap="round"
      opacity="0.86"
    />
    <circle cx="48" cy="16" r="4" fill="#FFF3C7" stroke="rgba(38, 51, 43, 0.12)" />
  </svg>
</template>
