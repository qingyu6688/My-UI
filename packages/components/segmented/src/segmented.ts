export const segmentedSizes = ['small', 'default', 'large'] as const

export type SegmentedSize = (typeof segmentedSizes)[number]
export type SegmentedValue = string | number

export interface SegmentedOption {
  label: string
  value: SegmentedValue
  disabled?: boolean
}

export interface SegmentedProps {
  modelValue?: SegmentedValue
  options: Array<SegmentedOption | string | number>
  size?: SegmentedSize
  disabled?: boolean
  block?: boolean
}

export interface SegmentedEmits {
  'update:modelValue': [value: SegmentedValue]
  change: [value: SegmentedValue]
}
