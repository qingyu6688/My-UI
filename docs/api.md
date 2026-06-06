# API 文档

## 包入口

```ts
import MyUI, { MyButton, createTheme, useTheme } from '@qingyu6688/my-ui'
import '@qingyu6688/my-ui/theme-chalk/index.css'
```

## MyButton

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | 按钮类型 |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | 按钮尺寸 |
| `nativeType` | `'button' \| 'submit' \| 'reset'` | `'button'` | 原生按钮类型 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `loading` | `boolean` | `false` | 是否加载中 |
| `plain` | `boolean` | `false` | 是否朴素按钮 |
| `round` | `boolean` | `false` | 是否圆角按钮 |
| `text` | `boolean` | `false` | 是否文本按钮 |

### Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `click` | `MouseEvent` | 点击按钮时触发，禁用和加载中不会触发 |

### Slots

| 插槽 | 说明 |
| --- | --- |
| `default` | 按钮内容 |
| `icon` | 按钮图标 |

## 主题 API

| 方法 | 说明 |
| --- | --- |
| `createTheme(options)` | 根据主色、辅助色、强调色创建主题 |
| `applyTheme(theme, target?)` | 将主题写入 CSS Variables |
| `useTheme()` | 在 Vue 组件中读取和修改当前主题 |
| `resetTheme()` | 恢复默认鼠尾草浅黄主题 |
| `exportTheme()` | 导出当前主题 JSON |
| `importTheme(themeJson)` | 导入并应用主题 JSON |

