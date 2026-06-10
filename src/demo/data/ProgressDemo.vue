<template>
  <div style="max-width: 320px;">
    <my-progress :percentage="40" />
    <my-progress :percentage="70" status="success" style="margin-top: 8px;" />
  </div>
  <my-space style="margin-top: 12px;">
    <my-progress type="circle" :percentage="65" />
    <my-progress type="circle" :percentage="100" status="success" />
  </my-space>
</template>
