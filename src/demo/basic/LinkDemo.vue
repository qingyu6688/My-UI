<template>
  <my-space wrap :size="16">
    <my-link>默认链接</my-link>
    <my-link type="primary">主要链接</my-link>
    <my-link type="success">成功链接</my-link>
    <my-link type="danger" underline="always">始终下划线</my-link>
    <my-link disabled>禁用链接</my-link>
    <my-link type="primary" href="https://vuejs.org" target="_blank">外部链接</my-link>
  </my-space>
</template>
