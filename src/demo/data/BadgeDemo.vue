<template>
  <my-space :size="24" align="center">
    <my-badge :value="12"><my-button>消息</my-button></my-badge>
    <my-badge :value="200" :max="99"><my-button>通知</my-button></my-badge>
    <my-badge is-dot><my-button>动态</my-button></my-badge>
  </my-space>
</template>
