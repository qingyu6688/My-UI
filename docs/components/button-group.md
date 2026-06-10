# ButtonGroup 按钮组

将一组语义相关的按钮组合在一起，统一控制类型和尺寸，并消除相邻按钮之间的圆角与边框重叠。

## 基础用法

```vue
<template>
  <my-button-group>
    <my-button>左</my-button>
    <my-button>中</my-button>
    <my-button>右</my-button>
  </my-button-group>
</template>
```

## 统一类型

通过 `type` 给组内所有按钮设置同一类型，子按钮的 `type` 可以覆盖。

```vue
<template>
  <my-button-group type="primary">
    <my-button>保存</my-button>
    <my-button>保存并新建</my-button>
    <my-button type="danger">删除</my-button>
  </my-button-group>
</template>
```

## 统一尺寸

```vue
<template>
  <my-button-group size="large">
    <my-button>A</my-button>
    <my-button>B</my-button>
    <my-button>C</my-button>
  </my-button-group>
</template>
```

## 垂直方向

```vue
<template>
  <my-button-group direction="vertical">
    <my-button>顶部</my-button>
    <my-button>中部</my-button>
    <my-button>底部</my-button>
  </my-button-group>
</template>
```

## 引入方式

```ts
import { MyButtonGroup, MyButton } from '@qingyu6688/my-ui'
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | — | 组内按钮统一类型，可被单个按钮的 `type` 覆盖 |
| `size` | `'small' \| 'default' \| 'large'` | — | 组内按钮统一尺寸，未传时跟随 `ConfigProvider` |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列方向 |

### Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 一组 `MyButton`，按声明顺序水平或垂直排列 |

## 设计说明

- 分类：基础组件。
- 通过 `provide` / `inject` 向子按钮注入 group 上下文，子按钮无需重复声明 `type` 和 `size`。
- 与单独的 `<MyButton>` 相邻时不会自动归组，请显式包裹在 `<MyButtonGroup>` 中。
