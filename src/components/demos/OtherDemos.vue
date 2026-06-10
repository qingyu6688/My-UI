<script setup lang="ts">
import DemoBox from './DemoBox.vue'
import WatermarkDemo from '../../demo/other/WatermarkDemo.vue'
import WatermarkSrc from '../../demo/other/WatermarkDemo.vue?raw'
import SplitterDemo from '../../demo/other/SplitterDemo.vue'
import SplitterSrc from '../../demo/other/SplitterDemo.vue?raw'
import ConfigProviderDemo from '../../demo/other/ConfigProviderDemo.vue'
import ConfigProviderSrc from '../../demo/other/ConfigProviderDemo.vue?raw'
import InfiniteScrollDemo from '../../demo/other/InfiniteScrollDemo.vue'
import InfiniteScrollSrc from '../../demo/other/InfiniteScrollDemo.vue?raw'
</script>

<template>
  <div class="demo-group">
    <DemoBox
      name="Watermark"
      title="Watermark 水印"
      title-en="Watermark"
      description="平铺防截图水印。"
      description-en="Tiled watermark for screenshots."
      :source="WatermarkSrc"
      path="src/demo/other/WatermarkDemo.vue"
    >
      <WatermarkDemo />
    </DemoBox>

    <DemoBox
      name="Splitter"
      title="Splitter 分隔面板"
      title-en="Splitter"
      description="拖拽中间分隔条调整比例。"
      description-en="Drag the bar to resize panels."
      :source="SplitterSrc"
      path="src/demo/other/SplitterDemo.vue"
    >
      <SplitterDemo />
    </DemoBox>

    <DemoBox
      name="ConfigProvider"
      title="ConfigProvider 全局配置"
      title-en="ConfigProvider"
      description="统一注入尺寸等配置。"
      description-en="Inject namespace, size and locale."
      :source="ConfigProviderSrc"
      path="src/demo/other/ConfigProviderDemo.vue"
    >
      <ConfigProviderDemo />
    </DemoBox>

    <DemoBox
      name="InfiniteScroll"
      title="InfiniteScroll 无限滚动"
      title-en="InfiniteScroll"
      description="滚动到底部自动加载（指令）。"
      description-en="Trigger loading on scroll bottom via directive."
      :source="InfiniteScrollSrc"
      path="src/demo/other/InfiniteScrollDemo.vue"
    >
      <InfiniteScrollDemo />
    </DemoBox>
  </div>
</template>
