export const drawerDirections = ['ltr', 'rtl', 'ttb', 'btt'] as const

export type DrawerDirection = (typeof drawerDirections)[number]

export interface DrawerProps {
  modelValue?: boolean
  title?: string
  direction?: DrawerDirection
  size?: string | number
  modal?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  lockScroll?: boolean
  appendToBody?: boolean
  beforeClose?: (done: () => void) => void
}

export interface DrawerEmits {
  'update:modelValue': [visible: boolean]
  open: []
  opened: []
  close: []
  closed: []
}
