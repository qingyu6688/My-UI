<script setup lang="ts">
import { reactive, ref } from 'vue'
import DemoBlock from './DemoBlock.vue'
import { Message, MessageBox, MyLoading } from '../../../packages/my-ui'

const state = reactive({
  dialog: false,
  drawer: false,
  tour: false,
})

const tourBtn1 = ref<HTMLElement>()
const tourBtn2 = ref<HTMLElement>()

const tourSteps = [
  { target: '#tour-step-1', title: '第一步', description: '这是引导的第一步说明。' },
  { target: '#tour-step-2', title: '第二步', description: '这是引导的第二步说明。' },
]

function showMessage(type: 'success' | 'warning' | 'danger' | 'info'): void {
  Message[type](`这是一条${type}消息`)
}

function openConfirm(): void {
  MessageBox.confirm('确定删除这条数据吗？', '提示').then(
    () => Message.success('已确认'),
    () => Message.info('已取消'),
  )
}

function openPrompt(): void {
  MessageBox.prompt('请输入新的名称', '重命名').then((res) => {
    Message.success(`输入：${res.value}`)
  }, () => undefined)
}

function showLoading(): void {
  const instance = MyLoading({ fullscreen: true, text: '加载中...' })
  setTimeout(() => instance.close(), 1500)
}
</script>

<template>
  <div class="demo-group">
    <DemoBlock name="Alert" title="Alert 提示" description="四种语义类型。">
      <my-space direction="vertical" style="width: 100%;">
        <my-alert type="success" title="操作成功" show-icon />
        <my-alert type="warning" title="请注意" show-icon />
        <my-alert type="danger" title="出错了" description="附带描述信息。" show-icon />
        <my-alert type="info" title="提示信息" show-icon />
      </my-space>
    </DemoBlock>

    <DemoBlock name="Tooltip" title="Tooltip 文字提示" description="悬停展示。">
      <my-space>
        <my-tooltip content="顶部提示" placement="top"><my-button>上</my-button></my-tooltip>
        <my-tooltip content="底部提示" placement="bottom"><my-button>下</my-button></my-tooltip>
        <my-tooltip content="点击触发" trigger="click"><my-button>点击</my-button></my-tooltip>
      </my-space>
    </DemoBlock>

    <DemoBlock name="Popover" title="Popover 弹出框" description="承载更多内容。">
      <my-popover title="用户信息" content="这里是弹出的详细内容。" trigger="click">
        <my-button>查看详情</my-button>
      </my-popover>
    </DemoBlock>

    <DemoBlock name="Popconfirm" title="Popconfirm 气泡确认框" description="二次确认。">
      <my-popconfirm title="确定删除吗？" @confirm="showMessage('success')">
        <my-button type="danger">删除</my-button>
      </my-popconfirm>
    </DemoBlock>

    <DemoBlock name="Dialog" title="Dialog 对话框" description="模态弹窗。">
      <my-button type="primary" @click="state.dialog = true">打开对话框</my-button>
      <my-dialog v-model="state.dialog" title="对话框标题" width="420px">
        <p>这是对话框内容，支持遮罩、ESC 关闭与异步确认。</p>
        <template #footer>
          <my-button @click="state.dialog = false">取消</my-button>
          <my-button type="primary" @click="state.dialog = false">确定</my-button>
        </template>
      </my-dialog>
    </DemoBlock>

    <DemoBlock name="Drawer" title="Drawer 抽屉" description="侧滑面板。">
      <my-button type="primary" @click="state.drawer = true">打开抽屉</my-button>
      <my-drawer v-model="state.drawer" title="抽屉标题" size="320px">
        <p>抽屉内容区域，适合承载较多表单或详情。</p>
      </my-drawer>
    </DemoBlock>

    <DemoBlock name="Message" title="Message 消息提示" description="顶部轻量反馈。">
      <my-space wrap>
        <my-button @click="showMessage('success')">成功</my-button>
        <my-button @click="showMessage('warning')">警告</my-button>
        <my-button @click="showMessage('danger')">错误</my-button>
        <my-button @click="showMessage('info')">信息</my-button>
      </my-space>
    </DemoBlock>

    <DemoBlock name="MessageBox" title="MessageBox 消息弹出框" description="confirm 与 prompt。">
      <my-space>
        <my-button @click="openConfirm">确认框</my-button>
        <my-button @click="openPrompt">输入框</my-button>
      </my-space>
    </DemoBlock>

    <DemoBlock name="Loading" title="Loading 加载" description="全屏加载服务。">
      <my-button type="primary" @click="showLoading">显示加载 1.5s</my-button>
    </DemoBlock>

    <DemoBlock name="Result" title="Result 结果" description="操作结果反馈。">
      <my-result status="success" title="提交成功" sub-title="订单号 20260607，预计今天发货。">
        <template #extra>
          <my-button type="primary">返回首页</my-button>
        </template>
      </my-result>
    </DemoBlock>

    <DemoBlock name="Tour" title="Tour 漫游引导" description="分步功能引导。">
      <my-space>
        <my-button id="tour-step-1" ref="tourBtn1">功能一</my-button>
        <my-button id="tour-step-2" ref="tourBtn2">功能二</my-button>
        <my-button type="primary" @click="state.tour = true">开始引导</my-button>
      </my-space>
      <my-tour v-model="state.tour" :steps="tourSteps" />
    </DemoBlock>
  </div>
</template>
