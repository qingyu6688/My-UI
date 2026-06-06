export interface DialogProps {
  modelValue?: boolean
  title?: string
  width?: string | number
  top?: string
  fullscreen?: boolean
  modal?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  lockScroll?: boolean
  center?: boolean
  appendToBody?: boolean
  beforeClose?: (done: () => void) => void
}

export interface DialogEmits {
  'update:modelValue': [visible: boolean]
  open: []
  opened: []
  close: []
  closed: []
}
