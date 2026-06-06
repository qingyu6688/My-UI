import type { InjectionKey, Ref } from 'vue'

export const menuModes = ['horizontal', 'vertical'] as const

export type MenuMode = (typeof menuModes)[number]

export interface MenuContext {
  activeIndex: Ref<string | undefined>
  mode: Ref<MenuMode>
  collapse: Ref<boolean>
  openIndexes: Ref<string[]>
  selectItem: (index: string) => void
  toggleSubmenu: (index: string) => void
}

export const menuContextKey: InjectionKey<MenuContext> = Symbol('MyMenu')

export interface SubMenuContext {
  level: number
}

export const submenuContextKey: InjectionKey<SubMenuContext> = Symbol('MySubMenu')

export interface MenuProps {
  modelValue?: string
  mode?: MenuMode
  collapse?: boolean
  defaultOpeneds?: string[]
  uniqueOpened?: boolean
}

export interface MenuEmits {
  'update:modelValue': [index: string]
  select: [index: string]
  open: [index: string]
  close: [index: string]
}

export interface MenuItemProps {
  index: string
  disabled?: boolean
}

export interface SubMenuProps {
  index: string
  disabled?: boolean
  title?: string
}
