<script setup lang="ts">
import { computed } from 'vue'
import {
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  FolderTree,
  PackageCheck,
  Palette,
  PlayCircle,
  Rocket,
  TerminalSquare,
} from 'lucide-vue-next'
import { useSiteLocale } from '../composables/use-site-locale'

interface GuideLink {
  id: string
  label: string
}

interface GuideStat {
  label: string
  value: string
}

interface GuideStep {
  title: string
  description: string
}

interface GuideCommand {
  title: string
  description: string
  command: string
}

interface GuideChecklistItem {
  title: string
  description: string
}

interface GuidePathItem {
  path: string
  description: string
}

const { text } = useSiteLocale()

const guideLinks = computed<GuideLink[]>(() => [
  { id: 'overview', label: text('接入概览', 'Overview') },
  { id: 'install-project', label: text('安装项目', 'Install Project') },
  { id: 'run-project', label: text('运行与打包', 'Run And Build') },
  { id: 'use-library', label: text('业务项目使用', 'Use Library') },
  { id: 'theme', label: text('主题配置', 'Theme') },
  { id: 'develop', label: text('目录说明', 'Structure') },
  { id: 'deploy', label: text('上线检查', 'Deploy') },
])

const heroStats = computed<GuideStat[]>(() => [
  { label: text('运行环境', 'Runtime'), value: 'Node >= 18' },
  { label: text('安装命令', 'Install'), value: 'npm install' },
  { label: text('预览入口', 'Preview'), value: 'npm run dev' },
  { label: text('部署目录', 'Deploy'), value: 'dist' },
])

const accessSteps = computed<GuideStep[]>(() => [
  {
    title: text('检查环境', 'Check environment'),
    description: text('确认 Node、npm、Git 可用，建议使用 Node 18 及以上版本。', 'Ensure Node, npm and Git are available. Node 18 or newer is recommended.'),
  },
  {
    title: text('克隆并安装', 'Clone and install'),
    description: text('从 GitHub 拉取仓库，进入 My-UI 目录后执行 npm install。', 'Clone the repository, enter My-UI and run npm install.'),
  },
  {
    title: text('启动预览站', 'Start preview'),
    description: text('执行 npm run dev，查看首页、指南、组件、主题、路线和演练场。', 'Run npm run dev to preview home, guide, components, theme, roadmap and playground.'),
  },
  {
    title: text('构建产物', 'Build outputs'),
    description: text('npm run build 构建组件库，Vite build 生成服务器使用的 dist。', 'npm run build creates library output, and Vite build creates deployable dist.'),
  },
])

const projectCommands = computed<GuideCommand[]>(() => [
  {
    title: text('环境检查', 'Check tools'),
    description: text('第一次接手项目时先确认本机工具链。', 'Check the local toolchain when taking over the project.'),
    command: 'node -v\nnpm -v\ngit --version',
  },
  {
    title: text('克隆仓库', 'Clone repository'),
    description: text('把当前项目下载到本地，并进入项目目录。', 'Download this project and enter the workspace folder.'),
    command: 'git clone https://github.com/qingyu6688/My-UI.git\ncd My-UI',
  },
  {
    title: text('安装依赖', 'Install dependencies'),
    description: text('安装根工作区依赖，组件包、预览站和文档站共用这套依赖。', 'Install root workspace dependencies shared by packages, preview and docs.'),
    command: 'npm install',
  },
])

const runCommands = computed<GuideCommand[]>(() => [
  {
    title: text('启动本地预览站', 'Start preview site'),
    description: text('用于查看 src 下的首页、指南、组件、演练场、主题和路线页面。', 'Preview home, guide, components, playground, theme and roadmap under src.'),
    command: 'npm run dev',
  },
  {
    title: text('启动 VitePress 文档站', 'Start VitePress docs'),
    description: text('用于维护 docs 下的组件文档、API、部署说明和更新日志。', 'Maintain component docs, API, deploy notes and changelog under docs.'),
    command: 'npm run docs:dev',
  },
  {
    title: text('构建组件库产物', 'Build library output'),
    description: text('输出到 packages/my-ui/dist，用于后续发布组件库。', 'Output to packages/my-ui/dist for library publishing.'),
    command: 'npm run build',
  },
  {
    title: text('构建服务器静态包', 'Build static site'),
    description: text('输出到根目录 dist，可直接上传到 Nginx 静态站点目录。', 'Output to root dist, ready for Nginx static deployment.'),
    command: 'npx vite build --outDir dist --emptyOutDir',
  },
])

const installLibraryCode = computed(
  () => `npm install @qingyu6688/my-ui`,
)

const fullImportCode = computed(
  () => `import { createApp } from 'vue'
import MyUI from '@qingyu6688/my-ui/full'
import App from './App.vue'

createApp(App).use(MyUI).mount('#app')`,
)

const partialImportCode = computed(
  () => `import '@qingyu6688/my-ui/theme-chalk/index.css'
import { MyButton, MyInput, Message } from '@qingyu6688/my-ui'

Message.success('保存成功')`,
)

const themeCode = computed(
  () => `import { applyTheme, createTheme } from '@qingyu6688/my-ui'

applyTheme(createTheme({
  primary: '#a8d5ba',
  secondary: '#d7e8bd',
  accent: '#fff3c7',
}))`,
)

const configCode = computed(
  () => `<my-config-provider namespace="my" size="large">
  <my-button type="primary">保存</my-button>
  <my-input placeholder="跟随全局尺寸" />
</my-config-provider>`,
)

const pathItems = computed<GuidePathItem[]>(() => [
  { path: 'package.json', description: text('根工作区命令、依赖和版本号。', 'Root workspace scripts, dependencies and version.') },
  { path: 'packages/components', description: text('组件源码、props、事件和测试。', 'Component source, props, events and tests.') },
  { path: 'packages/theme-chalk', description: text('SCSS 样式入口、组件样式和主题变量。', 'SCSS entry, component styles and theme variables.') },
  { path: 'packages/my-ui', description: text('发布包入口、类型声明、产物目录和 npm 元信息。', 'Package entry, types, output directory and npm metadata.') },
  { path: 'src/pages', description: text('本地预览站页面，首页、指南、组件、主题、路线都在这里。', 'Preview site pages: home, guide, components, theme and roadmap.') },
  { path: 'src/demo', description: text('组件演示源码，组件页和演练场会消费这些示例。', 'Demo source consumed by component page and playground.') },
  { path: 'docs', description: text('VitePress 文档、部署说明、需求文档和更新日志。', 'VitePress docs, deploy notes, requirements and changelog.') },
])

const deployChecklist = computed<GuideChecklistItem[]>(() => [
  {
    title: 'npm run typecheck',
    description: text('确认页面、组件和导出类型没有错误。', 'Ensure pages, components and exported types are valid.'),
  },
  {
    title: 'npm run lint',
    description: text('保持代码风格和 Vue 规则一致。', 'Keep code style and Vue rules consistent.'),
  },
  {
    title: 'npm test',
    description: text('运行组件、工具函数和组合式函数测试。', 'Run component, utility and composable tests.'),
  },
  {
    title: 'npm run build',
    description: text('构建组件库产物，输出到 packages/my-ui/dist。', 'Build library output into packages/my-ui/dist.'),
  },
  {
    title: 'npx vite build --outDir dist --emptyOutDir',
    description: text('构建可部署的静态站点 dist。', 'Build deployable static site output into dist.'),
  },
])

const copy = computed(() => ({
  eyebrow: text('Guide', 'Guide'),
  title: text('安装并运行 My UI 项目', 'Install And Run My UI'),
  desc: text(
    '这页按真实接手项目的顺序写：准备环境、克隆仓库、安装依赖、启动预览站、构建组件库和生成服务器 dist。',
    'This page follows the real takeover flow: prepare tools, clone, install dependencies, start preview, build the library and generate server dist.',
  ),
  primaryAction: text('安装这个项目', 'Install This Project'),
  secondaryAction: text('业务项目使用组件库', 'Use In Business App'),
  overviewTitle: text('先分清两个安装场景', 'Two Install Scenarios'),
  overviewDesc: text(
    '开发 My UI 本身，需要克隆仓库并安装工作区依赖；在业务项目里使用 My UI，则安装发布包并在入口文件注册组件库。',
    'Developing My UI means cloning this repository and installing workspace dependencies; using My UI in a business app means installing the package and registering it in the app entry.',
  ),
  installTitle: text('安装这个项目', 'Install This Project'),
  installDesc: text('适合你要继续开发组件、改页面、维护文档或打包上传服务器的场景。', 'Use this path when developing components, pages, docs or building files for server deployment.'),
  runTitle: text('运行与打包', 'Run And Build'),
  runDesc: text('本项目有两类构建：组件库构建给 npm 包使用，静态站点构建给服务器部署使用。', 'This project has two build outputs: library output for npm packages and static output for server deployment.'),
  useTitle: text('在业务项目中安装组件库', 'Install The Library In A Business App'),
  useDesc: text('如果你只是想在另一个 Vue 3 项目里使用 My UI，按下面方式安装发布包。', 'If you only want to use My UI in another Vue 3 project, install the published package like this.'),
  fullImport: text('全量引入', 'Full Import'),
  partialImport: text('按需导入', 'Partial Import'),
  globalConfig: text('全局配置', 'Global Config'),
  themeTitle: text('主题配置', 'Theme Setup'),
  themeDesc: text('默认主题已经内置。需要替换品牌色时，只维护 primary、secondary、accent 三个入口色。', 'The default theme is built in. To replace brand colors, maintain only primary, secondary and accent colors.'),
  themeAlertTitle: text('默认鼠尾草浅黄主题', 'Default Sage Theme'),
  themeAlertDesc: text('主色 #a8d5ba，辅助色 #d7e8bd，强调色 #fff3c7。主题会写入 CSS Variables，并立即影响组件状态。', 'Primary #a8d5ba, secondary #d7e8bd and accent #fff3c7. Theme variables are written as CSS Variables and affect components immediately.'),
  playgroundTitle: text('用演练场快速试组件', 'Try Components In Playground'),
  playgroundDesc: text('演练场适合验证组件组合、主题变量和示例代码。修改左侧 App.vue 后，右侧会即时预览组件效果。', 'The playground is useful for validating component composition, theme variables and examples. Edit App.vue on the left and preview on the right.'),
  playgroundButton: text('打开演练场', 'Open Playground'),
  developTitle: text('目录说明', 'Project Structure'),
  developDesc: text('项目按组件库、样式包、预览站和文档站分层维护，定位问题时先看目录边界。', 'The project is split into library, theme package, preview site and docs. Use the folder boundaries when locating work.'),
  deployTitle: text('上线前检查', 'Pre-release Checklist'),
  deployDesc: text('提交或部署前跑完检查命令，确认类型、规范、测试、库产物和静态站点都能通过。', 'Run checks before committing or deploying to verify types, lint, tests, library output and static site output.'),
}))
</script>

<template>
  <main class="page-shell guide-page">
    <aside class="guide-sidebar" :aria-label="copy.title">
      <p>{{ copy.eyebrow }}</p>
      <a
        v-for="link in guideLinks"
        :key="link.id"
        :href="`#${link.id}`"
      >
        {{ link.label }}
      </a>
    </aside>

    <article class="guide-content">
      <section id="overview" class="guide-hero">
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h1>{{ copy.title }}</h1>
        <p>{{ copy.desc }}</p>
        <div class="guide-hero__actions">
          <a class="guide-link guide-link--primary" href="#install-project">{{ copy.primaryAction }}</a>
          <a class="guide-link" href="#use-library">{{ copy.secondaryAction }}</a>
        </div>
        <dl class="guide-stats">
          <div v-for="item in heroStats" :key="item.label">
            <dt>{{ item.label }}</dt>
            <dd>{{ item.value }}</dd>
          </div>
        </dl>
      </section>

      <section class="guide-section guide-section--plain">
        <div class="guide-section__head">
          <Rocket />
          <div>
            <h2>{{ copy.overviewTitle }}</h2>
            <p>{{ copy.overviewDesc }}</p>
          </div>
        </div>
        <my-steps :active="2" class="guide-steps">
          <my-step
            v-for="step in accessSteps"
            :key="step.title"
            :title="step.title"
            :description="step.description"
          />
        </my-steps>
      </section>

      <section id="install-project" class="guide-section">
        <div class="guide-section__head">
          <PackageCheck />
          <div>
            <h2>{{ copy.installTitle }}</h2>
            <p>{{ copy.installDesc }}</p>
          </div>
        </div>

        <div class="guide-command-list">
          <div v-for="item in projectCommands" :key="item.title" class="guide-command">
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
            <pre><code>{{ item.command }}</code></pre>
          </div>
        </div>
      </section>

      <section id="run-project" class="guide-section">
        <div class="guide-section__head">
          <TerminalSquare />
          <div>
            <h2>{{ copy.runTitle }}</h2>
            <p>{{ copy.runDesc }}</p>
          </div>
        </div>

        <div class="guide-run-grid">
          <div v-for="item in runCommands" :key="item.title" class="guide-run-card">
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
            <pre><code>{{ item.command }}</code></pre>
          </div>
        </div>
      </section>

      <section id="use-library" class="guide-section">
        <div class="guide-section__head">
          <BookOpen />
          <div>
            <h2>{{ copy.useTitle }}</h2>
            <p>{{ copy.useDesc }}</p>
          </div>
        </div>

        <div class="guide-code-panel">
          <span>install</span>
          <pre><code>{{ installLibraryCode }}</code></pre>
        </div>

        <div class="guide-code-grid">
          <div class="guide-code-panel">
            <span>{{ copy.fullImport }}</span>
            <pre><code>{{ fullImportCode }}</code></pre>
          </div>
          <div class="guide-code-panel">
            <span>{{ copy.partialImport }}</span>
            <pre><code>{{ partialImportCode }}</code></pre>
          </div>
          <div class="guide-code-panel guide-code-panel--wide">
            <span>{{ copy.globalConfig }}</span>
            <pre><code>{{ configCode }}</code></pre>
          </div>
        </div>
      </section>

      <section id="theme" class="guide-section">
        <div class="guide-section__head">
          <Palette />
          <div>
            <h2>{{ copy.themeTitle }}</h2>
            <p>{{ copy.themeDesc }}</p>
          </div>
        </div>

        <my-alert
          :title="copy.themeAlertTitle"
          :description="copy.themeAlertDesc"
          type="success"
          show-icon
        />

        <div class="guide-theme-row">
          <span style="background: #a8d5ba">#a8d5ba</span>
          <span style="background: #d7e8bd">#d7e8bd</span>
          <span style="background: #fff3c7">#fff3c7</span>
        </div>

        <div class="guide-code-panel">
          <span>theme.ts</span>
          <pre><code>{{ themeCode }}</code></pre>
        </div>
      </section>

      <section id="playground" class="guide-section guide-playground">
        <div class="guide-section__head">
          <PlayCircle />
          <div>
            <h2>{{ copy.playgroundTitle }}</h2>
            <p>{{ copy.playgroundDesc }}</p>
          </div>
        </div>
        <router-link class="guide-link guide-link--primary" to="/playground">
          {{ copy.playgroundButton }}
        </router-link>
      </section>

      <section id="develop" class="guide-section">
        <div class="guide-section__head">
          <FolderTree />
          <div>
            <h2>{{ copy.developTitle }}</h2>
            <p>{{ copy.developDesc }}</p>
          </div>
        </div>
        <div class="guide-path-list">
          <div v-for="item in pathItems" :key="item.path">
            <code>{{ item.path }}</code>
            <span>{{ item.description }}</span>
          </div>
        </div>
      </section>

      <section id="deploy" class="guide-section">
        <div class="guide-section__head">
          <ClipboardCheck />
          <div>
            <h2>{{ copy.deployTitle }}</h2>
            <p>{{ copy.deployDesc }}</p>
          </div>
        </div>
        <div class="guide-check-list">
          <div v-for="item in deployChecklist" :key="item.title">
            <CheckCircle2 />
            <div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </article>

    <aside class="guide-aside">
      <TerminalSquare />
      <strong>My UI 1.0.11</strong>
      <span>Vue 3 + TypeScript + Vite</span>
      <code>npm run dev</code>
      <code>npm run build</code>
    </aside>
  </main>
</template>
