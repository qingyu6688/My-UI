<script setup lang="ts">
import DemoBox from './DemoBox.vue'
import DividerDemo from '../../demo/other/DividerDemo.vue'
import DividerSrc from '../../demo/other/DividerDemo.vue?raw'
import WatermarkDemo from '../../demo/other/WatermarkDemo.vue'
import WatermarkSrc from '../../demo/other/WatermarkDemo.vue?raw'
</script>

<template>
  <div class="demo-group">
    <DemoBox
      name="Divider" title="Divider 分割线" title-en="Divider"
      description="水平、垂直与带文字分割。"
      description-en="Horizontal, vertical and text divider."
      :source="DividerSrc" path="src/demo/other/DividerDemo.vue"
    >
      <DividerDemo />
    </DemoBox>

    <DemoBox
      name="Watermark" title="Watermark 水印" title-en="Watermark"
      description="平铺防截图水印。"
      description-en="Tiled anti-screenshot watermark."
      :source="WatermarkSrc" path="src/demo/other/WatermarkDemo.vue"
    >
      <WatermarkDemo />
    </DemoBox>
  </div>
</template>
