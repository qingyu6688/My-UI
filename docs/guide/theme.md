# 主题定制

My UI 的主题能力基于 CSS Variables。默认主题会在插件安装时写入根节点，业务项目也可以在运行时调用主题 API 修改颜色。

## 默认主题

| Token | 默认值 | 说明 |
| --- | --- | --- |
| `primary` | `#a8d5ba` | 主色，用于主按钮、焦点态和选中态 |
| `secondary` | `#d7e8bd` | 辅助色，用于轻量背景和辅助提示 |
| `accent` | `#fff3c7` | 强调色，用于温和提示和弱警告 |

## 运行时应用主题

```ts
import { applyTheme, createTheme } from '@qingyu6688/my-ui'

applyTheme(
  createTheme({
    primary: '#7fc7c2',
    secondary: '#c8e6df',
    accent: '#f6d78b',
  }),
)
```

## 在组件中使用主题

```ts
import { useTheme } from '@qingyu6688/my-ui'

const { theme, setTheme, resetTheme } = useTheme()

setTheme({
  primary: '#a8d5ba',
  secondary: '#d7e8bd',
  accent: '#fff3c7',
})
```

## CSS 变量

```css
:root {
  --my-color-primary: #a8d5ba;
  --my-color-secondary: #d7e8bd;
  --my-color-accent: #fff3c7;
  --my-radius-base: 6px;
  --my-transition-duration: 0.2s;
}
```

主题编辑器见 [主题编辑器](/theme/)。

