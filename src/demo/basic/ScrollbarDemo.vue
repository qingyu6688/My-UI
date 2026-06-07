<template>
  <my-scrollbar height="160px">
    <p v-for="n in 20" :key="n" style="padding: 6px 0; margin: 0;">
      自定义滚动条内容行 {{ n }}
    </p>
  </my-scrollbar>
</template>
