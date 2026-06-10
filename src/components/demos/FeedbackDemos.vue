<script setup lang="ts">
import DemoBox from './DemoBox.vue'
import AlertDemo from '../../demo/feedback/AlertDemo.vue'
import AlertSrc from '../../demo/feedback/AlertDemo.vue?raw'
import TooltipDemo from '../../demo/feedback/TooltipDemo.vue'
import TooltipSrc from '../../demo/feedback/TooltipDemo.vue?raw'
import PopoverDemo from '../../demo/feedback/PopoverDemo.vue'
import PopoverSrc from '../../demo/feedback/PopoverDemo.vue?raw'
import PopconfirmDemo from '../../demo/feedback/PopconfirmDemo.vue'
import PopconfirmSrc from '../../demo/feedback/PopconfirmDemo.vue?raw'
import DialogDemo from '../../demo/feedback/DialogDemo.vue'
import DialogSrc from '../../demo/feedback/DialogDemo.vue?raw'
import DrawerDemo from '../../demo/feedback/DrawerDemo.vue'
import DrawerSrc from '../../demo/feedback/DrawerDemo.vue?raw'
import MessageDemo from '../../demo/feedback/MessageDemo.vue'
import MessageSrc from '../../demo/feedback/MessageDemo.vue?raw'
import MessageBoxDemo from '../../demo/feedback/MessageBoxDemo.vue'
import MessageBoxSrc from '../../demo/feedback/MessageBoxDemo.vue?raw'
import NotificationDemo from '../../demo/feedback/NotificationDemo.vue'
import NotificationSrc from '../../demo/feedback/NotificationDemo.vue?raw'
import LoadingDemo from '../../demo/feedback/LoadingDemo.vue'
import LoadingSrc from '../../demo/feedback/LoadingDemo.vue?raw'
import ResultDemo from '../../demo/feedback/ResultDemo.vue'
import ResultSrc from '../../demo/feedback/ResultDemo.vue?raw'
import TourDemo from '../../demo/feedback/TourDemo.vue'
import TourSrc from '../../demo/feedback/TourDemo.vue?raw'
</script>

<template>
  <div class="demo-group">
    <DemoBox
      name="Alert" title="Alert 提示" title-en="Alert"
      description="四种语义类型。" description-en="Four semantic types."
      :source="AlertSrc" path="src/demo/feedback/AlertDemo.vue"
    >
      <AlertDemo />
    </DemoBox>

    <DemoBox
      name="Tooltip" title="Tooltip 文字提示" title-en="Tooltip"
      description="悬停展示。" description-en="Show on hover."
      :source="TooltipSrc" path="src/demo/feedback/TooltipDemo.vue"
    >
      <TooltipDemo />
    </DemoBox>

    <DemoBox
      name="Popover" title="Popover 弹出框" title-en="Popover"
      description="承载更多内容。" description-en="More content in popper."
      :source="PopoverSrc" path="src/demo/feedback/PopoverDemo.vue"
    >
      <PopoverDemo />
    </DemoBox>

    <DemoBox
      name="Popconfirm" title="Popconfirm 气泡确认框" title-en="Popconfirm"
      description="二次确认。" description-en="Inline confirmation."
      :source="PopconfirmSrc" path="src/demo/feedback/PopconfirmDemo.vue"
    >
      <PopconfirmDemo />
    </DemoBox>

    <DemoBox
      name="Dialog" title="Dialog 对话框" title-en="Dialog"
      description="模态弹窗。" description-en="Modal dialog."
      :source="DialogSrc" path="src/demo/feedback/DialogDemo.vue"
    >
      <DialogDemo />
    </DemoBox>

    <DemoBox
      name="Drawer" title="Drawer 抽屉" title-en="Drawer"
      description="侧滑面板。" description-en="Slide-in panel."
      :source="DrawerSrc" path="src/demo/feedback/DrawerDemo.vue"
    >
      <DrawerDemo />
    </DemoBox>

    <DemoBox
      name="Message" title="Message 消息提示" title-en="Message"
      description="顶部轻量反馈。" description-en="Top lightweight feedback."
      :source="MessageSrc" path="src/demo/feedback/MessageDemo.vue"
    >
      <MessageDemo />
    </DemoBox>

    <DemoBox
      name="MessageBox" title="MessageBox 消息弹出框" title-en="MessageBox"
      description="confirm 与 prompt。" description-en="confirm & prompt."
      :source="MessageBoxSrc" path="src/demo/feedback/MessageBoxDemo.vue"
    >
      <MessageBoxDemo />
    </DemoBox>

    <DemoBox
      name="Notification" title="Notification 通知" title-en="Notification"
      description="4 角通知，支持类型、自动关闭、可关闭按钮。"
      description-en="Notification at 4 corners, with auto-close and close button."
      :source="NotificationSrc" path="src/demo/feedback/NotificationDemo.vue"
    >
      <NotificationDemo />
    </DemoBox>

    <DemoBox
      name="Loading" title="Loading 加载" title-en="Loading"
      description="全屏加载服务。" description-en="Fullscreen loading service."
      :source="LoadingSrc" path="src/demo/feedback/LoadingDemo.vue"
    >
      <LoadingDemo />
    </DemoBox>

    <DemoBox
      name="Result" title="Result 结果" title-en="Result"
      description="操作结果反馈。" description-en="Action result feedback."
      :source="ResultSrc" path="src/demo/feedback/ResultDemo.vue"
    >
      <ResultDemo />
    </DemoBox>

    <DemoBox
      name="Tour" title="Tour 漫游引导" title-en="Tour"
      description="分步功能引导。" description-en="Step-by-step guide."
      :source="TourSrc" path="src/demo/feedback/TourDemo.vue"
    >
      <TourDemo />
    </DemoBox>
  </div>
</template>
