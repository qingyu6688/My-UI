<script setup lang="ts">
import { Plus, Search } from 'lucide-vue-next'
</script>

<template>
  <my-space direction="vertical" :size="16" style="width: 100%;">
    <my-space wrap>
      <my-button>默认</my-button>
      <my-button type="primary">主要</my-button>
      <my-button type="success">成功</my-button>
      <my-button type="info">信息</my-button>
      <my-button type="warning">警告</my-button>
      <my-button type="danger">危险</my-button>
    </my-space>

    <my-space wrap>
      <my-button plain>朴素</my-button>
      <my-button type="primary" plain>朴素主要</my-button>
      <my-button type="primary" round>圆角</my-button>
      <my-button type="primary" dashed>虚线</my-button>
      <my-button type="success" dashed>虚线成功</my-button>
    </my-space>

    <my-space wrap>
      <my-button circle>
        <template #icon><Search :size="14" /></template>
      </my-button>
      <my-button type="primary" circle>
        <template #icon><Plus :size="14" /></template>
      </my-button>
      <my-button type="success" circle>
        <template #icon><Plus :size="14" /></template>
      </my-button>
    </my-space>

    <my-space wrap>
      <my-button text>文字</my-button>
      <my-button type="primary" text>文字主要</my-button>
      <my-button text bg>文字带底</my-button>
      <my-button type="primary" text bg>主要带底</my-button>
    </my-space>

    <my-space wrap>
      <my-button link>默认链接</my-button>
      <my-button type="primary" link>主要链接</my-button>
      <my-button type="success" link>成功链接</my-button>
      <my-button type="danger" link>危险链接</my-button>
    </my-space>

    <my-space wrap>
      <my-button color="#7fc7c2">海盐青</my-button>
      <my-button color="#aeb4e8">鸢尾紫</my-button>
      <my-button color="#e5c76f">鹅黄</my-button>
    </my-space>

    <my-space wrap align="center">
      <my-button size="large" type="primary">大号</my-button>
      <my-button type="primary">默认</my-button>
      <my-button size="small" type="primary">小号</my-button>
    </my-space>

    <my-space wrap>
      <my-button loading>加载中</my-button>
      <my-button type="primary" loading>提交中</my-button>
      <my-button disabled>禁用</my-button>
      <my-button type="primary" disabled>禁用主要</my-button>
    </my-space>

    <my-space wrap>
      <my-button auto-insert-space>登录</my-button>
      <my-button tag="a" href="https://vuejs.org" target="_blank" type="primary">链接 a 标签</my-button>
    </my-space>

    <my-space wrap align="start">
      <my-button-group>
        <my-button>左</my-button>
        <my-button>中</my-button>
        <my-button>右</my-button>
      </my-button-group>

      <my-button-group type="primary">
        <my-button>上一页</my-button>
        <my-button>下一页</my-button>
      </my-button-group>

      <my-button-group direction="vertical">
        <my-button>顶部</my-button>
        <my-button>中部</my-button>
        <my-button>底部</my-button>
      </my-button-group>
    </my-space>
  </my-space>
</template>
