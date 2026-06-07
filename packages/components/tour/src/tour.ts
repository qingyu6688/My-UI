export interface TourStep {
  target: string
  title?: string
  description?: string
}

export interface TourProps {
  modelValue?: boolean
  steps: TourStep[]
  current?: number
}

export interface TourEmits {
  'update:modelValue': [open: boolean]
  'update:current': [current: number]
  change: [current: number]
  finish: []
  close: []
}
