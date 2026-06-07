<script setup lang="ts">
import DemoBlock from './DemoBlock.vue'
</script>

<template>
  <div class="demo-group">
    <DemoBlock name="Watermark" title="Watermark 水印" description="平铺防截图水印。">
      <my-watermark content="My UI" :font="{ color: 'rgba(38,51,43,0.12)', fontSize: 15 }">
        <div style="height: 160px; border: 1px solid var(--my-border-color-light); border-radius: 8px;" />
      </my-watermark>
    </DemoBlock>

    <DemoBlock name="Splitter" title="Splitter 分隔面板" description="拖拽中间分隔条调整比例。">
      <div style="height: 160px; border: 1px solid var(--my-border-color-light); border-radius: 8px; overflow: hidden;">
        <my-splitter :initial="40">
          <template #start>
            <div style="padding: 12px;">左侧面板</div>
          </template>
          <template #end>
            <div style="padding: 12px;">右侧面板</div>
          </template>
        </my-splitter>
      </div>
    </DemoBlock>

    <DemoBlock name="ConfigProvider" title="ConfigProvider 全局配置" description="统一注入尺寸等配置。">
      <my-config-provider size="large">
        <my-space>
          <my-button type="primary">大号按钮</my-button>
          <my-input placeholder="大号输入" style="width: 200px;" />
        </my-space>
      </my-config-provider>
    </DemoBlock>

    <DemoBlock name="InfiniteScroll" title="InfiniteScroll 无限滚动" description="滚动到底部自动加载（指令）。">
      <my-text type="info">通过 v-infinite-scroll 指令在滚动容器触底时触发加载回调。</my-text>
    </DemoBlock>
  </div>
</template>
