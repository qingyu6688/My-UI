# 数据库 Schema

My UI 当前是前端组件库和文档站项目，本体不依赖数据库，也没有运行时后端服务。项目规范默认数据库为 MySQL，后续如果建设主题市场、团队主题共享或用户收藏功能，再新增数据库表和迁移文件。

## 当前状态

| 模块 | 是否需要数据库 | 说明 |
| --- | --- | --- |
| 组件库运行时 | 否 | 通过 Vue 插件、组件和 CSS Variables 工作 |
| 文档站 | 否 | VitePress 静态站点 |
| 主题编辑器 | 否 | 当前使用浏览器本地状态和运行时变量 |

## 未来可选表设计

### `theme_presets`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | `BIGINT UNSIGNED` | 主键 |
| `name` | `VARCHAR(100)` | 主题名称 |
| `description` | `VARCHAR(255)` | 主题说明 |
| `primary_color` | `VARCHAR(20)` | 主色 |
| `secondary_color` | `VARCHAR(20)` | 辅助色 |
| `accent_color` | `VARCHAR(20)` | 强调色 |
| `created_at` | `DATETIME` | 创建时间 |
| `updated_at` | `DATETIME` | 更新时间 |

### `theme_versions`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | `BIGINT UNSIGNED` | 主键 |
| `theme_id` | `BIGINT UNSIGNED` | 主题 ID |
| `version` | `VARCHAR(32)` | 版本号 |
| `tokens_json` | `JSON` | 完整主题 Token |
| `created_at` | `DATETIME` | 创建时间 |

### `theme_favorites`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | `BIGINT UNSIGNED` | 主键 |
| `user_id` | `BIGINT UNSIGNED` | 用户 ID |
| `theme_id` | `BIGINT UNSIGNED` | 主题 ID |
| `created_at` | `DATETIME` | 收藏时间 |

## 迁移约定

- 只新增迁移文件，不修改历史迁移。
- 数据库连接信息写入 `.env`，不得提交到 Git。
- 生产环境密码由部署环境注入，不写入代码或文档示例之外的配置文件。

