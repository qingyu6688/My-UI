export type MessageBoxType = 'alert' | 'confirm' | 'prompt'
export type MessageBoxAction = 'confirm' | 'cancel' | 'close'

export interface MessageBoxOptions {
  title?: string
  message?: string
  type?: MessageBoxType
  confirmButtonText?: string
  cancelButtonText?: string
  showCancelButton?: boolean
  showClose?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  center?: boolean
  /** prompt 模式的输入框 */
  inputValue?: string
  inputPlaceholder?: string
  inputType?: string
  inputPattern?: RegExp
  inputValidator?: (value: string) => boolean | string
  inputErrorMessage?: string
  /** 关闭前钩子：done 接收 action，返回 false 或抛错可阻止关闭 */
  beforeClose?: (action: MessageBoxAction, done: () => void) => void
}

export interface MessageBoxResult {
  action: MessageBoxAction
  value?: string
}
