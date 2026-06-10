# Notification 通知

以非阻塞方式提示用户信息，支持四个角的位置、四种语义类型和自定义时长。

## 基础用法

```vue
<script setup lang="ts">
import { Notification } from '@qingyu6688/my-ui'

function openInfo() {
  Notification({ title: '提示', message: '这是一条通知消息' })
}

function openSuccess() {
  Notification.success({ title: '保存成功', message: '数据已写入服务端' })
}
</script>

<template>
  <my-button @click="openInfo">默认通知</my-button>
  <my-button type="success" @click="openSuccess">成功通知</my-button>
</template>
```

## 引入方式

```ts
import { Notification } from '@qingyu6688/my-ui'
```

全量安装时也可通过 `app.config.globalProperties.$notification` 调用。

## API

### 调用方式

```ts
Notification(options: NotificationParams): NotificationHandle
Notification.success(options): NotificationHandle
Notification.warning(options): NotificationHandle
Notification.danger(options): NotificationHandle
Notification.info(options): NotificationHandle
Notification.closeAll(): void
```

参数 `options` 可以是 `string`（直接当作 `message`），也可以是完整对象。

### Options

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | `''` | 通知标题 |
| `message` | `string` | — | 通知内容（必填） |
| `type` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | 语义类型 |
| `duration` | `number` | `4500` | 自动关闭时间，单位毫秒；传 `0` 不自动关闭 |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | 弹出位置 |
| `showClose` | `boolean` | `true` | 是否显示关闭按钮 |
| `onClose` | `() => void` | — | 关闭时回调 |
| `onClick` | `() => void` | — | 点击主体时回调 |

### Handle

调用后会返回一个 `{ close: () => void }`，可以手动关闭对应实例。

## 设计说明

- 分类：反馈组件。
- 服务式 API，不需要在模板中预先挂载组件。
- 同位置可以堆叠多条通知，关闭后自动收起。
