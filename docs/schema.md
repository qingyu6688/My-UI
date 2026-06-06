# 数据库 Schema

组件库本体不依赖数据库，当前版本不需要创建业务表。

如果后续建设主题市场或团队主题共享，可以新增以下表：

## `theme_presets`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | `BIGINT` | 主键 |
| `name` | `VARCHAR(100)` | 主题名称 |
| `primary_color` | `VARCHAR(20)` | 主色 |
| `secondary_color` | `VARCHAR(20)` | 辅助色 |
| `accent_color` | `VARCHAR(20)` | 强调色 |
| `created_at` | `DATETIME` | 创建时间 |
| `updated_at` | `DATETIME` | 更新时间 |

