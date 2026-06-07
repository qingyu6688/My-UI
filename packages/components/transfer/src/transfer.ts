export interface TransferItem {
  key: string | number
  label: string
  disabled?: boolean
}

export interface TransferProps {
  modelValue?: Array<string | number>
  data: TransferItem[]
  titles?: [string, string]
  filterable?: boolean
  disabled?: boolean
}

export interface TransferEmits {
  'update:modelValue': [value: Array<string | number>]
  change: [value: Array<string | number>]
}
