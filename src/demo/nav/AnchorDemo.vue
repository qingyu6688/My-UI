<script setup lang="ts">
const links = [
  { href: '#Menu', title: 'Menu 菜单' },
  { href: '#Tabs', title: 'Tabs 标签页' },
  { href: '#Steps', title: 'Steps 步骤条' },
]
</script>

<template>
  <my-anchor :links="links" :offset="80" />
</template>
