import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My UI',
  description: '鼠尾草浅黄主题的 Vue 3 组件库',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/quick-start' },
      { text: '组件', link: '/components/button' },
      { text: '需求文档', link: '/requirements' },
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/guide/quick-start' },
          { text: '主题定制', link: '/guide/theme' },
        ],
      },
      {
        text: '组件',
        items: [{ text: 'Button 按钮', link: '/components/button' }],
      },
      {
        text: '项目文档',
        items: [
          { text: '需求文档', link: '/requirements' },
          { text: 'API 文档', link: '/api' },
          { text: '数据库 Schema', link: '/schema' },
          { text: '部署说明', link: '/deploy' },
          { text: '更新日志', link: '/changelog' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/qingyu6688/My-UI' }],
  },
})

