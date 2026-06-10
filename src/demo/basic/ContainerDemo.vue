<template>
  <my-container class="container-demo">
    <my-header class="container-demo__block">Header</my-header>
    <my-container>
      <my-aside class="container-demo__aside" width="120px">Aside</my-aside>
      <my-main class="container-demo__main">Main</my-main>
    </my-container>
    <my-footer class="container-demo__block">Footer</my-footer>
  </my-container>
</template>

<style scoped>
.container-demo {
  overflow: hidden;
  max-width: 520px;
  border: 1px solid var(--my-border-color-light);
  border-radius: 8px;
}

.container-demo__block,
.container-demo__aside,
.container-demo__main {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  color: #20332a;
  font-weight: 700;
}

.container-demo__block {
  background: var(--my-color-primary-light-7);
}

.container-demo__aside {
  background: var(--my-color-secondary-light-5);
}

.container-demo__main {
  min-height: 96px;
  background: var(--my-fill-color-light);
}
</style>
