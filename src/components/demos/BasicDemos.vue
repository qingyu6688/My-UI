<script setup lang="ts">
import DemoBox from './DemoBox.vue'
import ButtonDemo from '../../demo/basic/ButtonDemo.vue'
import ButtonSrc from '../../demo/basic/ButtonDemo.vue?raw'
import IconDemo from '../../demo/basic/IconDemo.vue'
import IconSrc from '../../demo/basic/IconDemo.vue?raw'
import TextDemo from '../../demo/basic/TextDemo.vue'
import TextSrc from '../../demo/basic/TextDemo.vue?raw'
import TypographyDemo from '../../demo/basic/TypographyDemo.vue'
import TypographySrc from '../../demo/basic/TypographyDemo.vue?raw'
import LinkDemo from '../../demo/basic/LinkDemo.vue'
import LinkSrc from '../../demo/basic/LinkDemo.vue?raw'
import SpaceDemo from '../../demo/basic/SpaceDemo.vue'
import SpaceSrc from '../../demo/basic/SpaceDemo.vue?raw'
import DividerDemo from '../../demo/basic/DividerDemo.vue'
import DividerSrc from '../../demo/basic/DividerDemo.vue?raw'
import ScrollbarDemo from '../../demo/basic/ScrollbarDemo.vue'
import ScrollbarSrc from '../../demo/basic/ScrollbarDemo.vue?raw'
</script>

<template>
  <div class="demo-group">
    <DemoBox
      name="Button"
      title="Button 按钮"
      description="类型、朴素、圆角、禁用与加载状态。"
      :source="ButtonSrc"
      path="src/demo/basic/ButtonDemo.vue"
    >
      <ButtonDemo />
    </DemoBox>

    <DemoBox
      name="Icon"
      title="Icon 图标"
      description="统一尺寸、颜色与旋转，适配 lucide 图标。"
      :source="IconSrc"
      path="src/demo/basic/IconDemo.vue"
    >
      <IconDemo />
    </DemoBox>

    <DemoBox
      name="Text"
      title="Text 文本"
      description="语义类型、尺寸与截断。"
      :source="TextSrc"
      path="src/demo/basic/TextDemo.vue"
    >
      <TextDemo />
    </DemoBox>

    <DemoBox
      name="Typography"
      title="Typography 排版"
      description="标题与段落语义排版。"
      :source="TypographySrc"
      path="src/demo/basic/TypographyDemo.vue"
    >
      <TypographyDemo />
    </DemoBox>

    <DemoBox
      name="Link"
      title="Link 链接"
      description="类型、下划线、禁用与外链。"
      :source="LinkSrc"
      path="src/demo/basic/LinkDemo.vue"
    >
      <LinkDemo />
    </DemoBox>

    <DemoBox
      name="Space"
      title="Space 间距"
      description="水平与垂直间距排布。"
      :source="SpaceSrc"
      path="src/demo/basic/SpaceDemo.vue"
    >
      <SpaceDemo />
    </DemoBox>

    <DemoBox
      name="Divider"
      title="Divider 分割线"
      description="水平、垂直与带文字分割。"
      :source="DividerSrc"
      path="src/demo/basic/DividerDemo.vue"
    >
      <DividerDemo />
    </DemoBox>

    <DemoBox
      name="Scrollbar"
      title="Scrollbar 滚动条"
      description="自定义滚动条容器。"
      :source="ScrollbarSrc"
      path="src/demo/basic/ScrollbarDemo.vue"
    >
      <ScrollbarDemo />
    </DemoBox>
  </div>
</template>
