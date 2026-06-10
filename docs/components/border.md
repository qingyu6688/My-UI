# Border 边框

整理 My UI 内部使用的边框色、圆角和阴影 token，方便业务在自定义组件时复用同一套视觉语言。

## 边框色

| Token | 用途 |
| --- | --- |
| `--my-border-color` | 默认边框，例如卡片、输入框、表格分割线 |
| `--my-border-color-light` | 浅色边框，例如面板内分隔 |
| `--my-fill-color-light` | 浅填充背景，例如禁用态、辅助容器 |

## 圆角

| Token | 默认值 | 用途 |
| --- | --- | --- |
| `--my-radius-small` | `4px` | 小元素，例如标签、徽章 |
| `--my-radius-base` | `6px` | 常规元素，例如按钮、输入框、卡片 |
| `--my-radius-round` | `999px` | 胶囊型元素，例如圆形按钮、Avatar |

## 阴影

| Token | 用途 |
| --- | --- |
| `--my-shadow-light` | 轻量阴影，用于 Card、弹层、悬浮卡片 |

## 使用示例

```css
.my-custom-card {
  border: 1px solid var(--my-border-color);
  border-radius: var(--my-radius-base);
  box-shadow: var(--my-shadow-light);
  background: var(--my-bg-color);
}
```

## 相关文档

- [Color 色彩](/components/color)
- [主题定制](/guide/theme)
