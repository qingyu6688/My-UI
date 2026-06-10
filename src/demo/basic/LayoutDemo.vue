<template>
  <div class="layout-demo">
    <my-row :gutter="12">
      <my-col :span="8">
        <div class="layout-demo__cell">8</div>
      </my-col>
      <my-col :span="8">
        <div class="layout-demo__cell is-soft">8</div>
      </my-col>
      <my-col :span="8">
        <div class="layout-demo__cell">8</div>
      </my-col>
    </my-row>
    <my-row :gutter="12" justify="center">
      <my-col :span="6">
        <div class="layout-demo__cell is-soft">6</div>
      </my-col>
      <my-col :span="6">
        <div class="layout-demo__cell">6</div>
      </my-col>
    </my-row>
  </div>
</template>

<style scoped>
.layout-demo {
  display: grid;
  gap: 12px;
}

.layout-demo__cell {
  min-height: 42px;
  border-radius: 6px;
  background: var(--my-color-primary);
  color: #20332a;
  font-weight: 700;
  line-height: 42px;
  text-align: center;
}

.layout-demo__cell.is-soft {
  background: var(--my-color-primary-light-7);
}
</style>
