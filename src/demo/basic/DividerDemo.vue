<template>
  <div>
    <p>第一段内容，分割线用于切分不同信息区块。</p>
    <my-divider />
    <p>第二段内容。</p>
    <my-divider content-position="left">左侧文字</my-divider>
    <p>带文字的分割线。</p>
    <my-divider content-position="center">居中文字</my-divider>
    <div style="display: flex; align-items: center;">
      <span>编辑</span>
      <my-divider direction="vertical" />
      <span>删除</span>
      <my-divider direction="vertical" />
      <span>详情</span>
    </div>
  </div>
</template>
