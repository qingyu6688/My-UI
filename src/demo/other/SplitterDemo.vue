<template>
  <div
    style="
      height: 160px;
      border: 1px solid var(--my-border-color-light);
      border-radius: 8px;
      overflow: hidden;
    "
  >
    <my-splitter :initial="40">
      <template #start>
        <div style="padding: 12px;">左侧面板</div>
      </template>
      <template #end>
        <div style="padding: 12px;">右侧面板</div>
      </template>
    </my-splitter>
  </div>
</template>
