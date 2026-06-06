export interface LoadingOptions {
  target?: HTMLElement | string
  text?: string
  background?: string
  fullscreen?: boolean
  lock?: boolean
  customClass?: string
}

export interface LoadingInstance {
  close: () => void
  setText: (text: string) => void
}

export interface LoadingBindingValue {
  loading?: boolean
  text?: string
  background?: string
}
