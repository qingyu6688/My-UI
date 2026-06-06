import type { InjectionKey, Ref } from 'vue'

export const tabsTypes = ['line', 'card', 'border-card'] as const
export const tabsPositions = ['top', 'bottom', 'left', 'right'] as const

export type TabsType = (typeof tabsTypes)[number]
export type TabsPosition = (typeof tabsPositions)[number]
export type TabsName = string | number

export interface TabPaneInfo {
  name: TabsName
  label: string
  disabled: boolean
  closable: boolean
  lazy: boolean
}

export interface TabsContext {
  activeName: Ref<TabsName | undefined>
  type: Ref<TabsType>
  panes: Ref<TabPaneInfo[]>
  registerPane: (pane: TabPaneInfo) => void
  unregisterPane: (name: TabsName) => void
  setActive: (name: TabsName) => void
  closePane: (name: TabsName) => void
}

export const tabsContextKey: InjectionKey<TabsContext> = Symbol('MyTabs')

export interface TabsProps {
  modelValue?: TabsName
  type?: TabsType
  position?: TabsPosition
  closable?: boolean
  addable?: boolean
}

export interface TabsEmits {
  'update:modelValue': [name: TabsName]
  tabClick: [name: TabsName]
  tabRemove: [name: TabsName]
  tabAdd: []
}

export interface TabPaneProps {
  name: TabsName
  label?: string
  disabled?: boolean
  closable?: boolean
  lazy?: boolean
}
