import type { App, Plugin } from 'vue'
import {
  MyAlert,
  MyAside,
  MyAvatar,
  MyBadge,
  MyBreadcrumb,
  MyBreadcrumbItem,
  MyButton,
  MyCard,
  MyCheckbox,
  MyCheckboxGroup,
  MyCol,
  MyCollapse,
  MyCollapseItem,
  MyConfigProvider,
  MyContainer,
  MyDescriptions,
  MyDescriptionsItem,
  MyDialog,
  MyDivider,
  MyDrawer,
  MyDropdown,
  MyDropdownItem,
  MyEmpty,
  MyFooter,
  MyForm,
  MyFormItem,
  MyHeader,
  MyIcon,
  MyImage,
  MyInput,
  MyInputNumber,
  MyLink,
  MyMain,
  MyMenu,
  MyMenuItem,
  MyOption,
  MyPagination,
  MyPopconfirm,
  MyPopover,
  MyProgress,
  MyRadio,
  MyRadioGroup,
  MyResult,
  MyRow,
  MySegmented,
  MySelect,
  MySkeleton,
  MySpace,
  MyStep,
  MySteps,
  MySubMenu,
  MySwitch,
  MyTabPane,
  MyTable,
  MyTableColumn,
  MyTabs,
  MyTag,
  MyText,
  MyTimeline,
  MyTimelineItem,
  MyTooltip,
} from '../components'
import { MyLoading, vLoading } from '../components/loading'
import { installMessage } from '../components/message'
import { installMessageBox } from '../components/message-box'
import { applyTheme, createTheme, defaultThemeInput, type ThemeInput } from '../hooks'
import '../theme-chalk/src/index.scss'

export interface MyUIOptions {
  theme?: ThemeInput
}

const components = [
  MyAlert,
  MyAside,
  MyAvatar,
  MyBadge,
  MyBreadcrumb,
  MyBreadcrumbItem,
  MyButton,
  MyCard,
  MyCheckbox,
  MyCheckboxGroup,
  MyCol,
  MyCollapse,
  MyCollapseItem,
  MyConfigProvider,
  MyContainer,
  MyDescriptions,
  MyDescriptionsItem,
  MyDialog,
  MyDivider,
  MyDrawer,
  MyDropdown,
  MyDropdownItem,
  MyEmpty,
  MyFooter,
  MyForm,
  MyFormItem,
  MyHeader,
  MyIcon,
  MyImage,
  MyInput,
  MyInputNumber,
  MyLink,
  MyMain,
  MyMenu,
  MyMenuItem,
  MyOption,
  MyPagination,
  MyPopconfirm,
  MyPopover,
  MyProgress,
  MyRadio,
  MyRadioGroup,
  MyResult,
  MyRow,
  MySegmented,
  MySelect,
  MySkeleton,
  MySpace,
  MyStep,
  MySteps,
  MySubMenu,
  MySwitch,
  MyTabPane,
  MyTable,
  MyTableColumn,
  MyTabs,
  MyTag,
  MyText,
  MyTimeline,
  MyTimelineItem,
  MyTooltip,
] as const

const MyUI: Plugin<[MyUIOptions?]> = {
  install(app: App, options: MyUIOptions = {}) {
    components.forEach((component) => {
      app.use(component)
    })

    app.directive('loading', vLoading)
    installMessage(app)
    installMessageBox(app)
    app.config.globalProperties.$loading = MyLoading

    applyTheme(createTheme(options.theme ?? defaultThemeInput))
  },
}

export * from '../components'
export * from '../hooks'
export * from '../locale'
export default MyUI
